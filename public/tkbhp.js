const btn = document.getElementById('submit')
const codeclass_input = document.getElementById('codeclass-input');
const alert_error = document.getElementById('alert-error');
const nav_username = document.getElementById('nav-username');

const tableBody = document.getElementById('table-body');
const hang_dau_tien = document.getElementById('hang-dau-tien');
btn.addEventListener('click', () => start());
nav_username.style.display = 'none';
alert_error.style.display = 'none';

var data_tkb;

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


function BaoLoi(err) {
  alert_error.innerHTML = err;
  alert_error.style.display = 'block';
  nav_username.style.display = 'block';
}


async function start() {
  tableBody.innerHTML = '';
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
  if(!codeclass_array) {
    return BaoLoi('Danh sách của bạn rỗng hoặc username không tồn tại xin hãy nhập lại!');
  }
  var jsondata = await readTextFile("./tkbhp.json")
  data_tkb = JSON.parse(jsondata);
  ////////----------------------------///////////////----------------------------///////

  var data_filter = filterBySchedule(data_tkb.data, codeclass_array);
  var data_filter_check = classifyBySchedulable(data_filter);
  handleSchedulable(data_filter_check);
  handleUnschedulable(data_filter_check);
}


start();

function getClassCell({
  MaLop,
  NgonNgu,
  TenMH,
  TenGV = '',
  PhongHoc = '',
  NBD,
  NKT
}) {
  return `
    <strong>${MaLop} - ${NgonNgu}</strong><br>
    ${TenMH}<br>
    <strong>${TenGV}</strong><br>
    ${PhongHoc}<br>
    BĐ: ${NBD}<br>
    KT: ${NKT}<br>
  `
}

function handleUnschedulable(processedData) {
  function getUnschedulableCell(data) {
    return `
      <td colspan="7" class="class-center_white">
        ${getClassCell(data)}
      </td>
    `
  }

  const extraRows = processedData.unschedulable.map(item => {
    return `<tr>${getUnschedulableCell(item)}</tr>`
  })
  tableBody.innerHTML += extraRows.join('\n')
}
function handleSchedulable(processedData) {
  function getSchedulableCell(data) {
    return `
      <td rowspan="${data.Tiet.length}" class="class-center_white">
        ${getClassCell(data)}
      </td>
    `
  }
  function getLessonTime(tiet) {
    switch (tiet) {
      case 1:
        return `<td class="lesson-center_bold">Tiết 1<br>(7:30 - 8:15)</td>`
      case 2:
        return `<td class="lesson-center_bold">Tiết 2<br>(8:15 - 9:00)</td>`
      case 3:
        return `<td class="lesson-center_bold">Tiết 3<br>(9:00 - 9:45)</td>`
      case 4:
        return `<td class="lesson-center_bold">Tiết 4<br>(10:00 - 10:45)</td>`
      case 5:
        return `<td class="lesson-center_bold">Tiết 5<br>(10:45 - 11:30)</td>`
      case 6:
        return `<td class="lesson-center_bold">Tiết 6<br>(13:00 - 13:45)</td>`
      case 7:
        return `<td class="lesson-center_bold">Tiết 7<br>(13:45 - 14:30)</td>`
      case 8:
        return `<td class="lesson-center_bold">Tiết 8<br>(14:30 - 15:15)</td>`
      case 9:
        return `<td class="lesson-center_bold">Tiết 9<br>(15:30 - 16:15)</td>`
      case 10:
        return `<td class="lesson-center_bold">Tiết 10<br>(16:15 - 17:00)</td>`
    }
  }

  const listTiet = [...Array(10)].map((_, index) => {
    return processedData.schedulable.filter(x => x.Tiet.includes((index + 1) % 10))
  })  
  //console.log(listTiet);
  // check trung tkb
  for (const arr of listTiet) {
    const listThu = arr.map(x => x.Thu)
    const listUniqueThu = new Set(listThu)
    const isUnique = listThu.length === listUniqueThu.size
    if (!isUnique) {
      const thuBug = listThu.find(x => listThu.count(x) > 1)
      const bugs = arr.filter(x => x.Thu === thuBug)
      const bugsDisplay = bugs.map(({ MaLop, Thu, Tiet }) => `<strong>${MaLop}:Thứ${Thu}Tiết${Tiet}</strong>`)
      return {
        hasBug: true,
        message: `Trùng thời khóa biểu: ` + bugsDisplay.join(' - ') + '. '
      }
    }
  }

  let toAppend = ''
  for (let index = 0; index < 10; index++) {
    toAppend += `<tr>`
    toAppend += getLessonTime(index + 1)

    for (let thu = 2; thu <= 7; thu++) {
      const foundClass = listTiet[index].find(_class =>
        _class.Thu.includes(thu)
      )
      //console.log(foundClass);
      if (!foundClass) {
        toAppend += `<td></td>`
      } else {
        if (foundClass.Tiet[0] == index + 1) {
          toAppend += getSchedulableCell(foundClass)
        }
      }
    }

    toAppend += `</tr>`
  }
  tableBody.innerHTML += toAppend
  return { hasBug: false }
}

function filterBySchedule(data, toSchedule) {
  // 'data' là một mảng toàn bộ các LỚP HỌC PHẦN từ database
  // 'toSchedule' là mảng các MÃ LỚP HỌC PHẦN
  return data.filter(it => toSchedule.includes(it.MaLop));
}

function classifyBySchedulable(classes) {
  const schedulable = classes.filter(x => x.Thu !== '*')
  const unschedulable = classes.filter(x => x.Thu === '*')
  return { schedulable, unschedulable }
}