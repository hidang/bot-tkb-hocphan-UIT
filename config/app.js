//var dbHost = process.env.URI_MONGODB; //|| "localhost";
module.exports = {
  name: "dovanbot",
  title: "dovanbot",
  http: {
    host: "localhost",
    port: 3000
  },
  author: "hidang",
  version: "2.0",
  db: {
    connectionUri: 'hidangdeptrai',//process.env.URI_MONGODB,//
    params: {},
    collections: ["user"]
  }
};
