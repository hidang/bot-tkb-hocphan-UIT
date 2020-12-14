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
    connectionUri: process.env.URI_MONGODB,//'hidangdeptrai',//
    params: {},
    collections: ["user"]
  },
  fb: {
    VERIFY_TOKEN: process.env.VALIDATION_TOKEN,
    PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
  },
};
