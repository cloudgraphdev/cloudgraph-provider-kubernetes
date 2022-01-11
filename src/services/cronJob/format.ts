import cuid from 'cuid'
import { V1CronJob } from '@kubernetes/client-node'
import { K8sCronJob } from '../../types/generated'
import { convertObjToArrayWithId } from '../../util'
import formatMetadata from '../../util/metadata'
import { formatMatchedExpressionsAndFields, formatSpec } from '../pod/util'

export default ({
  entity,
  context,
}: {
  entity: V1CronJob
  context: string
}): K8sCronJob => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: {
      concurrencyPolicy,
      failedJobsHistoryLimit,
      jobTemplate,
      schedule,
      startingDeadlineSeconds,
      successfulJobsHistoryLimit,
      suspend,
    } = {},
    status: { active, lastScheduleTime, lastSuccessfulTime } = {},
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const formattedTemplateMetadata = formatMetadata(jobTemplate?.metadata ?? {})
  const formattedSelector = {
    matchExpressions: formatMatchedExpressionsAndFields(
      jobTemplate?.spec?.selector?.matchExpressions ?? []
    ),
    matchLabels: convertObjToArrayWithId(
      jobTemplate?.spec?.selector?.matchLabels ?? {}
    ),
  }
  const jobTemplateMetadata = formatMetadata(
    jobTemplate?.spec?.template.metadata ?? {}
  )
  const formattedJobTemplate = {
    metadata: { id: jobTemplateMetadata.id, ...jobTemplateMetadata.metadata },
    spec: formatSpec(jobTemplate?.spec?.template?.spec),
  }
  const formattedTemplateSpec = {
    activeDeadlineSeconds: jobTemplate?.spec?.activeDeadlineSeconds,
    backoffLimit: jobTemplate?.spec?.backoffLimit,
    completionMode: jobTemplate?.spec?.completionMode,
    completions: jobTemplate?.spec?.completions,
    manualSelector: jobTemplate?.spec?.manualSelector,
    parallelism: jobTemplate?.spec?.parallelism,
    selector: formattedSelector,
    suspend: jobTemplate?.spec?.suspend,
    template: formattedJobTemplate,
    ttlSecondsAfterFinished: jobTemplate?.spec?.ttlSecondsAfterFinished,
  }

  const formattedTemplate = {
    metadata: { id: formattedTemplateMetadata.id, ...formattedTemplateMetadata.metadata },
    spec: formattedTemplateSpec,
  }

  const mappedActive =
    active?.map(
      ({
        apiVersion: activeApiVersion,
        fieldPath,
        kind: activeKind,
        name,
        namespace,
        resourceVersion,
        uid,
      }) => ({
        id: uid ?? cuid(),
        apiVersion: activeApiVersion,
        fieldPath,
        kind: activeKind,
        name,
        namespace,
        resourceVersion,
      })
    ) ?? []

  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    spec: {
      concurrencyPolicy,
      failedJobsHistoryLimit,
      jobTemplate: formattedTemplate,
      schedule,
      startingDeadlineSeconds,
      successfulJobsHistoryLimit,
      suspend,
    },
    status: {
      active: mappedActive,
      lastScheduleTime: lastScheduleTime?.toISOString() ?? '',
      lastSuccessfulTime: lastSuccessfulTime?.toISOString() ?? '',
    },
  }
}
