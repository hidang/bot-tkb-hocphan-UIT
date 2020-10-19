module.exports.Change_password = function (sender_psid, typing) {
  var dbo = client.db("dovanbot");
  // var myquery = { _id: sender_psid };
  // var newvalues = { $set: { type_typing: typing } };
  dbo
    .collection("user")
    .updateOne({ _id: sender_psid }, { $set: { password: typing } }, function (
      err,
      res
    ) {
      if (err) throw err;
      console.log("Up date password thanhcong");
    });
}