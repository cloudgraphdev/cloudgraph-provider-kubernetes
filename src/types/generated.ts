export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type K8sAwsElasticBlockStore = {
  fsType?: Maybe<Scalars['String']>;
  partition?: Maybe<Scalars['Int']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  volumeId?: Maybe<Scalars['String']>;
};

export type K8sAzureDisk = {
  cachingMode?: Maybe<Scalars['String']>;
  diskName?: Maybe<Scalars['String']>;
  diskUri?: Maybe<Scalars['String']>;
  fsType?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
};

export type K8sAzureFile = {
  readOnly?: Maybe<Scalars['Boolean']>;
  secretName?: Maybe<Scalars['String']>;
  shareName?: Maybe<Scalars['String']>;
};

export type K8sCephfs = {
  monitors?: Maybe<Array<Maybe<Scalars['String']>>>;
  path?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  secretFile?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  secretRef?: Maybe<K8sVolumeSecretRefObj>;
};

export type K8sCinder = {
  fsType?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  secretRef?: Maybe<K8sVolumeSecretRefObj>;
  volumeId?: Maybe<Scalars['String']>;
};

export type K8sClaimRef = {
  id?: Maybe<Scalars['String']>;
  apiVersion?: Maybe<Scalars['String']>;
  fieldPath?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  resourceVersion?: Maybe<Scalars['String']>;
};

export type K8sConditions = {
  id: Scalars['String'];
  lastHeartbeatTime?: Maybe<Scalars['String']>;
  lastTransitionTime?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sCronJob = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sCronJobSpec>;
  status?: Maybe<K8sCronJobStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sCronJobActive = {
  id: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  fieldPath?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  resourceVersion?: Maybe<Scalars['String']>;
};

export type K8sCronJobJobTemplate = {
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sJobSpec>;
};

export type K8sCronJobSpec = {
  concurrencyPolicy?: Maybe<Scalars['String']>;
  failedJobsHistoryLimit?: Maybe<Scalars['Int']>;
  jobTemplate?: Maybe<K8sCronJobJobTemplate>;
  schedule?: Maybe<Scalars['String']>;
  startingDeadlineSeconds?: Maybe<Scalars['Int']>;
  successfulJobsHistoryLimit?: Maybe<Scalars['Int']>;
  suspend?: Maybe<Scalars['Boolean']>;
  template?: Maybe<K8sJobTemplate>;
};

export type K8sCronJobStatus = {
  active?: Maybe<Array<Maybe<K8sCronJobActive>>>;
  lastScheduleTime?: Maybe<Scalars['String']>;
  lastSuccessfulTime?: Maybe<Scalars['String']>;
};

export type K8sDeployment = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sDeploymentSpec>;
  status?: Maybe<K8sDeploymentStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sDeploymentExpressions = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sDeploymentSelector = {
  matchExpressions?: Maybe<Array<Maybe<K8sDeploymentExpressions>>>;
  matchLabels?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
};

export type K8sDeploymentSpec = {
  minReadySeconds?: Maybe<Scalars['Int']>;
  paused?: Maybe<Scalars['Boolean']>;
  progressDeadlineSeconds?: Maybe<Scalars['Int']>;
  replicas?: Maybe<Scalars['Int']>;
  revisionHistoryLimit?: Maybe<Scalars['Int']>;
  strategy?: Maybe<K8sDeploymentStrategy>;
  selector?: Maybe<K8sDeploymentSelector>;
  template?: Maybe<K8sDeploymentTemplate>;
};

export type K8sDeploymentStatus = {
  availableReplicas?: Maybe<Scalars['Int']>;
  collisionCount?: Maybe<Scalars['Int']>;
  conditions?: Maybe<Array<Maybe<K8sDeploymentStatusConditions>>>;
  observedGeneration?: Maybe<Scalars['Int']>;
  readyReplicas?: Maybe<Scalars['Int']>;
  replicas?: Maybe<Scalars['Int']>;
  unavailableReplicas?: Maybe<Scalars['Int']>;
  updatedReplicas?: Maybe<Scalars['Int']>;
};

export type K8sDeploymentStatusConditions = {
  id: Scalars['String'];
  lastTransitionTime?: Maybe<Scalars['String']>;
  lastUpdateTime?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sDeploymentStrategy = {
  type?: Maybe<Scalars['String']>;
  rollingUpdate?: Maybe<K8sDeploymentStrategyRollingUpdate>;
};

export type K8sDeploymentStrategyRollingUpdate = {
  maxSurge?: Maybe<Scalars['String']>;
  maxUnavailable?: Maybe<Scalars['String']>;
};

export type K8sDeploymentTemplate = {
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sPodSpec>;
};

export type K8sImagePullSecret = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type K8sIngress = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sIngressSpec>;
  status?: Maybe<K8sIngressStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sIngressBackend = {
  resource?: Maybe<K8sIngressBackendResource>;
  service?: Maybe<K8sIngressBackendService>;
};

export type K8sIngressBackendResource = {
  apiGroup?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type K8sIngressBackendService = {
  name?: Maybe<Scalars['String']>;
  port?: Maybe<K8sIngressBackendServicePort>;
};

export type K8sIngressBackendServicePort = {
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
};

export type K8sIngressRule = {
  id: Scalars['String'];
  host?: Maybe<Scalars['String']>;
  http?: Maybe<K8sIngressRuleHttp>;
};

export type K8sIngressRuleHttp = {
  paths?: Maybe<Array<Maybe<K8sIngressRuleHttpPath>>>;
};

export type K8sIngressRuleHttpPath = {
  id: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  pathType?: Maybe<Scalars['String']>;
  backend?: Maybe<K8sIngressBackend>;
};

export type K8sIngressSpec = {
  defaultBackend?: Maybe<K8sIngressBackend>;
  ingressClassName?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<K8sIngressRule>>>;
  tls?: Maybe<Array<Maybe<K8sIngressTls>>>;
};

export type K8sIngressStatus = {
  loadBalancer?: Maybe<K8sServiceLoadBalancer>;
};

export type K8sIngressTls = {
  id: Scalars['String'];
  hosts?: Maybe<Array<Maybe<Scalars['String']>>>;
  secretName?: Maybe<Scalars['String']>;
};

export type K8sJob = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sJobSpec>;
  status?: Maybe<K8sJobStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sJobSelector = {
  matchExpressions?: Maybe<Array<Maybe<K8sDeploymentExpressions>>>;
  matchLabels?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
};

export type K8sJobSpec = {
  activeDeadlineSeconds?: Maybe<Scalars['Int']>;
  backoffLimit?: Maybe<Scalars['Int']>;
  completionMode?: Maybe<Scalars['String']>;
  completions?: Maybe<Scalars['Int']>;
  manualSelector?: Maybe<Scalars['Boolean']>;
  parallelism?: Maybe<Scalars['Int']>;
  selector?: Maybe<K8sJobSelector>;
  suspend?: Maybe<Scalars['Boolean']>;
  template?: Maybe<K8sJobTemplate>;
  ttlSecondsAfterFinished?: Maybe<Scalars['Int']>;
};

export type K8sJobStatus = {
  active?: Maybe<Scalars['Int']>;
  completedIndexes?: Maybe<Scalars['String']>;
  completionTime?: Maybe<Scalars['String']>;
  conditions?: Maybe<Array<Maybe<K8sPersistentVolumeClaimCondition>>>;
  failed?: Maybe<Scalars['Int']>;
  startTime?: Maybe<Scalars['String']>;
  succeeded?: Maybe<Scalars['Int']>;
  uncountedTerminatedPods?: Maybe<K8sJobUncountedTerminatedPods>;
};

export type K8sJobTemplate = {
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sPodSpec>;
};

export type K8sJobUncountedTerminatedPods = {
  failed?: Maybe<Array<Maybe<Scalars['String']>>>;
  succeeded?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sKeyValueArray = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sLabel = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sMetadata = {
  id?: Maybe<Scalars['String']>;
  annotations?: Maybe<Array<Maybe<K8sLabel>>>;
  clusterName?: Maybe<Scalars['String']>;
  creationTimestamp?: Maybe<Scalars['String']>;
  deletionGracePeriodSeconds?: Maybe<Scalars['Int']>;
  deletionTimestamp?: Maybe<Scalars['String']>;
  finalizers?: Maybe<Array<Maybe<Scalars['String']>>>;
  generateName?: Maybe<Scalars['String']>;
  generation?: Maybe<Scalars['Int']>;
  labels?: Maybe<Array<Maybe<K8sLabel>>>;
  ownerReferences?: Maybe<Array<Maybe<K8sNodeOwnerReferences>>>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  resourceVersion?: Maybe<Scalars['String']>;
  selfLink?: Maybe<Scalars['String']>;
};

export type K8sNamespace = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sNamespaceSpec>;
  status?: Maybe<K8sNamespaceStatus>;
  networkPolicy?: Maybe<Array<Maybe<K8sNetworkPolicy>>>;
  node?: Maybe<Array<Maybe<K8sNode>>>;
  pod?: Maybe<Array<Maybe<K8sPod>>>;
  deployment?: Maybe<Array<Maybe<K8sDeployment>>>;
  ingress?: Maybe<Array<Maybe<K8sIngress>>>;
  secret?: Maybe<Array<Maybe<K8sSecret>>>;
  service?: Maybe<Array<Maybe<K8sService>>>;
  serviceAccount?: Maybe<Array<Maybe<K8sServiceAccount>>>;
  storageClass?: Maybe<Array<Maybe<K8sStorageClass>>>;
  persistentVolume?: Maybe<Array<Maybe<K8sPersistentVolume>>>;
  persistentVolumeClaim?: Maybe<Array<Maybe<K8sPersistentVolumeClaim>>>;
  role?: Maybe<Array<Maybe<K8sRole>>>;
  job?: Maybe<Array<Maybe<K8sJob>>>;
  cronJob?: Maybe<Array<Maybe<K8sCronJob>>>;
};

export type K8sNamespaceSpec = {
  finalizers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sNamespaceStatus = {
  phase?: Maybe<Scalars['String']>;
  conditions?: Maybe<Array<Maybe<K8sConditions>>>;
};

export type K8sNetworkPolicy = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sNetworkPolicySpec>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sNetworkPolicyEgress = {
  id: Scalars['String'];
  ports?: Maybe<Array<Maybe<K8sNetworkPolicyPort>>>;
  to?: Maybe<Array<Maybe<K8sNetworkPolicyPeer>>>;
};

export type K8sNetworkPolicyIngress = {
  id: Scalars['String'];
  ports?: Maybe<Array<Maybe<K8sNetworkPolicyPort>>>;
  from?: Maybe<Array<Maybe<K8sNetworkPolicyPeer>>>;
};

export type K8sNetworkPolicyPeer = {
  id: Scalars['String'];
  ipBlock?: Maybe<K8sNetworkPolicyPeerIpBlock>;
  namespaceSelector?: Maybe<K8sDeploymentSelector>;
  podSelector?: Maybe<K8sDeploymentSelector>;
};

export type K8sNetworkPolicyPeerIpBlock = {
  cidr?: Maybe<Scalars['String']>;
  except?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sNetworkPolicyPort = {
  id: Scalars['String'];
  endPort?: Maybe<Scalars['Int']>;
  port?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['String']>;
};

export type K8sNetworkPolicySpec = {
  egress?: Maybe<Array<Maybe<K8sNetworkPolicyEgress>>>;
  ingress?: Maybe<Array<Maybe<K8sNetworkPolicyIngress>>>;
  podSelector?: Maybe<K8sDeploymentSelector>;
  policyTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sNode = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  hostName?: Maybe<Scalars['String']>;
  externalIp?: Maybe<Scalars['String']>;
  internalIp?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sNodeSpec>;
  status?: Maybe<K8sNodeStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sNodeAddress = {
  id: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sNodeConfigSource = {
  configMap?: Maybe<K8sNodeconfigSourceMap>;
};

export type K8sNodeDaemonEndpoint = {
  kubeletEndpoint?: Maybe<K8sNodeDaemonKubeletEndpoint>;
};

export type K8sNodeDaemonKubeletEndpoint = {
  port?: Maybe<Scalars['Int']>;
};

export type K8sNodeImages = {
  id: Scalars['String'];
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  sizeBytes?: Maybe<Scalars['Int']>;
};

export type K8sNodeNodeInfo = {
  architecture?: Maybe<Scalars['String']>;
  bootID?: Maybe<Scalars['String']>;
  containerRuntimeVersion?: Maybe<Scalars['String']>;
  kernelVersion?: Maybe<Scalars['String']>;
  kubeProxyVersion?: Maybe<Scalars['String']>;
  kubeletVersion?: Maybe<Scalars['String']>;
  machineID?: Maybe<Scalars['String']>;
  operatingSystem?: Maybe<Scalars['String']>;
  osImage?: Maybe<Scalars['String']>;
  systemUUID?: Maybe<Scalars['String']>;
};

export type K8sNodeOwnerReferences = {
  id: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  blockOwnerDeletion?: Maybe<Scalars['Boolean']>;
  controller?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type K8sNodeSpec = {
  providerID?: Maybe<Scalars['String']>;
  unschedulable?: Maybe<Scalars['Boolean']>;
  configSource?: Maybe<K8sNodeConfigSource>;
  taints?: Maybe<Array<Maybe<K8sNodeTaint>>>;
  externalID?: Maybe<Scalars['String']>;
  podCIDR?: Maybe<Scalars['String']>;
  podCIDRs?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sNodeStatus = {
  addresses?: Maybe<Array<Maybe<K8sNodeAddress>>>;
  daemonEndpoints?: Maybe<K8sNodeDaemonEndpoint>;
  conditions?: Maybe<Array<Maybe<K8sConditions>>>;
  config?: Maybe<K8sNodeStatusConfig>;
  images?: Maybe<Array<Maybe<K8sNodeImages>>>;
  nodeInfo?: Maybe<K8sNodeNodeInfo>;
  phase?: Maybe<Scalars['String']>;
  volumesAttached?: Maybe<Array<Maybe<K8sNodeVolumesAttached>>>;
  volumesInUse?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sNodeStatusConfig = {
  active?: Maybe<K8sNodeConfigSource>;
  error?: Maybe<Scalars['String']>;
  assigned?: Maybe<K8sNodeConfigSource>;
  lastKnownGood?: Maybe<K8sNodeConfigSource>;
};

export type K8sNodeTaint = {
  id: Scalars['String'];
  effect?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  timeAdded?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sNodeVolumesAttached = {
  id: Scalars['String'];
  devicePath?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type K8sNodeconfigSourceMap = {
  id?: Maybe<Scalars['String']>;
  kubeletConfigKey?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  resourceVersion?: Maybe<Scalars['String']>;
};

export type K8sPersistentVolume = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sPersistentVolumeSpec>;
  status?: Maybe<K8sPersistentVolumeStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sPersistentVolumeClaim = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sPersistentVolumeClaimSpec>;
  status?: Maybe<K8sPersistentVolumeClaimStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sPersistentVolumeClaimCondition = {
  id: Scalars['String'];
  lastTransitionTime?: Maybe<Scalars['String']>;
  lastProbeTime?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sPersistentVolumeClaimDataSource = {
  apiGroup?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type K8sPersistentVolumeClaimResources = {
  limits?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  requests?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
};

export type K8sPersistentVolumeClaimSpec = {
  accessModes?: Maybe<Array<Maybe<Scalars['String']>>>;
  dataSource?: Maybe<K8sPersistentVolumeClaimDataSource>;
  dataSourceRef?: Maybe<K8sPersistentVolumeClaimDataSource>;
  resources?: Maybe<K8sPersistentVolumeClaimResources>;
  selector?: Maybe<K8sPodAffinitySelector>;
  storageClassName?: Maybe<Scalars['String']>;
  volumeMode?: Maybe<Scalars['String']>;
  volumeName?: Maybe<Scalars['String']>;
};

export type K8sPersistentVolumeClaimStatus = {
  accessModes?: Maybe<Array<Maybe<Scalars['String']>>>;
  capacity?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  conditions?: Maybe<Array<Maybe<K8sPersistentVolumeClaimCondition>>>;
  phase?: Maybe<Scalars['String']>;
};

export type K8sPersistentVolumeCsi = {
  volumeAttributes?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  controllerExpandSecretRef?: Maybe<K8sVolumeSecretRefObj>;
  controllerPublishSecretRef?: Maybe<K8sVolumeSecretRefObj>;
  driver?: Maybe<Scalars['String']>;
  fsType?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  volumeHandle?: Maybe<Scalars['String']>;
};

export type K8sPersistentVolumeLocal = {
  fsType?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type K8sPersistentVolumeNodeAffinity = {
  required?: Maybe<K8sPersistentVolumeNodeAffinityRequired>;
};

export type K8sPersistentVolumeNodeAffinityRequired = {
  nodeSelectorTerms?: Maybe<Array<Maybe<K8sPodAffinityNodeSelector>>>;
};

export type K8sPersistentVolumeSpec = {
  accessModes?: Maybe<Array<Maybe<Scalars['String']>>>;
  awsElasticBlockStore?: Maybe<K8sAwsElasticBlockStore>;
  azureDisk?: Maybe<K8sAzureDisk>;
  azureFile?: Maybe<K8sAzureFile>;
  capacity?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  cephfs?: Maybe<K8sCephfs>;
  cinder?: Maybe<K8sCinder>;
  claimRef?: Maybe<K8sClaimRef>;
  csi?: Maybe<K8sPersistentVolumeCsi>;
  flexVolume?: Maybe<K8sVolumeFlexVolume>;
  flocker?: Maybe<K8sVolumeFlocker>;
  fc?: Maybe<K8sVolumeFc>;
  gcePersistentDisk?: Maybe<K8sVolumeGcePersistentDisk>;
  glusterfs?: Maybe<K8sVolumeGlusterfs>;
  hostPath?: Maybe<K8sVolumeHostPath>;
  iscsi?: Maybe<K8sVolumeIscsi>;
  local?: Maybe<K8sPersistentVolumeLocal>;
  nfs?: Maybe<K8sVolumeNfs>;
  mountOptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  nodeAffinity?: Maybe<K8sPersistentVolumeNodeAffinity>;
  persistentVolumeReclaimPolicy?: Maybe<Scalars['String']>;
  photonPersistentDisk?: Maybe<K8sVolumePhotonPersistentDisk>;
  portworxVolume?: Maybe<K8sVolumePortworxVolume>;
  quobyte?: Maybe<K8sVolumeQuobyte>;
  rbd?: Maybe<K8sVolumeRbd>;
  scaleIo?: Maybe<K8sVolumeScaleIo>;
  storageClassName?: Maybe<Scalars['String']>;
  storageos?: Maybe<K8sVolumeStorageos>;
  volumeMode?: Maybe<Scalars['String']>;
  vsphereVolume?: Maybe<K8sVolumeVsphereVolume>;
};

export type K8sPersistentVolumeStatus = {
  phase?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type K8sPod = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sPodSpec>;
  status?: Maybe<K8sPodStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sPodAffinity = {
  nodeAffinity?: Maybe<K8sPodNodeAffinity>;
  podAffinity?: Maybe<K8sPodAffinityType>;
  podAntiAffinity?: Maybe<K8sPodAffinityType>;
};

export type K8sPodAffinityNodeSelector = {
  id: Scalars['String'];
  matchExpressions?: Maybe<Array<Maybe<K8sPodNodeSelectorValue>>>;
  matchFields?: Maybe<Array<Maybe<K8sPodNodeSelectorValue>>>;
};

export type K8sPodAffinitySelector = {
  matchExpressions?: Maybe<Array<Maybe<K8sPodNodeSelectorValue>>>;
  matchLabels?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
};

export type K8sPodAffinityTerm = {
  id: Scalars['String'];
  labelSelector?: Maybe<K8sPodAffinitySelector>;
  namespaceSelector?: Maybe<K8sPodAffinitySelector>;
  namespaces?: Maybe<Array<Maybe<Scalars['String']>>>;
  topologyKey?: Maybe<Scalars['String']>;
};

export type K8sPodAffinityType = {
  requiredDuringSchedulingIgnoredDuringExecution?: Maybe<Array<Maybe<K8sPodAffinityTerm>>>;
  preferredDuringSchedulingIgnoredDuringExecution?: Maybe<Array<Maybe<K8sPodPreferredAffinity>>>;
};

export type K8sPodConditions = {
  id: Scalars['String'];
  lastProbeTime?: Maybe<Scalars['String']>;
  lastTransitionTime?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sPodContainer = {
  id: Scalars['String'];
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  command?: Maybe<Array<Maybe<Scalars['String']>>>;
  env?: Maybe<Array<Maybe<K8sPodEnv>>>;
  envFrom?: Maybe<Array<Maybe<K8sPodEnvFrom>>>;
  image?: Maybe<Scalars['String']>;
  imagePullPolicy?: Maybe<Scalars['String']>;
  lifecycle?: Maybe<K8sPodLifecycle>;
  livenessProbe?: Maybe<K8sPodProbe>;
  name?: Maybe<Scalars['String']>;
  ports?: Maybe<Array<Maybe<K8sPodPorts>>>;
  readinessProbe?: Maybe<K8sPodProbe>;
  resources?: Maybe<K8sPodResources>;
  securityContext?: Maybe<K8sPodSecurityContext>;
  startupProbe?: Maybe<K8sPodProbe>;
  stdin?: Maybe<Scalars['Boolean']>;
  stdinOnce?: Maybe<Scalars['Boolean']>;
  terminationMessagePath?: Maybe<Scalars['String']>;
  terminationMessagePolicy?: Maybe<Scalars['String']>;
  tty?: Maybe<Scalars['Boolean']>;
  volumeDevices?: Maybe<Array<Maybe<K8sPodVolumeDevices>>>;
  volumeMounts?: Maybe<Array<Maybe<K8sPodVolumeMounts>>>;
  workingDir?: Maybe<Scalars['String']>;
};

export type K8sPodContainerState = {
  waiting?: Maybe<K8sPodContainerStateWaiting>;
  running?: Maybe<K8sPodContainerStateRunning>;
  terminated?: Maybe<K8sPodContainerStateTerminated>;
};

export type K8sPodContainerStateRunning = {
  startedAt?: Maybe<Scalars['String']>;
};

export type K8sPodContainerStateTerminated = {
  containerId?: Maybe<Scalars['String']>;
  exitCode?: Maybe<Scalars['Int']>;
  finishedAt?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  signal?: Maybe<Scalars['Int']>;
  startedAt?: Maybe<Scalars['String']>;
};

export type K8sPodContainerStateWaiting = {
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
};

export type K8sPodContainerStatus = {
  id: Scalars['String'];
  containerId?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ready?: Maybe<Scalars['Boolean']>;
  restartCount?: Maybe<Scalars['Int']>;
  started?: Maybe<Scalars['Boolean']>;
  state?: Maybe<K8sPodContainerState>;
  lastState?: Maybe<K8sPodContainerState>;
};

export type K8sPodDnsConfig = {
  nameservers?: Maybe<Array<Maybe<Scalars['String']>>>;
  searches?: Maybe<Array<Maybe<Scalars['String']>>>;
  options?: Maybe<Array<Maybe<K8sPodDnsConfigOptions>>>;
};

export type K8sPodDnsConfigOptions = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sPodEnv = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  valueFrom?: Maybe<K8sPodEnvValueFrom>;
};

export type K8sPodEnvConfigMapKeyRef = {
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  optional?: Maybe<Scalars['Boolean']>;
};

export type K8sPodEnvFrom = {
  id: Scalars['String'];
  prefix?: Maybe<Scalars['String']>;
  configMapRef?: Maybe<K8sPodEnvConfigMapKeyRef>;
  secretRef?: Maybe<K8sPodEnvConfigMapKeyRef>;
};

export type K8sPodEnvValueFrom = {
  configMapKeyRef?: Maybe<K8sPodEnvConfigMapKeyRef>;
  fieldRef?: Maybe<K8sPodFieldRef>;
  resourceFieldRef?: Maybe<K8sPodResourceFieldRef>;
  secretKeyRef?: Maybe<K8sPodEnvConfigMapKeyRef>;
};

export type K8sPodExec = {
  command?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sPodFieldRef = {
  apiVersion?: Maybe<Scalars['String']>;
  fieldPath?: Maybe<Scalars['String']>;
};

export type K8sPodHostAlias = {
  id: Scalars['String'];
  ip?: Maybe<Scalars['String']>;
  hostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sPodHttpGet = {
  httpHeaders?: Maybe<Array<Maybe<K8sPodLifecycleHttpGetHeaders>>>;
  host?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  scheme?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
};

export type K8sPodImageSecrets = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type K8sPodIps = {
  id: Scalars['String'];
  ip?: Maybe<Scalars['String']>;
};

export type K8sPodLifecycle = {
  postStart?: Maybe<K8sPodLifecycleStatus>;
  preStop?: Maybe<K8sPodLifecycleStatus>;
};

export type K8sPodLifecycleHttpGetHeaders = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sPodLifecycleStatus = {
  httpGet?: Maybe<K8sPodHttpGet>;
  exec?: Maybe<K8sPodExec>;
  tcpSocket?: Maybe<K8sPodSocket>;
};

export type K8sPodNodeAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: Maybe<K8sPodNodeAffinityRequired>;
  preferredDuringSchedulingIgnoredDuringExecution?: Maybe<Array<Maybe<K8sPodPreferredAffinity>>>;
};

export type K8sPodNodeAffinityRequired = {
  nodeSelectorTerms?: Maybe<Array<Maybe<K8sPodAffinityNodeSelector>>>;
};

export type K8sPodNodeSelectorValue = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sPodPorts = {
  id: Scalars['String'];
  containerPort?: Maybe<Scalars['Int']>;
  hostIp?: Maybe<Scalars['String']>;
  hostPort?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['String']>;
};

export type K8sPodPreferredAffinity = {
  id: Scalars['String'];
  weight?: Maybe<Scalars['Int']>;
  preference?: Maybe<K8sPodAffinityTerm>;
  podAffinityTerm?: Maybe<K8sPodAffinityTerm>;
};

export type K8sPodProbe = {
  exec?: Maybe<K8sPodExec>;
  failureThreshold?: Maybe<Scalars['Int']>;
  httpGet?: Maybe<K8sPodHttpGet>;
  initialDelaySeconds?: Maybe<Scalars['Int']>;
  periodSeconds?: Maybe<Scalars['Int']>;
  successThreshold?: Maybe<Scalars['Int']>;
  tcpSocket?: Maybe<K8sPodSocket>;
  terminationGracePeriodSeconds?: Maybe<Scalars['Int']>;
  timeoutSeconds?: Maybe<Scalars['Int']>;
};

export type K8sPodReadinessGates = {
  id: Scalars['String'];
  conditionType?: Maybe<Scalars['String']>;
};

export type K8sPodResourceFieldRef = {
  containerName?: Maybe<Scalars['String']>;
  divisor?: Maybe<Scalars['String']>;
  resource?: Maybe<Scalars['String']>;
};

export type K8sPodResources = {
  limits?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  requests?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
};

export type K8sPodSecurityContext = {
  allowPrivilegeEscalation?: Maybe<Scalars['Boolean']>;
  capabilities?: Maybe<K8sPodSecurityContextCapabilities>;
  privileged?: Maybe<Scalars['Boolean']>;
  procMount?: Maybe<Scalars['String']>;
  sysctls?: Maybe<Array<Maybe<K8sPodSecurityContextSysCtls>>>;
  fsGroup?: Maybe<Scalars['Int']>;
  fsGroupChangePolicy?: Maybe<Scalars['String']>;
  readOnlyRootFilesystem?: Maybe<Scalars['Boolean']>;
  runAsGroup?: Maybe<Scalars['Int']>;
  runAsNonRoot?: Maybe<Scalars['Boolean']>;
  runAsUser?: Maybe<Scalars['Int']>;
  supplementalGroups?: Maybe<Array<Maybe<Scalars['Int']>>>;
  seLinuxOptions?: Maybe<K8sPodSecurityContextSeLinuxOptions>;
  seccompProfile?: Maybe<K8sPodSecurityContextSeccompProfile>;
  windowsOptions?: Maybe<K8sPodSecurityContextWindowsOptions>;
};

export type K8sPodSecurityContextCapabilities = {
  add?: Maybe<Array<Maybe<Scalars['String']>>>;
  drop?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sPodSecurityContextSeLinuxOptions = {
  level?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type K8sPodSecurityContextSeccompProfile = {
  localhostProfile?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sPodSecurityContextSysCtls = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sPodSecurityContextWindowsOptions = {
  gmsaCredentialSpec?: Maybe<Scalars['String']>;
  gmsaCredentialSpecName?: Maybe<Scalars['String']>;
  hostProcess?: Maybe<Scalars['Boolean']>;
  runAsUserName?: Maybe<Scalars['String']>;
};

export type K8sPodSocket = {
  host?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
};

export type K8sPodSpec = {
  activeDeadlineSeconds?: Maybe<Scalars['Int']>;
  affinity?: Maybe<K8sPodAffinity>;
  automountServiceAccountToken?: Maybe<Scalars['Boolean']>;
  dnsPolicy?: Maybe<Scalars['String']>;
  enableServiceLinks?: Maybe<Scalars['Boolean']>;
  hostIpc?: Maybe<Scalars['Boolean']>;
  hostNetwork?: Maybe<Scalars['Boolean']>;
  hostPid?: Maybe<Scalars['Boolean']>;
  hostname?: Maybe<Scalars['String']>;
  nodeName?: Maybe<Scalars['String']>;
  preemptionPolicy?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  priorityClassName?: Maybe<Scalars['String']>;
  restartPolicy?: Maybe<Scalars['String']>;
  runtimeClassName?: Maybe<Scalars['String']>;
  schedulerName?: Maybe<Scalars['String']>;
  serviceAccount?: Maybe<Scalars['String']>;
  serviceAccountName?: Maybe<Scalars['String']>;
  setHostnameAsFqdn?: Maybe<Scalars['Boolean']>;
  shareProcessNamespace?: Maybe<Scalars['Boolean']>;
  subdomain?: Maybe<Scalars['String']>;
  terminationGracePeriodSeconds?: Maybe<Scalars['Int']>;
  containers?: Maybe<Array<Maybe<K8sPodContainer>>>;
  ephemeralContainers?: Maybe<Array<Maybe<K8sPodContainer>>>;
  initContainers?: Maybe<Array<Maybe<K8sPodContainer>>>;
  imagePullSecrets?: Maybe<Array<Maybe<K8sPodImageSecrets>>>;
  nodeSelector?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  overhead?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  readinessGates?: Maybe<Array<Maybe<K8sPodReadinessGates>>>;
  securityContext?: Maybe<K8sPodSecurityContext>;
  dnsConfig?: Maybe<K8sPodDnsConfig>;
  hostAliases?: Maybe<Array<Maybe<K8sPodHostAlias>>>;
  tolerations?: Maybe<Array<Maybe<K8sPodTolerations>>>;
  topologySpreadConstraints?: Maybe<Array<Maybe<K8sPodTopologySpreadConstraints>>>;
  volumes?: Maybe<Array<Maybe<K8sPodvolumes>>>;
};

export type K8sPodStatus = {
  conditions?: Maybe<Array<Maybe<K8sPodConditions>>>;
  containerStatuses?: Maybe<Array<Maybe<K8sPodContainerStatus>>>;
  ephemeralContainerStatuses?: Maybe<Array<Maybe<K8sPodContainerStatus>>>;
  initContainerStatuses?: Maybe<Array<Maybe<K8sPodContainerStatus>>>;
  phase?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  hostIp?: Maybe<Scalars['String']>;
  podIp?: Maybe<Scalars['String']>;
  podIps?: Maybe<Array<Maybe<K8sPodIps>>>;
  nominatedNodeName?: Maybe<Scalars['String']>;
  qosClass?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
};

export type K8sPodTolerations = {
  id: Scalars['String'];
  effect?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  tolerationSeconds?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sPodTopologySpreadConstraints = {
  id: Scalars['String'];
  labelSelector?: Maybe<K8sPodAffinitySelector>;
  maxSkew?: Maybe<Scalars['Int']>;
  topologyKey?: Maybe<Scalars['String']>;
  whenUnsatisfiable?: Maybe<Scalars['String']>;
};

export type K8sPodVolumeDevices = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  devicePath?: Maybe<Scalars['String']>;
};

export type K8sPodVolumeMounts = {
  id: Scalars['String'];
  mountPath?: Maybe<Scalars['String']>;
  mountPropagation?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  subPath?: Maybe<Scalars['String']>;
  subPathExpr?: Maybe<Scalars['String']>;
};

export type K8sPodvolumes = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  awsElasticBlockStore?: Maybe<K8sAwsElasticBlockStore>;
  azureDisk?: Maybe<K8sAzureDisk>;
  azureFile?: Maybe<K8sAzureFile>;
  cephfs?: Maybe<K8sCephfs>;
  cinder?: Maybe<K8sCinder>;
  configMap?: Maybe<K8sVolumeConfigMap>;
  csi?: Maybe<K8sVolumeCsi>;
  downwardApi?: Maybe<K8sVolumeDownwardApi>;
  emptyDir?: Maybe<K8sVolumeEmptyDir>;
  ephemeral?: Maybe<K8sVolumeEphemeral>;
  fc?: Maybe<K8sVolumeFc>;
  flexVolume?: Maybe<K8sVolumeFlexVolume>;
  flocker?: Maybe<K8sVolumeFlocker>;
  gcePersistentDisk?: Maybe<K8sVolumeGcePersistentDisk>;
  gitRepo?: Maybe<K8sVolumeGitRepo>;
  glusterfs?: Maybe<K8sVolumeGlusterfs>;
  hostPath?: Maybe<K8sVolumeHostPath>;
  iscsi?: Maybe<K8sVolumeIscsi>;
  nfs?: Maybe<K8sVolumeNfs>;
  persistentVolumeClaim?: Maybe<K8sVolumePersistentVolumeClaim>;
  photonPersistentDisk?: Maybe<K8sVolumePhotonPersistentDisk>;
  portworxVolume?: Maybe<K8sVolumePortworxVolume>;
  projected?: Maybe<K8sVolumeProjected>;
  quobyte?: Maybe<K8sVolumeQuobyte>;
  rbd?: Maybe<K8sVolumeRbd>;
  scaleIo?: Maybe<K8sVolumeScaleIo>;
  secret?: Maybe<K8sVolumeSecret>;
  storageos?: Maybe<K8sVolumeStorageos>;
  vsphereVolume?: Maybe<K8sVolumeVsphereVolume>;
};

export type K8sRole = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  rules?: Maybe<Array<Maybe<K8sRule>>>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sRule = {
  id: Scalars['String'];
  apiGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
  nonResourceUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  resources?: Maybe<Array<Maybe<Scalars['String']>>>;
  resourceNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  verbs?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sSecret = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  data?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  immutable?: Maybe<Scalars['Boolean']>;
  stringData?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  type?: Maybe<Scalars['String']>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sService = {
  id: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  context?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  spec?: Maybe<K8sServiceSpec>;
  status?: Maybe<K8sServiceStatus>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sServiceAccount = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  automountServiceAccountToken?: Maybe<Scalars['Boolean']>;
  imagePullSecrets?: Maybe<Array<Maybe<K8sImagePullSecret>>>;
  secrets?: Maybe<Array<Maybe<K8sServiceAccountSecret>>>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sServiceAccountSecret = {
  id: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  fieldPath?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  resourceVersion?: Maybe<Scalars['String']>;
};

export type K8sServiceCondition = {
  id: Scalars['String'];
  lastTransitionTime?: Maybe<Scalars['String']>;
  observedGeneration?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sServiceLoadBalancer = {
  ingress?: Maybe<Array<Maybe<K8sServiceLoadBalancerIngress>>>;
};

export type K8sServiceLoadBalancerIngress = {
  id: Scalars['String'];
  hostname?: Maybe<Scalars['String']>;
  ip?: Maybe<Scalars['String']>;
  ports?: Maybe<Array<Maybe<K8sServiceLoadbalancerIngressPort>>>;
};

export type K8sServiceLoadbalancerIngressPort = {
  id: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Scalars['String']>;
};

export type K8sServiceSessionAffinityConfig = {
  clientIp?: Maybe<K8sServiceSessionAffinityConfigClientIp>;
};

export type K8sServiceSessionAffinityConfigClientIp = {
  timeoutSeconds?: Maybe<Scalars['Int']>;
};

export type K8sServiceSpec = {
  allocateLoadBalancerNodePorts?: Maybe<Scalars['Boolean']>;
  clusterIp?: Maybe<Scalars['String']>;
  clusterIps?: Maybe<Array<Maybe<Scalars['String']>>>;
  externalIps?: Maybe<Array<Maybe<Scalars['String']>>>;
  externalName?: Maybe<Scalars['String']>;
  externalTrafficPolicy?: Maybe<Scalars['String']>;
  healthCheckNodePort?: Maybe<Scalars['Int']>;
  internalTrafficPolicy?: Maybe<Scalars['String']>;
  ipFamilies?: Maybe<Array<Maybe<Scalars['String']>>>;
  ipFamilyPolicy?: Maybe<Scalars['String']>;
  loadBalancerClass?: Maybe<Scalars['String']>;
  loadBalancerIp?: Maybe<Scalars['String']>;
  loadBalancerSourceRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  ports?: Maybe<Array<Maybe<K8sServiceSpecPort>>>;
  publishNotReadyAddresses?: Maybe<Scalars['Boolean']>;
  selector?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  sessionAffinity?: Maybe<Scalars['String']>;
  sessionAffinityConfig?: Maybe<K8sServiceSessionAffinityConfig>;
  type?: Maybe<Scalars['String']>;
};

export type K8sServiceSpecPort = {
  id: Scalars['String'];
  appProtocol?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nodePort?: Maybe<Scalars['Int']>;
  port?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Scalars['String']>;
  targetPort?: Maybe<Scalars['String']>;
};

export type K8sServiceStatus = {
  conditions?: Maybe<Array<Maybe<K8sServiceCondition>>>;
  loadBalancer?: Maybe<K8sServiceLoadBalancer>;
};

export type K8sStorageClass = {
  id: Scalars['String'];
  context: Scalars['String'];
  apiVersion?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  metadata?: Maybe<K8sMetadata>;
  allowVolumeExpansion?: Maybe<Scalars['Boolean']>;
  allowedTopologies?: Maybe<Array<Maybe<K8sStorageClassAllowedTopology>>>;
  mountOptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  provisioner?: Maybe<Scalars['String']>;
  parameters?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  reclaimPolicy?: Maybe<Scalars['String']>;
  volumeBindingMode?: Maybe<Scalars['String']>;
  namespace?: Maybe<Array<Maybe<K8sNamespace>>>;
};

export type K8sStorageClassAllowedTopology = {
  id: Scalars['String'];
  matchLabelExpressions?: Maybe<Array<Maybe<K8sStorageClassAllowedTopologyMatchLabelExpression>>>;
};

export type K8sStorageClassAllowedTopologyMatchLabelExpression = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sVolumeClaimTemplate = {
  metadata?: Maybe<K8sVolumeClaimTemplateMetadata>;
  spec?: Maybe<K8sVolumeClaimTemplateSpec>;
};

export type K8sVolumeClaimTemplateMetadata = {
  annotations?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  clusterName?: Maybe<Scalars['String']>;
  creationTimestamp?: Maybe<Scalars['String']>;
  deletionGracePeriodSeconds?: Maybe<Scalars['Int']>;
  deletionTimestamp?: Maybe<Scalars['String']>;
  finalizers?: Maybe<Array<Maybe<Scalars['String']>>>;
  generateName?: Maybe<Scalars['String']>;
  generation?: Maybe<Scalars['Int']>;
  labels?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  ownerReferences?: Maybe<Array<Maybe<K8sVolumeOwnerReference>>>;
  resourceVersion?: Maybe<Scalars['String']>;
  selfLink?: Maybe<Scalars['String']>;
  metadataUid?: Maybe<Scalars['String']>;
};

export type K8sVolumeClaimTemplateSpec = {
  accessModes?: Maybe<Array<Maybe<Scalars['String']>>>;
  dataSource?: Maybe<K8sVolumeclaimTemplateDataSource>;
  dataSourceRef?: Maybe<K8sVolumeclaimTemplateDataSource>;
  resources?: Maybe<K8sPodResources>;
  selector?: Maybe<K8sPodAffinitySelector>;
  storageClassName?: Maybe<Scalars['String']>;
  volumeMode?: Maybe<Scalars['String']>;
  volumeName?: Maybe<Scalars['String']>;
};

export type K8sVolumeConfigMap = {
  defaultMode?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Maybe<K8sVolumeItem>>>;
  name?: Maybe<Scalars['String']>;
  optional?: Maybe<Scalars['Boolean']>;
};

export type K8sVolumeCsi = {
  driver?: Maybe<Scalars['String']>;
  fsType?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  nodePublishSecretRef?: Maybe<K8sVolumeSecretRefObj>;
  volumeAttributes?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
};

export type K8sVolumeDownwardApi = {
  defaultMode?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Maybe<K8sVolumeDownwardApiItems>>>;
};

export type K8sVolumeDownwardApiItems = {
  id: Scalars['String'];
  mode?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  fieldRef?: Maybe<K8sPodFieldRef>;
  resourceFieldRef?: Maybe<K8sPodResourceFieldRef>;
};

export type K8sVolumeEmptyDir = {
  medium?: Maybe<Scalars['String']>;
  sizeLimit?: Maybe<Scalars['String']>;
};

export type K8sVolumeEphemeral = {
  volumeClaimTemplate?: Maybe<K8sVolumeClaimTemplate>;
};

export type K8sVolumeFc = {
  fsType?: Maybe<Scalars['String']>;
  lun?: Maybe<Scalars['Int']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  targetWWNs?: Maybe<Array<Maybe<Scalars['String']>>>;
  wwids?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sVolumeFlexVolume = {
  driver?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  fsType?: Maybe<Scalars['String']>;
  secretRef?: Maybe<K8sVolumeSecretRefObj>;
  options?: Maybe<Array<Maybe<K8sKeyValueArray>>>;
};

export type K8sVolumeFlocker = {
  datasetName?: Maybe<Scalars['String']>;
  datasetUuid?: Maybe<Scalars['String']>;
};

export type K8sVolumeGcePersistentDisk = {
  fsType?: Maybe<Scalars['String']>;
  partition?: Maybe<Scalars['Int']>;
  pdName?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
};

export type K8sVolumeGitRepo = {
  directory?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['String']>;
};

export type K8sVolumeGlusterfs = {
  endpoints?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
};

export type K8sVolumeHostPath = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sVolumeIscsi = {
  chapAuthDiscovery?: Maybe<Scalars['Boolean']>;
  chapAuthSession?: Maybe<Scalars['Boolean']>;
  fsType?: Maybe<Scalars['String']>;
  initiatorName?: Maybe<Scalars['String']>;
  iqn?: Maybe<Scalars['String']>;
  iscsiInterface?: Maybe<Scalars['String']>;
  lun?: Maybe<Scalars['Int']>;
  portals?: Maybe<Array<Maybe<Scalars['String']>>>;
  readOnly?: Maybe<Scalars['Boolean']>;
  secretRef?: Maybe<K8sVolumeSecretRefObj>;
  targetPortal?: Maybe<Scalars['String']>;
};

export type K8sVolumeItem = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  mode?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
};

export type K8sVolumeNfs = {
  path?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  server?: Maybe<Scalars['String']>;
};

export type K8sVolumeOwnerReference = {
  id: Scalars['String'];
  ownerUid?: Maybe<Scalars['String']>;
  apiVersion?: Maybe<Scalars['String']>;
  blockOwnerDeletion?: Maybe<Scalars['Boolean']>;
  controller?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type K8sVolumePersistentVolumeClaim = {
  claimName?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
};

export type K8sVolumePhotonPersistentDisk = {
  fsType?: Maybe<Scalars['String']>;
  pdId?: Maybe<Scalars['String']>;
};

export type K8sVolumePortworxVolume = {
  fsType?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  volumeId?: Maybe<Scalars['String']>;
};

export type K8sVolumeProjected = {
  defaultMode?: Maybe<Scalars['Int']>;
  sources?: Maybe<Array<Maybe<K8sVolumeProjectedSources>>>;
};

export type K8sVolumeProjectedSources = {
  configMap?: Maybe<K8sVolumeConfigMap>;
  downwardApi?: Maybe<K8sVolumeProjectedSourcesDownwardApi>;
  secret?: Maybe<K8sVolumeConfigMap>;
  serviceAccountToken?: Maybe<K8sVolumeProjectedSourcesServiceAccountToken>;
};

export type K8sVolumeProjectedSourcesDownwardApi = {
  items?: Maybe<Array<Maybe<K8sVolumeDownwardApiItems>>>;
};

export type K8sVolumeProjectedSourcesServiceAccountToken = {
  audience?: Maybe<Scalars['String']>;
  expirationSeconds?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
};

export type K8sVolumeQuobyte = {
  group?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  registry?: Maybe<Scalars['String']>;
  tenant?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['String']>;
};

export type K8sVolumeRbd = {
  fsType?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  keyring?: Maybe<Scalars['String']>;
  monitors?: Maybe<Array<Maybe<Scalars['String']>>>;
  pool?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  secretRef?: Maybe<K8sVolumeSecretRefObj>;
  user?: Maybe<Scalars['String']>;
};

export type K8sVolumeScaleIo = {
  fsType?: Maybe<Scalars['String']>;
  gateway?: Maybe<Scalars['String']>;
  protectionDomain?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  secretRef?: Maybe<K8sVolumeSecretRefObj>;
  sslEnabled?: Maybe<Scalars['Boolean']>;
  storageMode?: Maybe<Scalars['String']>;
  storagePool?: Maybe<Scalars['String']>;
  system?: Maybe<Scalars['String']>;
  volumeName?: Maybe<Scalars['String']>;
};

export type K8sVolumeSecret = {
  defaultMode?: Maybe<Scalars['Int']>;
  optional?: Maybe<Scalars['Boolean']>;
  secretName?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<K8sVolumeItem>>>;
};

export type K8sVolumeSecretRefObj = {
  name?: Maybe<Scalars['String']>;
};

export type K8sVolumeStorageos = {
  fsType?: Maybe<Scalars['String']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  secretRef?: Maybe<K8sVolumeSecretRefObj>;
  volumeName?: Maybe<Scalars['String']>;
  volumeNamespace?: Maybe<Scalars['String']>;
};

export type K8sVolumeVsphereVolume = {
  fsType?: Maybe<Scalars['String']>;
  storagePolicyId?: Maybe<Scalars['String']>;
  storagePolicyName?: Maybe<Scalars['String']>;
  volumePath?: Maybe<Scalars['String']>;
};

export type K8sVolumeclaimTemplateDataSource = {
  apiGroup?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};
