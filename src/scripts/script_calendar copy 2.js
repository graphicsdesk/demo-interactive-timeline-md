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
  



document.addEventListener("DOMContentLoaded", function() {
    let width, height;
    const vbMinX = 0;
    const vbMinY = 0;

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

    function createCalendar(month, year, container) {
        width = document.body.clientWidth;
        height = window.innerHeight;

        const cellSize = Math.min(width / 7, height / 8); // Adjust cell size based on viewport
        const firstDay = new Date(year, month, 1).getDay(); // Day of the week for the 1st of the month
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month

        // Create SVG container
        const svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("display", "block")
            .style("margin", "auto")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("background", "#fff");

        // Add month label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", cellSize / 4)
            .attr("text-anchor", "middle")
            .text(monthNames[month] + " " + year)
            .style("font-weight", "bold")
            .style("font-size", "16px");

        // Add day headers
        svg.selectAll(".header")
            .data(daysOfWeek)
            .enter().append("text")
            .attr("x", (d, i) => i * cellSize + cellSize / 2)
            .attr("y", cellSize / 2 + 10)
            .attr("text-anchor", "middle")
            .text(d => d)
            .style("font-weight", "bold");

        // Add day cells
        svg.selectAll(".day")
            .data(d3.range(daysInMonth))
            .enter().append("text")
            .attr("x", (d, i) => ((i + firstDay) % 7) * cellSize + cellSize / 2)
            .attr("y", d => Math.floor((d + firstDay) / 7) * cellSize + cellSize + 30)
            .attr("text-anchor", "middle")
            .text(d => d + 1)
            .style("font-size", "14px");

        // Highlight events
        events.forEach(event => {
            if (event.date.getUTCMonth() === month && event.date.getUTCFullYear() === year) {
                const day = event.date.getUTCDate();
                const x = ((day + firstDay - 1) % 7) * cellSize + cellSize / 2;
                const y = Math.floor((day + firstDay - 1) / 7) * cellSize + cellSize + 30;

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

        // Add grid lines
        svg.selectAll("line.vertical")
            .data(d3.range(8))
            .enter().append("line")
            .attr("class", "vertical")
            .attr("x1", d => d * cellSize)
            .attr("y1", 0)
            .attr("x2", d => d * cellSize)
            .attr("y2", cellSize * 8)
            .attr("stroke", "#ddd");

        svg.selectAll("line.horizontal")
            .data(d3.range(8))
            .enter().append("line")
            .attr("class", "horizontal")
            .attr("x1", 0)
            .attr("y1", d => d * cellSize)
            .attr("x2", cellSize*7)
            .attr("y2", d => d * cellSize)
            .attr("stroke", "#ddd");
    }

    const months = [8, 9, 10, 11, 12]; // August to December
    const year = 2024;

    /*
    months.forEach((month) => {
        createCalendar(month, year, '#calendars');
    });
    */
    createCalendar(8, year, '#calendars');
});
