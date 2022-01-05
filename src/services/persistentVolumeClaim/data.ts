import CloudGraph from '@cloudgraph/sdk'
import { V1PersistentVolumeClaim } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1PersistentVolumeClaim[]> => {
  const { client } = config

  try {
    const response = await client.core.listPersistentVolumeClaimForAllNamespaces()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s persistent Volume Claims`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
