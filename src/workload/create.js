const { validate, post } = require('../common');

// Ensure minimum configs are met.
const configure = config => config || {
  maxSurge: 1,
  maxUnavailable: 0,
  minReadySeconds: 0,
  progressDeadlineSeconds: 600,
  revisionHistoryLimit: 10,
  strategy: 'RollingUpdate',
};
const containerize = (containers = [], name) => {
  if (Array.isArray(containers) && containers[0].image) return containers;
  return [{
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
  }];
};

module.exports = async ({
  uri,
  token,
  projectId,
  namespaceId,
  name,
  deploymentConfig,
  containers = [],
}) => {
  validate({
    uri,
    token,
    projectId,
    name,
    namespaceId,
  });
  const url = `${uri}/project/${projectId}/workloads`;
  const payload = {
    name,
    namespaceId,
    projectId,
    deploymentConfig: configure(deploymentConfig),
    containers: containerize(containers, name),
  };
  const { id, name: Name } = await post(url, token, payload);
  return { id, name: Name };
};
