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