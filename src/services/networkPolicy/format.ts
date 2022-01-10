import cuid from 'cuid'
import { V1NetworkPolicy, V1NetworkPolicyPeer, V1NetworkPolicyPort } from '@kubernetes/client-node'
import { K8sNetworkPolicy } from '../../types/generated'
import { convertObjToArrayWithId } from '../../util'
import formatMetadata from '../../util/metadata'
import { formatMatchedExpressionsAndFields } from '../pod/util'

const formatPort = (port: V1NetworkPolicyPort) => {
  return {
    id: cuid(),
    endPort: port?.endPort,
    port: String(port?.port ?? ''),
    protocol: port?.protocol
  }
}

const formatPolicyPeer = (peer: V1NetworkPolicyPeer) => {
  return {
    id: cuid(),
    ipBlock: {
      cidr: peer?.ipBlock?.cidr,
      except: peer?.ipBlock?.except
    },
    namespaceSelector: {
      matchExpressions: formatMatchedExpressionsAndFields(peer?.namespaceSelector?.matchExpressions ?? []),
      matchLabels: convertObjToArrayWithId(peer?.namespaceSelector?.matchLabels ?? {})
    },
    podSelector: {
      matchExpressions: formatMatchedExpressionsAndFields(peer?.podSelector?.matchExpressions ?? []),
      matchLabels: convertObjToArrayWithId(peer?.podSelector?.matchLabels ?? {})
    }
  }
}
export default ({
  entity,
  context,
}: {
  entity: V1NetworkPolicy
  context: string
}): K8sNetworkPolicy => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: {
      egress,
      ingress,
      podSelector,
      policyTypes
    } = {}
  } = entity


  const formattedMetadata = formatMetadata(metadata)
  const mappedEgress = egress?.map(({ ports, to })=> ({
    id: cuid(),
    ports: ports?.map(formatPort) ?? [],
    to: to?.map(formatPolicyPeer) ?? []
  })) ?? []

  const mappedIngress = ingress?.map(({ ports, from })=> ({
    id: cuid(),
    ports: ports?.map(formatPort) ?? [],
    from: from?.map(formatPolicyPeer) ?? []
  })) ?? []

  const formattedPodSelector = {
    matchExpressions: formatMatchedExpressionsAndFields(podSelector?.matchExpressions ?? []),
    matchLabels: convertObjToArrayWithId(podSelector?.matchLabels ?? {})
  }

  return {
    id: formattedMetadata.id,
    apiVersion,
    kind,
    context,
    metadata: formattedMetadata.metadata,
    spec: {
      egress: mappedEgress,
      ingress: mappedIngress,
      podSelector: formattedPodSelector,
      policyTypes
    }
  }
}
