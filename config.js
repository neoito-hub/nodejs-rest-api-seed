module.exports = {
  prod: {
    port: 3030,
    configName: 'prod',
    db: 'mongodb://localhost/dummy',
    secret: process.env.SECRET
  },
  dev: {
    port: 3040,
    configName: 'dev',
    db: 'mongodb://localhost/dummy',
    secret: 'secret'
  },
  test: {
    port: 3050,
    configName: 'test',
    db: 'mongodb://localhost/dummy',
    secret: 'secret'
  }
};
