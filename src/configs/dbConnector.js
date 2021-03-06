const mongoose = require('mongoose');

module.exports = server => {
  const db = {
    user: process.env.PBLOG_DB_USERNAME,
    pass: process.env.PBLOG_DB_PASSWORD,
    uri: process.env.PBLOG_DB_URI
  };
  mongoose.set('useFindAndModify', false);
  mongoose.Promise = global.Promise;
  let connection;
  if (process.env.NODE_ENV === 'production') {
    connection = mongoose.connect(`mongodb+srv://${db.user}:${db.pass}@${db.uri}?retryWrites=true&w=majority`, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } else {
    connection = mongoose.connect(`mongodb://${db.user}:${db.pass}@${db.uri}?authSource=admin`, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  connection.then(
    () => {
      console.log("Successfully connected to database");
    },
    err => {
      console.error(err);
      server.close(() => {
        console.error("closing server due to failed connection to database");
        process.exit(0);
      });
      setTimeout(() => {
          console.error('Could not close connections in time, forcefully shutting down');
          process.exit(1);
      }, 10000);
    });
};
