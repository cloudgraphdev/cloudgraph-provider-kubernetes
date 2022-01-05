import cuid from 'cuid'
import { V1Deployment } from '@kubernetes/client-node'
import { K8sDeployment } from '../../types/generated'
import { convertObjToArrayWithId } from '../../util'
import formatMetadata from '../../util/metadata'
import { formatMatchedExpressionsAndFields, formatSpec } from '../pod/util'

export default ({
  entity,
  context,
}: {
  entity: V1Deployment
  context: string
}): K8sDeployment => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: {  
      minReadySeconds,
      paused,
      progressDeadlineSeconds,
      replicas,
      revisionHistoryLimit,
      selector,
      strategy,
      template
    } = {},
    status: { 
      availableReplicas,
      collisionCount,
      conditions ,
      observedGeneration,
      readyReplicas,
      replicas: statusReplicas,
      unavailableReplicas,
      updatedReplicas
    } = {},
  } = entity

  const formattedMetadata = formatMetadata(metadata)
  const mappedConditions = conditions?.map(
    ({ lastTransitionTime, lastUpdateTime, message, reason, status, type }) => ({
      id: cuid(),
      lastTransitionTime: lastTransitionTime?.toISOString() ?? '',
      lastUpdateTime: lastUpdateTime?.toISOString() ?? '',
      message,
      reason,
      status,
      type,
    })
  )

  const formattedSelector = {
    matchExpressions: formatMatchedExpressionsAndFields(selector.matchExpressions),
    matchLabels: convertObjToArrayWithId(selector.matchLabels)
  }

  const templateMetadata = formatMetadata(template.metadata ?? {})
  const formattedTemplate = {
    metadata: { id: templateMetadata.id, ...templateMetadata.metadata },
    spec: formatSpec(template.spec)
  }

  const formattedStrategy = {
    type: strategy.type,
    rollingUpdate: {
      maxSurge: String(strategy?.rollingUpdate?.maxSurge),
      maxUnavailable: String(strategy?.rollingUpdate?.maxUnavailable)
    }
  }
  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    spec: {
      minReadySeconds,
      paused,
      progressDeadlineSeconds,
      replicas,
      revisionHistoryLimit,
      strategy: formattedStrategy,
      selector: formattedSelector,
      template: formattedTemplate
    },
    status: {
      availableReplicas,
      collisionCount,
      conditions: mappedConditions,
      observedGeneration,
      readyReplicas,
      replicas: statusReplicas,
      unavailableReplicas,
      updatedReplicas
    }
  }
}
