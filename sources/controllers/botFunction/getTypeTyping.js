module.exports.getTypeTyping = function (sender_psid, callback) {
  var dbo = client.db("dovanbot");
  dbo.collection("user").findOne({ _id: sender_psid }, function (err, result) {
    if (err) throw err;
    //console.log(result);
    //console.log(result._id);
    //var resultt = result._id;
    if (result == null) {
      console.log(
        "#ERROR ()handleMessage INPUT SERVER luc STARTed id_user: " +
          sender_psid
      );
    } else {
      //console.log(result.type_typing);
      return callback(result);
      //console.log(result.type_typing);
    }
  });
};