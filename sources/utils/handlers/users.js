const User = require("../models/User");
const mongoose_conect = require("../../database/mongooes");
mongoose_conect.conect()
const createNew = (sender_id, cb) => {
  try {
    if (mongoose_conect.check_connect()) {
      throw new Error('*users.js Không kết nối được database-server');//go to catch()
    }
    User.findOne({ _id: sender_id }).exec((err, user) => {
      if (user) { 
        //console.log(user);
        return cb(null, false);//nếu đã tồn tại
      } else {
        var newUser = new User({//TODO: var newUser -> user
          _id: sender_id,
          type_typing: "khong",
          username: sender_id
        });
        newUser.save((err, res) => {
          if(err) console.log("#createNew()# save that bai");
          return cb(err, res);//thêm user thành công
        });
      }
      if (err) {
        //truong hop ket noi thanh cong nhưng database server bi ngat giữa chừng
        return cb("#H# Lỗi khi đang thực thi User.findOne() |database! *users.js: " + err, false);//send message to user
      }
    })
  } catch(error) {
    console.error(error.message);
    return cb("Lỗi không nối được đến database-server!", null);//send to mess-> user
  }
}
const updateTypeTyping = (typing, sender_id, cb) => {//trả ra code err: trùng, đã thêm
  if (mongoose_conect.check_connect()) {
    return cb("Lỗi không nối được đến database-server!", false);//send to mess-> user
  }
  User.findOne({ _id: sender_id }).exec((err, user) => {
    if(!err) {
      if(!user) {
        user = new User({
          _id: sender_id,
          type_typing: "khong",
          username: sender_id
        });
      }
      user.type_typing = typing;
      user.save(function(err, res) {
          if(!err) {
            return cb(err, res);
          }
          else {
            console.log("#updateTypeTyping()# save that bai");
          }
      });
    }else {
      return cb(err, false);//Loi findOne database
    }
  });
}
const getTypeTyping = (sender_id, cb) => {
  if (mongoose_conect.check_connect()) {
    return cb("Lỗi không nối được đến database-server!", false);//send to mess-> user
  }
  User.findOne({ _id: sender_id }).exec((err, user) => {
    if(!err) {
      if(!user) {
        user = new User({
          _id: sender_id,
          type_typing: "khong",
          username: sender_id
        });
        user.save(function(err, res) {
          if(!err) {
            return cb(err, "khong");
          }
          else {
            console.log("#updateCodeClass()# save that bai");
          }
        });
      }else {
        return cb(err, user.type_typing);
      }
    }else {
      return cb(err, false);
    }
  });
}
const updateUsername = (username, sender_id, cb) => {
  if (mongoose_conect.check_connect()) {
    return cb("Lỗi không nối được đến database-server!", false);//send to mess-> user
  }
  User.findOne({ _id: sender_id }).exec((err, user) => {
    if(!err) {
      if(!user) {
        user = new User({
          _id: sender_id,
          type_typing: "khong",
          username: sender_id,
        });
      }
      user.username = username;
      user.save(function(err, res) {
          if(!err) {//thành công
            return cb(err, res);//err === null, res == true;
          }
          else {
            console.log("#updateUsername()# save that bai");
          }
      });
    }else {
      return cb(err, false);//Loi findOne database
    }
  });
}
const getUsername = (sender_id, cb) => {
  if (mongoose_conect.check_connect()) {
    return cb("Lỗi không nối được đến database-server!", false);//send to mess-> user
  }
  User.findOne({ _id: sender_id }).exec((err, user) => {
    if(!err) {
      if(!user) {
        user = new User({
          _id: sender_id,
          type_typing: "khong",
          username: sender_id
        });
        user.save(function(err, res) {
          if(!err) {
            return cb(err, sender_id);//🧨vì username mặc định là sender_id nên thay vì get từ csdl thì lấy id trả lại (server cùi phải làm vậy :((
          }
          else {
            console.log("#getUsername()# save that bai");
          }
        });
      }else {
        return cb(err, user.username);
      }
    }else {
      return cb(err, false);
    }
  });
}
const updateCodeClass = (code_class, sender_id, cb) => {//code_class is array[]
  if (mongoose_conect.check_connect()) {
    return cb("Lỗi không nối được đến database-server!", false);//send to mess-> user
  }
  User.findOne({ _id: sender_id }).exec((err, user) => {
    if(!err) {
      if(!user) {
        user = new User({
          _id: sender_id,
          type_typing: "khong",
          username: sender_id
        });
      }
      //FIXME: check tồn tại
      code_class.forEach(element => {
        user.code_class.push({ code: element });//https://mongoosejs.com/docs/2.7.x/docs/embedded-documents.html
      });
      
      user.save(function(err, res) {
          if(!err) {
            return cb(err, res);
          }
          else {
            console.log("#updateCodeClass()# save that bai", err);
          }
      });
    }else {
      return cb(err, false);//Loi findOne database
    }
  });
}
const getCodeClass = (sender_id, cb) => {
  if (mongoose_conect.check_connect()) {
    return cb("Lỗi không nối được đến database-server!", false);//send to mess-> user
  }
  User.findOne({ _id: sender_id }).exec((err, user) => {
    if(!err) {
      if(!user) {
        user = new User({
          _id: sender_id,
          type_typing: "khong",
          username: sender_id
        });
        user.save(function(err, res) {
          if(!err) {
            return cb(err, null);//🧨 user chưa tồn tại thì không có mã lớp -> result = null
          }
          else {
            console.log("#getCodeClass()# save that bai");
          }
        });
      }else {
        return cb(err, user.code_class);
      }
    }else {
      return cb(err, false);
    }
  });
}
const web_user_getCodeClass = (username, cb) => {
  if (mongoose_conect.check_connect()) {
    return cb("Lỗi không nối được đến database-server!", false);//send to mess-> user
  }
  User.findOne({ username: username }).exec((err, user) => {
    if(!err) {
      if(!user) {
        return cb(err, null);
      }else {
        return cb(err, user.code_class);
      }
    }else {
      return cb(err, false);
    }
  });
}
module.exports = {
  createNew: createNew,
  updateTypeTyping, updateTypeTyping,
  updateCodeClass: updateCodeClass,
  getTypeTyping: getTypeTyping,
  updateUsername: updateUsername,
  getUsername: getUsername,
  getCodeClass: getCodeClass,
  web_user_getCodeClass: web_user_getCodeClass,
};