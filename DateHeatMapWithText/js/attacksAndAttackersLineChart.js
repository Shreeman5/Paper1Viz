class AttacksAndAttackers {


    constructor(givenCountries){
        this.givenCountries = givenCountries
        //console.log(givenCountries)
    }

    dataForSecondViz(neededData, selected, barChartData){
        // console.log(neededData)
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

        let widthNumber = 0
        let assignedWidth = ''

        if (checkedBoxes.length <= 2){
            widthNumber = 550
            assignedWidth = widthNumber + 'px'
        }
        else{
            widthNumber = 550 + 200 * (checkedBoxes.length - 2)
            assignedWidth = widthNumber + 'px'
        }
        
        let starterValue = document.getElementById('predictionTable').offsetWidth + 680
        let barGraphStarter = starterValue + "px"  

        document.getElementById("attacksAndAttackers").style.outline = "5px dashed black"
        document.getElementById("attacksAndAttackers").style.left = barGraphStarter
        document.getElementById("attacksAndAttackers").style.top = "570px"
        document.getElementById("attacksAndAttackers").style.width = assignedWidth
        document.getElementById("attacksAndAttackers").style.height = "400px"


        let margin = {top: 100, right: 25, bottom: 60, left: 95},
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
        for (const [key, value] of Object.entries(neededData)) {
            timePeriods.push(key)
            for (const [key2, value2] of Object.entries(value)){
                valuesReceived.push(value2)
            }
        }
        let maxValue = Math.max(...valuesReceived)
        // console.log(timePeriods)
        // console.log(maxValue)

        let idSelector = function() { return this.id; }
        let checkedBoxes2 = $(":checkbox:checked").map(idSelector).get()
        //console.log(checkedBoxes)
        let weekData = []
        for(let i = 0; i < checkedBoxes2.length;i++){
            weekData.push(checkedBoxes2[i])
        }

        this.hardcodedKeys = {}
        for (let j = 0; j < timePeriods.length; j++){
            this.hardcodedKeys[timePeriods[j]] = weekData[j]
        }
        
        let weekDataPair = []
        for (let w = 0; w < weekData.length - 1; w++){
            weekDataPair.push([weekData[w], weekData[w+1]])
        }
        // console.log(weekDataPair)

        let xScale = d3.scalePoint().domain(timePeriods).range([0, width])
        let yScale = d3.scaleLog().clamp(true).domain([1, maxValue]).range([height, 0])

        let that = this
        svg.append("g")
        .style("font", "20px times")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale).tickFormat(x => {
            return that.hardcodedKeys[x]
         }));
         
        
        
        let xPositions = []
        for (let i = 0; i < timePeriods.length - 1; i++){
            let a = Math.floor(xScale(timePeriods[i]) + 10)
            let b = Math.floor(xScale(timePeriods[i+1]) - 10)
            xPositions.push([a, b])
        }
        
        svg.append("g").style("font", "20px times")
         .call(d3.axisLeft(yScale).tickFormat(x => {
            let integerCheck = Math.log10(x)
            if (Number.isInteger(integerCheck)){
                return that.better(x)
            }
        }))

        // start bargraph here
        let arr = []
        const entries = Object.entries(barChartData)  
        for(let i = 0; i < entries.length;i++){
            arr.push(entries[i][1])
        }

        let arr_vals = []
        let barChartInput = []
        let pieChartInput = []
        let i = 0
        for (let entry of arr) {
            let val0 = entry['uat_'+selected[i]]
            arr_vals.push(val0)
            let val1 = entry['cat_'+selected[i]]
            arr_vals.push(val1)
            let val2 = entry['cat_'+selected[i+1]]
            arr_vals.push(val2)
            let val3 = entry['uat_'+selected[i+1]]
            arr_vals.push(val3)
            barChartInput.push([val0, val1, val2, val3])

            let val4 = entry['uatt_'+selected[i]]
            let val5 = entry['catt']
            let val6 = entry['uatt_'+selected[i+1]]
            pieChartInput.push([val4, val5, val6])

            i = i+1
        }
        // console.log(xPositions)
        // console.log(barChartInput)


        for (let i = 0; i < xPositions.length; i++){
            let myPos = xPositions[i]
            let starter = myPos[0]
            let ender = myPos[1]
            let myPair = weekDataPair[i]
            let division = Math.floor((ender - starter)/4)
            let subPosArray = []
            for (let k = starter; k < ender && subPosArray.length <= 4; k += division){
                subPosArray.push(k)
            }
            // console.log(subPosArray)
            let relevantArr = barChartInput[i]
            let colors = ['grey','#377eb8','#377eb8', 'green']
            for (let j = 0; j < relevantArr.length; j++){
                
                this.firstRect = svg.append('rect').style("fill", colors[j])
                .style("opacity", 0.2).style("stroke", "black")
                .style("stroke-width", "5px").attr("x", subPosArray[j])
                .attr("y", function(){
                    return yScale(relevantArr[j])
                })
                .attr("height", function(){
                    return height - yScale(relevantArr[j])
                }).attr("width", division)

                let that = this
                let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
                this.firstRect.on("mouseover", function(e, d, i) {
                    d3.select(this).style("stroke-width", "8px").style("stroke", "red")
                    let stuff = e.target.outerHTML
                    let substring = "y=\""
                    let indexStart = stuff.indexOf(substring) + 3
                    let indexEnd = stuff.indexOf(substring) + 3
                    while(stuff.charAt(indexEnd) != '\"'){
                        indexEnd += 1
                    }
                    let desiredNumber = Number(stuff.substring(indexStart, indexEnd))
                    let myNumber = yScale.invert(desiredNumber)
                    myNumber = that.better(myNumber)

                    let tiptext
                    if (j === 0){
                        tiptext = "Attacks of "+myPair[0]+" made by attackers unique to "+myPair[0]+": " + myNumber + "."
                    }
                    else if (j === 1){
                        tiptext = "Attacks of "+myPair[0]+" made by attackers common to "+myPair[0]+" & "+myPair[1]+": " + myNumber + "."
                    }
                    else if (j === 2){
                        tiptext = "Attacks of "+myPair[1]+" made by attackers common to "+myPair[0]+" & "+myPair[1]+": " + myNumber + "."
                    }  
                    else if (j === 3){
                        tiptext = "Attacks of "+myPair[1]+" made by attackers unique to "+myPair[1]+": " + myNumber + "."
                    }
                    tip.style("opacity", 5)
                        .html(tiptext)
                        .style("left", (e.pageX) + "px")
                        .style("top", (e.pageY) + "px")
                        .style("width", "600px")
                }).on("mouseout", function(d) {
                    d3.select(this).style("stroke-width", "5px").style("stroke", "black")
                    tip.style("opacity", 0)
                })

            }

            let subPosArray2 = [subPosArray[0], subPosArray[1], subPosArray[3]]
            let widths = [division, division * 2, division]
            let relevantArr2 = pieChartInput[i]
            let colors2 = ['grey','#377eb8', 'green']
            for (let j = 0; j < relevantArr2.length; j++){
                this.secondRect = svg.append('rect').style("fill", colors2[j])
                .style("opacity", 0.9).style("stroke", "black")
                .style("stroke-width", "5px").attr("x", subPosArray2[j]).attr("y", yScale(relevantArr2[j]))
                .attr("height", function(){
                    return height - yScale(relevantArr2[j])
                }).attr("width", widths[j])

                let that = this
                let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
                this.secondRect.on("mouseover", function(e, d, i) {
                    d3.select(this).style("stroke-width", "8px").style("stroke", "red")
                    let stuff = e.target.outerHTML
                    let substring = "y=\""
                    let indexStart = stuff.indexOf(substring) + 3
                    let indexEnd = stuff.indexOf(substring) + 3
                    while(stuff.charAt(indexEnd) != '\"'){
                        indexEnd += 1
                    }
                    let desiredNumber = Number(stuff.substring(indexStart, indexEnd))
                    let myNumber = yScale.invert(desiredNumber)
                    myNumber = that.better(myNumber)

                    let tiptext
                    if (j === 0){
                        tiptext = "Attackers unique to "+myPair[0]+": " + myNumber + "."
                    }
                    else if (j === 1){
                        tiptext = "Attackers common to "+myPair[0]+" & "+myPair[1]+": " + myNumber + "."
                    }
                    else if (j === 2){
                        tiptext = "Attackers unique to "+myPair[1]+": " + myNumber + "."
                    }
                    
                    tip.style("opacity", 5)
                        .html(tiptext)
                        .style("left", (e.pageX) + "px")
                        .style("top", (e.pageY) + "px")
                        .style("width", "550px")
                }).on("mouseout", function(d) {
                    d3.select(this).style("stroke-width", "5px").style("stroke", "black")
                    tip.style("opacity", 0)
                })
            }
        }
        //end bargraph here

        //start circle here
        let dataset1 = []
        let categories = ['attacks', 'attackers']
        for (let i = 0; i < categories.length; i++){ 
            let requiredArray = []
            for (const [key, value] of Object.entries(neededData)) {
                for (const [key2, value2] of Object.entries(value)){
                    if (key2 === categories[i]){
                        requiredArray.push([key, value2])
                    }
                }
            }
            dataset1.push(requiredArray)
        }
        // console.log(dataset1)
        let colorsInvolved = ['orange', 'brown']
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
            .attr("r", 15)
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .style("fill", colorsInvolved[i]);

                  
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

            let that = this
            let tip = d3.select("body").append("div").attr("class", "tooltip").attr("id", "aAndATooltip").style("opacity", 10).style("font-size", "30px")
            this.circles.on("mouseover", function(e, d) {
                d3.select(this).attr('stroke-width', 5).style("stroke", "red")
                let tiptext = "This time period had " + that.better(d[1]) + ' ' + categories[i] + '.'
                tip.style("opacity", 5)
                    .html(tiptext)
                    .style("left", (e.pageX) + "px")
                    .style("top", (e.pageY) + "px")
                    .style("width", "500px")
            }).on("mouseout", function(d) {
                d3.select(this).attr('stroke-width', 0)
                tip.style("opacity", 0)
            })

            this.circles.on("click", function(e, d) {
                getData5(d[0], that.givenCountries).then(function(loadedData){
                    // console.log(loadedData) 
                    tip.style("opacity", 0)
                    document.getElementById("attacksAndAttackers").innerHTML = ""
                    // console.log(that.givenCountries)
                    let ipLineChart = new IPLineChart(d[0], loadedData, that.givenCountries, neededData, selected, barChartData)
                    ipLineChart.makeLineChart()
                })
            })
        }
        //end circle here

        svg.append('circle').style("fill", "orange").attr("r", 15).attr("cx", -75).attr("cy", -80)
        svg.append('text').attr("transform", "translate(-55,-70)").text("Attacks").style("font-size", "25px")
        svg.append('circle').style("fill", "brown").attr("r", 15).attr("cx", -75).attr("cy", -45)
        svg.append('text').attr("transform", "translate(-55,-35)").text("Attackers").style("font-size", "25px")

        svg.append('text').attr("transform", "translate("+(widthNumber/2 - 200)+",-30)").text(this.givenCountries[0]+"[Attacks and Attackers]").style("font-size", "25px")
        svg.append('text').attr("transform", "translate("+(widthNumber/2 - 120)+",290)").text("Time Periods").style("font-size", "25px")
        svg.append('text').attr("transform", "translate(-70,190)rotate(270)").text("Frequency").style("font-size", "25px")

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
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)

        let that = this
        if (selectedWeeksLength >= 2 && this.givenCountries.length === 1){
            getData(selected, this.givenCountries).then(function(loadedData){
                that.dataForSecondViz(loadedData[0], selected, loadedData[1])
            })
        }
        else{
            // console.log("not enough checks")
        }
    }

}

async function getData5(givenDate, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value
    let api_address = 'http://128.110.217.95/attacker_activity?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+givenDate+'&period='+givenValue2
    const data = await fetch(api_address)
    const jsonData = await data.json()
    // console.log(jsonData)
    return jsonData
}

async function getData(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    let api_address = 'http://128.110.217.95/attacks_and_attackers?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected.join(',')+'&period='+givenValue2
    const data = await fetch(api_address)
    const jsonData = await data.json()

    let api_address_2 = 'http://128.110.217.95/comparison?cluster='+givenValue+'&cc='+countries.join(',')+'&period='+givenValue2+'&range='+selected.join(',')
    const data2 = await fetch(api_address_2)
    const jsonData2 = await data2.json()
    // console.log(jsonData2)

    return [jsonData, jsonData2]

}