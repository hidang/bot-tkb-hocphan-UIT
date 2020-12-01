const mongoose = require("mongoose");
function conect() {
  mongoose.connect(require("../../config/app").db.connectionUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}
module.exports = {
  conect: conect,
};