import cuid from 'cuid'
import { V1Pod } from '@kubernetes/client-node'
import { K8sPod } from '../../types/generated'
import formatMetadata from '../../util/metadata'
import {
  formatContainerStatus,
  formatSpec
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
    metadata,
    spec,
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

  // status
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

  const formattedSpec = formatSpec(spec)

  const mappedContainerStatuses = containerStatuses?.map(status =>
    formatContainerStatus(status)
  )
  const mappedEphemeralContainerStatuses = ephemeralContainerStatuses?.map(
    status => formatContainerStatus(status)
  )
  const mappedInitContainerStatuses = initContainerStatuses?.map(status =>
    formatContainerStatus(status)
  )
  
  const formattedMetadata = formatMetadata(metadata)

  return {
    id: formattedMetadata.id,
    context,
    apiVersion,
    kind,
    metadata: formattedMetadata.metadata,
    spec: formattedSpec,
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
