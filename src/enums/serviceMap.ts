import services from './services'
import Node from '../services/node'
import Namespace from '../services/namespace'
import Pod from '../services/pod'

export default {
  [services.node]: Node,
  [services.namespace]: Namespace,
  [services.pod]: Pod
}