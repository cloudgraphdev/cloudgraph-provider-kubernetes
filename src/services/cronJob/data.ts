import CloudGraph from '@cloudgraph/sdk'
import { V1CronJob } from '@kubernetes/client-node'
import { k8sClient } from '../../types'

const { logger } = CloudGraph

export default async ({
  config,
}: { config: { client: k8sClient } }): Promise<V1CronJob[]> => {
  const { client,  } = config

  try {
    const response = await client.batch.listCronJobForAllNamespaces()
    const { body: { items = []} = {}} = response ?? {}
    logger.debug(`Found ${items.length} k8s cron jobs`)

    return items
  } catch (e) {
    logger.debug(e)
    return []
  }
}
