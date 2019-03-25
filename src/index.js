const cluster = require('./cluster');
const ingress = require('./ingress');
const namespace = require('./namespace');
const project = require('./project');
const workload = require('./workload');

module.exports = {
  cluster,
  ingress,
  namespace,
  project,
  workload,
};
