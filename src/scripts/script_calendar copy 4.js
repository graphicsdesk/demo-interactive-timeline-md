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
        {date: new Date('2024-08-25'), label: 'First day of NSOP', segment: 'start',  annotation: "Barnard starts NSOP here", target:  new Date(2024, 7, 28)},
        {date: new Date('2024-09-01'), label: 'End of NSOP', segment: 'end'},
        {date: new Date('2024-09-03'), label: 'First day of class', segment: 'start', link: 'https://cloudfront-us-east-1.images.arcpublishing.com/spectator/SXKBMSVSGRG33IB2XATXOLRLD4.png'},
        {date: new Date('2024-09-13'), label: 'End of shopping period', segment: 'end', link: 'https://cloudfront-us-east-1.images.arcpublishing.com/spectator/BKWCFTETX5D3XFUR2KICPMFP4E.png'},
        {date: new Date('2024-10-08'), label: 'Last day to drop classes', segment: 'na'},
        {date: new Date('2024-10-17'), label: 'Fall midterm date', segment: 'na', link: 'https://cloudfront-us-east-1.images.arcpublishing.com/spectator/WBKEKOAX3BED3LR7466RLHXJKY.png'},
        {date: new Date('2024-10-25'), label: 'Start Homcoming and family days', segment:'start'},
        {date: new Date('2024-10-26'), label: 'Homecoming game', segment: 'na', link: 'https://cloudfront-us-east-1.images.arcpublishing.com/spectator/MOBF27JBSRCKHNWURS4M24G2T4.png'},
        {date: new Date('2024-11-04'), label: 'Start of election holiday', segment: 'start', link: 'https://cloudfront-us-east-1.images.arcpublishing.com/spectator/DQGZ4DEU4NGK5APJB4KP3MENY4.png'},
        {date: new Date('2024-11-05'), label: 'End of election holiday', segment: 'end'},
        {date: new Date('2024-11-14'), label: 'Last day to withdraw/PDF', segment: 'na', annotation: "Also the last day to drop classes for SEAS students", target:  new Date(2024, 10, 15)},// for some reason, this only works if i say the 15th. idk why
        {date: new Date('2024-11-18'), label: 'Start registration', segment: 'start'},
        {date: new Date('2024-11-22'), label: 'End registration', segment: 'end'},
        {date: new Date('2024-11-27'), label: 'Start of Thanksgiving break', segment: 'start', link: 'https://cloudfront-us-east-1.images.arcpublishing.com/spectator/IYOOWB5KB5BXJKSKIMHAZIVWNA.png'},
        {date: new Date('2024-11-29'), label: 'End of Thanksgiving break', segment: 'end'},
        {date: new Date('2024-12-09'), label: 'Last day of class', segment: 'na', link: 'https://cloudfront-us-east-1.images.arcpublishing.com/spectator/Y256NHNJ6FFSZLZ2ZULRUQI3DE.png'},
        {date: new Date('2024-12-10'), label: 'Start of reading period', segment: 'start', link: 'https://cloudfront-us-east-1.images.arcpublishing.com/spectator/YUYOAPVRPFHIRFQ75CTARUZVNE.png'},
        {date: new Date('2024-12-12'), label: 'End of reading period', segment: 'end'},
        {date: new Date('2024-12-13'), label: 'Start of finals', segment: 'start'},
        {date: new Date('2024-12-20'), label: 'End of finals', segment: 'end'}
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

 // function for text wrapping
    function wrap(text, width) {
      text.each(function () {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.1, // ems
              x = text.attr("x"),
              y = text.attr("y"),
              dy = 0, //parseFloat(text.attr("dy")),
              tspan = text.text(null)
                          .append("tspan")
                          .attr("x", x)
                          .attr("y", y)
                          .attr("dy", dy + "em");
          while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan")
                              .attr("x", x)
                              .attr("y", y)
                              .attr("dy", ++lineNumber * lineHeight + dy + "em")
                              .text(word);
              }
          }
      });
  }
function makeCalendar(month,year) {
  const firstDay = new Date(year, month, 1).getDay(); // Day of the week for the 1st of the month
const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month

console.log(firstDay);

const calendarGroup = svg.append('g') // Append a new group for each month's calendar
    .attr('class', `calendar-month-${month}`)
    .attr('transform', `translate(${width}, 0)`); // Start off-screen


   
  

// Add day cells with boxes

console.log(width);
console.log(cellSize);
console.log((width-(cellSize*7))/7);
console.log(width%cellSize);


 // Add month label
 calendarGroup.append("text")
 .attr("x", width / 2)
 .attr("y", cellSize / 2)
 .attr("text-anchor", "middle")
 .text(monthNames[month] + " " + year)
 .style("font-weight", "bold")
 .style("font-size", "16px")
 .classed('roboto-bold', true);

// Add day headers
calendarGroup.selectAll(".header")
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


calendarGroup.selectAll("rect")
.data(d3.range(daysInMonth))
.enter().append("rect")
.attr("x", (d, i) => ((i + firstDay) % 7) * cellSize + (width-(cellSize*7))/2)
.attr("y", d => Math.floor((d + firstDay) / 7) * cellSize + cellSize + 20)
.attr("width", cellSize)
.attr("height", cellSize)
.attr("fill", "#fff")
.attr("stroke", "#ddd")
.attr('id', d => `day-${month + 1}-${d + 1}`);




calendarGroup.selectAll(".day")
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


      if (event.link) {
        calendarGroup.append("image")
              .attr("xlink:href", event.link)
              .attr("x", x - (cellSize/2))
              .attr("y", y - (cellSize/2))
              .attr("width", (cellSize))
              .attr("height", (cellSize))
              .attr('id', (d,i) => `image-${i}`);
      }
  }
});



}

const months = [7,8, 9, 10, 11]; // August to December
const year = 2024;


let currentMonthIndex = months[0];
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
         
           // Initially display the first month
      transitionToMonth(months[0]);

        }
    }

    function setupCalendars() {
      svg.selectAll(".calendar-month").remove(); 

      // Create calendars for all months
      months.forEach((month) => {
        makeCalendar(month, year);
      });
    
      // Ensure the first month is visible initially
      transitionToMonth(months[0]);

      

      
    }

    // stuff for making arrowhead
    svg.append('defs')
.append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 9) // Adjust this as needed
    .attr('refY', 5)
    .attr('markerWidth', 5)
    .attr('markerHeight', 5)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z') // Arrowhead shape
    .attr('fill', 'black');


    function addAnnotation(targetDate,message) {
     // const targetDate = new Date(2024, 7, 28); // August is month 7
      const day = targetDate.getUTCDate();
      const monthIndex = targetDate.getUTCMonth();
      
      // Get the calendar group for the month of August
      const calendarGroup = svg.select(`.calendar-month-${monthIndex}`);
      
      // Calculate position
      const x = ((day + 2) % 7) * cellSize + cellSize / 2 + (width - (cellSize * 7)) / 2;
      const y = Math.floor((day + 1 + 0) / 7) * cellSize + cellSize + cellSize/2;
      
      // Add curved arrow
      calendarGroup.append("path")
          .attr("d", `M${x+cellSize/4} ${y-cellSize/2} Q${x + cellSize/1.7} ${y + cellSize/2} ${x + cellSize} ${y}`)
          .attr("fill", "none")
          .attr("stroke", "black")
          .attr("stroke-width", 2)
          .classed('annotation-arrow',true)
          .style('opacity','100')
          .classed('annotation',true)
    
          .attr("stroke-dasharray", function() {
            return this.getTotalLength(); // Set the dash array to the length of the path
        })
        .attr("stroke-dashoffset", function() {
            return this.getTotalLength(); // Initially hide the path
        })
        .transition()
        .duration(1000)  // Duration of the drawing effect
        .attr("stroke-dashoffset", 0)
        .on("end", function() {
          calendarGroup.selectAll('.annotation-arrow').attr('marker-end', 'url(#arrowhead)')
        });  // Draw the path;
          
      
      // Add text
      calendarGroup.append("text")
          .attr("x",x+cellSize/8)
          .attr("y", y-cellSize/1.6)
          .text(`${message}`)
          .style('opacity','100')
          .style("font-size", "14px")
          .attr('text-anchor','middle')
          .style("fill", "black")
          .classed('annotation',true)
          .classed('roboto',true)
          .call(wrap,cellSize*3)
        ;
  }

    function setup() {
      setupCalendars();

      // Initially display the first month
      transitionToMonth(months[0]);
     

      //makeCalendar(months[0], year);
      //  d3.selectAll('#sticky-thing').classed('hidden',true);
     //   svg.selectAll("circle").classed('hidden', true,); 
     //   svg.selectAll(".line").classed('hidden', false,); 
     //   svg.selectAll("image").classed('hidden', true,); 

     //   svg.selectAll("svg").classed('draw', false,); 
      
    }

    function setupCalendars() {
      svg.selectAll(".calendar-month").remove(); // Clear existing calendars if any
      months.forEach(month => makeCalendar(month, year));
      transitionToMonth(months[0]);
    }

    
  

    // populate stepFunctions
    var stepFunctionsDown = [
        
        
      ];

      for (let i =0; i < events.length+2;i++) {
       
        stepFunctionsDown.push(function() {

          const monthIndex = events[i].date.getUTCMonth(); // 0-based index
  transitionToMonth(monthIndex);

          svg.select(`.event-${i}`)
          .transition()
          .duration(1000)
          .style('fill','#75aadb')

          
          /*
          svg.select(`.event-${i}`)
          .classed('filled-square', true); // Add a class to highlight the square
*/


  


if(events[i].segment !== 'end') { 
  svg.selectAll(`.event-${i-1}`).transition()
    .duration(1000)
    .style('fill','white');
    svg.selectAll(`.event-${i-2}`).transition()
    .duration(1000)
    .style('fill','white');
  }
          if(events[i].segment == 'start') {
            
            const startDate = events[i].date;
            const endDate = events[i+1].date;

            
           highlightDateRange(startDate, endDate);

       
       
              }


  if(events[i].annotation) {
    const targetDate = events[i].target;
    const message = events[i].annotation;
    
  
    addAnnotation(targetDate,message);

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
   
    svg.selectAll('.annotation') 
    .transition()
    .duration(1000)
    .style('opacity','0')
    
    svg.select(`.event-${i}`)
    .transition()
    .duration(1000)
    .style('fill','#75aadb')


    if(events[i].segment == 'start') {
                
      const startDate = events[i].date;
      const endDate = events[i+1].date;

      
     highlightDateRange(startDate, endDate);

 
 
        }


    const monthIndex = events[i].date.getUTCMonth(); // 0-based index
    transitionToMonthUp(monthIndex);
    });

    if(events[i].segment !== 'end') { 
      svg.selectAll(`.event-${i+1}`).transition()
        .duration(1000)
        .style('fill','white');
        svg.selectAll(`.event-${i+2}`).transition()
        .duration(1000)
        .style('fill','white');
      }
             
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
        .style('fill', '#75aadb'); // New highlight color

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
  });
}


function transitionToMonth(newMonthIndex) {
  console.log("currentMonthIndex", currentMonthIndex);
  console.log("newMonthIndex", newMonthIndex);

    // If the new month is the same as the current month, do nothing
    if (currentMonthIndex === newMonthIndex) {
      // Ensure the new month is visible
      svg.select(`.calendar-month-${newMonthIndex}`)
        .style('display', 'block')
        .attr('transform', 'translate(0, 0)'); // Make sure it's positioned correctly
      return;
    }

  const currentCalendar = svg.select(`.calendar-month-${currentMonthIndex}`);
  const newCalendar = svg.select(`.calendar-month-${newMonthIndex}`);

  // Calculate the vertical offset for the transition
  const verticalOffset = height; // This should be the height of the calendar container

  // Move the current month off-screen (upwards)
  currentCalendar
    .transition()
    .duration(1000)
    .attr('transform', `translate(0, ${verticalOffset})`)
    .on('end', function() {
      // After the transition, hide the old calendar
      currentCalendar.style('display', 'none');
    });

  // Position the new month off-screen (downwards) and then slide it into view
  newCalendar
    .attr('transform', `translate(0, ${-verticalOffset})`) // Start off-screen
    .style('display', 'block') // Ensure the new calendar is visible
    .transition()
    .duration(1000)
    .attr('transform', 'translate(0, 0)'); // Slide into view

  // Update the current month index
  currentMonthIndex = newMonthIndex;
}


function transitionToMonthUp(newMonthIndex) {
  console.log("currentMonthIndex", currentMonthIndex);
  console.log("newMonthIndex", newMonthIndex);

  if (currentMonthIndex === newMonthIndex) return; // No need to transition if the month is the same

  const currentCalendar = svg.select(`.calendar-month-${currentMonthIndex}`);
  const newCalendar = svg.select(`.calendar-month-${newMonthIndex}`);

  // Calculate the vertical offset for the transition
  const verticalOffset = height; // This should be the height of the calendar container

  // Move the current month off-screen (upwards)
  currentCalendar
    .transition()
    .duration(1000)
    .attr('transform', `translate(0, ${-verticalOffset})`)
    .on('end', function() {
      // After the transition, hide the old calendar
      currentCalendar.style('display', 'none');
    });

  // Position the new month off-screen (below the visible area) and then slide it into view
  newCalendar
    .attr('transform', `translate(0, ${verticalOffset})`) // Start off-screen (below the visible area)
    .style('display', 'block') // Ensure the new calendar is visible
    .transition()
    .duration(1000)
    .attr('transform', 'translate(0, 0)'); // Slide into view

  // Update the current month index
  currentMonthIndex = newMonthIndex;
}
