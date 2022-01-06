import cuid from 'cuid'
import { V1PersistentVolumeClaim } from '@kubernetes/client-node'
import { K8sPersistentVolumeClaim } from '../../types/generated'
import formatMetadata from '../../util/metadata'
import { convertObjToArrayWithId } from '../../util'
import { formatMatchedExpressionsAndFields } from '../pod/util'

export default ({
  entity,
  context,
}: {
  entity: V1PersistentVolumeClaim
  context: string
}): K8sPersistentVolumeClaim => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: {
      accessModes: specAccessModes,
      dataSource,
      dataSourceRef,
      resources,
      selector,
      storageClassName,
      volumeMode,
      volumeName,
    },
    status: { accessModes, capacity, conditions, phase },
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const formattedResources = {
    limits: convertObjToArrayWithId(resources?.limits ?? {}),
    requests: convertObjToArrayWithId(resources?.requests ?? {})
  }

  const formattedSelector = {
    matchExpressions: formatMatchedExpressionsAndFields(selector?.matchExpressions ?? []),
    matchLabels: convertObjToArrayWithId(selector?.matchLabels ?? {})
  }
  const mappedConditions = conditions?.map(
    ({
      lastTransitionTime,
      lastProbeTime,
      message = '',
      reason = '',
      status = '',
      type = '',
    }) => ({
      id: cuid(),
      lastTransitionTime: lastTransitionTime?.toISOString() ?? '',
      lastProbeTime: lastProbeTime?.toISOString() ?? '',
      message,
      reason,
      status,
      type,
    })
  )

  const formattedCapacity = convertObjToArrayWithId(capacity)

  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    spec: {
      accessModes: specAccessModes,
      dataSource,
      dataSourceRef,
      resources: formattedResources,
      selector: formattedSelector,
      storageClassName,
      volumeMode,
      volumeName
    },
    status: {
      accessModes,
      capacity: formattedCapacity,
      conditions: mappedConditions,
      phase,
    },
  }
}
