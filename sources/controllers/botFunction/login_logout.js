function LOGIN(sender_psid) {
  var dbo = client.db("dovanbot");
  dbo.collection("user").findOne({ _id: sender_psid }, function (err, result) {
    if (err) throw err;
    //console.log(result);
    ////USERNAME///
    if (result.username == null) {
      //chua login
      // console.log("result = null");
      let response;
      response = {
        recipient: {
          id: sender_psid,
        },
        message: {
          text: "✏ Nhập/Tạo username của bạn: ",
        },
      };
      callSendAPI("messages", response); // Sends the response message
      ChangeTypeTyping(sender_psid, "input_username");
    } else {
      if (result.password == null) {
        let response;
        response = {
          recipient: {
            id: sender_psid,
          },
          message: {
            text:
              "Bạn đã đăng nhập với username: " +
              result.username +
              ", Nhưng chưa đặt password, xin nhập ✏ password:",
          },
        };
        ChangeTypeTyping(sender_psid, "input_password");
        callSendAPI("messages", response); // Sends the response message}
      } else {
        //da login
        let response;
        response = {
          recipient: {
            id: sender_psid,
          },
          message: {
            text: "Bạn đã đăng nhập với username: " + result.username,
          },
        };
        callSendAPI("messages", response); // Sends the response message}
      }
    }
  });
}
function LOGOUT(sender_psid) {
  CHUAHOANTHANH(sender_psid);
}