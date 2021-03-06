import getData from './data'
import format from './format'
import mutation from './mutation'
import getConnections from './connections'


export default class Namespace {
  format = format.bind(this)

  getData = getData.bind(this)

  getConnections = getConnections.bind(this)

  mutation = mutation
}