module.exports.Change_username = function (sender_psid, typing) {
  var dbo = client.db("dovanbot");
  // var myquery = { _id: sender_psid };
  // var newvalues = { $set: { type_typing: typing } };
  dbo
    .collection("user")
    .updateOne({ _id: sender_psid }, { $set: { username: typing } }, function (
      err,
      res
    ) {
      if (err) throw err;
      console.log("Up date username thanhcong");
    });
}