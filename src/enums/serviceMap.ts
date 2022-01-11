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
import ServiceAccount from '../services/serviceAccount'
import Secret from '../services/secret'
import Role from '../services/role'
import Job from '../services/job'
import CronJob from '../services/cronJob'

export default {
  [services.node]: Node,
  [services.namespace]: Namespace,
  [services.pod]: Pod,
  [services.deployment]: Deployment,
  [services.secret]: Secret,
  [services.service]: Service,
  [services.ingress]: Ingress,
  [services.cronJob]: CronJob,
  [services.job]: Job,
  [services.role]: Role,
  [services.persistentVolume]: PersistentVolume,
  [services.persistentVolumeClaim]: PersistentVolumeClaim,
  [services.storageClass]: StorageClass,
  [services.serviceAccount]: ServiceAccount
}