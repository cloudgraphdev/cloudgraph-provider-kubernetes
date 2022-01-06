import { V1PersistentVolumeSpec } from '@kubernetes/client-node'
import { convertObjToArrayWithId } from '../../util'
import { mapNodeSelectorTerms } from '../pod/util'

export default (spec: V1PersistentVolumeSpec) => {
  const {
    accessModes,
    awsElasticBlockStore,
    azureDisk,
    azureFile,
    capacity,
    cephfs,
    cinder,
    claimRef,
    csi,
    fc,
    flexVolume,
    flocker,
    gcePersistentDisk,
    glusterfs,
    hostPath,
    iscsi,
    local,
    mountOptions,
    nfs,
    nodeAffinity,
    persistentVolumeReclaimPolicy,
    photonPersistentDisk,
    portworxVolume,
    quobyte,
    rbd,
    scaleIO,
    storageClassName,
    storageos,
    volumeMode,
    vsphereVolume
  } = spec

  const formattedAwsElasticBlockStore = {
    fsType: awsElasticBlockStore?.fsType,
    partition: awsElasticBlockStore?.partition,
    readOnly: awsElasticBlockStore?.readOnly,
    volumeId: awsElasticBlockStore?.volumeID,
  }

  const formattedAzureDisk = {
    cachingMode: azureDisk?.cachingMode,
    diskName: azureDisk?.diskName,
    diskUri: azureDisk?.diskURI,
    fsType: azureDisk?.fsType,
    kind: azureDisk?.kind,
    readOnly: azureDisk?.readOnly,
  }

  const formattedCapacity = convertObjToArrayWithId(capacity)

  const formattedCephfs = {
    monitors: cephfs?.monitors,
    path: cephfs?.path,
    readOnly: cephfs?.readOnly,
    secretFile: cephfs?.secretFile,
    user: cephfs?.user,
    secretRef: cephfs?.secretRef,
  }

  const formattedCinder = {
    fsType: cinder?.fsType,
    readOnly: cinder?.readOnly,
    secretRef: cinder?.secretRef,
    volumeId: cinder?.volumeID,
  }

  const formattedClaimRef = {
    apiVersion: claimRef?.apiVersion,
    fieldPath: claimRef?.fieldPath,
    kind: claimRef?.kind,
    name: claimRef?.name,
    namespace: claimRef?.namespace,
    resourceVersion: claimRef?.resourceVersion,
    id: claimRef?.uid
  }

  const formattedCsi = {
    ...csi,
    volumeAttributes: convertObjToArrayWithId(csi?.volumeAttributes ?? {})
  }

  const formattedFlexVolume = {
    ...flexVolume,
    options: convertObjToArrayWithId(flexVolume?.options ?? {})
  }

  const formattedFlocker = {
    datasetName: flocker?.datasetName,
    datasetUuid: flocker?.datasetUUID,
  }

  const formattedNodeAffinity = {
    required: {
      nodeSelectorTerms: mapNodeSelectorTerms(nodeAffinity?.required?.nodeSelectorTerms)
    }
  }

  const formattedPhotonPersistentDisk = {
    fsType: photonPersistentDisk?.fsType,
    pdId: photonPersistentDisk?.pdID,
  }

  const formattedPortworkVolume = {
    fsType: portworxVolume?.fsType,
    readOnly: portworxVolume?.readOnly,
    volumeId: portworxVolume?.volumeID,
  }

  return {
    accessModes,
    awsElasticBlockStore: formattedAwsElasticBlockStore,
    azureDisk: formattedAzureDisk,
    azureFile,
    capacity: formattedCapacity,
    cephfs: formattedCephfs,
    cinder: formattedCinder,
    claimRef: formattedClaimRef,
    csi: formattedCsi,
    flexVolume: formattedFlexVolume,
    flocker: formattedFlocker,
    fc,
    gcePersistentDisk,
    glusterfs,
    hostPath,
    iscsi,
    local,
    nfs,
    mountOptions,
    nodeAffinity: formattedNodeAffinity,
    persistentVolumeReclaimPolicy,
    photonPersistentDisk: formattedPhotonPersistentDisk,
    portworxVolume: formattedPortworkVolume,
    quobyte,
    rbd,
    scaleIo: scaleIO,
    storageClassName,
    storageos,
    volumeMode,
    vsphereVolume: {
      fsType: vsphereVolume?.fsType,
      storagePolicyId: vsphereVolume?.storagePolicyID,
      storagePolicyName: vsphereVolume?.storagePolicyName,
      volumePath: vsphereVolume?.volumePath,
    }
  }
}