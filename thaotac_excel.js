//var server = require("./server.js");
var XLSX = require("xlsx");
var workbook = XLSX.readFile("TKB_KHDT_04-08-2020_1596503345_HK_1_NH2020.xlsx");

module.exports.get_Malop = (index) => {
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

module.exports.set_Code_Class = (CODE_CLASS, client) => {
  var dbo = client.db("dovanbot");
  var code_suscess_data = [];
  var response = {};
  var code_error = [];
  var n = CODE_CLASS.length;
  for (var index = 0; index < n; index++) {
    //console.log(CODE_CLASS[index]);
    dbo
      .collection("data_class")
      .findOne({ Field_1: CODE_CLASS[index] }, function (err, result) {
        if (err) throw err;
        if (result != null) {
          //console.log("OK tHAOTAC EXCEL");
          code_suscess_data.push(result);
          console.log(result);
          //code_suscess_data.push(CODE_CLASS[index]);
        } else {
          console.log("kiem khong thay database");
        }
      });
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
