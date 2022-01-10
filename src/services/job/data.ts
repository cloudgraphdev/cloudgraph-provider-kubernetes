import CloudGraph from '@cloudgraph/sdk'
import { V1Job } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1Job[]> => {
  const { client,  } = config

  try {
    const response = await client.batch.listJobForAllNamespaces()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s jobs`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
