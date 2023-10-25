class IPLineChart{
    static ipData
    static indivIPs
    static resendData
    static resendTimes
    static resendCountries

    constructor(givenDate, loadedData, givenCountries, neededData, selected){
        this.givenDate = givenDate
        this.loadedData = loadedData
        this.givenCountries = givenCountries
        IPLineChart.ipData = loadedData
        IPLineChart.resendData = neededData
        IPLineChart.resendTimes = selected
        IPLineChart.resendCountries = givenCountries
    }

    makeLineChart(){
        let relevantIPs = this.loadedData[this.givenDate]
        for (let i = 0; i < relevantIPs.length; i++){
            let givenIP = relevantIPs[i]
            for (const [key, value] of Object.entries(this.loadedData)) {
                let checker = 0
                for (let j = 0; j < value.length; j++){
                    let ipInfo = value[j]
                    if (ipInfo['ip'] === givenIP['ip']){
                        checker = 1
                    }
                }
                if (checker === 0){
                    value.push({'ip':givenIP['ip'], 'count':0})
                }
            }
        }
        
        // console.log(this.loadedData)
        

        let computedLength = Object.keys(this.loadedData).length
        let widthNumber = 0
        let assignedWidth = ''
        if (computedLength <= 6){
            widthNumber = 900
            assignedWidth = widthNumber + 'px'
        }
        else{
            widthNumber = 900 + 100 * (computedLength - 6)
            assignedWidth = widthNumber + 'px'
        }
        document.getElementById("attacksAndAttackers").style.width = assignedWidth

        // console.log(widthNumber)

        let margin = {top: 50, right: 55, bottom: 60, left: 275},
                    width = widthNumber - margin.left - margin.right,
                    height = 400 - margin.top - margin.bottom;

        let svg = d3.select("#attacksAndAttackers")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        let timePeriods = []
        let valuesReceived = []
        for (const [key, value] of Object.entries(this.loadedData)) {
            timePeriods.push(key)
            for (let j = 0; j < value.length; j++){
                let ipInfo = value[j]
                valuesReceived.push(ipInfo['count'])
            }
        }
        let maxValue = Math.max(...valuesReceived)
        // console.log(maxValue)

        let xScale = d3.scalePoint().domain(timePeriods).range([0, width])
        let yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0])

        let that = this
        svg.append("g")
        .style("font", "20px times")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));

        svg.append("g").style("font", "20px times")
         .call(d3.axisLeft(yScale).tickFormat(x => that.better(x)))

        let givenIPs = []
        for (let i = 0; i < relevantIPs.length; i++){
            let myIP = relevantIPs[i]
            givenIPs.push(myIP['ip'])
        }
        // console.log(givenIPs)
        IPLineChart.indivIPs = givenIPs
        
        let dataset1 = []
        for (let i = 0; i < givenIPs.length; i++){ 
            let requiredArray = []
            for (const [key, value] of Object.entries(this.loadedData)) {
                for (let j = 0; j < value.length; j++){
                    let ipInfo = value[j]
                    if (ipInfo['ip'] === givenIPs[i]){
                        requiredArray.push([key, ipInfo['count']])
                    }
                }
            }
            dataset1.push(requiredArray)
        }
        // console.log(dataset1)
        let that2 = this
        let starterY = -35
        for (let i = 0; i < givenIPs.length; i++){
            svg.append('circle').style("fill", d3.schemeTableau10[i]).attr("r", 10).attr("cx", -260).attr("cy", starterY)
            let myTexts = svg.append('text').attr("transform", "translate(-245,"+(starterY+8)+")")
                .text(givenIPs[i]).style("font-size", "20px")
                .style("fill", d3.schemeTableau10[i])
            starterY +=  41

            let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
            myTexts.on("mouseover", function(e) {
                let tiptext = "Click to add "+e.srcElement.innerHTML+ " to the 'Selected IPs' list."
                tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
            })
            .on("mouseout", function() {
                tip.style("opacity", 0)
            })

            myTexts.on("click", function(e) {
                //console.log(e.srcElement.innerHTML)
                let optionValue = e.srcElement.innerHTML
                let exists = false; 
                $('#ipsClicked  option').each(function(){
                    if (this.value == optionValue) {
                        exists = true;
                    }
                });
                
                if (exists === false){
                    let ipsClicked = document.getElementById("ipsClicked")
                    let option = document.createElement("option")
                    option.text = optionValue + '--' + that2.givenCountries
                    option.value = optionValue
                    ipsClicked.add(option)
                }

                console.log()
                if ($('#ipsClicked').children('option').length > 1){

                    let dateValue = document.getElementById("timePeriod").value
                    if (dateValue === "month"){
                        document.getElementById("startMonthPick").style.visibility = "visible"
                        document.getElementById("endMonthPick").style.visibility = "visible"
                    }
                    else if (dateValue === "week"){
                        document.getElementById("startWeekPick").style.visibility = "visible"
                        document.getElementById("endWeekPick").style.visibility = "visible"
                    }
                    else if (dateValue === "day"){
                        document.getElementById("startDatePick").style.visibility = "visible"
                        document.getElementById("endDatePick").style.visibility = "visible"
                    }
                    document.getElementById("crButton").style.visibility = "visible"
                    
                }
                
            })
        }

        console.log(dataset1)

        
        for (let i = 0; i < dataset1.length; i++){
            this.circles = svg.append('g')
            .selectAll("dot")
            .data(dataset1[i])
            .enter()
            .append("circle")
            .attr("cx", function (d) { 
                return xScale(d[0]); 
            } )
            .attr("cy", function (d) { return yScale(d[1]); } )
            .attr("r", 10)
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .style("fill", d3.schemeTableau10[i]);

                  
            let line = d3.line()
            .x(function(d) { return xScale(d[0]); }) 
            .y(function(d) { return yScale(d[1]); }) 
            .curve(d3.curveMonotoneX)
            
            svg.append("path")
            .datum(dataset1[i]) 
            .attr("class", "line") 
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "2");
        }
        
        svg.append('text').attr("transform", "translate("+(widthNumber/2 - 500)+",-20)").text(this.givenCountries[0]+"[Top 10 IPs of "+this.givenDate+" at most 7 TPs before and after]").style("font-size", "25px")
        svg.append('text').attr("transform", "translate("+(widthNumber/2 - 230)+",335)").text("Time Periods").style("font-size", "25px")
        svg.append('text').attr("transform", "translate(-70,190)rotate(270)").text("Frequency").style("font-size", "25px")

        let starterValue = document.getElementById('predictionTable').offsetWidth + 680
        let barGraphStarter = starterValue + "px" 
        let barGraphStarter2 = starterValue+190 + "px"
        document.getElementById("exportButton").style.visibility = "visible"
        document.getElementById("exportButton").style.left = barGraphStarter

        document.getElementById("goBackButton").style.visibility = "visible"
        document.getElementById("goBackButton").style.left = barGraphStarter2
    }

    better(value){
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


}


function goBack(){
    document.getElementById("exportButton").style.visibility = "hidden"
    document.getElementById("goBackButton").style.visibility = "hidden"
    document.getElementById("attacksAndAttackers").innerHTML = ""
    let aAndALineChart = new AttacksAndAttackers(IPLineChart.resendCountries)
    aAndALineChart.dataForSecondViz(IPLineChart.resendData, IPLineChart.resendTimes)
}

function exportData(){
    console.log(IPLineChart.ipData)
    let allRows = []

    let headerRow = ['IP']
    for (const [key, value] of Object.entries(IPLineChart.ipData)) {
        headerRow.push(key)
    }
    allRows.push(headerRow)

    for (let i = 0; i < IPLineChart.indivIPs.length; i++){ 
        let ipRow = [IPLineChart.indivIPs[i]]
        for (const [key, value] of Object.entries(IPLineChart.ipData)) {
            for (let j = 0; j < value.length; j++){
                let thing = value[j]
                if (thing['ip'] === IPLineChart.indivIPs[i]){
                    ipRow.push(better2(thing['count']))
                }
            }
        }
        allRows.push(ipRow)
    }
    // console.log(allRows)

    let csvContent = "data:text/csv;charset=utf-8,";
    
    allRows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    })

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri)
}

function better2(value){
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
