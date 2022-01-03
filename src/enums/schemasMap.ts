import services from './services'

export default {
  [services.node]: 'k8sNode',
  [services.namespace]: 'k8sNamespace',
  [services.pod]: 'k8sPod',
  [services.deployment]: 'k8sDeployment',
  [services.service]: 'k8sService'
}