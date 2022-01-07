import CloudGraph from '@cloudgraph/sdk'
import { V1Secret } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1Secret[]> => {
  const { client } = config

  try {
    const response = await client.core.listSecretForAllNamespaces()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s secrets`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
