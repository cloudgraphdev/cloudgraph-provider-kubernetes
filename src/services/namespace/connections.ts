import isEmpty from 'lodash/isEmpty'

import { ServiceConnection } from '@cloudgraph/sdk'
import { V1Namespace } from '@kubernetes/client-node'
import services from '../../enums/services'

/**
 * Service Account
 */

export default ({
  service: namespace,
  data,
}: {
  data: { name: string; context: string; data: any[] }[]
  service: V1Namespace
}): { [key: string]: ServiceConnection[] } => {
  const connections: ServiceConnection[] = []

  const {
    metadata: {
      uid: id,
      name
    }
  } = namespace
  
  // Find all non-namespace services
  const serviceData = data.filter(({ name: serviceName }) => serviceName !== services.namespace)

  if (!isEmpty(serviceData)) {
    for (const entity of serviceData) {
      const servicesToConnect = entity.data.filter(val => val?.metadata?.namespace === name)
      if (!isEmpty(servicesToConnect)) {
        for (const service of servicesToConnect) {
          connections.push({
            id: service.metadata?.uid,
            resourceType: entity.name,
            relation: 'child',
            field: entity.name
          })
        }
      }
    }
  }
  const namespaceResult = {
    [id]: connections,
  }
  return namespaceResult
}
