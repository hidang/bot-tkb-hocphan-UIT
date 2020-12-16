const btn = document.getElementById('submit')
const codeclass_input = document.getElementById('codeclass-input');
const alert_error = document.getElementById('alert_error');
//console.log(codeclass_string);
var codeclass_array = codeclass_string.split(",").map(String);
//console.log(array);
var code_string_line = '';
codeclass_array.map(element => {
  code_string_line += element + '\n';
});
codeclass_input.value = code_string_line;