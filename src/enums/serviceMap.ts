import services from './services'
import Node from '../services/node'
import Namespace from '../services/namespace'
import Pod from '../services/pod'
import Deployment from '../services/deployment'
import Service from '../services/service'
import Ingress from '../services/ingress'
import PersistentVolume from '../services/persistentVolume'
import PersistentVolumeClaim from '../services/persistentVolumeClaim'
import StorageClass from '../services/storageClass'

export default {
  [services.node]: Node,
  [services.namespace]: Namespace,
  [services.pod]: Pod,
  [services.deployment]: Deployment,
  [services.service]: Service,
  [services.ingress]: Ingress,
  [services.persistentVolume]: PersistentVolume,
  [services.persistentVolumeClaim]: PersistentVolumeClaim,
  [services.storageClass]: StorageClass
}