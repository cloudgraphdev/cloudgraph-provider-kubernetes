import CloudGraph from '@cloudgraph/sdk'
import { V1StorageClass } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1StorageClass[]> => {
  const { client } = config

  try {
    const response = await client.storage.listStorageClass()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s storage classes`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
