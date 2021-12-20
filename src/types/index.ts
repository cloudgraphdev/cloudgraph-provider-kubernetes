import { Service } from '@cloudgraph/sdk'
import { CoreV1Api, BatchV1Api, NetworkingV1Api } from '@kubernetes/client-node'

// TODO: create a new service type for k8s services
export interface k8sService extends Service {
  client: any
}

export interface k8sClient {
  core: CoreV1Api
  networking: NetworkingV1Api
  batch:  BatchV1Api
}