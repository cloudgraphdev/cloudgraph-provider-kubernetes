import cuid from 'cuid'
import { V1Node } from '@kubernetes/client-node'
import { K8sNode } from '../../types/generated'
import formatMetadata from '../../util/metadata'

export default ({
  entity,
  context,
}: {
  entity: V1Node
  context: string
}): K8sNode => {
  const {
    apiVersion,
    kind,
    metadata,
    spec: {
      configSource: {
        configMap: {
          kubeletConfigKey,
          name: configSourceName,
          namespace: configSourceNamespace,
          resourceVersion: configSourceResourceVersion,
        } = {},
      } = {},
      externalID,
      podCIDR,
      podCIDRs,
      providerID,
      taints,
      unschedulable,
    } = {},
    status: {
      addresses,
      // allocatable TODO: how to handle allocatable and capacity, the keys arent defined in the type
      // capacity
      conditions,
      config: {
        active: {
          configMap: {
            kubeletConfigKey: activeKubeletConfigKey,
            name: activeConfigSourceName,
            namespace: activeConfigSourceNamespace,
            resourceVersion: activeConfigSourceResourceVersion,
            uid: activeUid,
          } = {},
        } = {},
        assigned: {
          configMap: {
            kubeletConfigKey: assignedKubeletConfigKey,
            name: assignedConfigSourceName,
            namespace: assignedConfigSourceNamespace,
            resourceVersion: assignedConfigSourceResourceVersion,
            uid: assignedUid,
          } = {},
        } = {},
        error = '',
        lastKnownGood: {
          configMap: {
            kubeletConfigKey: lastKnownGoodKubeletConfigKey,
            name: lastKnownGoodConfigSourceName,
            namespace: lastKnownGoodConfigSourceNamespace,
            resourceVersion: lastKnownGoodConfigSourceResourceVersion,
            uid: lastKnownGoodUid,
          } = {},
        } = {},
      } = {},
      daemonEndpoints: { kubeletEndpoint: { Port } = {} } = {},
      images,
      nodeInfo: {
        architecture = '',
        bootID = '',
        containerRuntimeVersion = '',
        kernelVersion = '',
        kubeProxyVersion = '',
        kubeletVersion = '',
        machineID = '',
        operatingSystem = '',
        osImage = '',
        systemUUID = '',
      } = {},
      phase,
      volumesAttached,
      volumesInUse = [],
    },
  } = entity

  const formattedMetadata = formatMetadata(metadata)
  const mappedTaints =
    taints?.map(({ effect, key, timeAdded = null, value = '' }) => ({
      id: cuid(),
      effect,
      key,
      timeAdded: timeAdded ? timeAdded.toISOString() : '',
      value,
    })) ?? []
  // Important address values we want to lift to top level for filtering
  const importantAddresses = {
    hostName: '',
    internalIp: '',
    externalIp: '',
  }
  const importantAddressMapper = {
    InternalIP: 'internalIp',
    ExternalIP: 'externalIp',
    Hostname: 'hostName',
  }
  const mappedAddresses =
    addresses?.map(({ address, type }) => {
      if (importantAddressMapper[type]) {
        const addressKey = importantAddressMapper[type]
        importantAddresses[addressKey] = address
      }
      return {
        id: cuid(),
        address,
        type,
      }
    }) ?? []
  const mappedVolumesAttached =
    volumesAttached?.map(({ devicePath, name: volumeName }) => ({
      id: cuid(),
      devicePath,
      name: volumeName,
    })) ?? []
  const mappedImages =
    images?.map(({ names = [], sizeBytes }) => ({
      id: cuid(),
      names,
      sizeBytes,
    })) ?? []
  const mappedConditions = conditions?.map(
    ({
      lastHeartbeatTime,
      lastTransitionTime,
      message = '',
      reason = '',
      status = '',
      type = '',
    }) => ({
      id: cuid(),
      lastHeartbeatTime: lastHeartbeatTime?.toISOString() ?? '',
      lastTransitionTime: lastTransitionTime?.toISOString() ?? '',
      message,
      reason,
      status,
      type,
    })
  )

  return {
    id: formattedMetadata.id,
    context,
    apiVersion,
    kind,
    ...importantAddresses,
    metadata: formattedMetadata.metadata,
    spec: {
      providerID,
      unschedulable,
      taints: mappedTaints,
      configSource: {
        configMap: {
          kubeletConfigKey,
          name: configSourceName,
          namespace: configSourceNamespace,
          resourceVersion: configSourceResourceVersion,
        },
      },
      externalID,
      podCIDR,
      podCIDRs,
    },
    status: {
      addresses: mappedAddresses,
      daemonEndpoints: {
        kubeletEndpoint: {
          port: Port,
        },
      },
      config: {
        active: {
          configMap: {
            kubeletConfigKey: activeKubeletConfigKey,
            name: activeConfigSourceName,
            namespace: activeConfigSourceNamespace,
            resourceVersion: activeConfigSourceResourceVersion,
            id: activeUid,
          },
        },
        assigned: {
          configMap: {
            kubeletConfigKey: assignedKubeletConfigKey,
            name: assignedConfigSourceName,
            namespace: assignedConfigSourceNamespace,
            resourceVersion: assignedConfigSourceResourceVersion,
            id: assignedUid,
          },
        },
        error,
        lastKnownGood: {
          configMap: {
            kubeletConfigKey: lastKnownGoodKubeletConfigKey,
            name: lastKnownGoodConfigSourceName,
            namespace: lastKnownGoodConfigSourceNamespace,
            resourceVersion: lastKnownGoodConfigSourceResourceVersion,
            id: lastKnownGoodUid,
          },
        },
      },
      conditions: mappedConditions,
      images: mappedImages,
      nodeInfo: {
        architecture,
        bootID,
        containerRuntimeVersion,
        kernelVersion,
        kubeProxyVersion,
        kubeletVersion,
        machineID,
        operatingSystem,
        osImage,
        systemUUID,
      },
      phase,
      volumesAttached: mappedVolumesAttached,
      volumesInUse,
    },
  }
}
