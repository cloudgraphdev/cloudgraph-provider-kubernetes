import services from './services'

export default {
  [services.node]: 'k8sNode',
  [services.namespace]: 'k8sNamespace',
  [services.networkPolicy]: 'k8sNetworkPolicy',
  [services.pod]: 'k8sPod',
  [services.deployment]: 'k8sDeployment',
  [services.secret]: 'k8sSecret',
  [services.service]: 'k8sService',
  [services.ingress]: 'k8sIngress',
  [services.cronJob]: 'k8sCronJob',
  [services.job]: 'k8sJob',
  [services.role]: 'k8sRole',
  [services.persistentVolume]: 'k8sPersistentVolume',
  [services.persistentVolumeClaim]: 'k8sPersistentVolumeClaim',
  [services.storageClass]: 'k8sStorageClass',
  [services.serviceAccount]: 'k8sServiceAccount'
}