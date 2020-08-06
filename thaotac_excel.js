const XLSX = require("xlsx");
const workbook = XLSX.readFile(
  "TKB_KHDT_04-08-2020_1596503345_HK_1_NH2020.xlsx"
);

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

module.exports.set_Code_Class = (code_data, n) => {
  var code_suscess = [];
  var code_error = [];
  //xu ly ne
  for (let index = 0; index < n; index++) {
    console.log(code_data[index]);
  }
  let response;
  response = {
    data: {
      code_suscess: code_suscess,
    },
    error: {
      code_error: code_error,
    },
  };
  return response;
};
