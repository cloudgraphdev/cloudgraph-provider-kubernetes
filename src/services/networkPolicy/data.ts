import CloudGraph from '@cloudgraph/sdk'
import { V1NetworkPolicy } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1NetworkPolicy[]> => {
  const { client,  } = config

  try {
    const response = await client.networking.listNetworkPolicyForAllNamespaces()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s network policies`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
