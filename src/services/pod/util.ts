import cuid from 'cuid'
import {
  V1NodeSelectorTerm,
  V1NodeSelectorRequirement,
  V1PodAffinityTerm,
  V1HTTPGetAction,
  V1Container,
  V1ContainerStatus,
  V1ContainerState,
  V1Volume,
} from '@kubernetes/client-node'

import { convertObjToArrayWithId } from '../../util'

export const formatMatchedExpressionsAndFields = (
  fieldsOrExpressions: V1NodeSelectorRequirement[]
) => {
  return (
    fieldsOrExpressions?.map(({ key, operator, values }) => ({
      id: cuid(),
      key,
      operator,
      values,
    })) ?? []
  )
}

export const formatNodeSelectorTerm = (term: V1NodeSelectorTerm) => {
  const { matchExpressions, matchFields } = term
  const mappedMatchExpressions =
    formatMatchedExpressionsAndFields(matchExpressions)
  const mappedMatchFields = formatMatchedExpressionsAndFields(matchFields)
  return {
    id: cuid(),
    matchExpressions: mappedMatchExpressions,
    matchFields: mappedMatchFields,
  }
}

export const mapNodeSelectorTerms = (terms: V1NodeSelectorTerm[]) => {
  return (
    terms?.map(term => ({
      id: cuid(),
      ...formatNodeSelectorTerm(term),
    })) ?? []
  )
}

export const formatHttpGet = (action: V1HTTPGetAction = { port: '' }) => {
  const { httpHeaders = [] } = action
  const mappedHeaders = httpHeaders.map(val => ({
    id: cuid(),
    ...val,
  }))
  return {
    ...action,
    port: String(action?.port ?? ''),
    httpHeaders: mappedHeaders,
  }
}

export const formatAffinityTerm = (term: V1PodAffinityTerm) => {
  const {
    labelSelector = {},
    namespaceSelector = {},
    namespaces,
    topologyKey,
  } = term
  const { matchExpressions, matchLabels } = labelSelector
  const {
    matchExpressions: namespaceMatchExpressions,
    matchLabels: namespaceMatchLabels,
  } = namespaceSelector
  const mappedMatchLabels = convertObjToArrayWithId(matchLabels)
  const mappedMatchExpressions =
    formatMatchedExpressionsAndFields(matchExpressions)
  const mappedNamespaceMatchLabels =
    convertObjToArrayWithId(namespaceMatchLabels)
  const mappedNamespaceMatchExpressions = formatMatchedExpressionsAndFields(
    namespaceMatchExpressions
  )
  return {
    labelSelector: {
      matchExpressions: mappedMatchExpressions,
      matchLabels: mappedMatchLabels,
    },
    namespaceSelector: {
      matchExpressions: mappedNamespaceMatchExpressions,
      matchLabels: mappedNamespaceMatchLabels,
    },
    namespaces,
    topologyKey,
  }
}

export const formatContainer = (container: V1Container) => {
  const {
    env = [],
    envFrom = [],
    lifecycle = {},
    livenessProbe = {},
    ports = [],
    readinessProbe = {},
    resources = { limits: {}, requests: {} },
    startupProbe = {},
    volumeDevices = [],
    volumeMounts = [],
  } = container
  const mappedEnv = env.map(({ name: envName, value, valueFrom }) => ({
    id: cuid(),
    name: envName,
    value,
    valueFrom,
  }))
  const mappedEnvFrom = envFrom.map(({ configMapRef, prefix, secretRef }) => ({
    id: cuid(),
    prefix,
    configMapRef,
    secretRef,
  }))
  const {
    postStart = {},
    postStart: { httpGet, tcpSocket } = {},
    preStop = {},
    preStop: { httpGet: stopHttpGet, tcpSocket: stopTcpSocket } = {},
  } = lifecycle
  const formattedLifecycle = {
    postStart: {
      ...postStart,
      tcpSocket: {
        ...tcpSocket,
        port: String(tcpSocket?.port ?? ''),
      },
      httpGet: formatHttpGet(httpGet),
    },
    preStop: {
      ...preStop,
      tcpSocket: {
        ...stopTcpSocket,
        port: String(stopTcpSocket?.port ?? ''),
      },
      httpGet: formatHttpGet(stopHttpGet),
    },
  }
  const { httpGet: livenessProbeHttpGet, tcpSocket: livenessProbeTcpSocket } =
    livenessProbe
  const formattedLivenessProbe = {
    ...livenessProbe,
    tcpSocket: {
      ...livenessProbeTcpSocket,
      port: String(livenessProbeTcpSocket?.port ?? ''),
    },
    httpGet: formatHttpGet(livenessProbeHttpGet),
  }
  const mappedPorts = ports.map(({ hostIP, ...rest }) => ({
    id: cuid(),
    hostIp: hostIP,
    ...rest,
  }))
  const { httpGet: readinessProbeHttpGet, tcpSocket: readinessProbeTcpSocket } =
    readinessProbe
  const formattedReadinessProbe = {
    ...readinessProbe,
    tcpSocket: {
      ...readinessProbeTcpSocket,
      port: String(readinessProbeTcpSocket?.port ?? ''),
    },
    httpGet: formatHttpGet(readinessProbeHttpGet),
  }
  const formattedResources = {
    limits: convertObjToArrayWithId(resources.limits),
    requests: convertObjToArrayWithId(resources.requests),
  }
  const { httpGet: startupProbeHttpGet, tcpSocket: startupProbeTcpSocket } =
    startupProbe
  const formattedStartupProbe = {
    ...startupProbe,
    tcpSocket: {
      ...startupProbeTcpSocket,
      port: String(startupProbeTcpSocket?.port ?? ''),
    },
    httpGet: formatHttpGet(startupProbeHttpGet),
  }
  const mappedVolumeDevices = volumeDevices.map(device => ({
    id: cuid(),
    ...device,
  }))

  const mappedVolumeMounts = volumeMounts.map(mount => ({
    id: cuid(),
    ...mount,
  }))

  return {
    ...container,
    env: mappedEnv,
    envFrom: mappedEnvFrom,
    lifecycle: formattedLifecycle,
    livenessProbe: formattedLivenessProbe,
    ports: mappedPorts,
    readinessProbe: formattedReadinessProbe,
    resources: formattedResources,
    startupProbe: formattedStartupProbe,
    volumeDevices: mappedVolumeDevices,
    volumeMounts: mappedVolumeMounts,
  }
}

export const formatContainerState = (state: V1ContainerState = {}) => {
  const { running, waiting, terminated } = state
  const formattedRunning = {
    startedAt: running?.startedAt?.toISOString() ?? '',
  }
  const formattedTerminated = {
    containerId: terminated?.containerID,
    exitCode: terminated?.exitCode,
    finishedAt: terminated?.finishedAt?.toISOString() ?? '',
    message: terminated?.message,
    reason: terminated?.reason,
    signal: terminated?.signal,
    startedAt: terminated?.startedAt?.toISOString() ?? '',
  }
  return {
    running: formattedRunning,
    waiting,
    terminated: formattedTerminated,
  }
}

export const formatContainerStatus = (status: V1ContainerStatus) => {
  const {
    containerID: containerId,
    imageID: imageId,
    lastState,
    state,
    name,
    ready,
    started,
    restartCount,
  } = status
  return {
    id: cuid(),
    containerId,
    imageId,
    name,
    ready,
    started,
    restartCount,
    lastState: formatContainerState(lastState),
    state: formatContainerState(state),
  }
}

export const formatSpecVolumes = (volumes: V1Volume[]) => {
  return (
    volumes?.map(
      ({
        awsElasticBlockStore = {},
        azureDisk = {},
        azureFile = {},
        cephfs = {},
        cinder = {},
        configMap = {},
        csi = {},
        downwardAPI = {},
        emptyDir = {},
        ephemeral = {},
        fc = {},
        flexVolume = {},
        flocker = {},
        gcePersistentDisk,
        gitRepo,
        glusterfs,
        hostPath,
        iscsi,
        name,
        nfs,
        persistentVolumeClaim,
        photonPersistentDisk = {},
        portworxVolume = {},
        projected = {},
        quobyte,
        rbd,
        scaleIO,
        secret = {},
        storageos,
        vsphereVolume = {},
      }) => {
        const formattedAwsElasticBlockStore = {
          fsType: awsElasticBlockStore.fsType,
          partition: awsElasticBlockStore.partition,
          readOnly: awsElasticBlockStore.readOnly,
          volumeId: awsElasticBlockStore.volumeID,
        }

        const formattedAzureDisk = {
          cachingMode: azureDisk.cachingMode,
          diskName: azureDisk.diskName,
          diskUri: azureDisk.diskURI,
          fsType: azureDisk.fsType,
          kind: azureDisk.kind,
          readOnly: azureDisk.readOnly,
        }
        // TODO: probably not needed
        const formattedCephfs = {
          monitors: cephfs.monitors,
          path: cephfs.path,
          readOnly: cephfs.readOnly,
          secretFile: cephfs.secretFile,
          user: cephfs.user,
          secretRef: cephfs.secretRef,
        }

        const formattedCinder = {
          fsType: cinder.fsType,
          readOnly: cinder.readOnly,
          secretRef: cinder.secretRef,
          volumeId: cinder.volumeID,
        }

        const mappedConfigMapItems =
          configMap.items?.map(({ key, mode, path }) => ({
            id: cuid(),
            key,
            mode,
            path,
          })) ?? []

        const formattedConfigMap = {
          defaultMode: configMap.defaultMode,
          items: mappedConfigMapItems,
          name: configMap.name,
          optional: configMap.optional,
        }

        const formattedCsi = {
          driver: csi.driver,
          fsType: csi.fsType,
          readOnly: csi.readOnly,
          nodePublishSecretRef: csi.nodePublishSecretRef,
          volumeAttributes: convertObjToArrayWithId(csi.volumeAttributes ?? {}),
        }

        const mappedDownwardApiItems =
          downwardAPI.items?.map(
            ({ fieldRef, resourceFieldRef, mode, path }) => ({
              id: cuid(),
              fieldRef,
              resourceFieldRef,
              mode,
              path,
            })
          ) ?? []

        const formattedDownwardApi = {
          defaultMode: downwardAPI.defaultMode,
          items: mappedDownwardApiItems,
        }

        const {
          annotations,
          clusterName,
          creationTimestamp,
          deletionGracePeriodSeconds,
          deletionTimestamp,
          finalizers,
          generateName,
          generation,
          labels,
          name: metadataName,
          namespace,
          ownerReferences,
          resourceVersion,
          selfLink,
          uid,
        } = ephemeral?.volumeClaimTemplate?.metadata ?? {}
        const mappedOwnerReferences = ownerReferences?.map(
          ({
            apiVersion,
            blockOwnerDeletion,
            controller,
            kind,
            name: ownerReferenceName,
            uid: ownerUid,
          }) => ({
            id: cuid(),
            ownerUid,
            apiVersion,
            blockOwnerDeletion,
            controller,
            kind,
            name: ownerReferenceName,
          })
        ) ?? []
        const formattedEphemeralMetadata = {
          annotations: convertObjToArrayWithId(annotations ?? {}),
          clusterName,
          creationTimestamp: creationTimestamp?.toISOString() ?? '',
          deletionGracePeriodSeconds,
          deletionTimestamp: deletionTimestamp?.toISOString() ?? '',
          finalizers,
          generateName,
          generation,
          labels: convertObjToArrayWithId(labels),
          name: metadataName,
          namespace,
          ownerReferences: mappedOwnerReferences,
          resourceVersion,
          selfLink,
          metadataUid: uid,
        }
        const {
          accessModes,
          dataSource,
          dataSourceRef,
          resources,
          selector,
          storageClassName,
          volumeMode,
          volumeName,
        } = ephemeral?.volumeClaimTemplate?.spec ?? {}
        const formattedEphemeralSpec = {
          accessModes,
          dataSource,
          dataSourceRef,
          resources: {
            limits: convertObjToArrayWithId(resources?.limits ?? {}),
            requests: convertObjToArrayWithId(resources?.requests ?? {}),
          },
          selector: {
            matchExpressions: formatMatchedExpressionsAndFields(
              selector?.matchExpressions ?? []
            ),
            matchLabels: convertObjToArrayWithId(selector?.matchLabels ?? {}),
          },
          storageClassName,
          volumeMode,
          volumeName,
        }
        const formattedEphemeral = {
          volumeClaimTemplate: {
            metadata: formattedEphemeralMetadata,
            spec: formattedEphemeralSpec,
          },
        }

        const formattedFlexVolume = {
          driver: flexVolume.driver,
          readOnly: flexVolume.readOnly,
          fsType: flexVolume.fsType,
          secretRef: flexVolume.secretRef,
          options: convertObjToArrayWithId(flexVolume.options ?? {}),
        }

        const formattedFlocker = {
          datasetName: flocker.datasetName,
          datasetUuid: flocker.datasetUUID,
        }

        const formattedPhotonPersistentDisk = {
          fsType: photonPersistentDisk.fsType,
          pdId: photonPersistentDisk.pdID,
        }

        const formattedPortworkVolume = {
          fsType: portworxVolume.fsType,
          readOnly: portworxVolume.readOnly,
          volumeId: portworxVolume.volumeID,
        }

        const mappedSources = projected.sources?.map(
          ({
            configMap: sourceConfigMap = {},
            downwardAPI: sourceDownwardApi = {},
            secret: sourceSecret = {},
            serviceAccountToken = {},
          }) => {
            const { items, name: configMapName, optional } = sourceConfigMap
            const formattedconfigMap = {
              name: configMapName,
              optional,
              items:
                items?.map(({ key, mode, path }) => ({
                  id: cuid(),
                  key,
                  mode,
                  path,
                })) ?? [],
            }
            const { items: downwardItems } = sourceDownwardApi
            const formattedDownward = {
              items:
                downwardItems?.map(
                  ({ fieldRef, path, mode, resourceFieldRef }) => ({
                    id: cuid(),
                    path,
                    mode,
                    fieldRef,
                    resourceFieldRef,
                  })
                ) ?? [],
            }
            const {
              items: secretItems,
              name: secretName,
              optional: secretOptional,
            } = sourceSecret
            const formattedSecret = {
              items:
                secretItems?.map(({ key, mode, path }) => ({
                  id: cuid(),
                  key,
                  mode,
                  path,
                })) ?? [],
              name: secretName,
              optional: secretOptional,
            }
            return {
              configMap: formattedconfigMap,
              downwardApi: formattedDownward,
              secret: formattedSecret,
              serviceAccountToken,
            }
          }
        )
        const formattedProjected = {
          defaultMode: projected.defaultMode,
          sources: mappedSources,
        }

        const formattedSecret = {
          defaultMode: secret.defaultMode,
          optional: secret.optional,
          secretName: secret.secretName,
          items:
            secret?.items?.map(({ key, mode, path }) => ({
              id: cuid(),
              key,
              mode,
              path,
            })) ?? [],
        }

        return {
          id: cuid(),
          awsElasticBlockStore: formattedAwsElasticBlockStore,
          azureDisk: formattedAzureDisk,
          azureFile,
          cephfs: formattedCephfs,
          cinder: formattedCinder,
          configMap: formattedConfigMap,
          csi: formattedCsi,
          downwardApi: formattedDownwardApi,
          emptyDir,
          ephemeral: formattedEphemeral,
          fc,
          flexVolume: formattedFlexVolume,
          flocker: formattedFlocker,
          gcePersistentDisk,
          gitRepo,
          glusterfs,
          hostPath,
          iscsi,
          name,
          nfs,
          persistentVolumeClaim,
          photonPersistentDisk: formattedPhotonPersistentDisk,
          portworxVolume: formattedPortworkVolume,
          projected: formattedProjected,
          quobyte,
          rbd,
          scaleIo: scaleIO,
          secret: formattedSecret,
          storageos,
          vsphereVolume: {
            fsType: vsphereVolume.fsType,
            storagePolicyId: vsphereVolume.storagePolicyID,
            storagePolicyName: vsphereVolume.storagePolicyName,
            volumePath: vsphereVolume.volumePath
          },
        }
      }
    ) ?? []
  )
}
