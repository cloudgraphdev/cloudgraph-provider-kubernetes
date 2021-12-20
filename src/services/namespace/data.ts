import CloudGraph from '@cloudgraph/sdk'
import { V1Namespace } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1Namespace[]> => {
  const { client } = config

  try {
    const response = await client.core.listNamespace()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s namespaces`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
