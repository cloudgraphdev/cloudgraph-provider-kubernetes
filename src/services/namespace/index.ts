import getData from './data'
import format from './format'
import mutation from './mutation'


export default class Namespace {
  format = format.bind(this)

  getData = getData.bind(this)

  mutation = mutation
}