import cuid from 'cuid'
import { V1StorageClass } from '@kubernetes/client-node'
import { K8sStorageClass } from '../../types/generated'
import formatMetadata from '../../util/metadata'
import { convertObjToArrayWithId } from '../../util'

export default ({
  entity,
  context,
}: {
  entity: V1StorageClass
  context: string
}): K8sStorageClass => {
  const {
    apiVersion,
    kind,
    metadata,
    allowVolumeExpansion,
    allowedTopologies,
    mountOptions,
    parameters,
    provisioner,
    reclaimPolicy,
    volumeBindingMode
  } = entity

  const formattedMetadata = formatMetadata(metadata)
  const formattedParameters = convertObjToArrayWithId(parameters)
  const mappedAllowedTopologies = allowedTopologies?.map(({ matchLabelExpressions }) => ({
    id: cuid(),
    matchLabelExpressions: matchLabelExpressions?.map(({ key, values }) => ({
      id: cuid(),
      key,
      values
    })) ?? []
  })) ?? []

  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    allowVolumeExpansion,
    allowedTopologies: mappedAllowedTopologies,
    mountOptions,
    provisioner,
    parameters: formattedParameters,
    reclaimPolicy,
    volumeBindingMode
  }
}
