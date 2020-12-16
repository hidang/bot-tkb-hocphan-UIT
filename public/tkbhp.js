const btn = document.getElementById('submit')
const codeclass_input = document.getElementById('codeclass-input');
const alert_error = document.getElementById('alert-error');

if(codeclass_string){
  var codeclass_array = codeclass_string.split(",").map(String);
  //console.log(array);
  var code_string_line = '';
  codeclass_array.map(element => {
    code_string_line += element + '\n';
  });
}else {
  var codeclass_array = '';
  var code_string_line = '';
}
codeclass_input.value = code_string_line;
btn.addEventListener('click', () => start(codeclass_array));

function KiemTraTonTai(codeclass_array) {
  
}


function start(codeclass_array) {
  console.log(codeclass_array);
  if(!codeclass_array) {
    return BaoLoi('Danh sách của bạn rỗng hoặc username không tồn tại!');
  }

  KiemTraTonTai(codeclass_array);
}

function BaoLoi(err) {
  alert_error.innerHTML = err;
  alert_error.style.display = 'block';
}

start();