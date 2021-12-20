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

export type K8sConditions = {
  id: Scalars['String'];
  lastHeartbeatTime?: Maybe<Scalars['String']>;
  lastTransitionTime?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type K8sLabel = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sMetadata = {
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
};

export type K8sNamespaceSpec = {
  finalizers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sNamespaceStatus = {
  phase?: Maybe<Scalars['String']>;
  conditions?: Maybe<Array<Maybe<K8sConditions>>>;
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
};

export type K8sNodeAddress = {
  id?: Maybe<Scalars['String']>;
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
  id?: Maybe<Scalars['String']>;
  effect?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  timeAdded?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type K8sNodeVolumesAttached = {
  id?: Maybe<Scalars['String']>;
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
