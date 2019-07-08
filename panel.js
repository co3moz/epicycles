var panel = document.createElement('div');
var panelTable = document.createElement('table');
panel.appendChild(panelTable);
document.body.appendChild(panel);

panel.className = 'panel';
panel.onclick = function () {
  panel.className = "panel";
}

var tr = document.createElement('tr');
tr.style.backgroundColor = "#545454"
var td = document.createElement('td');
td.innerHTML = "Epicycles &nbsp;";
td.colSpan = 4;
var hideButton = document.createElement('button');
hideButton.innerText = "hide";
hideButton.onclick = function (e) {
  e.stopPropagation();
  panel.className = "panel top";
}

td.appendChild(hideButton);

tr.appendChild(td);
panelTable.appendChild(tr);

renderHeader();

for (var circle of circles) {
  addCircle(circle)
}

function addCircle(opts) {
  var control = document.createElement('tr');

  control.appendChild(createInput(opts, '0'))
  control.appendChild(createInput(opts, '1'))
  control.appendChild(createInput(opts, '2'))

  var button = document.createElement('button');
  button.innerText = 'delete';
  button.onclick = function () {
    circles.splice(circles.findIndex(x => opts == x), 1);
    panelTable.removeChild(control);
    saveCircles();
  }
  control.appendChild(button)

  panelTable.appendChild(control);
}

function createInput(data, key) {
  var td = document.createElement('td');
  var input = document.createElement('input');
  input.value = data[key];
  input.onchange = input.onkeyup = function () {
    data[key] = +input.value;
    saveCircles();
  }

  td.appendChild(input);

  return td;
}

function renderHeader() {
  var headerRow = document.createElement('tr');
  headerRow.innerHTML = "<td>speed</td><td>distance</td><td>phase</td>"

  var firstCol = document.createElement('td');

  var addNewButton = document.createElement('button');
  addNewButton.innerText = 'add new';
  addNewButton.onclick = function () {
    var circle = [0.1, 50, 0];

    circles.push(circle);
    addCircle(circle);
    saveCircles();
  }
  firstCol.appendChild(addNewButton);

  headerRow.appendChild(firstCol);

  panelTable.appendChild(headerRow);
}