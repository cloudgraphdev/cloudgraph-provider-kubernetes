import cuid from 'cuid'
import { V1Pod } from '@kubernetes/client-node'
import { K8sPod } from '../../types/generated'
import { convertObjToArrayWithId } from '../../util'
import {
  formatMatchedExpressionsAndFields,
  formatNodeSelectorTerm,
  mapNodeSelectorTerms,
  formatAffinityTerm,
  formatContainer,
  formatContainerStatus,
  formatSpecVolumes
} from './util'

export default ({
  entity,
  context,
}: {
  entity: V1Pod
  context: string
}): K8sPod => {
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
    } = {},
    spec: {
      activeDeadlineSeconds,
      affinity: {
        nodeAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution,
          requiredDuringSchedulingIgnoredDuringExecution: {
            nodeSelectorTerms,
          } = {},
        } = {},
        podAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution:
            podAffinityRequiredDuringSchedulingIgnoredDuringExecution,
          preferredDuringSchedulingIgnoredDuringExecution:
            podAffinityPreferredDuringSchedulingIgnoredDuringExecution,
        } = {},
        podAntiAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution:
            podAntiAffinityRequiredDuringSchedulingIgnoredDuringExecution,
          preferredDuringSchedulingIgnoredDuringExecution:
            podAntiAffinityPreferredDuringSchedulingIgnoredDuringExecution,
        } = {},
      } = {},
      containers,
      dnsConfig: { nameservers, options, searches } = {},
      readinessGates,
      securityContext = {},
      ephemeralContainers,
      hostAliases,
      imagePullSecrets,
      initContainers,
      automountServiceAccountToken,
      dnsPolicy,
      enableServiceLinks,
      hostIPC,
      hostNetwork,
      hostPID,
      hostname,
      nodeSelector,
      overhead,
      nodeName,
      preemptionPolicy,
      priority,
      priorityClassName,
      restartPolicy,
      runtimeClassName,
      schedulerName,
      serviceAccount,
      serviceAccountName,
      setHostnameAsFQDN,
      shareProcessNamespace,
      subdomain,
      terminationGracePeriodSeconds,
      tolerations,
      topologySpreadConstraints, // TODO
      volumes, //TODO
    },
    status: {
      containerStatuses,
      ephemeralContainerStatuses,
      initContainerStatuses,
      hostIP,
      message,
      nominatedNodeName,
      podIP,
      podIPs,
      qosClass,
      reason,
      startTime,
      conditions,
      phase,
    } = {},
  } = entity

  const mappedConditions = conditions?.map(
    ({
      lastProbeTime,
      lastTransitionTime,
      message: conditionMessage = '',
      reason: conditionReason = '',
      status = '',
      type = '',
    }) => ({
      id: cuid(),
      lastProbeTime: lastProbeTime?.toISOString() ?? '',
      lastTransitionTime: lastTransitionTime?.toISOString() ?? '',
      message: conditionMessage,
      reason: conditionReason,
      status,
      type,
    })
  )
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
  const mappedLabels = convertObjToArrayWithId(labels)
  const mappedAnnotations = convertObjToArrayWithId(annotations)
  const mappedPreferredDuringSchedulingIgnoredDuringExecution =
    preferredDuringSchedulingIgnoredDuringExecution?.map(
      ({ preference, weight }) => {
        return {
          id: cuid(),
          weight,
          preference: formatNodeSelectorTerm(preference),
        }
      }
    ) ?? []
  const mappedNodeSelectorTerms = mapNodeSelectorTerms(nodeSelectorTerms)
  const mappedPodAffinityRdsIde =
    podAffinityRequiredDuringSchedulingIgnoredDuringExecution?.map(term => ({
      id: cuid(),
      ...formatAffinityTerm(term),
    })) ?? []
  const mappedPodAffinityPdsIde =
    podAffinityPreferredDuringSchedulingIgnoredDuringExecution?.map(
      ({ weight, podAffinityTerm }) => {
        return {
          id: cuid(),
          weight,
          podAffinityTerm: {
            id: cuid(),
            ...formatAffinityTerm(podAffinityTerm),
          },
        }
      }
    ) ?? []
  const mappedPodAntiAffinityRdsIde =
    podAntiAffinityRequiredDuringSchedulingIgnoredDuringExecution?.map(
      term => ({
        id: cuid(),
        ...formatAffinityTerm(term),
      })
    ) ?? []
  const mappedPodAntiAffinityPdsIde =
    podAntiAffinityPreferredDuringSchedulingIgnoredDuringExecution?.map(
      ({ weight, podAffinityTerm }) => {
        return {
          id: cuid(),
          weight,
          podAffinityTerm: {
            id: cuid(),
            ...formatAffinityTerm(podAffinityTerm),
          },
        }
      }
    ) ?? []
  const mappedContainers =
    containers?.map(container => ({
      id: cuid(),
      ...formatContainer(container),
    })) ?? []

  const mappedEphemeralContainers =
    ephemeralContainers?.map(container => ({
      id: cuid(),
      ...formatContainer(container),
    })) ?? []

  const mappedInitContainers =
    initContainers?.map(container => ({
      id: cuid(),
      ...formatContainer(container),
    })) ?? []

  const mappedDnsOptions =
    options?.map(option => ({
      id: cuid(),
      ...option,
    })) ?? []

  const mappedHostAliases =
    hostAliases?.map(alias => ({
      id: cuid(),
      ...alias,
    })) ?? []

  const mappedImagePullSecrets = imagePullSecrets?.map(secret => ({
    id: cuid(),
    ...secret,
  }))

  const mappedNodeSelector = convertObjToArrayWithId(nodeSelector)
  const mappedOverhead = convertObjToArrayWithId(overhead)

  const formattedSecurityContext = {
    ...securityContext,
    sysctls: securityContext.sysctls?.map(ctl => ({
      id: cuid(),
      ...ctl,
    })),
  }

  const mappedContainerStatuses = containerStatuses?.map(status =>
    formatContainerStatus(status)
  )
  const mappedEphemeralContainerStatuses = ephemeralContainerStatuses?.map(
    status => formatContainerStatus(status)
  )
  const mappedInitContainerStatuses = initContainerStatuses?.map(status =>
    formatContainerStatus(status)
  )

  const mappedTolerations = tolerations?.map(
    ({ effect, key, operator, tolerationSeconds, value }) => ({
      id: cuid(),
      effect,
      key,
      operator,
      tolerationSeconds,
      value,
    })
  )

  const mappedTopologySpreadConstraints = topologySpreadConstraints?.map(
    ({ labelSelector, maxSkew, topologyKey, whenUnsatisfiable }) => {
      const { matchExpressions, matchLabels } = labelSelector
      const mappedMatchExpressions =
        formatMatchedExpressionsAndFields(matchExpressions)
      const mappedMatchLabels = convertObjToArrayWithId(matchLabels)
      return {
        id: cuid(),
        labelSelector: {
          matchExpressions: mappedMatchExpressions,
          matchLabels: mappedMatchLabels,
        },
        maxSkew,
        topologyKey,
        whenUnsatisfiable,
      }
    }
  )

  const mappedSpecVolumes = formatSpecVolumes(volumes)

  return {
    id: uid,
    context,
    apiVersion,
    kind,
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
      activeDeadlineSeconds,
      affinity: {
        nodeAffinity: {
          preferredDuringSchedulingIgnoredDuringExecution:
            mappedPreferredDuringSchedulingIgnoredDuringExecution,
          requiredDuringSchedulingIgnoredDuringExecution: {
            nodeSelectorTerms: mappedNodeSelectorTerms,
          },
        },
        podAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution:
            mappedPodAffinityRdsIde,
          preferredDuringSchedulingIgnoredDuringExecution:
            mappedPodAffinityPdsIde,
        },
        podAntiAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution:
            mappedPodAntiAffinityRdsIde,
          preferredDuringSchedulingIgnoredDuringExecution:
            mappedPodAntiAffinityPdsIde,
        },
      },
      automountServiceAccountToken,
      dnsPolicy,
      enableServiceLinks,
      hostIpc: hostIPC,
      hostNetwork,
      hostPid: hostPID,
      hostname,
      nodeName,
      preemptionPolicy,
      priority,
      priorityClassName,
      restartPolicy,
      runtimeClassName,
      schedulerName,
      serviceAccount,
      serviceAccountName,
      setHostnameAsFqdn: setHostnameAsFQDN,
      shareProcessNamespace,
      subdomain,
      terminationGracePeriodSeconds,
      containers: mappedContainers,
      ephemeralContainers: mappedEphemeralContainers,
      initContainers: mappedInitContainers,
      imagePullSecrets: mappedImagePullSecrets,
      nodeSelector: mappedNodeSelector,
      overhead: mappedOverhead,
      readinessGates:
        readinessGates?.map(gate => ({
          id: cuid(),
          ...gate,
        })) ?? [],
      securityContext: formattedSecurityContext,
      dnsConfig: {
        nameservers,
        searches,
        options: mappedDnsOptions,
      },
      hostAliases: mappedHostAliases,
      tolerations: mappedTolerations,
      topologySpreadConstraints: mappedTopologySpreadConstraints,
      volumes: mappedSpecVolumes
    },
    status: {
      conditions: mappedConditions,
      containerStatuses: mappedContainerStatuses,
      ephemeralContainerStatuses: mappedEphemeralContainerStatuses,
      initContainerStatuses: mappedInitContainerStatuses,
      phase,
      message,
      hostIp: hostIP,
      podIp: podIP,
      podIps:
        podIPs?.map(ip => ({
          id: cuid(),
          ...ip,
        })) ?? [],
      nominatedNodeName,
      qosClass,
      reason,
      startTime: startTime?.toISOString() ?? '',
    },
  }
}
