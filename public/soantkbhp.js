var listColumns = [
  'STT', 'MaMH', 'MaLop', 'TenMH', 'MaGV', //1->5
  'TenGV', 'SiSo', 'SoTC', 'ThucHanh', 'HTGD',//6->10
  'Thu', 'Tiet', 'CachTuan', 'PhongHoc', 'KhoaHoc', //11->15
  'HocKy', 'NamHoc', 'HeDT', 'KhoaQL', 'NBD', //16->20
  'NKT', 'GhiChu'//21, 22
];
const container = document.getElementById("container");
const start_data = document.getElementById("start-data");
const progress = document.getElementById("progress");
//const TableSelect = document.getElementById('TableSelect');
const BodyTable  = document.getElementById('body-table');

var listElementsCheckBox = [];//Mảng các element-checbox
listColumns.forEach(element => {
  ////set size ALL BOX text-input 
  //document.getElementById(`cell-${element}`).size = 10;
  
  //push elementCheckBox to array
  listElementsCheckBox.push(document.getElementById(element));
});

listElementsCheckBox.forEach(element => {
  //set envent show/hide for elementCheckBoxs
  element.addEventListener('click', ()=>{
    ShowOrHideCol(element);
  });
});


function ShowOrHideCol(elementCheckBox) {
  //=>if checked ? show:hide -> element
  var ShowOrHide = 'none';//hide
  if (elementCheckBox.checked) ShowOrHide = '';//show
  var listCell = document.getElementsByName(`cell-${elementCheckBox.id}`); 
  listCell.forEach(element =>{
    element.style.display  = ShowOrHide;
  });
}

function readTextFile(file) {
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

async function start() {
  //tạm ẩn để đợi xử lý xong dữ liệu
  container.style.display = "none";
  start_data.style.display = "";

  var jsondata = await readTextFile("./tkbhp.json");
  var data_json = JSON.parse(jsondata);
  var data_tkb = data_json.data;
  //console.log(data_tkb[0]);
  //check all checkbox
  listElementsCheckBox.forEach(element => {
    ShowOrHideCol(element);
  });
  var dataTable ='';
  var lineTable ='';
  let l = data_tkb.length;
  for (let index = 1; index < l; index++) {
    if (data_tkb[index].TenMH) {//check data json môn học unknown
      lineTable ='';
      lineTable += 
`<td name="cell-MaLop">${data_tkb[index].MaLop}</td>
<td name="cell-TenMH">${data_tkb[index].TenMH}</td>
<td name="cell-Thu">${data_tkb[index].Thu}</td>
<td name="cell-Tiet">${data_tkb[index].Tiet}</td>`;
      
      dataTable +=`<tr>${lineTable}</tr>`;
    }
  }
  //hiện lại sau khi xử lý xong
  start_data.style.display = "none";
  container.style.display = "";

  BodyTable.innerHTML = dataTable; 
}
start();