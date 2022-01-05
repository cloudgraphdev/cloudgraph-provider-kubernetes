import getData from './data'
import format from './format'
import mutation from './mutation'


export default class PersistentVolumeClaim {
  format = format.bind(this)

  getData = getData.bind(this)

  mutation = mutation
}