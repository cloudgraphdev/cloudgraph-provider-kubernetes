import CloudGraph from '@cloudgraph/sdk'
import { V1Deployment } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1Deployment[]> => {
  const { client,  } = config

  try {
    const response = await client.apps.listDeploymentForAllNamespaces()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s deployments`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
