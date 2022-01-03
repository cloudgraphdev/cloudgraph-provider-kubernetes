import services from './services'
import Node from '../services/node'
import Namespace from '../services/namespace'
import Pod from '../services/pod'
import Deployment from '../services/deployment'

export default {
  [services.node]: Node,
  [services.namespace]: Namespace,
  [services.pod]: Pod,
  [services.deployment]: Deployment
}