import { V1PersistentVolume } from '@kubernetes/client-node'
import { K8sPersistentVolume } from '../../types/generated'
import formatMetadata from '../../util/metadata'
import formatSpec from './util'

export default ({
  entity,
  context,
}: {
  entity: V1PersistentVolume
  context: string
}): K8sPersistentVolume => {
  const {
    apiVersion,
    kind,
    metadata,
    spec = {},
    status: { phase, message, reason },
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const formattedSpec = formatSpec(spec)

  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    spec: formattedSpec,
    status: {
      phase,
      message,
      reason
    },
  }
}
