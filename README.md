# Rancher2 API Library
This project provides access to a subset of the Rancher 2.x API in a highly opinionated fashion, intended primarily to address deployment concerns to Rancher2 and K8S within the @endeavorb2b stack.

## Usage

This library can be included in your project to allow native access to the Rancher2 API methods via `node-fetch`. Fetch allows both backend and browser access to the API, but does **not** obscure credentials -- beware of this if building a browser application using this library.

All methods require at *minimum* a Rancher 2.x v3 API URL (such as `https://cows.my-doma.in/api/v3`) and a Rancher 2.x API key. While scoped keys are supported, this library assumes a hard dependancy of knowing the cluster ID at runtime. The `Bearer Token` format should be passed to the library methods (`username:secretKey`.)

## Methods
- [Cluster.list()](#cluster.list)
- [Ingress.create()](#ingress.create)
- [Ingress.list()](#ingress.list)
- [Ingress.update()](#ingress.update)
- [Namespace.create()](#namespace.create)
- [Namespace.list()](#namespace.list)
- [Project.create()](#project.create)
- [Project.list()](#project.list)
- [Workload.create()](#workload.create)
- [Workload.list()](#workload.list)
- [Workload.update()](#workload.update)

----

## Cluster
Supported: `List`.

#### cluster.list
Parameters: `(uri, token)`

Returns an array of cluster objects ({ id, name }).

## Project
Supported: `List` and `Create`.

#### project.list
Parameters: `({ uri, token, clusterId })`

Returns an array of project objects ({ id, name }).

#### project.create
Parameters: `({ uri, token, clusterId, name })`

Creates and returns a project object ({ id, name }).

## Namespace
Supported: `List` and `Create`.

#### namespace.list
Parameters: `({ uri, token, clusterId })`
Returns an array of namespace objects ({ id, name }).

#### namespace.create
Parameters: `({ uri, token, clusterId, projectId, name })`

Creates and returns a namespace object ({ id, name }) within a project.

## Workload
Supported: `List`, `Create`, and `Update`.

#### workload.list
Parameters: `({ uri, token, projectId })`

Returns an array of workload objects ({ id, deploymentId, name }).

#### workload.create
Parameters: `({ uri, token, projectId, namespaceId, name, deploymentConfig, containers })`

Creates and returns a workload object ({ id, deploymentId, name, ... }) within a project+namespace.

`deploymentConfig`, if not specified, will default to the following:
```js
{
  maxSurge: 1,
  maxUnavailable: 0,
  minReadySeconds: 0,
  progressDeadlineSeconds: 600,
  revisionHistoryLimit: 10,
  strategy: 'RollingUpdate',
}
```

`containers`, if not specified or without a valid container definition, will default to the following:
```js
[{
  env: [],
  image: 'busybox:latest',
  imagePullPolicy: 'IfNotPresent',
  name,
  entrypoint: ['top'],
  securityContext: {
    allowPrivilegeEscalation: false,
    capabilities: {},
    privileged: false,
    procMount: 'Default',
    readOnlyRootFilesystem: false,
    runAsNonRoot: false,
  },
  stdin: true,
  terminationMessagePath: '/dev/termination-log',
  terminationMessagePolicy: 'File',
  tty: true,
}]
```

#### workload.update
Parameters: `({ uri, token, projectId, workloadId, deploymentConfig, containers })`

Updates and returns a workload object ({ id, deploymentId, name, ... }) within a project+namespace.

`deploymentConfig`, if not specified, will default to the following:
```js
{
  maxSurge: 1,
  maxUnavailable: 0,
  minReadySeconds: 0,
  progressDeadlineSeconds: 600,
  revisionHistoryLimit: 10,
  strategy: 'RollingUpdate',
}
```

----

## Contributing

Contributions are always welcome -- if you would like access to another module or would like to include support for some other feature of the Rancher2 API, please submit a pull request.

To get started, pull this repository and execute `yarn && yarn start` from the project root.

## Resources

- [Rancher 2.x API Documentation](https://rancher.com/docs/rancher/v2.x/en/api/)
- [@endeavorb2b/rancher2cli](https://github.com/endeavorb2b/rancher2cli)<br>A CLI implementation of this library, suitable for use via TravisCI or other CI/CD environs.
