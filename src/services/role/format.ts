import cuid from 'cuid'
import { V1Role } from '@kubernetes/client-node'
import { K8sRole } from '../../types/generated'
import formatMetadata from '../../util/metadata'

export default ({
  entity,
  context,
}: {
  entity: V1Role
  context: string
}): K8sRole => {
  const {
    apiVersion,
    kind,
    metadata,
    rules
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const mappedRules = rules?.map(({ apiGroups, nonResourceURLs, resources, resourceNames, verbs }) => ({
    id: cuid(),
    apiGroups,
    nonResourceUrls: nonResourceURLs,
    resources,
    resourceNames,
    verbs
  })) ?? []

  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    rules: mappedRules
  }
}
