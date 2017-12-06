function addTable() {


  var myTableDiv = document.getElementById("lfg_results")
  var table = document.createElement('TABLE')
  var tableBody = document.createElement('TBODY')
  var tableHead = document.createElement('THEAD')
  var tableFoot = document.createElement('TFOOT')
  let lfgCount = 0;

  myTableDiv.setAttribute('class', 'ui container')
  table.setAttribute('class', 'ui celled table')

  table.border = '1'
  table.appendChild(tableBody);
  table.appendChild(tableFoot);

  var heading = new Array();
  heading[0] = "Name"
  heading[1] = "Game"
  heading[2] = "Start Time"
  heading[3] = "End Time"
  heading[4] = "Other"

  var stock = new Array()
  stock[0] = new Array("jeremy21", "Wows", new Date("2017-12-03T22:00:00"), new Date("2017-12-03T22:00:00"), "Anyone Welcome")
  stock[1] = new Array("lenj", "Pathfinder", new Date("2017-12-03T22:00:00"), new Date("2017-12-03T22:00:00"), "Bring own D20")
  stock[2] = new Array("wyoro", "PUBG", new Date("2017-12-03T22:00:00"), new Date("2017-12-03T22:00:00"), "")
  stock[3] = new Array("derickc", "UFC 2", new Date("2017-12-03T22:00:00"), new Date("2017-12-03T22:00:00"), "At the end of the day...")

  //TABLE COLUMNS
  var tr = document.createElement('TR');
  tableBody.appendChild(tr);
  for (let i = 0; i < heading.length; i++) {
    var th = document.createElement('TH')
    th.width = '75';
    th.appendChild(document.createTextNode(heading[i]));
    tr.appendChild(th);

  }

  //TABLE ROWS
  for (let i = 0; i < stock.length; i++) {
    var tr = document.createElement('TR');
    for (let j = 0; j < stock[i].length; j++) {
      var td = document.createElement('TD')
      td.appendChild(document.createTextNode(stock[i][j]));
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }



  var steve = document.createElement('TR')
  var button = document.createElement("a");
  button.innerHTML = 'Submit an LFG';
  button.setAttribute('class',"ui button primary blue left floated {{isActiveRoute "LFG_Submit_Page"}} item");
  button.setAttribute('href',"{{pathFor "LFG_Submit_Page" username=routeUserName}}");
  steve.appendChild(button);

  table.appendChild(steve);

  myTableDiv.appendChild(table)

}

