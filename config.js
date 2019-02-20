module.exports = {
  prod: {
    port: 3030,
    configName: 'prod',
    db: 'mongodb://localhost/dummy'
  },
  dev: {
    port: 3040,
    configName: 'dev',
    db: 'mongodb://localhost/dummy'
  },
  test: {
    port: 3050,
    configName: 'test',
    db: 'mongodb://localhost/dummy'
  }
};
