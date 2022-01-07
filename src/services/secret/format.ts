import { V1Secret } from '@kubernetes/client-node'
import { K8sSecret } from '../../types/generated'
import formatMetadata from '../../util/metadata'
import { convertObjToArrayWithId } from '../../util'

export default ({
  entity,
  context,
}: {
  entity: V1Secret
  context: string
}): K8sSecret => {
  const {
    apiVersion,
    kind,
    metadata,
    data,
    immutable,
    stringData,
    type
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const formattedData = convertObjToArrayWithId(data)
  const formattedStringData = convertObjToArrayWithId(stringData)

  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    data: formattedData,
    immutable,
    stringData: formattedStringData,
    type
  }
}
