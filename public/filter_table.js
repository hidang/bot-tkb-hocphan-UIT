
// const tbody = document.getElementById('main-table-body');
// const input_STT = document.getElementById('cell-STT');
// console.log(input_STT.value)
// input_STT.addEventListener('keyup', ()=>{
//   //TODO:render data table
//   var i_data, cell_data;
//   var dataTable ='';
//   var lineTable ='';
//   var l = data_tkb.length;
//   for (let index = 0; index < l; index++) {
//     i_data = data_tkb[index];
//     if (i_data.TenMH && i_data.TenMH !== "TÊN MÔN HỌC" ) {//check data json môn học unknown - không tồn tại       
//       if((i_data.STT).toString().indexOf(input_STT.value) >-1){
//         lineTable = `<td name="cell-Chon"><input type="checkbox" name="cell-Chon-CheckBox" class="form-check-input ${i_data.MaLop}" value-malop="${i_data.MaLop}" value-thu="${i_data.Thu}" value-tiet="${i_data.Tiet}"></td>`;    
//         for (const element of listColumns) {
//           //https://stackoverflow.com/questions/922544/using-variable-keys-to-access-values-in-javascript-objects
//           //console.log((data_tkb[index])[element]);
//           cell_data = i_data[element];
//           if(!cell_data) cell_data = '';//check data unknown
//           lineTable += `<td name="cell-${element}">${cell_data}</td>`;
//         }
//         //TODO- thêm DÒNG vào BẢNG sau khi xử lý xong
//         dataTable +=`<tr>${lineTable}</tr>`;
//       }
//     }
//   }
//   //TODO:add event select for Checkbox Chon
//   var listCellChon = document.getElementsByName("cell-Chon-CheckBox");
//   //add action click CheckAndAddClass2ListChon() for ChexBoxChonsss
//   listCellChon.forEach(checkboxChon => {
//     checkboxChon.addEventListener('click', ()=>{
//       CheckAndAddClass2ListChon(checkboxChon);
//     })
//   });
//   //TODO:check all Lọc to Show Or Hide CheckBox-Loc
//   listElementsCheckBox.forEach(element => {
//     ShowOrHideCol(element);
//   });
//   main_table_body.innerHTML = dataTable; 
// });