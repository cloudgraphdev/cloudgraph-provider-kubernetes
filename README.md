# CloudGraph Kubernetes Provider

Scan cloud infrastructure via the [K8s SDK](https://github.com/kubernetes-client/javascript)

<!-- toc -->
- [Docs](#docs)
- [Install](#install)
- [Authentication](#authentication)
- [Supported Services](#supported-services)
<!-- tocstop -->

# Docs

⭐ [CloudGraph Readme](https://github.com/cloudgraphdev/cli)  

💻 [Full CloudGraph Documentation Including k8s Examples](https://docs.cloudgraph.dev)


## Install

Install the k8s provider in CloudGraph

```console
cg init k8s
```

## Authentication

Authenticate the CloudGraph k8s Provider any of the following ways:

- Set the `KUBECONFIG` env variable pointing to your Kubernetes config file (or use the default location for your OS)



## Supported Services

| Service                      | Relations          |
| ---------------------------- | ------------------ |
| cronJob                      | namespace          |
| deployment                   | namespace          |
| ingress                      | namespace          |
| job                          | namespace          |
| namespace                    | ALL SERVICES       |
| networkPolicy                | namespace          |
| node                         | namespace          |
| persistentVolume             | namespace          |
| persistentVolumeClaim        | namespace          |
| pod                          | namespace          |
| role                         | namespace          |
| secret                       | namespace          |
| service                      | namespace          |
| serviceAccount               | namespace          |
| storageClass                 | namespace          |


## Development

Please see the [CONTRIBUTING.md](https://github.com/cloudgraphdev/cli/blob/master/CONTRIBUTING.md) file in CloudGraph CLI for details.

Install all the dependencies:

```
yarn
```

Generate types and compile:

```
yarn build
```
