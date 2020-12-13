module.exports.ChangeTypeTyping = function (sender_psid, typing) {
  var dbo = client.db("dovanbot");
  // var myquery = { _id: sender_psid };
  // var newvalues = { $set: { type_typing: typing } };
  dbo
    .collection("user")
    .updateOne(
      { _id: sender_psid },
      { $set: { type_typing: typing } },
      function (err, res) {
        if (err) throw err;
        console.log("Up date typeTyping thanhcong");
      }
    );
}