import cuid from 'cuid'
import { V1Namespace } from '@kubernetes/client-node'
import { K8sNamespace } from '../../types/generated'
import formatMetadata from '../../util/metadata'

export default ({
  entity,
  context,
}: {
  entity: V1Namespace
  context: string
}): K8sNamespace => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: { finalizers: statusFinalizers = [] },
    status: { phase, conditions },
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const mappedConditions = conditions?.map(
    ({ lastTransitionTime, message, reason, status, type }) => ({
      id: cuid(),
      lastTransitionTime: lastTransitionTime?.toISOString() ?? '',
      message,
      reason,
      status,
      type,
    })
  )

  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    spec: {
      finalizers: statusFinalizers,
    },
    status: {
      phase,
      conditions: mappedConditions,
    },
  }
}
