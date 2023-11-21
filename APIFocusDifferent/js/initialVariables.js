
let selectedTimes = []

function specifyTimePeriod(){
    let givenValue = document.getElementById("data").value
    if (givenValue !== 'Please Select A Cluster'){

        initVariablesBookkeeping()

        findMinMaxDate(givenValue).then(function (minMaxDateData){

            let allTheDays = findAllDays(minMaxDateData)
            let svg = d3.select("#dateHeatMap")

            svg.append("text")
                .attr("x", 0)
                .attr("y", 60)
                .text("Select at least 2 days/weeks/months by clicking the rectangles. Cross time period selection is blocked.  Time period = [Day, Week, Month].")
                .attr("font-size", 18)
                .attr("fill", "red")

            svg.append("text")
                .attr("x", 0)
                .attr("y", 80)
                .text("Once a rectangle of a time period is selected, rectangles of other time periods cannot be chosen unless the existing selection is cleared using the button given.")
                .attr("font-size", 18)
                .attr("fill", "red")


            // fetch required Data 
            fetchSummaryData(givenValue, "day", allTheDays).then(function (summaryData){

                // draw dayRects
                let dayArr = getDayData(allTheDays, summaryData) 
                let years = drawDayHeatMap(dayArr, svg, givenValue)

                //draw weekRects
                let values = getWeekData(years, dayArr)
                let weekArr = values[0]
                let xPositions = values[1]
                drawWeekHeatMap(weekArr.reverse(), svg, givenValue)
                
                //draw monthRects
                let monthXPos = findSpecificPositionsOfMonths(xPositions) 
                let monthArr = getMonthData(years, dayArr, monthXPos)
                // console.log(monthArr)
                drawMonthHeatMap(monthArr.reverse(), svg, givenValue)
            })
        })  
    }
}

function initVariablesBookkeeping(){
    document.getElementById("dateHeatMap").innerHTML = ""
    clearSelectedTimes()
}



async function findMinMaxDate(givenValue){
    let minMaxDatesAPI = 'http://128.110.218.18/timeframe/range?cluster='+givenValue
    const minMaxDate = await fetch(minMaxDatesAPI)
    const jsonMinMaxDate = await minMaxDate.json()
    return jsonMinMaxDate
}

function findAllDays(minMaxDateData){
    let start = minMaxDateData['min']['date']
    start = new Date(start)
    start.setUTCDate(start.getUTCDate()+1)
    let end = minMaxDateData['max']['date']
    end = new Date(end)
    end.setUTCDate(end.getUTCDate()+1)
    const dates = dateRange(start, end);
    return dates
}

function dateRange(startDate, endDate, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      dateArray.push(formatDate(new Date(currentDate)));
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    return dateArray;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


async function fetchSummaryData(cluster, period, range){
    let summaryAPI = 'http://128.110.218.18/summary/bycountry?cluster='+cluster+'&period='+period+'&range='+range.join(",")
    const summaryData = await fetch(summaryAPI)
    const jsonSummaryData = await summaryData.json()
    return jsonSummaryData

}



function getDayData(allTheDates, summaryData){
    let myArr = []
    for (let i = 0; i < allTheDates.length; i++){
        let thisDate = allTheDates[i]
        let counter = 0

        for (let j = 0; j < summaryData.length; j++){
            let continentStuff = summaryData[j]
            let countryStuff = continentStuff['meta']
            for (let k = 0; k < countryStuff.length; k++){
                let indivCountry = countryStuff[k]
                if (thisDate in indivCountry){
                    let dateExistsValues = indivCountry[thisDate]
                    counter += dateExistsValues['attacks']
                }   
                else{
                    counter += 0
                }
            }
        }
        myArr.push({'Date': thisDate, 'Attacks': counter})
    }
    // myArr.push({'Date':"2021-11-30", 'Attacks': 4000000})
    // myArr.push({'Date':"2021-12-01", 'Attacks': 4000000})
    // myArr.push({'Date':"2021-12-02", 'Attacks': 4000000})
    // myArr.push({'Date':"2021-12-03", 'Attacks': 4000000})
    // myArr.push({'Date':"2021-12-04", 'Attacks': 4000000})

    // myArr.push({'Date':"2019-12-04", 'Attacks': 4000000})
    // myArr.push({'Date':"2022-01-08", 'Attacks': 4000000})
    // myArr.push({'Date':"2022-01-03", 'Attacks': 4000000})
    // myArr.push({'Date':"2023-12-08", 'Attacks': 4000000})
    // myArr.push({'Date':"2023-12-09", 'Attacks': 4000000})
    // myArr.push({'Date':"2023-12-10", 'Attacks': 5000000})
    // myArr.push({'Date':"2020-12-10", 'Attacks': 5000000})

    // myArr.push({'Date':"2019-01-01", 'Attacks': 5000000})
    // myArr.push({'Date':"2020-01-01", 'Attacks': 5000000})
    // myArr.push({'Date':"2021-01-01", 'Attacks': 5000000})
    // myArr.push({'Date':"2022-01-01", 'Attacks': 5000000})
    // myArr.push({'Date':"2018-01-01", 'Attacks': 5000000})
    // myArr.push({'Date':"2017-01-01", 'Attacks': 5000000})
    // myArr.push({'Date':"2016-01-01", 'Attacks': 5000000})
    // myArr.push({'Date':"2015-01-01", 'Attacks': 5000000})

    // myArr.push({'Date':"2019-01-04", 'Attacks': 5000000})
    // myArr.push({'Date':"2020-01-04", 'Attacks': 5000000})
    // myArr.push({'Date':"2021-01-04", 'Attacks': 5000000})
    // myArr.push({'Date':"2022-01-04", 'Attacks': 5000000})
    // myArr.push({'Date':"2018-01-04", 'Attacks': 5000000})
    // myArr.push({'Date':"2017-01-04", 'Attacks': 5000000})
    // myArr.push({'Date':"2016-01-04", 'Attacks': 5000000})
    // myArr.push({'Date':"2015-01-04", 'Attacks': 5000000})

    // myArr.push({'Date':"2019-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2020-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2021-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2023-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2015-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2016-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2017-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2018-12-31", 'Attacks': 5000000})


    // myArr.push({'Date':"2019-02-29", 'Attacks': 5000000})
    // myArr.push({'Date':"2020-02-29", 'Attacks': 5000000})
    // myArr.push({'Date':"2021-02-29", 'Attacks': 5000000})
    // myArr.push({'Date':"2022-02-29", 'Attacks': 5000000})
    // myArr.push({'Date':"2023-02-29", 'Attacks': 5000000})
    // myArr.push({'Date':"2015-02-29", 'Attacks': 5000000})
    // myArr.push({'Date':"2016-02-29", 'Attacks': 5000000})
    // myArr.push({'Date':"2017-02-29", 'Attacks': 5000000})
    // myArr.push({'Date':"2018-02-29", 'Attacks': 5000000})

    // myArr.push({'Date':"2019-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2019-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2019-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2019-12-31", 'Attacks': 5000000})
    // myArr.push({'Date':"2019-12-31", 'Attacks': 5000000})

    myArr.sort((a,b) => new Date(a.Date) - new Date(b.Date))
    return myArr
}


function drawDayHeatMap(myArr, svg, clusterVal){
    let dateValues = myArr.map(dv => ({
        date: d3.timeDay(new Date(dv.Date.replace(/-/g, '\/'))),
        value: Number(dv.Attacks)
    }))

    let years_map = d3.group(dateValues, d => d.date.getUTCFullYear())
    let years = Array.from(years_map).reverse().map(d => ({key: d[0]+'', values: d[1]}))
    // console.log(years)

    let neededYears =  years.map(c => c.key)
    // console.log(neededYears)

    const values = dateValues.map(c => c.value);
    const maxValue = d3.max(values);
    const minValue = d3.min(values);

    const cellSize = 30;

    const group = svg.append("g");

    let divHeight
    const year = group
        .selectAll("g")
        .data(years)
        .join("g")
        .attr("transform",(d, i) => {
            divHeight = i*300 + 160
            return `translate(50, ${divHeight})`
        });

    document.getElementById("dateHeatMap").style.height = (divHeight+220) + "px"

    


    year
    .append("text")
    .attr("x", -5)
    .attr("y", -30)
    .attr("text-anchor", "end")
    .attr("font-size", 16)
    .attr("font-weight", 550)
    .attr("transform", "rotate(270)")
    .text(d => {
        // console.log(d)
        return d.key
    });

    const formatDay = d =>
        ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][d.getUTCDay()];
    const countDay = d => d.getUTCDay();
    const timeWeek = d3.utcMonday;
    const formatDate = d3.utcFormat("%x");
    const colorFn = d3
        .scaleSequential(d3.interpolateBuGn)
        .domain([Math.floor(minValue), Math.ceil(maxValue)]);
    const format = d3.format("+.2%");

    year
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(d3.range(7).map(i => new Date(1995, 0, i)))
        .join("text")
        .attr("x", -5)
        .attr("y", d => (countDay(d) + 0.5) * cellSize)
        .attr("dy", "0.31em")
        .attr("font-size", 17)
        .text(formatDay);

    year
        .append("g")
        .selectAll("rect")
        .data(d => d.values)
        .join("rect")
        .attr("width", cellSize - 1.5)
        .attr("height", cellSize - 1.5)
        .attr(
          "x", (d, i) => {
            return timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 10
          })
        .attr("y", d => {
            if (countDay(d.date) === 0){
                return (countDay(d.date) + 6) * cellSize + 0.5
            }
            else{
                return (countDay(d.date) - 1) * cellSize + 0.5
            }
        })
        .attr("fill", d => colorFn(d.value))
        .on("click", function(e, d){
            let pass = 1
            for (let i = 0; i < selectedTimes.length; i++){
                let selectedArr = selectedTimes[i]
                let selectedTP = selectedArr[1]
                if (selectedTP !== 'day'){
                    pass = 0
                }
            }
            if (pass === 1){
                if (this.hasAttribute("stroke-width")){
                    // console.log('yoel romero')
                    this.removeAttribute('stroke-width')
                    this.removeAttribute('stroke')

                    let newArr = []
                    for(let i = 0; i < selectedTimes.length; i++){ 
                        let relevArr = selectedTimes[i]
                        if (relevArr[0] === d && relevArr[1] === 'day'){
                        }
                        else{
                            newArr.push(relevArr)
                        }
                    }
                    selectedTimes = newArr
                    if (selectedTimes.length >= 2){
                        let range = findDayRangeVals(selectedTimes)
                        // console.log(range)
                        fetchSummaryData(clusterVal, "day", range).then(function (summaryData){
                            let vizScreen = new VizScreen(summaryData, range, "days")
                            vizScreen.initializeProgram()
                        })
                    }
                    else{
                        //remove existing things on screen
                        removeThingsOnScreen()
                    }
                }
                else{
                    d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
                    selectedTimes.push([d, "day"])
                    if (selectedTimes.length >= 2){
                        let range = findDayRangeVals(selectedTimes)
                        // console.log(range)
                        fetchSummaryData(clusterVal, "day", range).then(function (summaryData){
                            let vizScreen = new VizScreen(summaryData, range, "days")
                            vizScreen.initializeProgram()
                        })
                    }
                    else{
                        //remove existing things on screen
                        removeThingsOnScreen()
                    }
                }
            }
        })
        .on("mouseover", function(e, d) {
            d3.select(this).style("cursor", "pointer")
            d3.select(this).attr("opacity", 0.2)
        })
        .on("mouseout", function(e, d) {
            d3.select(this).attr("opacity", 1)
        })
        .append("title")
        .text(d => `${formatDate(d.date)}: ${fixNumbers(d.value)}`);


    year
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(d => d.values)
        .join("text")
        .attr(
          "x", (d, i) => {
            if (d.date.getDate() < 10){
                return timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 22
            }
            else{
                return timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 30
            }
          })
        .attr("y", d => {
            if (countDay(d.date) === 0){
                return ((countDay(d.date) + 6) * cellSize + 0.5)+16
            }
            else{
                return ((countDay(d.date) - 1) * cellSize + 0.5)+16
            }
        })
        .text(function(d){
            return d.date.getDate()      
        })
        .attr("font-size", 15)
        .attr("fill", function(d){
            let myString = colorFn(d.value)
            let a = myString.split("(")[1].split(")")[0]
            a = a.split(",")
            let b = a.map(function(x){            
                x = parseInt(x).toString(16); 
                return (x.length==1) ? "0"+x : x;  
            })
            b = b.join("")
            // console.log(b)
            
            return "#"+(Number(`0x1${b}`) ^ 0xFFFFFF).toString(16).substring(1).toUpperCase()
        })



    
    let defs = svg.append("defs");

    //Append a linearGradient element to the defs and give it a unique id
    let linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient");

    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")

    //Set the color for the start (0%)
    linearGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", colorFn(Math.floor(minValue))); //light blue

    //Set the color for the end (100%)
    linearGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", colorFn(Math.ceil(maxValue))); //dark blue

    svg.append("rect")
    .attr("x", 50)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 15)
    .style("fill", "url(#linear-gradient)")
    .attr('stroke', 'black')
    .attr('stroke-width', 2)

    svg.append("text")
    .attr("x", 20)
    .attr("y", 12)
    .text("Min")

    svg.append("text")
    .attr("x", 152)
    .attr("y", 12)
    .text("Max")

    svg.append("text")
    .attr("x", 58)
    .attr("y", 30)
    .text("Day Attacks")


    return neededYears

}


function findDayRangeVals(selectedDays){
    // console.log(selectedDays)
    let myDates = []
    for (let i = 0; i < selectedDays.length; i++){
        let myTime = selectedDays[i]
        let myDay = myTime[0]
        myDates.push(myDay.date)
    }
    myDates.sort(function(a,b){
        return new Date(b) - new Date(a);
    }).reverse()

    let formattedDates = []
    for (let i = 0; i < myDates.length; i++){
        let formattedDate = myDates[i].toISOString().split('T')[0]
        formattedDates.push(formattedDate)
    }
    // console.log(formattedDates)
    return formattedDates
}


function getWeekData(years, myArrForWeeks){
    for (let i = 0; i < years.length; i++){
        years[i] = Number(years[i])
    }


    years.sort(function(a,b){return a-b})
    // console.log(years)
    let myMap = []
    for (let i = 0; i < years.length; i++){
        let thisYearFirstDate = new Date(years[i], 0, 1)
        let myDay = thisYearFirstDate.getDay()
        if (myDay === 2){
            thisYearFirstDate.setDate(thisYearFirstDate.getDate() - 1)
        }
        else if (myDay === 3){
            thisYearFirstDate.setDate(thisYearFirstDate.getDate() - 2)
        }
        else if (myDay === 4){
            thisYearFirstDate.setDate(thisYearFirstDate.getDate() - 3)
        }
        else if (myDay === 5){
            thisYearFirstDate.setDate(thisYearFirstDate.getDate() - 4)
        }
        else if (myDay === 6){
            thisYearFirstDate.setDate(thisYearFirstDate.getDate() - 5)
        }
        else if (myDay === 0){
            thisYearFirstDate.setDate(thisYearFirstDate.getDate() - 6)
        }


        let weeks = []
        while (thisYearFirstDate.getFullYear() <= years[i]){
            let a = thisYearFirstDate.getFullYear() 
            let b = getWeek(thisYearFirstDate)
            // console.log(b)
            let c
            if (b < 10){
                c = a + "-0" + b
            }
            else{
                c = a + '-' + b
            }
            weeks.push([a + "-" + b, new Date(thisYearFirstDate), 0, [], b, c])
            thisYearFirstDate.setDate(thisYearFirstDate.getDate() + 7)
        }

        myMap.push([years[i], weeks])
    }

    // console.log(myMap)
    // console.log(myArrForWeeks)
    let xPositions = []
    for (let i = 0; i < myMap.length; i++){
        let part1 = myMap[i]
        let part2 = part1[1]
        let divisionX = []
        for (let j = 0; j < part2.length; j++){
            let part3 = part2[j]
            let part4 = part3[1]
            let startDate = new Date(part4)
            // console.log('A:', startDate.getMonth())
            let c = startDate.getMonth()
            let d 
            let runningCounter = 0
            for (let a = 0; a <= 6; a++){
                let desiredDate = startDate.toISOString().split('T')[0]
                for (let b = 0; b < myArrForWeeks.length; b++){
                    let thisObject = myArrForWeeks[b]
                    let thisDate = thisObject['Date']
                    if (thisDate === desiredDate){
                        runningCounter += thisObject['Attacks']
                    }
                }
                startDate.setDate(startDate.getDate() + 1)
                if (a === 5){
                    d = startDate.getMonth()
                }
            }
            if (c !== d){
                part3[3] = -1
            }
            else{
                part3[3] = 1
            }
            divisionX.push([c,d])
            part3[2] = runningCounter
        }
        xPositions.push(divisionX)
        // console.log(part1[0])
    }

    return [myMap, xPositions]
}

function getWeek(dt){
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) 
    {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}



function drawWeekHeatMap(weekArr, svg, clusterVal){
    // console.log(weekArr)

    let values = []
    for (let j = 0; j < weekArr.length; j++){
        let highLevel = weekArr[j]
        let tier1 = highLevel[1]
        for (let i = 0; i < tier1.length; i++){
            let tier2 = tier1[i]
            // console.log(tier2[2])
            if (tier2[2] !== 0){
                values.push(tier2[2])
            }
        }
    }
    // console.log(values)


    const maxValue = d3.max(values);
    // console.log(maxValue)
    const minValue = d3.min(values);
    // console.log(minValue)
    
    const group = svg.append("g")

    const year = group
        .selectAll("g")
        .data(weekArr)
        .join("g")
        .attr("transform",(d, i) => {
            // neededPositions.push(i*150 + 45)
            return `translate(50, ${i*300 + 140})`
        });

    year
    .append("text")
    .attr("x", 0)
    .attr("y", 10)
    .attr("text-anchor", "end")
    .attr("font-size", 16)
    .attr("font-weight", 550)
    .text(d => {
        return "Weeks"
    });

    const cellSize = 30;
    const colorFn = d3
    .scaleSequential(d3.interpolateOranges)
    .domain([Math.floor(minValue), Math.ceil(maxValue)]);


    year
        .append("g")
        .selectAll("rect")
        .data(d => d[1])
        .join("rect")
        .attr("width", d => {
            if (d[2] > 0){
                return cellSize - 1.5
            }
            else{
                return 0
            }
        })
        .attr("height", cellSize - 1.5)
        .attr("x", (d, i) => {
            return (i*cellSize) + 10
          })
        .attr("y", -10)
        .attr("fill", d => colorFn(d[2]))
        .on("click", function(e, d){
            let pass = 1
            for (let i = 0; i < selectedTimes.length; i++){
                let selectedArr = selectedTimes[i]
                let selectedTP = selectedArr[1]
                if (selectedTP !== 'week'){
                    pass = 0
                }
            }


            if (pass === 1){
                if (this.hasAttribute("stroke-width")){
                    this.removeAttribute('stroke-width')
                    this.removeAttribute('stroke')

                    let newArr = []
                    for(let i = 0; i < selectedTimes.length; i++){ 
                        let relevArr = selectedTimes[i]
                        if (relevArr[0] === d && relevArr[1] === 'week'){
                        }
                        else{
                            newArr.push(relevArr)
                        }
                    }
                    selectedTimes = newArr
                    if (selectedTimes.length >= 2){
                        let range = findWeekRangeVals(selectedTimes)
                        // console.log(range)
                        fetchSummaryData(clusterVal, "week", range).then(function (summaryData){
                            let vizScreen = new VizScreen(summaryData, range, "weeks")
                            vizScreen.initializeProgram()
                        })
                    }
                    else{
                        //remove existing things on screen
                        removeThingsOnScreen()
                    }
                }
                else{
                    let threshold = 1
                    for (let i = 0; i < selectedTimes.length; i++){
                        let selectedArr = selectedTimes[i]
                        let a = selectedArr[0]
                        if (a[0] === d[0]){
                            threshold = 0
                        }
                    }

                    if(threshold === 1){
                        d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
                        selectedTimes.push([d, "week"])
                        if (selectedTimes.length >= 2){
                            let range = findWeekRangeVals(selectedTimes)
                            // console.log(range)
                            fetchSummaryData(clusterVal, "week", range).then(function (summaryData){
                                let vizScreen = new VizScreen(summaryData, range, "weeks")
                                vizScreen.initializeProgram()
                            })
                        }
                        else{
                            //remove existing things on screen
                            removeThingsOnScreen()
                        }
                    }
                }
            }
        })
        .on("mouseover", function(e, d) {
            d3.select(this).style("cursor", "pointer")
            d3.select(this).attr("opacity", 0.2)
        })
        .on("mouseout", function(e, d) {
            d3.select(this).attr("opacity", 1)
        })
        
        .append("title")
        .text(d => `${d[0]}: ${fixNumbers(d[2])}`);


    year
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(d => d[1])
        .join("text")
        .attr("x", (d, i) => {
            if (d[4] < 10){
                return (i*cellSize) + 22
            }
            else{
                return (i*cellSize) + 28
            }
        })
        .attr("y", 5)
        .text(function(d){
            // console.log(d)
            return d[4]
        })
        .attr("font-size", 15)
        .attr("fill", function(d){
            // console.log(d)
            let myString = colorFn(d[2])
            let a = myString.split("(")[1].split(")")[0]
            a = a.split(",")
            let b = a.map(function(x){            
                x = parseInt(x).toString(16); 
                return (x.length==1) ? "0"+x : x;  
            })
            b = b.join("")
            // console.log(b)
            
            return "#"+(Number(`0x1${b}`) ^ 0xFFFFFF).toString(16).substring(1).toUpperCase()
        })


    let defs = svg.append("defs");

    //Append a linearGradient element to the defs and give it a unique id
    let linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient-2");

    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")

    //Set the color for the start (0%)
    linearGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", colorFn(Math.floor(minValue))); //light blue

    //Set the color for the end (100%)
    linearGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", colorFn(Math.ceil(maxValue))); //dark blue

    svg.append("rect")
    .attr("x", 220)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 15)
    .style("fill", "url(#linear-gradient-2)")
    .attr('stroke', 'black')
    .attr('stroke-width', 2)

    svg.append("text")
    .attr("x", 190)
    .attr("y", 12)
    .text("Min")

    svg.append("text")
    .attr("x", 322)
    .attr("y", 12)
    .text("Max")

    svg.append("text")
    .attr("x", 225)
    .attr("y", 30)
    .text("Week Attacks")
}

function findWeekRangeVals(selectedWeeks){
    let myDates = []
    for (let i = 0; i < selectedWeeks.length; i++){
        let relevElem = selectedWeeks[i]
        let myWeekObj = relevElem[0]
        myDates.push(myWeekObj[5])
    }

    // var L = ["2014 - 03", "2013 - 01", "2013 - 02", "2014 - 03"]
    myDates.sort(function(a, b){ 
        var y1 = 1 * a.split("-")[0],
            y2 = 1* b.split("-")[0],
            m1 = 1 * a.split("-")[1],
            m2 = 1 * b.split("-")[1];
        if (y1 != y2) return d3.ascending(y1, y2);
        else return d3.ascending(m1, m2);
    })
    // console.log(selectedTimes)
    return myDates
}



function findSpecificPositionsOfMonths(xPositions) {
    // console.log(xPositions)

    let similArr = [[0, 0], [1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7], [8,8], [9,9], [10,10], [11,11]]

    let iPos = []
    for (let i = 0; i < xPositions.length; i++){
        let relevArr = xPositions[i]
        // console.log(relevArr)

        let iPos2 = []
        for (let j = 0; j < similArr.length; j++){
            let myVal = similArr[j]
            
            if (myVal[0] === 0 && myVal[1] === 0){
                let thisIndex = relevArr.findIndex(x => x[0] === 0 && x[1] === 0)
                if (thisIndex - 1 <= -1){
                    iPos2.push([thisIndex, 0])
                }
                else{
                    iPos2.push([thisIndex - 1, -1])
                }
            }
            else if (myVal[0] === 11 && myVal[1] === 11){
                let thisIndex1 = relevArr.findIndex(x => x[0] === j && x[1] === j)
                let checkArr = relevArr[thisIndex1 - 1]
                if (checkArr[0] === checkArr[1]){
                    iPos2.push([thisIndex1, 0])
                }
                else{
                    iPos2.push([thisIndex1-1, -1])
                }

                let thisIndex2 = relevArr.findLastIndex(x => x[0] === j && x[1] === j)
                if (thisIndex2 + 1 >= relevArr.length){
                    iPos2.push([thisIndex2, 0])
                }
                else{
                    iPos2.push([thisIndex2+1, -1])
                }
            }
            else{
                let thisIndex1 = relevArr.findIndex(x => x[0] === j && x[1] === j)
                let checkArr = relevArr[thisIndex1 - 1]
                if (checkArr[0] === checkArr[1]){
                    iPos2.push([thisIndex1, 0])
                }
                else{
                    iPos2.push([thisIndex1-1, -1])
                }
            }
        }
        iPos.push(iPos2)
    }

    // console.log(iPos)
    

    let neededXPos = []
    for (let i = 0; i < iPos.length; i++){
        let relevArr = iPos[i]
        let neededXPos2 = []
        for (let j = 0 ; j < relevArr.length - 1; j++){
            // neededXPos2.push([relevArr[j]+0.5, relevArr[j+1]+0.5])
            let a,b

            let relevArr2 = relevArr[j]
            if (relevArr2[1] === 0){
                a = relevArr2[0]
            }
            else{
                a = relevArr2[0] + 0.5
            }


            let relevArr3 = relevArr[j+1]
            if (relevArr3[1] === 0){
                b = relevArr3[0]
            }
            else{
                b = relevArr3[0] + 0.5
            }


            neededXPos2.push([a,b])
        }
        neededXPos.push(neededXPos2)
    }

    // console.log(neededXPos)
    return neededXPos
}


function getMonthData(years, myArrForWeeks, monthXPos){
    for (let i = 0; i < years.length; i++){
        years[i] = Number(years[i])
    }


    years.sort(function(a,b){return a-b})
    let myMap = []
    for (let i = 0; i < years.length; i++){
        let months = []
        for (let j = 0; j < 12; j++){
            let firstDate = new Date(years[i], j, 1)
            let a = firstDate.getFullYear() 
            let b = (firstDate.getMonth() + 1)

            let c 
            if (b < 10){
                c = a + '-0' + b
            }
            else{
                c = a + '-' + b
            }

            let myVal = monthXPos[i]
            let myVal2 = myVal[j]
            months.push([a + "-" + b, new Date(firstDate), 0, firstDate.getMonth(), myVal2, c])
        }
        myMap.push([years[i], months])
    }

    // console.log(myMap)

    for (let i = 0; i < myMap.length; i++){
        let part1 = myMap[i]
        let part2 = part1[1]
        for (let j = 0; j < part2.length; j++){
            let part3 = part2[j]
            let part4 = part3[1]
            let startDate = new Date(part4)
            let runningCounter = 0

            let part5 = part3[3]

            while(startDate.getMonth() === part5){
                let desiredDate = startDate.toISOString().split('T')[0]
                for (let b = 0; b < myArrForWeeks.length; b++){
                    let thisObject = myArrForWeeks[b]
                    let thisDate = thisObject['Date']
                    if (thisDate === desiredDate){
                        runningCounter += thisObject['Attacks']
                    }
                }
                startDate.setDate(startDate.getDate() + 1)
                // console.log(startDate.getDate())
            }
            part3[2] = runningCounter
        }
    }


    // console.log(myMap)

    return myMap
}



function drawMonthHeatMap(monthArr, svg, clusterVal){
    // console.log(weekArr)

    let values = []
    for (let j = 0; j < monthArr.length; j++){
        let highLevel = monthArr[j]
        let tier1 = highLevel[1]
        for (let i = 0; i < tier1.length; i++){
            let tier2 = tier1[i]
            // console.log(tier2[2])
            if (tier2[2] !== 0){
                values.push(tier2[2])
            }
        }
    }
    // console.log(values)


    const maxValue = d3.max(values);
    // console.log(maxValue)
    const minValue = d3.min(values);
    // console.log(minValue)
    
    const group = svg.append("g")

    const year = group
        .selectAll("g")
        .data(monthArr)
        .join("g")
        .attr("transform",(d, i) => {
            // neededPositions.push(i*150 + 45)
            return `translate(50, ${i*300 + 110})`
        });
// lineChart.append('text').text('Time Periods').attr('x', 430).attr('y', 970).attr("class", "axisxattacks").attr("id", "t1")
        // lineChart.append('text').text('Attacks').attr('x', -550).attr('y', 30).attr('transform', 'rotate(-90)').attr("class", "axisxattacks").attr("id", "t2")
        // lineChart.append('text').text('Attacks Over The Time Periods').attr('x', 380).attr('y', 20).attr("class", "axisxattacks").attr("id", "t3")
    year
    .append("text")
    .attr("x", 7)
    .attr("y", 10)
    .attr("text-anchor", "end")
    .attr("font-size", 16)
    .attr("font-weight", 550)
    .text(d => {
        return "Months"
    });

    const cellSize = 30;
    const colorFn = d3
    .scaleSequential(d3.interpolatePurples)
    .domain([Math.floor(minValue), Math.ceil(maxValue)]);


    year
        .append("g")
        .selectAll("rect")
        .data(d => d[1])
        .join("rect")
        .attr("width", d => {
            if (d[2] > 0){
                let arr = d[4]
                let width = arr[1] - arr[0]
                return (cellSize - 0.5) * width
            }
            else{
                return 0
            }
        })
        .attr("height", cellSize - 1.5)
        .attr("x", (d, i) => {
            if (d[2] > 0){
                let arr = d[4]
                let start = arr[0]
                // console.log((start*cellSize) + 10)
                // console.log((start*cellSize))
                return (start*cellSize) + 10
            }
          })
        .attr("y", -10)
        .attr("fill", d => colorFn(d[2]))
        .on("click", function(e, d){
            let pass = 1
            for (let i = 0; i < selectedTimes.length; i++){
                let selectedArr = selectedTimes[i]
                let selectedTP = selectedArr[1]
                if (selectedTP !== 'month'){
                    pass = 0
                }
            }
            if (pass === 1){
                if (this.hasAttribute("stroke-width")){
                    this.removeAttribute('stroke-width')
                    this.removeAttribute('stroke')
                    
                    let newArr = []
                    for(let i = 0; i < selectedTimes.length; i++){ 
                        let relevArr = selectedTimes[i]
                        if (relevArr[0] === d && relevArr[1] === 'month'){
                        }
                        else{
                            newArr.push(relevArr)
                        }
                    }
                    selectedTimes = newArr
                    if (selectedTimes.length >= 2){
                        let range = findMonthRangeVals(selectedTimes)
                        //console.log(range)
                        fetchSummaryData(clusterVal, "month", range).then(function (summaryData){
                            let vizScreen = new VizScreen(summaryData, range, "months")
                            vizScreen.initializeProgram()
                        })
                    }
                    else{
                        //remove existing things on screen
                        removeThingsOnScreen()
                    }
                }
                else{
                    d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
                    selectedTimes.push([d, "month"])
                    if (selectedTimes.length >= 2){
                        let range = findMonthRangeVals(selectedTimes)
                        //console.log(range)
                        fetchSummaryData(clusterVal, "month", range).then(function (summaryData){
                            let vizScreen = new VizScreen(summaryData, range, "months")
                            vizScreen.initializeProgram()
                        })
                    }
                    else{
                        //remove existing things on screen
                        removeThingsOnScreen()
                    }
                }
            }
        })
        .on("mouseover", function(e, d) {
            d3.select(this).style("cursor", "pointer")
            d3.select(this).attr("opacity", 0.2)
        })
        .on("mouseout", function(e, d) {
            d3.select(this).attr("opacity", 1)
        })
        
        .append("title")
        .text(d => `${d[0]}: ${fixNumbers(d[2])}`);

    
    year
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(d => d[1])
        .join("text")
        .attr("x", (d, i) => {
            // console.log(d)
            let arr = d[4]
            let start = arr[0] * cellSize
            let end = arr[1] * cellSize
            let mid = (start+end)/2
            // console.log((start*cellSize) + 10)
            return mid + 25
        })
        .attr("y", 8)
        .text(function(d){
            if (d[3] === 0){
                return "JAN"
            }
            else if (d[3] === 1){
                return "FEB"
            }
            else if (d[3] === 2){
                return "MAR"
            }
            else if (d[3] === 3){
                return "APR"
            }
            else if (d[3] === 4){
                return "MAY"
            }
            else if (d[3] === 5){
                return "JUN"
            }
            else if (d[3] === 6){
                return "JUL"
            }
            else if (d[3] === 7){
                return "AUG"
            }
            else if (d[3] === 8){
                return "SEP"
            }
            else if (d[3] === 9){
                return "OCT"
            }
            else if (d[3] === 10){
                return "NOV"
            }
            else if (d[3] === 11){
                return "DEC"
            }
        })
        .attr("font-size", 18)
        .attr("fill", function(d){
            // console.log(d)
            let myString = colorFn(d[2])
            let a = myString.split("(")[1].split(")")[0]
            a = a.split(",")
            let b = a.map(function(x){            
                x = parseInt(x).toString(16); 
                return (x.length==1) ? "0"+x : x;  
            })
            b = b.join("")
            // console.log(b)
            
            return "#"+(Number(`0x1${b}`) ^ 0xFFFFFF).toString(16).substring(1).toUpperCase()
        })

    let defs = svg.append("defs");

    //Append a linearGradient element to the defs and give it a unique id
    let linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient-3");

    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")

    //Set the color for the start (0%)
    linearGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", colorFn(Math.floor(minValue))); //light blue

    //Set the color for the end (100%)
    linearGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", colorFn(Math.ceil(maxValue))); //dark blue

    svg.append("rect")
    .attr("x", 390)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 15)
    .style("fill", "url(#linear-gradient-3)")
    .attr('stroke', 'black')
    .attr('stroke-width', 2)

    svg.append("text")
    .attr("x", 360)
    .attr("y", 12)
    .text("Min")

    svg.append("text")
    .attr("x", 492)
    .attr("y", 12)
    .text("Max")

    svg.append("text")
    .attr("x", 395)
    .attr("y", 30)
    .text("Month Attacks")
}


function findMonthRangeVals(selectedMonths){
    // console.log(selectedMonths)
    let myDates = []
    for (let i = 0; i < selectedMonths.length; i++){
        let relevElem = selectedMonths[i]
        let myMonthObj = relevElem[0]
        myDates.push(myMonthObj[5])
    }

    // var L = ["2014 - 03", "2013 - 01", "2013 - 02", "2014 - 03"]
    myDates.sort(function(a, b){ 
        var y1 = 1 * a.split("-")[0],
            y2 = 1* b.split("-")[0],
            m1 = 1 * a.split("-")[1],
            m2 = 1 * b.split("-")[1];
        if (y1 != y2) return d3.ascending(y1, y2);
        else return d3.ascending(m1, m2);
    })
    // console.log(selectedTimes)
    return myDates
}


function fixNumbers(value){
    if (Math.abs(value) >= 1000000){
        return (value/1000000).toFixed(1) + 'M'
    }
    else if (Math.abs(value) >= 100000){
        return (value/1000000).toFixed(2) + 'M'
    }
    else if (Math.abs(value) >= 10000){
        return (value/1000).toFixed(1) + 'K'
    }
    else if (Math.abs(value) >= 1000){
        return (value/1000).toFixed(2) + 'K'
    }
    else{
        return value.toFixed(1) + ''
    }
}

function clearSelectedTimes(){
    // console.log('here')
    let rects = document.querySelectorAll('[stroke="black"]')
    for (let i = 0; i < rects.length; i++){
        rects[i].removeAttribute("stroke")
        rects[i].removeAttribute('stroke-width')
    }
    selectedTimes = []

    removeThingsOnScreen()
}


function removeThingsOnScreen(){
    // let linechartElement = document.getElementById("line-chart-aa")
    // linechartElement.style.height = 0+"px"
    document.getElementById("resetButton").style.visibility = "hidden"
    document.getElementById("countryOptions").style.visibility = "hidden"
    document.getElementById("baseTPDiv").style.visibility = "hidden"
    document.getElementById("dependentDiv").style.visibility = "hidden"
    document.getElementById("independentDiv").style.visibility = "hidden"
    document.getElementById("sortTPDiv").style.visibility = "hidden"
}






