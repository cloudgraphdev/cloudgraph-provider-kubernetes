import cuid from 'cuid'
import { V1Namespace } from '@kubernetes/client-node'
import { K8sNamespace } from '../../types/generated'

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
    metadata: {
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
    },
    spec: { finalizers: statusFinalizers = [] },
    status: { phase, conditions },
  } = entity

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
  )
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
    apiVersion,
    kind,
    context,
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
    spec: {
      finalizers: statusFinalizers,
    },
    status: {
      phase,
      conditions: mappedConditions,
    },
  }
}
