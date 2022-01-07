import services from './services'

export default {
  [services.node]: 'k8sNode',
  [services.namespace]: 'k8sNamespace',
  [services.pod]: 'k8sPod',
  [services.deployment]: 'k8sDeployment',
  [services.service]: 'k8sService',
  [services.ingress]: 'k8sIngress',
  [services.persistentVolume]: 'k8sPersistentVolume',
  [services.persistentVolumeClaim]: 'k8sPersistentVolumeClaim',
  [services.storageClass]: 'k8sStorageClass',
  [services.serviceAccount]: 'k8sServiceAccount'
}