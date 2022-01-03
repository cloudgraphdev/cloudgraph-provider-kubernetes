import cuid from 'cuid'
import { V1Service, V1LoadBalancerIngress } from '@kubernetes/client-node'
import { K8sService } from '../../types/generated'
import formatMetadata from '../../util/metadata'
import { convertObjToArrayWithId } from '../../util'

export const mapLoadBalancerIngress = (ingressArray: V1LoadBalancerIngress[] = []) => {
  return ingressArray.map(({ hostname, ip, ports: ingressPorts }) => ({
    id: cuid(),
    hostname,
    ip,
    ports: ingressPorts?.map(({ error, port, protocol }) => ({
      id: cuid(),
      error,
      port,
      protocol
    })) ?? []
  }))
}

export default ({
  entity,
  context,
}: {
  entity: V1Service
  context: string
}): K8sService => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: {
      allocateLoadBalancerNodePorts,
      clusterIP: clusterIp,
      clusterIPs: clusterIps,
      externalIPs: externalIps,
      externalName,
      externalTrafficPolicy,
      healthCheckNodePort,
      internalTrafficPolicy,
      ipFamilies,
      ipFamilyPolicy,
      loadBalancerClass,
      loadBalancerIP: loadBalancerIp,
      loadBalancerSourceRanges,
      ports,
      publishNotReadyAddresses,
      selector,
      sessionAffinity,
      sessionAffinityConfig,
      type,
    },
    status: { conditions, loadBalancer },
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const mappedConditions = conditions?.map(
    ({ lastTransitionTime, message, observedGeneration, reason, status, type }) => ({
      id: cuid(),
      lastTransitionTime: lastTransitionTime?.toISOString() ?? '',
      observedGeneration,
      message,
      reason,
      status,
      type,
    })
  )
  const mappedPorts = ports?.map(({ appProtocol, name, nodePort, port, protocol, targetPort }) => ({
    id: cuid(),
    appProtocol,
    name,
    nodePort,
    port,
    protocol,
    targetPort: String(targetPort)
  })) ?? []

  const formattedSessionAffinityConfig = {
    clientIp: {
      timeoutSeconds: sessionAffinityConfig?.clientIP?.timeoutSeconds
    }
  }

  const formattedSelector = convertObjToArrayWithId(selector)
  const formattedLoadBalancer = {
    ingress: mapLoadBalancerIngress(loadBalancer.ingress)
  }
  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    spec: {
      allocateLoadBalancerNodePorts,
      clusterIp,
      clusterIps,
      externalIps,
      externalName,
      externalTrafficPolicy,
      healthCheckNodePort,
      internalTrafficPolicy,
      ipFamilies,
      ipFamilyPolicy,
      loadBalancerClass,
      loadBalancerIp,
      loadBalancerSourceRanges,
      ports: mappedPorts,
      publishNotReadyAddresses,
      selector: formattedSelector,
      sessionAffinity,
      sessionAffinityConfig: formattedSessionAffinityConfig,
      type,
    },
    status: {
      conditions: mappedConditions,
      loadBalancer: formattedLoadBalancer
    },
  }
}
