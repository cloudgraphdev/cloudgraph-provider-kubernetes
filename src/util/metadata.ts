import cuid from 'cuid'
import { V1ObjectMeta } from '@kubernetes/client-node'
import { K8sMetadata } from '../types/generated'

export interface FormattedMetadata {
  id: string
  metadata: K8sMetadata
}

export default (metadata: V1ObjectMeta): FormattedMetadata => {
  const {
    annotations = {},
    clusterName,
    creationTimestamp,
    deletionGracePeriodSeconds,
    deletionTimestamp,
    finalizers,
    generateName,
    generation,
    labels = {},
    name,
    namespace,
    ownerReferences,
    resourceVersion,
    selfLink,
    uid,
  } = metadata

  const mappedOwnerReferences = ownerReferences?.map(
    ({
      apiVersion: ownerApiVersion,
      blockOwnerDeletion,
      controller,
      kind: ownerKind,
      name: ownerName,
      uid: id,
    }) => ({
      id,
      apiVersion: ownerApiVersion,
      blockOwnerDeletion,
      controller,
      kind: ownerKind,
      name: ownerName,
    })
  ) ?? []

  const mappedLabels = Object.keys(labels).map(key => ({
    id: cuid(),
    key,
    value: labels[key],
  }))
  const mappedAnnotations = Object.keys(annotations).map(key => ({
    id: cuid(),
    key,
    value: annotations[key],
  }))

  return {
    id: uid,
    metadata: {
      annotations: mappedAnnotations,
      clusterName,
      creationTimestamp: creationTimestamp?.toISOString() ?? '',
      deletionGracePeriodSeconds,
      deletionTimestamp: deletionTimestamp?.toISOString() ?? '',
      finalizers,
      generateName,
      generation,
      labels: mappedLabels,
      name,
      namespace,
      ownerReferences: mappedOwnerReferences,
      resourceVersion,
      selfLink,
    },
  }
}
