let width, height;
let vbWidth, vbHeight;
const vbMinX = 0;
const vbMinY = 0;
let viewBox;

  // using d3 for convenience
  var main = d3.select('main');
  var scrolly = main.select('#scrolly');
  var sticky = scrolly.select('#sticky-thing');
  var article = scrolly.select('article');
  var step = article.selectAll('.step');
  


function createCalendar(month, year) {

    const cellSize = Math.min(width / 7, height / 8); // Adjust cell size based on viewport
        const firstDay = new Date(year, month, 1).getDay(); // Day of the week for the 1st of the month
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
}

const cellSize = Math.min(width / 7, height / 8); // Adjust cell size based on viewport

// October 2017, generated with https://nodei.co/npm/calendar-matrix/
const month = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, -1, -2, -3, -4]
  ];
  const monthNames = [
    'January', 'February', 'March',
    'April',   'May',      'June',
    'July',    'August',   'September',
    'October', 'November', 'December'
  ];
  const dayNames = [
    'Sunday', 'Monday',
    'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ];
  const monthNum = 9;
  
  const table = d3.select('#calendar');
  const header = table.append('thead');
  const body = table.append('tbody');
  
  header
    .append('tr')
    .append('td')
    .attr('colspan', 7)
    .style('text-align', 'center')
    .append('h2')
    .text(monthNames[monthNum]);
  
  header
    .append('tr')
    .selectAll('td')
    .data(dayNames)
    .enter()
    .append('td')
    .style('text-align', 'center')
    .text(function (d) {
      return d;
    });
  
  month.forEach(function (week) {
    body
      .append('tr')
      .selectAll('td')
      .data(week)
      .enter()
      
      .append('td')
      .attr('class', function (d) {
        return d > 0 ? '' : 'empty';
      })
      .text(function (d) {
        return d > 0 ? d : '';
      })
  });
  