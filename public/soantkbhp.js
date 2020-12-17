var listCheckBox = [
  'STT', 'MaMH', 'MaLop', 'TenMH', 'MaGV', //1->5
  'TenGV', 'SiSo', 'SoTC', 'ThucHanh', 'HTGD',//6->10
  'Thu', 'Tiet', 'CachTuan', 'PhongHoc', 'KhoaHoc', //11->15
  'HocKy', 'NamHoc', 'HeDT', 'KhoaQL', 'NBD', //16->20
  'NKT', 'GhiChu'//21, 22
];


var listElementsCheckBox = [];//Mảng các element-checbox
listCheckBox.forEach(element => {
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






const TableSelect = document.getElementById('TableSelect');
const body_table  = document.getElementById('body-table');
start();


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
  var jsondata = await readTextFile("./tkbhp.json");
  var data_json = JSON.parse(jsondata);
  var data_tkb = data_json.data;
  console.log(data_tkb[8]);
  //check all checkbox
  listElementsCheckBox.forEach(element => {
    ShowOrHideCol(element);
  });


}

