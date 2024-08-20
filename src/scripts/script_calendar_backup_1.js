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
  




    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const events = [
        {date: new Date('2024-08-26'), event_no: '1', label: 'First day of NSOP', segment: 'start', link: 'https://cdn.pixabay.com/photo/2017/05/11/16/40/emoji-2304720_1280.png'},
        {date: new Date('2024-09-01'), event_no: '2', label: 'End of NSOP', segment: 'end'},
        {date: new Date('2024-09-03'), event_no: '3', label: 'First day of class', segment: 'start', link: 'https://cdn.pixabay.com/photo/2016/08/21/18/48/emoticon-1610518_1280.png'},
        {date: new Date('2024-09-13'), event_no: '4', label: 'End of shopping period', segment: 'end'},
        {date: new Date('2024-10-08'), event_no: '5', label: 'Last day to drop classes', segment: 'na'},
        {date: new Date('2024-10-17'), event_no: '6', label: 'Fall midterm date', segment: 'na', link: 'https://cdn.pixabay.com/photo/2016/04/01/00/28/face-1298202_640.png'},
        {date: new Date('2024-10-26'), event_no: '7', label: 'Homecoming game', segment: 'na', link: 'https://st.depositphotos.com/1001911/1222/v/450/depositphotos_12221489-stock-illustration-big-smile-emoticon.jpg'},
        {date: new Date('2024-11-04'), event_no: '8', label: 'Start of election holiday', segment: 'start', link: 'https://i.pinimg.com/736x/3b/54/30/3b543046fc90ac07131e54d4c3dde292.jpg'},
        {date: new Date('2024-11-05'), event_no: '9', label: 'End of election holiday', segment: 'end'},
        {date: new Date('2024-11-14'), event_no: '10', label: 'Last day to withdraw/PDF', segment: 'na'},
        {date: new Date('2024-11-27'), event_no: '11', label: 'Start of Thanksgiving break', segment: 'start', link: 'https://i.pinimg.com/originals/a2/5c/19/a25c198273a072fc9a608ee01a3bff80.png'},
        {date: new Date('2024-11-29'), event_no: '12', label: 'End of Thanksgiving break', segment: 'end'},
        {date: new Date('2024-12-09'), event_no: '13', label: 'Last day of class', segment: 'na', link: 'https://t4.ftcdn.net/jpg/05/91/75/69/360_F_591756994_RWtNuVkWDKEIer7eozEne5xe3rZo2QbD.jpg'},
        {date: new Date('2024-12-10'), event_no: '14', label: 'Start of reading period', segment: 'start', link: 'https://cdn.pixabay.com/photo/2017/05/11/16/40/emoji-2304720_1280.png'},
        {date: new Date('2024-12-12'), event_no: '15', label: 'End of reading period', segment: 'end'},
        {date: new Date('2024-12-13'), event_no: '16', label: 'Start of finals', segment: 'start'},
        {date: new Date('2024-12-20'), event_no: '17', label: 'End of finals', segment: 'end'}
    ];
    width = document.body.clientWidth;
    height = window.innerHeight;

   // Create the SVG container
const svg = d3.select('svg')
.attr('width', width)
.attr('height', height)
.style("display", "block")
.style("margin", "auto")
.attr('viewBox', `0 0 ${width} ${height}`);

const cellSize = Math.min(width / 7, height / 8); // Adjust cell size based on container


function makeCalendar(month,year) {
  const firstDay = new Date(year, month, 1).getDay(); // Day of the week for the 1st of the month
const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month

console.log(firstDay);

// Add day cells with boxes

console.log(width);
console.log(cellSize);
console.log((width-(cellSize*7))/7);
console.log(width%cellSize);


 // Add month label
 svg.append("text")
 .attr("x", width / 2)
 .attr("y", cellSize / 2)
 .attr("text-anchor", "middle")
 .text(monthNames[month] + " " + year)
 .style("font-weight", "bold")
 .style("font-size", "16px")
 .classed('roboto-bold', true);

// Add day headers
svg.selectAll(".header")
 .data(daysOfWeek)
 .enter().append("text")
 .attr("x", (d, i) => i * cellSize + cellSize / 2 + (width-(cellSize*7))/2)
 .attr("y", cellSize )
 .attr("text-anchor", "middle")
 .text(d => d)
 .classed('roboto',true)
 //.style("font-weight", "bold");

 // Create a set of days that have events
 const eventDays = new Set(events
  .filter(event => event.date.getUTCMonth() === month && event.date.getUTCFullYear() === year)
  .map(event => event.date.getUTCDate())
);

console.log(eventDays);


svg.selectAll("rect")
.data(d3.range(daysInMonth))
.enter().append("rect")
.attr("x", (d, i) => ((i + firstDay) % 7) * cellSize + (width-(cellSize*7))/2)
.attr("y", d => Math.floor((d + firstDay) / 7) * cellSize + cellSize + 20)
.attr("width", cellSize)
.attr("height", cellSize)
.attr("fill", "#fff")
.attr("stroke", "#ddd")
.attr('id', d => `day-${month + 1}-${d + 1}`);




svg.selectAll(".day")
          .data(d3.range(daysInMonth))
          .enter().append("text")
          .attr("x", (d, i) => ((i + firstDay) % 7) * cellSize + cellSize / 2 + (width-(cellSize*7))/2)
          .attr("y", d => Math.floor((d + firstDay) / 7) * cellSize + cellSize + 35)
          .attr("text-anchor", "middle")
          .classed('roboto-light',true)
          .text(d => d + 1)
          .style("font-size", "14px");

// Highlight events
events.forEach(event => {
  if (event.date.getUTCMonth() === month && event.date.getUTCFullYear() === year) {
      const day = event.date.getUTCDate();
      const x = ((day + firstDay - 1) % 7) * cellSize + cellSize / 2 + (width-(cellSize*7))/2;
      const y = Math.floor((day + firstDay - 1) / 7) * cellSize + cellSize +  cellSize*.8;

      

      /*
      svg.select(`#day-${day}`)
      .classed('filled-square', true); // Add a class to highlight the square

      */

      /*
      svg.select(`#day-${day}`)
      .classed(`event-${day}`, true); // Add a class to highlight the square
      */


      svg.append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 10)
          .attr("fill", "red");

      if (event.link) {
          svg.append("image")
              .attr("xlink:href", event.link)
              .attr("x", x - 10)
              .attr("y", y - 10)
              .attr("width", 20)
              .attr("height", 20);
      }
  }
});



}

const months = [8, 9, 10, 11, 12]; // August to December
const year = 2024;



// scrolly stuff

var scroller = scrollama();

  
    
    function handleStepEnter(response) {
        if(response.direction=='down') {
             // Call the appropriate step function based on the scroll index
        stepFunctionsDown[response.index]();
        }
        else if(response.direction=='up') {
            stepFunctionsUp[response.index]();
        }
        // Update the sticky element's class
        sticky.attr('class', 'step-' + response.index);
        console.log('index',response.index);
        return response;
       
    }
    
    function handleStepExit(response) {
        if (response.index == 0 && response.direction == 'up') {
         
            svg.selectAll("circle").classed('hidden', true,); 

            updateView(0);

        }
    }

    function setup() {
      makeCalendar(months[0], year);
      //  d3.selectAll('#sticky-thing').classed('hidden',true);
     //   svg.selectAll("circle").classed('hidden', true,); 
     //   svg.selectAll(".line").classed('hidden', false,); 
     //   svg.selectAll("image").classed('hidden', true,); 

     //   svg.selectAll("svg").classed('draw', false,); 
      
    }

    
  

    // populate stepFunctions
    var stepFunctionsDown = [
        
        
      ];

      for (let i =0; i < events.length+2;i++) {
       
        stepFunctionsDown.push(function() {

          svg.select(`.event-${i}`)
          .transition()
          .duration(1000)
          .style('fill','red')
          /*
          svg.select(`.event-${i}`)
          .classed('filled-square', true); // Add a class to highlight the square
*/
          if(events[i].segment == 'start') {
            
            const startDate = events[i].date;
            const endDate = events[i+1].date;

            
           highlightDateRange(startDate, endDate);

       
       
              }
       
              if(events[i].segment == 'end') { // i+1 bc the first event has no arrow associated whoops
               
               console.log("end");
       
              }
       


          /*
          svg.select(`#day-${i}`)
      .classed('filled-square', true); // Add a class to highlight the square
        */

      
 
      
          });
          
      }

  
var stepFunctionsUp = [
        
        
];






for (let i =0; i < events.length;i++) {
  stepFunctionsUp.push(function() { // NEED TO GIGURE OUT WHY IT DOESNT SHOW LAST EVENT
   
      updateView(i-1);
  //svg.selectAll('circle').attr('class', (d, j) => j === i ? 'event highlighted-event' : 'event');
  //svg.selectAll('line').attr('class', (d, j) => j === i ? 'line highlighted' : 'line').classed('draw',false).classed('visible',false);
  svg.selectAll(`#circle-${i}`).classed('event highlighted-event',true).classed('hidden',false);
       svg.selectAll(`#circle-${i-1}`).classed('highlighted-event',false).classed('hidden',false);
       svg.selectAll(`#label-${i}`).classed('fade-in',true); // WANT TO MAKE THIS APPEAR EARLIER/LATER THAN OTHERS
       svg.selectAll(`#image-${i+1}`).classed('visible',false);



       //svg.selectAll('line').attr('class', (d, j) => j === i ? 'draw line highlighted visible' : 'line');


       //svg.selectAll(`#line-${i}`).classed('line visible',true).classed('hidden',false);

       svg.selectAll(`#red-line-${i}`).classed('red-line visible',true).classed('hidden',false);

       //svg.selectAll(`#line-${i+1}`).classed('highlighted',false).classed('hidden',false);
       svg.selectAll(`#red-line-${i+1}`).classed('highlighted',false).classed('hidden',false);

/*
       if(events[i-1].segment == 'end') {
        console.log(events[i-1]);
        svg.selectAll(`#line-${i}`).classed('draw line highlighted visible',true).classed('hidden',false);


       }*/
    });
}

    

// Create scrollable sections
const steps = d3.select('#scroll-steps')
    .selectAll('div')
    .data(events)
    .enter().append('div')
    .attr('class', 'step')
    .text(d => d.label);

// Initialize scrollama
function init() {
    setup();
    scroller
      .setup({
        step: '#scrolly article .step',
        offset: 0.98,
        debug: false,
      })
      .onStepEnter(handleStepEnter)
      .onStepExit(handleStepExit);

    // Setup resize event listener
    window.addEventListener('resize', scroller.resize);
}

// Kick things off
init();

for (let i = 0; i < events.length; i++) {
  const month = events[i].date.getUTCMonth() + 1; // Months are 0-based in JavaScript
  const day = events[i].date.getUTCDate(); // Days are 1-based
  const id = `${month}-${day}`;

  svg.select(`#day-${id}`)
  .classed(`event-${i}`, true);
  /*
  console.log(`Selecting ID: ${id}`); // Debug: Print the ID being selected

  const selection = svg.select(`#day-${id}`);
  console.log(`Selection: ${selection.empty() ? 'Not Found' : 'Found'}`); // Debug: Check if selection is found
  
  if (!selection.empty()) {
      selection.classed('filled-square', true); // Add the class to the element with the matching ID
      console.log(`Class added to ID: ${id}`); // Debug: Confirm class was added
  } else {
      console.log(`ID not found: ${id}`); // Debug: ID not found in the selection
  }
  */
}


function highlightDateRange(startDate, endDate) {
  // Ensure startDate is before endDate
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  // Clear previous highlights
  svg.selectAll('rect').transition()
  .duration(1000)
  .style('fill','white')
  .on('end', function() {
    // Callback to apply new highlights after previous ones are cleared
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const month = currentDate.getUTCMonth() + 1;
      const day = currentDate.getUTCDate();
      const dayCellId = `day-${month}-${day}`;

      svg.select(`#${dayCellId}`)
        .transition()
        .duration(1000) // Duration for highlighting
        .style('fill', 'red'); // New highlight color

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
  });
}


    