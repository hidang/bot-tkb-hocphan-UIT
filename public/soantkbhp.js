const listColumns = [//22
  'STT', 'MaMH', 'MaLop', 'TenMH', 'MaGV',
  'TenGV', 'SiSo', 'SoTc', 'ThucHanh', 'HTGD',
  'Thu', 'Tiet', 'CachTuan', 'PhongHoc', 'KhoaHoc',
  'HocKy', 'NamHoc', 'HeDT', 'KhoaQL', 'NBD',
  'NKT', 'GhiChu'
];
const container = document.getElementById('container');
const start_data = document.getElementById('start-data');
//const TableSelect = document.getElementById('TableSelect');
const body_table  = document.getElementById('body-table');
const danhsach_selected = document.getElementById('danhsach-selected');
const info_danhsach_selected = document.getElementById('info-danhsach-selected');
//const status_text_info =document.getElementById('status-text-info');
const show_list_malop = document.getElementById('show-list-malop');
const show_TongTC = document.getElementById('show-TongTC');

var data_tkb = '';//Object dữ liệu từ file excel tất cả môn học
var MyCodeClassList = [];//Danh sách {MaMH} các lớp học đã chọn -> đã check trùng lịch...
var MyInfoClassList = [];//Danh sách chứa {info} các lớp học đã chọn
var listElementsCheckBox = [];//Mảng các element-checbox-Loc
var TongTc = 0;//số tính chỉ của danh sách đang chọn

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
//---------------------------------------------------------------------------------------------------------------
function ReadJsonFile(file) {//return Promise resolve -> data in file json
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
function GetInfoClassByMaLop(malop) {//return object info_lop 
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
function ShowOrHideCol(elementCheckBox) {
  //=>if checked ? show:hide -> elements
  var ShowOrHide = 'none';//hide
  if (elementCheckBox.checked) ShowOrHide = '';//show
  var listCell = document.getElementsByName(`cell-${elementCheckBox.id}`); 
  listCell.forEach(element =>{
    element.style.display  = ShowOrHide;
  });
}
function handle_show_list_malop() {
  var list_malop_show = '';
  MyCodeClassList.forEach(element => {
    list_malop_show += `${element}</br>`;
  });
  show_list_malop.innerHTML = list_malop_show;
}
function InnerData2List(info_lop) {//add codeclass to MyCodeClassList and Inner Data to site
  //innerHTML ra list danh sách
  // danhsach_selected: List
  // info_danhsach_selected: Info for List
  //<a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#list-home" role="tab">Demo1</a>
  //<div class="tab-pane fade" id="list-home" role="tabpanel">Demo1</br>Demo1</br>Demo1</br>Demo1</div>
  MyInfoClassList.push(info_lop);
  MyCodeClassList.push(info_lop.MaLop);
  var id = info_lop.MaLop;
  id = id.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");//vì dùng để tạo id nên phải xóa hết các kí tự đặc biệt "."...
  //console.log(id)
  danhsach_selected.innerHTML += 
  `<a class="list-group-item-success mt-1" data-bs-toggle="list" href="#${id}" role="tab" style="text-decoration: none;border-style: solid;">${info_lop.TenMH}</a>`;
  info_danhsach_selected.innerHTML +=
  `<div class="tab-pane fade" id="${id}" role="tabpanel">
${info_lop.TenMH}</br>${info_lop.MaLop}</br>${info_lop.Thu}</br>${info_lop.Tiet}</br>${info_lop.TenGV}</br>
<button type="button" class="btn btn-danger" onclick="DeleteMonHoc('${info_lop.MaLop}')">Bỏ chọn môn học này</button>
</div>`;
  handle_show_list_malop();
  //handle_show_TongTC
  if(info_lop.SoTc !== undefined) TongTc += parseInt(info_lop.SoTc);
  show_TongTC.innerHTML = TongTc;
}
function OutnerData2List(info_lop) {//remove codeclass to MyCodeClassList and Data to site
  MyInfoClassList = MyInfoClassList.filter(item => item.MaLop !== info_lop.MaLop);//remove
  MyCodeClassList = MyCodeClassList.filter(item => item !== info_lop.MaLop);//remove
  var id = info_lop.MaLop;
  id = id.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");//vì dùng để tạo id nên phải xóa hết các kí tự đặc biệt "."...
  document.getElementById(id).remove();//remove item khỏi info-danhsach-selected
  //https://stackoverflow.com/questions/10572735/javascript-getelement-by-href
  var i_danhsach_selected = document.querySelectorAll(`a[href='#${id}']`);//remove item khỏi danhsach-selected
  i_danhsach_selected[0].remove();//mảng này thì chắc chắn chỉ 1pt duy nhất vì href được tạo từ id mà :>
  handle_show_list_malop();
  //handle_show_TongTC
  if(info_lop.SoTc !== undefined) TongTc -= parseInt(info_lop.SoTc);
  show_TongTC.innerHTML = TongTc;
}
function DeleteMonHoc(malop) {
  //https://stackoverflow.com/questions/6267816/getting-element-by-a-custom-attribute-using-javascript
  var checkBoxChon =  document.querySelector(`input[value-malop="${malop}"]`);
  var info_lop = GetInfoClassByMaLop(malop);//FIXME: có thể get từ mảng MyInfoClassList[];
  checkBoxChon.checked = false;
  OutnerData2List(info_lop);
}
function CheckAndAddClass2ListChon(checkboxChon) {
  var malop = checkboxChon.getAttribute('value-malop');
  var info_lop = GetInfoClassByMaLop(malop);
  if (checkboxChon.checked) {
    //FIXME: check trùng rồi mới add vào InnerData2List MyCodeClassList[]
    var err = CheckTrungThuTiet(info_lop);
    if (!err) {
      InnerData2List(info_lop);
    }else{
      checkboxChon.checked = false;
      ShowErrorByAlert(err);
    }
  }else{
    OutnerData2List(info_lop);
  }
}
function ShowErrorByAlert(err) {
  alert("Lỗi: " + err);
}
function CheckTrungThuTiet(input_lop) {//return false -> không bị trùng | err
  if(MyInfoClassList){
    var ThuTrung = [];
    console.log(input_lop.Thu)
    if(input_lop.Thu != '*' & input_lop.Thu != '' & input_lop.Tiet != '*' & input_lop.Tiet != ''){
      MyInfoClassList.forEach(e_lop => {
        if (e_lop.Thu === input_lop.Thu) {
          ThuTrung.push(e_lop);
        }
      });
      if(ThuTrung){
        try {
          ThuTrung.forEach(e_lop => {
            var e_Tiet = e_lop.Tiet;
            var i_Tiet = input_lop.Tiet;
            for (const e of e_Tiet) {
              for (const i of i_Tiet) {
                if (e === i){
                  throw '📢Trùng thời gian học với môn:\n'+e_lop.TenMH+' - Thứ: '+e_lop.Thu+' Tiết: '+e_lop.Tiet;//err
                }
              }
            }
          });
        } catch (err) {
          if(err) return err;
          return false;
        }
      }else return false;
    }else return false;
  }else return false;
}
//---------------------------------------------------------------------------------------------------------------
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
//design by hidang on github: github.com/hidang
