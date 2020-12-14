const FB_API = require('../../useAPI/FB_API');
module.exports = (sender_psid) => {
  let response;
  response = {
    //"text": `Xin chào "${{user_full_name}}!", Bạn cần làm gì?`,
    //"text":"What do you want to do next?",
    recipient: {
      id: sender_psid,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text:
            "Chat bot với 2 tính năng chính:\n" +
            "📌 1: Tìm kiếm và lưu danh sách mã lớp học để tạo tkb đkhp UIT.\n" +
            "📌 2: Xuất hình ảnh tkb từ danh sách mã môn học mà bạn đã nhập vào.\n" +
            "👇 Lựa chọn các chức năng tại menu góc dưới nhé.\n" +
            "📦 Trang web liên kết sẽ sử dụng cùng cơ sở dữ liệu với CHATBOT nên chỉ cần nhập username vào web là có thể xem tkb của bạn <3 \n" +
            "bạn có thể xem hoặc thay đổi username tại menu.\n",
          buttons: [
            {
              type: "web_url",
              url: require('../../../config/app').web.uri,
              title: "📎Trang web liên kết",
            },
          ],
        },
      },
    },
  };
  FB_API.callSendAPI("messages", response);
}