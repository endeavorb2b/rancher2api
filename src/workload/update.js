const { validate, put } = require('../common');

const configure = config => config || {
  maxSurge: 1,
  maxUnavailable: 0,
  minReadySeconds: 0,
  progressDeadlineSeconds: 600,
  revisionHistoryLimit: 10,
  strategy: 'RollingUpdate',
};

module.exports = async ({
  uri,
  token,
  projectId,
  workloadId,
  deploymentConfig,
  containers = [],
}) => {
  validate({
    uri,
    token,
    projectId,
    workloadId,
    containers,
  });
  const url = `${uri}/project/${projectId}/workloads/${workloadId}`;
  const payload = {
    deploymentConfig: configure(deploymentConfig),
    containers,
  };
  return put(url, token, payload);
};
