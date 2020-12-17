const TableSelect = document.getElementById('TableSelect');




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
  data_tkb = JSON.parse(jsondata);
  console.log(data_tkb.data[1]);
}

start();