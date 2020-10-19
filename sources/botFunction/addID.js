function them_id(sender_psid) {
  var dbo = client.db("dovanbot");
  var myobj = {
    _id: sender_psid,
    type_typing: "input_khong",
    username: null,
    password: null,
    code_class: null,
  };
  dbo.collection("user").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("DA them_id: " + sender_psid + " thanh cong! ()them_id");
  });
}
module.exports.FINDtoADDID = function(sender_psid) {
  var dbo = client.db("dovanbot");
  dbo.collection("user").findOne({ _id: sender_psid }, function (err, result) {
    if (err) throw err;
    //console.log(result);
    //console.log(result._id);
    //var resultt = result._id;
    if (result == null) {
    //console.log("false -> add");
    them_id(sender_psid);
    }
  });
}