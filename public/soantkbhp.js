const listColumns = [
  'STT', 'MaMH', 'MaLop', 'TenMH', 'MaGV', //1->5
  'TenGV', 'SiSo', 'SoTc', 'ThucHanh', 'HTGD',//6->10
  'Thu', 'Tiet', 'CachTuan', 'PhongHoc', 'KhoaHoc', //11->15
  'HocKy', 'NamHoc', 'HeDT', 'KhoaQL', 'NBD', //16->20
  'NKT', 'GhiChu'//21, 22
];
const container = document.getElementById("container");
const start_data = document.getElementById("start-data");
//const TableSelect = document.getElementById('TableSelect');
const body_table  = document.getElementById('body-table');
const danhsach_selected = document.getElementById('danhsach-selected');
const info_danhsach_selected = document.getElementById('info-danhsach-selected');
const status_text_info =document.getElementById('status-text-info');
var data_tkb = '';//Object dữ liệu từ file excel tất cả môn học
var MyCodeClassList = [];//Danh sách {info} lớp học đã chọn -> đã check trùng lịch...
var listElementsCheckBox = [];//Mảng các element-checbox-Loc

//push elementCheckBox to array
listColumns.forEach(element => {
  ////set size ALL BOX text-input 
  //document.getElementById(`cell-${element}`).size = 10;
  listElementsCheckBox.push(document.getElementById(element));
});

//set envent show/hide for elementCheckBoxs
listElementsCheckBox.forEach(element => {
  element.addEventListener('click', ()=>{
    ShowOrHideCol(element);
  });
});

function ShowOrHideCol(elementCheckBox) {
  //=>if checked ? show:hide -> elements
  var ShowOrHide = 'none';//hide
  if (elementCheckBox.checked) ShowOrHide = '';//show
  var listCell = document.getElementsByName(`cell-${elementCheckBox.id}`); 
  listCell.forEach(element =>{
    element.style.display  = ShowOrHide;
  });
}

function ReadJsonFile(file) {
  return new Promise(
    function (resolve) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
          resolve(rawFile.responseText);
        }//else resolve(null);
      }
      rawFile.send(null);
    }
  )
}
function GetInfoClassByMaLop(malop) {
  var infoLop = '';
  if(data_tkb){
    for (const datalop of data_tkb) {
      if (datalop.MaLop == malop) {
        infoLop = datalop;
        break;
      }
    }
  }else{
    return false;
  }
  return infoLop;
}
function InnerData2List(info_lop) {
  //innerHTML ra list danh sách
  // danhsach_selected: List
  // info_danhsach_selected: Info for List
  //<a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#list-home" role="tab">Demo1</a>
  //<div class="tab-pane fade" id="list-home" role="tabpanel">Demo1</br>Demo1</br>Demo1</br>Demo1</div>
  var id = info_lop.MaLop;
  id = id.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");//vì dùng để tạo id nên phải xóa hết các kí tự đặc biệt "."...
  //console.log(id)
  danhsach_selected.innerHTML += 
  `<a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#${id}" role="tab">${info_lop.TenMH}-${info_lop.MaLop}</a>`;
  info_danhsach_selected.innerHTML +=
  `<div class="tab-pane fade" id="${id}" role="tabpanel">${info_lop.TenMH}</br>${info_lop.MaLop}</div>`;
}
function OutnerData2List(malop) {
  var id = malop;
  id = id.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");//vì dùng để tạo id nên phải xóa hết các kí tự đặc biệt "."...
  document.getElementById(id).remove();//remove item khỏi info-danhsach-selected
  var i_danhsach_selected = document.querySelectorAll(`a[href='#${id}']`);//remove item khỏi danhsach-selected
  i_danhsach_selected[0].remove();
}

function CheckAndAddClass2ListChon(checkboxChon) {
  var malop = checkboxChon.getAttribute('value-malop');
  if (checkboxChon.checked) {
    var info_lop = GetInfoClassByMaLop(malop);
    //FIXME: check trùng rồi mới add vào MyCodeClassList[]
    MyCodeClassList.push(malop);
    InnerData2List(info_lop);
  }else{
    OutnerData2List(malop);
    MyCodeClassList = MyCodeClassList.filter(item => item !== malop);
  }
}

async function Start() {
  //TODO:tạm ẩn để đợi xử lý xong dữ liệu
  start_data.style.display = "";
  container.style.display = "none";
  // if(MyCodeClassList !== null){
  //   status_text_info.innerText = "🏷Thông tin môn học:";
  // }else{
  //   status_text_info.innerText = "📂Chưa có môn học nào được chọn";
  // }
  //--------------------------------
  //FIXME: Chưa hoàn thành tính năng add file excel của user
  var jsondata = await ReadJsonFile("./tkbhp.json");
  var data_json = JSON.parse(jsondata);
  data_tkb = data_json.data;

  var i_data, cell_data;
  var dataTable ='';
  var lineTable ='';
  //TODO:handle data table
  var l = data_tkb.length;
  for (let index = 0; index < l; index++) {
    i_data = data_tkb[index];
    if (i_data.TenMH && i_data.TenMH !== "TÊN MÔN HỌC") {//check data json môn học unknown - không tồn tại
      //Tạo dòng
      //mỗi checkboxChon sẽ mang "value-malop" chính là "mã lớp" tương ứng với dòng nó
      lineTable =`<td name="cell-Chon"><input type="checkbox" name="cell-Chon-CheckBox" class="form-check-input" value-malop="${i_data.MaLop}"></td>`;    
      for (const element of listColumns) {
        //https://stackoverflow.com/questions/922544/using-variable-keys-to-access-values-in-javascript-objects
        //console.log((data_tkb[index])[element]);
        cell_data = i_data[element];
        if(!cell_data) cell_data = '';//check data unknown
        lineTable += `<td name="cell-${element}">${cell_data}</td>`;
      }
      //thêm DÒNG vào BẢNG sau khi xử lý xong
      dataTable +=`<tr>${lineTable}</tr>`;
    }
  }
  //TODO:hiện site lại sau khi xử lý xong
  start_data.style.display = "none";
  container.style.display = "";
  //đưa dữ liệu đã xử lý vào bảng
  body_table.innerHTML = dataTable; 

  //TODO:add event select for Checkbox Chon
  var listCellChon = document.getElementsByName("cell-Chon-CheckBox");
  //Như data đã xử lý ở trên mỗi checkboxChon sẽ mang "value-malop" chính là "mã lớp" tương ứng với dòng của nó
  listCellChon.forEach(checkboxChon => {
    checkboxChon.addEventListener('click', ()=>{
      CheckAndAddClass2ListChon(checkboxChon);
    })
  });
  
  //TODO:check all filter to Show Or Hide CheckBox Loc
  listElementsCheckBox.forEach(element => {
    ShowOrHideCol(element);
  });
}
Start();