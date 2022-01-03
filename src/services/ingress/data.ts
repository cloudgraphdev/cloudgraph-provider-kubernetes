import CloudGraph from '@cloudgraph/sdk'
import { V1Ingress } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1Ingress[]> => {
  const { client } = config

  try {
    const response = await client.networking.listIngressForAllNamespaces()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s namespaces`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
