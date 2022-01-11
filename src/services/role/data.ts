import CloudGraph from '@cloudgraph/sdk'
import { V1Role } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1Role[]> => {
  const { client } = config

  try {
    const response = await client.roles.listRoleForAllNamespaces()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s roles`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
