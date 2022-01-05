import cuid from 'cuid'
import { V1Ingress, V1IngressBackend } from '@kubernetes/client-node'
import { K8sIngress } from '../../types/generated'
import formatMetadata from '../../util/metadata'
import { mapLoadBalancerIngress } from '../service/format'

const formatBackend = (backend: V1IngressBackend) => {
  return {
    resource: {
      apiGroup: backend?.resource?.apiGroup,
      kind: backend?.resource?.kind,
      name: backend?.resource?.name
    },
    service: {
      name: backend?.service?.name,
      port: {
        name: backend?.service?.port?.name,
        number: backend?.service?.port?.number
      }
    }
  }
}
export default ({
  entity,
  context,
}: {
  entity: V1Ingress
  context: string
}): K8sIngress => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: { 
      defaultBackend,
      ingressClassName,
      rules,
      tls
    },
    status: { loadBalancer },
  } = entity

  const formattedMetadata = formatMetadata(metadata)

  const formattedDefaultBackend = formatBackend(defaultBackend)

  const mappedRules = rules?.map(({ host, http }) => ({
    id: cuid(),
    host,
    http: {
    paths: http?.paths?.map(({ backend, path, pathType }) => ({
      id: cuid(),
      path,
      pathType,
      backend: formatBackend(backend)
    })) ?? []
    }
  })) ?? []

  const mappedTls = tls?.map(({ hosts, secretName }) => ({
    id: cuid(),
    hosts,
    secretName
  })) ?? []

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
      defaultBackend: formattedDefaultBackend,
      ingressClassName,
      rules: mappedRules,
      tls: mappedTls
    },
    status: {
      loadBalancer: formattedLoadBalancer
    },
  }
}
