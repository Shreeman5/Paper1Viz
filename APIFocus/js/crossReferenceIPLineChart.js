class CrossReferenceIPLineChart{
    static allTheIPs
    static dates 
    static ipsForFunction
    static dataSetForFunction

    constructor(timeRangeList){
        this.timeRangeList = timeRangeList
        this.neededIPs = []
        this.IPsAndCountries = []
        CrossReferenceIPLineChart.allTheIPs = []
        CrossReferenceIPLineChart.dates = timeRangeList
    }

    crossReferenceIPChart(){
        // console.log(CrossReferenceIPLineChart.allTheIPs)
        // console.log(CrossReferenceIPLineChart.allTheIPs)
        // console.log(this.neededIPs)

        let starterNumber = 0
        let endingNumber = 10
        let maxVal = -1
        let dataset = []
        for (let j = 0; j < CrossReferenceIPLineChart.allTheIPs.length; j++){
            let currentBatch = CrossReferenceIPLineChart.allTheIPs[j]
            // console.log(currentBatch)
            
            for (let z = starterNumber; z < this.neededIPs.length && z < endingNumber; z++){
                let specificIPInfo = []
                let myIP = this.neededIPs[z]
                for (let k = 0; k < this.timeRangeList.length; k++){
                    let checkTime = this.timeRangeList[k]
                    if (checkTime in currentBatch){ 
                        let myData = currentBatch[checkTime]
                        let myVal = 0
                        let meanVal = 0
                        let stdVal = 0
                        let minValInArray = 0
                        let maxValInArray = 0
                        for (let i = 0; i < myData.length; i++){
                            let rowData = myData[i]
                            if (rowData['ip'] === myIP){
                                myVal = rowData['count']
                                if (myVal > maxVal){
                                    maxVal = myVal
                                }

                                let myVal2 = rowData['nodes']
                                let allCountValues = []
                                for (let a = 0; a < myVal2.length; a++){
                                    let thisVal = myVal2[a]
                                    allCountValues.push(thisVal['count'])
                                }

                                const standardDeviation = (arr, usePopulation = false) => {
                                    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
                                    const stDev = Math.sqrt(arr
                                                            .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
                                                            .reduce((acc, val) => acc + val, 0) /
                                                            (arr.length - (usePopulation ? 0 : 1)))
                                    return [mean, stDev]
                                };

                                if (allCountValues.length === 1){
                                    meanVal = allCountValues[0]
                                    stdVal = 0
                                }
                                else{
                                    let returnVal = standardDeviation(allCountValues)
                                    meanVal = returnVal[0]
                                    stdVal = returnVal[1]
                                }
                                minValInArray = Math.min(...allCountValues)
                                maxValInArray = Math.max(...allCountValues)
                            }
                        }
                        if (myVal === 0){
                            specificIPInfo.push([checkTime, 0, 0, 0, 0, 0])
                        }
                        else{
                            specificIPInfo.push([checkTime, myVal, meanVal, stdVal, minValInArray, maxValInArray])
                        }
                    }
                    else{
                        specificIPInfo.push([checkTime, 0, 0, 0, 0, 0])
                    }
                }
                dataset.push(specificIPInfo)
            }
            starterNumber += 10
            endingNumber += 10
        }
        // console.log(dataset)
        CrossReferenceIPLineChart.ipsForFunction = this.IPsAndCountries
        CrossReferenceIPLineChart.dataSetForFunction = dataset

        let colorMap = {}
        for (let x = 0; x < dataset.length; x++){
            colorMap[dataset[x]] = this.IPsAndCountries[x]
        }
        // console.log(colorMap)

        this.makeLineChart(dataset, maxVal, colorMap)
    }

    makeLineChart(dataset1, maxValue, colorMap){
        // console.log(dataset1)
        document.getElementById("crossReferenceIPGraphs").style.outline = "5px dashed black"
        document.getElementById("crossReferenceIPGraphs").style.left = "2090px"
        document.getElementById("crossReferenceIPGraphs").style.top = "200px"
        document.getElementById("crossReferenceIPGraphs").style.width = "900px"
        document.getElementById("crossReferenceIPGraphs").style.height = "320px"

        let margin = {top: 50, right: 15, bottom: 110, left: 90},
                    width = 900 - margin.left - margin.right,
                    height = 320 - margin.top - margin.bottom;

        let svg = d3.select("#crossReferenceIPGraphs")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
            .attr("id", "IPline")

        let xScale = d3.scalePoint().domain(this.timeRangeList).range([0, width])
        let yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0])

        let periodValue = document.getElementById("timePeriod").value

        let that = this
        svg.append("g")
        .style("font", "20px times")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .selectAll("text")  
         .style("text-anchor", "start")
         .attr("dx", function() {
            if (periodValue === 'day'){
                return "-5.3em"
            }
            else{
                return "-3.8em"
            }
         })
         .attr("dy", "0em")
         .attr("transform", "rotate(-45)")

        svg.append("g").style("font", "20px times")
         .call(d3.axisLeft(yScale).ticks(4).tickFormat(x => that.better(x)))

        let division = (1/dataset1.length).toFixed(3)
        let colors = []
        let starterValue = 1
        for (let i = 0; i < dataset1.length; i++){
            // console.log(starterValue)
            colors.push(d3.interpolateSpectral(starterValue))
            starterValue = (starterValue - division).toFixed(3)
        }

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
            .attr("r", 12)
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .style("fill", colors[i]);

            let that = this
            let tip2 = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
            this.circles.on("mouseover", function(e, d) {
                d3.select(this).attr('stroke-width', 5).style("stroke", "red")
                let tiptext = "Mean destination node val: " + that.better(d[2]) + '<br>' 
                                + "StDev destination node val: " + that.better(d[3]) + '<br>'
                                + "Min destination val: " + that.better(d[4]) + '<br>'
                                + "Max destination val: " + that.better(d[5]) + '<br>'
                tip2.style("opacity", 5)
                    .html(tiptext)
                    .style("left", (e.pageX) + "px")
                    .style("top", (e.pageY) + "px")
                    .style("width", "450px")
                // console.log(d)
            }).on("mouseout", function(d) {
                d3.select(this).attr('stroke-width', 0)
                tip2.style("opacity", 0)
            })

                  
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
            .style("stroke-width", "4")
            .on('mouseover', function(d, i){
                // console.log(d)
                // console.log(i)
                d3.select(this).attr('stroke-width', 12).style("stroke", "red")//.style('opacity', 1)
            })
            .on('mouseout', function(d, i){
                d3.select(this).attr('stroke-width', 4).style("stroke", "black")//.style('opacity', 0.5)
            })

            let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
            const stuff = document.getElementById('IPline')
            stuff.addEventListener("mouseover", (event) => {
                let IPval = colorMap[event.toElement.__data__]
                let tiptext = null

                if (IPval !== null){
                    tiptext = IPval
                }
                tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY) + "px")
                .style("font", "55px times")
            })
            stuff.addEventListener("mouseout", (event) => {
                tip.style("opacity", 0)
            })
        }

        
        let periodText
        let xPos
        if (periodValue === "month"){
            periodText = "Months"
            xPos = 350
        }
        else if(periodValue === "week"){
            periodText = "Weeks"
            xPos = 330
        }
        else if (periodValue === "day"){
            periodText = "Days"
            xPos = 340
        }
        svg.append('text').attr("transform", "translate(250,-20)").text("Cross Referenced IPs").style("font-size", "25px")
        svg.append('text').attr("transform", "translate("+xPos+",265)").text(periodText).style("font-size", "25px")
        svg.append('text').attr("transform", "translate(-70,135)rotate(270)").text("Frequency").style("font-size", "25px")

        // legend for IP graph

        // document.getElementById("legendForIPGraph").style.outline = "5px dashed black"
        // let svg2 = d3.select("#legendForIPGraph")
        // .append("svg")
        //     .attr("width", 750)
        //     .attr("height", 320)

        // let starterY = 15
        // let starterX = 10
        // for (let i = 0; i < this.IPsAndCountries.length; i++){
        //     if (i % 10 === 0 && i !== 0){
        //         starterX += 220
        //         starterY = 15
        //     }
        //     svg2.append('circle').style("fill", colors[i]).attr("r", 8).attr("cx", starterX).attr("cy", starterY)
        //     svg2.append('text').attr("transform", "translate("+(starterX+10)+","+(starterY+8)+")")
        //         .text(this.IPsAndCountries[i]).style("font-size", "20px")
        //         .style("fill", colors[i]).style("stroke", "black")
        //     starterY +=  31
        // }

        let treemap = new Treemap()
        treemap.buildTreeMap()
        
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

    fetchData(){
        let clusterValue = document.getElementById("data").value
        let periodValue = document.getElementById("timePeriod").value
        
        

        let myOpts = document.getElementById('ipsClicked').options
        let selectedIPslength = myOpts.length - 1
        // console.log(selectedIPslength)

        let divisionBy10s = Math.ceil(selectedIPslength/10)
        for (let i = 0; i < divisionBy10s; i++){
            let requiredIPs = []
            let requiredCountries = []
            for (let j = (10*i)+1; j <= (10*i)+10 && j <= selectedIPslength; j++){
                requiredIPs.push(myOpts[j].value)
                this.neededIPs.push(myOpts[j].value)
                let givenText = myOpts[j].text
                this.IPsAndCountries.push(givenText)
                if (!requiredCountries.includes(givenText.slice(-2))){
                    requiredCountries.push(givenText.slice(-2))
                }
            }
            let that = this
            getData6(clusterValue, requiredCountries, this.timeRangeList, periodValue, requiredIPs).then(function(loadedData){
                CrossReferenceIPLineChart.allTheIPs.push(loadedData)
            })
        }

        let that = this
        setTimeout( function() { that.crossReferenceIPChart(); }, 2000)
    }

}

function exportCRData(){
    console.log(CrossReferenceIPLineChart.dates)
    let allRows = []

    let headerRow = ['IP']
    for (let i = 0; i < CrossReferenceIPLineChart.dates.length; i++) {
        headerRow.push(CrossReferenceIPLineChart.dates[i])
    }
    allRows.push(headerRow)
    

    for (let i = 0; i < CrossReferenceIPLineChart.dataSetForFunction.length; i++){
        let ipRow = [CrossReferenceIPLineChart.ipsForFunction[i]]
        let dateRow = CrossReferenceIPLineChart.dataSetForFunction[i]
        for (let j = 0; j < dateRow.length; j++){
            let element = dateRow[j]
            ipRow.push(better2(element[1]))
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
        return (value/1000000).toFixed(1) + 'M'
    }
    else if (Math.abs(value) >= 10000){
        return (value/1000).toFixed(1) + 'K'
    }
    else if (Math.abs(value) >= 1000){
        return (value/1000).toFixed(1) + 'K'
    }
    else{
        return value.toFixed(1) + ''
    }
}

async function getData6(clusterValue, requiredCountries, timeRangeList, periodValue, requiredIPs){
    let api_address = 'http://128.110.217.95/attacker_activity?cluster='+clusterValue+'&cc='+requiredCountries.join(',')+'&range='+timeRangeList.join(',')+'&period='+periodValue+'&ips='+requiredIPs
    const data = await fetch(api_address)
    const jsonData = await data.json()
    console.log(jsonData)
    return jsonData
}