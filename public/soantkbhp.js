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
//🐥🐤🐣fix buggggg lần 2: hôm nay là một buổi chiều thứ 7 bất chợt chiếc lá rơi nhưng rụng xuống 2 chiếc giống nhau nhưng khác tính chất hóa học dẫn-đến-bugg-toàn-cục bầu ơi thương lấy bí cùng tuy rằng xóa code
//vì mỗi một code class không chỉ xuất hiện một lần- đối với các môn có 2 3 ngày học trở lên sẽ khác về thứ và tiết học phải check để không bị trùng
//check box Chọn khi bị click vào sẽ phải auto click cái liên quan (trùng mã MH) còn lại
//check box Chọn sẽ được định danh bằng Class={MãLớp} vì class có thể tồn tại bằng nhiều element
var MyCodeClassList = [];//Danh sách {MaMH} các lớp học đã chọn -> đã check trùng lịch mới được thêm vào
//info_lop là mảng chứa 1 dòng trong file data_input
//array_info_lop là mảng chứa mảng info các dòng data môn học trong data_input vì có môn học sẽ >1 dòng nhưng khác thứ, tiết học, chỉ giống mỗi tên , mã, 🙂
var MyInfoClassList = [];//Danh sách chứa {info} các lớp học đã chọn (bao gồm trùng MaMH nhưng khác thu tiet)
var listElementsCheckBox = [];//Mảng các element-checbox-Loc
var TongTc = 0;//số tính chỉ của danh sách đang chọn
//--------------------------------------------------SetUp-------------------------------------------------------------
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
//---------------------------------------------------EndSetUp--------------------------------------------------------

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
function GetInfoClassByMaLopThuTiet(maLop) {//return array [object info_lop] 
  var array_infoLop = [];
  if(data_tkb){
    for (const datalop of data_tkb) {
      if (datalop.MaLop == maLop) {
        array_infoLop.push(datalop);
      }
    }
  }else{
    return false;
  }
  return array_infoLop;
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
function InnerData2List(array_infolop) {//add codeclass to MyCodeClassList and Inner Data to site
  //innerHTML ra list danh sách
  // danhsach_selected: List
  // info_danhsach_selected: Info for List
  //<a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#list-home" role="tab">Demo1</a>
  //<div class="tab-pane fade" id="list-home" role="tabpanel">Demo1</br>Demo1</br>Demo1</br>Demo1</div>
  var thu_tiet ='';
  array_infolop.forEach(info_lop => {
    MyInfoClassList.push(info_lop);//phải push hết vào để get info tkb
    thu_tiet += `-thu:${info_lop.Thu} T`;
  });
  MyCodeClassList.push(array_infolop[0].MaLop);//chỉ cần push một mã lớp đại diện
  var id = array_infolop[0].MaLop;
  id = id.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");//vì dùng để tạo id nên phải xóa hết các kí tự đặc biệt "."...

  danhsach_selected.innerHTML += 
  `<a class="list-group-item-success mt-1" data-bs-toggle="list" href="#${id}" role="tab" style="text-decoration: none;border-style: solid;">${array_infolop[0].TenMH}</a>`;
  info_danhsach_selected.innerHTML +=
  `<div class="tab-pane fade" id="${id}" role="tabpanel">
Tên môn học: ${array_infolop[0].TenMH}</br>Mã lớp: ${array_infolop[0].MaLop}</br>${thu_tiet}</br>GV: ${array_infolop[0].TenGV}</br>
<button type="button" class="btn btn-danger" onclick="DeleteMonHoc('${array_infolop[0].MaLop}')">Bỏ chọn môn học này</button>
</div>`;
  handle_show_list_malop();
  //handle_show_TongTC
  if(array_infolop[0].SoTc !== undefined) TongTc += parseInt(array_infolop[0].SoTc);
  show_TongTC.innerHTML = TongTc;
}
function OutnerData2List(array_infolop) {//remove codeclass to MyCodeClassList, MyCodeClassList and Data in HTML
  MyInfoClassList = MyInfoClassList.filter(item => item.MaLop !== array_infolop[0].MaLop);//remove
  MyCodeClassList = MyCodeClassList.filter(item => item !== array_infolop[0].MaLop);//remove
  var id = array_infolop[0].MaLop;
  id = id.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");//vì dùng để tạo id nên phải xóa hết các kí tự đặc biệt "."...
  document.getElementById(id).remove();//remove item khỏi info-danhsach-selected
  //https://stackoverflow.com/questions/10572735/javascript-getelement-by-href
  var i_danhsach_selected = document.querySelectorAll(`a[href='#${id}']`);//remove item khỏi danhsach-selected
  i_danhsach_selected[0].remove();//mảng này thì chắc chắn chỉ 1pt duy nhất vì href được tạo từ id mà :>
  handle_show_list_malop();
  //handle_show_TongTC
  if(array_infolop[0].SoTc !== undefined) TongTc -= parseInt(array_infolop[0].SoTc);
  show_TongTC.innerHTML = TongTc;
}
function DeleteMonHoc(malop) {
  // //https://stackoverflow.com/questions/6267816/getting-element-by-a-custom-attribute-using-javascript
  // var checkBoxChon =  document.querySelector(`input[value-malop="${malop}"]`);
  var checkBoxChons =  document.getElementsByClassName(malop);
  checkBoxChons = [...checkBoxChons];
  var aray_info_lop = GetInfoClassByMaLopThuTiet(malop);//FIXME: có thể get từ mảng MyInfoClassList[];
  checkBoxChons.forEach(checkBoxChon => {
    checkBoxChon.checked = false;
  });
  OutnerData2List(aray_info_lop);
}
async function CheckAndAddClass2ListChon(checkboxChon) {
  var maLop = checkboxChon.getAttribute('value-malop');
  var array_infolop = GetInfoClassByMaLopThuTiet(maLop);//info_lop is array
  var checkboxChonCungMaLops = document.getElementsByClassName(maLop);//checkboxChonCungMaLops lúc này là HTML collection
  checkboxChonCungMaLops = [...checkboxChonCungMaLops];//https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
  if (checkboxChon.checked) {
    var err = await CheckTrungThuTiet(array_infolop);
    console.log(err)
    if (!err) {
      InnerData2List(array_infolop);
      checkboxChonCungMaLops.forEach(checkBox => {//auto click checkbox cùng lớp học
        checkBox.checked = true;
      });
    }else{
      checkboxChon.checked = false;
      ShowErrorByAlert(err);
    }
  }else{
    checkboxChonCungMaLops.forEach(checkBox => {//auto click checkbox cùng lớp học
      checkBox.checked = false;
    });
    OutnerData2List(array_infolop);
  }
}
function ShowErrorByAlert(err) {
  alert("Lỗi: " + err);
}
function CheckTrungThuTiet(array_inputlop) {//return (Promise-function) resolve->(false -> không bị trùng | err) 
  return new Promise(
    function (resolve) {
      if(MyInfoClassList){
        array_inputlop.forEach(input_lop => {
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
                        console.log('ok')
                        throw '📢Trùng thời gian học với môn:\n'+e_lop.TenMH+' - Thứ: '+e_lop.Thu+' Tiết: '+e_lop.Tiet;//err
                      }
                    }
                  }
                });
              } catch (err) {
                return resolve(err);
              }
            }
          }
        });
      }else resolve(false);
      resolve(false);
    }
  );
}
//------------------------------------------------Start()---------------------------------------------------------
async function Start() {
  //TODO:tạm ẩn để đợi xử lý xong dữ liệu
  start_data.style.display = "";
  container.style.display = "none";
  //FIXME: Chưa hoàn thành tính năng add file excel của user
  try {
    var jsondata = await ReadJsonFile("./tkbhp.json");
    var data_json = JSON.parse(jsondata);
    data_tkb = data_json.data;
  } catch (error) {
    ShowErrorByAlert(error);
  }

  //TODO:render data table
  var i_data, cell_data;
  var dataTable ='';
  var lineTable ='';
  var l = data_tkb.length;
  for (let index = 0; index < l; index++) {
    i_data = data_tkb[index];
    if (i_data.TenMH && i_data.TenMH !== "TÊN MÔN HỌC") {//check data json môn học unknown - không tồn tại
      //FIXME: có môn có 2 mã lớp /1 lớp 
      //🙂-> value-malop="${i_data.MaLop}-Thu${i_data.Thu}-Tiet${i_data.Tiet}"
      //Tạo dòng
      //mỗi checkboxChon sẽ mang "value-malop" chính là "mã lớp" tương ứng với dòng nó        
      lineTable =`<td name="cell-Chon"><input type="checkbox" name="cell-Chon-CheckBox" class="form-check-input ${i_data.MaLop}"
value-malop="${i_data.MaLop}" value-thu="${i_data.Thu}" value-tiet="${i_data.Tiet}"></td>`;    
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
  //add action click CheckAndAddClass2ListChon() for ChexBoxChonsss
  listCellChon.forEach(checkboxChon => {
    checkboxChon.addEventListener('click', ()=>{
      CheckAndAddClass2ListChon(checkboxChon);
    })
  });
  
  //TODO:check all Lọc to Show Or Hide CheckBox-Loc
  listElementsCheckBox.forEach(element => {
    ShowOrHideCol(element);
  });
}
Start();
//design by hidang on github: github.com/hidang
