let server = require("./server.js");
var XLSX = require("xlsx");
var workbook = XLSX.readFile("TKB_KHDT_04-08-2020_1596503345_HK_1_NH2020.xlsx");

module.exports.get_Malop = (index) => {
  var dbo = server.client.db("dovanbot");
  dbo.collection("user").findOne({ _id: "123456" }, function (err, result) {
    if (err) throw err;
    //console.log(result);
    //console.log(result._id);
    //var resultt = result._id;
    if (result == null) {
      //console.log("false -> add");
      them_id(sender_psid);
    } else {
      console.log("OK tHAOTAC EXCEL");
    }
  });
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name]; //trang tinh'
  var address_of_cell = index;
  var desired_cell = worksheet[address_of_cell];
  var desired_value = desired_cell ? desired_cell.v : undefined;
  let response;
  response = {
    data: {
      malop: desired_value,
    },
  };
  return response;
};

module.exports.set_Code_Class = (CODE_CLASS) => {
  var code_suscess_data = [];
  var response = {};
  var code_error = [];
  var n = CODE_CLASS.length;
  for (var index = 0; index < n; index++) {
    console.log(CODE_CLASS[index]);
  }

  response = {
    data: {
      code_suscess: code_suscess_data,
    },
    error: {
      code_error: code_error,
    },
  };
  return response;
};
