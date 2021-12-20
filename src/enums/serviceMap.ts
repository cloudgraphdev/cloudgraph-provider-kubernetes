import services from './services'
import Node from '../services/node'
import Namespace from '../services/namespace'

export default {
  [services.node]: Node,
  [services.namespace]: Namespace
}