const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/*
For list of all options
https://mongoosejs.com/docs/connections.html
{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}
*/

// https://stackoverflow.com/questions/16226472/mongoose-autoreconnect-option
module.exports = config => {
  mongoose.connect(config.db, {
    autoReconnect: true,
    useNewUrlParser: true,
    keepAlive: true,
    reconnectInterval: 5000
  });
  mongoose.connection.on('connected', () => {
    console.log(`[app status] connected to ${config.db}`);
  });

  mongoose.connection.on('reconnected', () => {
    console.log(`[app status] reconnected to ${config.db}`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log(`[app error] disconnected from ${config.db}`);
  });
  mongoose.connection.on('error', () => {
    throw new Error(`[app error] unable to connect to database: ${config.db}`);
  });
};
