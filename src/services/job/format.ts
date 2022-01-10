import cuid from 'cuid'
import { V1Job } from '@kubernetes/client-node'
import { K8sJob } from '../../types/generated'
import { convertObjToArrayWithId } from '../../util'
import formatMetadata from '../../util/metadata'
import { formatMatchedExpressionsAndFields, formatSpec } from '../pod/util'

export default ({
  entity,
  context,
}: {
  entity: V1Job
  context: string
}): K8sJob => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: {
      activeDeadlineSeconds,
      backoffLimit,
      completionMode,
      completions,
      manualSelector,
      parallelism,
      selector,
      suspend,
      template,
      ttlSecondsAfterFinished
    } = {},
    status: {
      active,
      completedIndexes,
      completionTime,
      conditions,
      failed,
      startTime,
      succeeded,
      uncountedTerminatedPods
    } = {},
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const formattedSelector = {
    matchExpressions: formatMatchedExpressionsAndFields(selector.matchExpressions),
    matchLabels: convertObjToArrayWithId(selector.matchLabels)
  }

  const templateMetadata = formatMetadata(template.metadata ?? {})
  const formattedTemplate = {
    metadata: { id: templateMetadata.id, ...templateMetadata.metadata },
    spec: formatSpec(template.spec)
  }


  const mappedConditions = conditions?.map(
    ({ lastTransitionTime, lastProbeTime, message, reason, status, type }) => ({
      id: cuid(),
      lastTransitionTime: lastTransitionTime?.toISOString() ?? '',
      lastProbeTime: lastProbeTime?.toISOString() ?? '',
      message,
      reason,
      status,
      type,
    })
  )
  
  const formattedUncountedTerminatedPods = {
    failed: uncountedTerminatedPods?.failed ?? [],
    succeeded: uncountedTerminatedPods?.succeeded ?? []
  }
  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    spec: {
      activeDeadlineSeconds,
      backoffLimit,
      completionMode,
      completions,
      manualSelector,
      parallelism,
      selector: formattedSelector,
      suspend,
      template: formattedTemplate,
      ttlSecondsAfterFinished
    },
    status: {
      active,
      completedIndexes,
      completionTime: completionTime?.toISOString() ?? '',
      conditions: mappedConditions,
      failed,
      startTime: startTime?.toISOString() ?? '',
      succeeded,
      uncountedTerminatedPods: formattedUncountedTerminatedPods
    }
  }
}
