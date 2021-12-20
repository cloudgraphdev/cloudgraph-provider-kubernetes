import CloudGraph, { Opts, ProviderData } from '@cloudgraph/sdk'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import chalk from 'chalk'
import { print } from 'graphql'
import { isEmpty } from 'lodash'
import path from 'path'
import * as k8s from '@kubernetes/client-node'
import serviceMap from '../enums/serviceMap'
import services from '../enums/services'
import { DEFAULT_RESOURCES } from '../config/constants'
import { k8sClient } from '../types'

export const enums = {
  services,
}

export default class Provider extends CloudGraph.Client {
  constructor(config: any) {
    super(config)
    this.properties = enums
    this.credentials = 'test'
  }

  private credentials: undefined | string

  private properties: {
    services: { [key: string]: string }
  }

  logSelectedAccessRegionsAndResources(
    contextsToLog: string[],
    resourcesToLog: string
  ): void {
    this.logger.info(
      `Contexts configured: ${chalk.green(contextsToLog.join(', '))}`
    )
    this.logger.info(
      `Resources configured: ${chalk.green(resourcesToLog.replace(/,/g, ', '))}`
    )
  }

  async configure(): Promise<{ [key: string]: any }> {
    const result: { [key: string]: any } = {}
    const { flags = {} } = this.config
    const kc = new k8s.KubeConfig()
    kc.loadFromDefault()
    const contextList = kc.getContexts()
    kc.setCurrentContext(
      'arn:aws:eks:us-east-1:632941798677:cluster/autocloud-sandbox-eks'
    )
    if (contextList.length > 1) {
      const { contexts } = await this.interface.prompt([
        {
          type: 'checkbox',
          name: 'contexts',
          message: 'Which k8s contexts would you like to scan?',
          choices: contextList.map(({ name }) => name),
        },
      ])
      if (contexts.length) {
        result.contexts = contexts
      } else {
        result.contexts = contextList.map(({ name }) => name)
      }
    } else {
      if (!contextList.length) {
        this.logger.error(
          // eslint-disable-next-line max-len
          'No k8s contexts found, if your KubeConfig is not at the default path, please set a KUBECONFIG env variable pointing to your k8s config file'
        )
        throw new Error('No k8s context found')
      }
      result.contexts = contextList.map(({ name }) => name)
    }
    // Prompt for resources if flag set
    if (flags.resources) {
      const { resources: resourcesAnswer } = await this.interface.prompt([
        {
          type: 'checkbox',
          message: 'Select services to scan',
          loop: false,
          name: 'resources',
          choices: Object.values(services as { [key: string]: string }).map(
            (service: string) => ({
              name: service,
            })
          ),
        },
      ])
      this.logger.debug(resourcesAnswer)
      if (resourcesAnswer.length > 0) {
        result.resources = resourcesAnswer.join(',')
      } else {
        result.resources = DEFAULT_RESOURCES
      }
    } else {
      result.resources = DEFAULT_RESOURCES
    }
    const confettiBall = String.fromCodePoint(0x1f38a) // confetti ball emoji
    this.logger.success(
      `${confettiBall} ${chalk.green(
        'k8s'
      )} configuration successfully completed ${confettiBall}`
    )
    this.logSelectedAccessRegionsAndResources(result.contexts, result.resources)
    return result
  }

  /**
   * getSchema is used to get the schema for provider
   * @returns A string of graphql sub schemas
   */
  getSchema(): string {
    const typesArray = loadFilesSync(path.join(__dirname), {
      recursive: true,
      extensions: ['graphql'],
    })
    return print(mergeTypeDefs(typesArray))
  }

  /**
   * Factory function to return Azure service classes based on input service
   * @param service an Azure service that is listed within the service map (current supported services)
   * @returns Instance of an Azure service class to interact with that Azure service
   */
  private getService(service: string): any {
    if (serviceMap[service]) {
      return new serviceMap[service]()
    }
  }

  private async getRawData(config: any, opts?: Opts): Promise<any> {
    let { resources: configuredResources } = this.config
    const result: any[] = []
    if (!configuredResources) {
      configuredResources = Object.values(this.properties.services).join(',')
    }
    const resourceNames: string[] = [
      ...new Set<string>(configuredResources.split(',')),
    ]
    const { context } = config
    const kc = new k8s.KubeConfig()
    kc.loadFromDefault()
    kc.setCurrentContext(context)
    const coreClient = kc.makeApiClient(k8s.CoreV1Api)
    const networkingClient = kc.makeApiClient(k8s.NetworkingV1Api)
    const batchClient = kc.makeApiClient(k8s.BatchV1Api)
    const client: k8sClient = {
      core: coreClient,
      networking: networkingClient,
      batch: batchClient
    }
    // networkingClient.listIngressForAllNamespaces
    // batchClient.listCronJobForAllNamespaces
    // client.listPersistentVolumeClaimForAllNamespaces TODO: create service for persistentVolumeClaim
    // client.listPersistentVolume TODO: create service for persistentVolume
    // client.listConfigMapForAllNamespaces
    // client.listSecretForAllNamespaces
    // client.listServiceAccountForAllNamespaces
    // client.listServiceForAllNamespaces
    // client.listEndpointsForAllNamespaces
    // client.listEventForAllNamespaces
    // client.listNamespace
    // client.listPodForAllNamespaces
    // client.listPodTemplateForAllNamespaces
    // client.listReplicationControllerForAllNamespaces
    // client.listResourceQuotaForAllNamespaces
    try {
      for (const resource of resourceNames) {
        const serviceClass = this.getService(resource)
        if (serviceClass && serviceClass.getData) {
          // const startDate = new Date()
          const data = await serviceClass.getData({
            config: { client, networkingClient, batchClient },
            opts,
          })
          result.push({
            name: resource,
            context,
            data,
          })
          this.logger.success(`${resource} scan completed`)
        } else {
          this.logger.warn(
            `Skipping service ${resource} as there was an issue getting data for it. Is it currently supported?`
          )
        }
      }
      this.logger.success(`Context: ${context} scan completed`)
    } catch (error: any) {
      this.logger.error('There was an error scanning Azure sdk data')
      this.logger.debug(error)
    }
    return result
  }

  /**
   * getData is used to fetch all provider data specified in the config for the provider
   * @param opts: A set of optional values to configure how getData works
   * @returns Promise<any> All provider data
   */
  async getData({ opts }: { opts: Opts }): Promise<ProviderData> {
    const result: ProviderData = {
      entities: [],
      connections: {},
    }
    const { contexts } = this.config
    let rawData = []
    for (const context of contexts) {
      const newRawData = await this.getRawData({ context }, opts)
      rawData = [...newRawData]
    }

    for (const serviceData of rawData) {
      const serviceClass = this.getService(serviceData.name)
      const entities: any[] = []
      if (!isEmpty(serviceData.data))
        for (const entity of serviceData.data) {
          try {
            const formattedData = serviceClass.format({
              entity,
              context: serviceData.context,
            })
            entities.push(formattedData)
          } catch (e) {
            this.logger.debug(e)
            this.logger.error(
              'There was an error formatting data for k8s service'
            )
          }
        }
      result.entities.push({
        name: serviceData.name,
        mutation: serviceClass.mutation,
        data: entities,
      })
    }
    return result
  }
}
