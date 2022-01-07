import cuid from 'cuid'
import { V1ServiceAccount } from '@kubernetes/client-node'
import { K8sServiceAccount } from '../../types/generated'
import formatMetadata from '../../util/metadata'

export default ({
  entity,
  context,
}: {
  entity: V1ServiceAccount
  context: string
}): K8sServiceAccount => {
  const {
    apiVersion,
    kind,
    metadata,
    automountServiceAccountToken,
    imagePullSecrets,
    secrets,
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const mappedImagePullSecrets =
    imagePullSecrets?.map(({ name }) => ({
      id: cuid(),
      name,
    })) ?? []
  const mappedSecrets = secrets?.map(
    ({
      apiVersion: secretApiVersion,
      fieldPath,
      kind: secretKind,
      name: secretName,
      namespace,
      resourceVersion,
      uid,
    }) => ({
      id: uid ?? cuid(),
      apiVersion: secretApiVersion,
      fieldPath,
      name: secretName,
      kind: secretKind,
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
    automountServiceAccountToken,
    imagePullSecrets: mappedImagePullSecrets,
    secrets: mappedSecrets
  }
}
