class AttacksAndAttackers {


    constructor(givenCountries){
        this.givenCountries = givenCountries
        //console.log(givenCountries)
    }

    dataForSecondViz(neededData, selected){
        // console.log(neededData)
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

        let widthNumber = 0
        let assignedWidth = ''

        if (checkedBoxes.length <= 6){
            widthNumber = 600
            assignedWidth = widthNumber + 'px'
        }
        else{
            widthNumber = 600 + 100 * (checkedBoxes.length - 6)
            assignedWidth = widthNumber + 'px'
        }
        
        let starterValue = document.getElementById('predictionTable').offsetWidth + 680
        let barGraphStarter = starterValue + "px"  

        document.getElementById("attacksAndAttackers").style.outline = "5px dashed black"
        document.getElementById("attacksAndAttackers").style.left = barGraphStarter
        document.getElementById("attacksAndAttackers").style.top = "570px"
        document.getElementById("attacksAndAttackers").style.width = assignedWidth
        document.getElementById("attacksAndAttackers").style.height = "400px"

        // d3.select("#attacksAndAttackers")
        //     .append("svg")
        //     .attr("id", "1")
        //     .attr("width", 500)
        //     .attr("height", 100)
        //     .append("g1")
        //     .attr("transform",
        //         "translate(" + 0 + "," + 0 + ")")


        // d3.select("#attacksAndAttackers")
        // .append("svg")
        // .attr("id", "2")
        // .attr("x", 300)
        // .attr("y", 300)
        // .attr("width", 500)
        // .attr("height", 100)


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
        // console.log(this.hardcodedKeys)

        let xScale = d3.scalePoint().domain(timePeriods).range([0, width])
        let yScale = d3.scaleLog().clamp(true).domain([1, maxValue]).range([height, 0])

        let that = this
        svg.append("g")
        .style("font", "20px times")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale).tickFormat(x => {
            return that.hardcodedKeys[x]
         }));
        
        svg.append("g").style("font", "20px times")
         .call(d3.axisLeft(yScale).tickFormat(x => {
            let integerCheck = Math.log10(x)
            if (Number.isInteger(integerCheck)){
                return that.better(x)
            }
        }))

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
        let colorsInvolved = ['blue', 'green']
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
                    let ipLineChart = new IPLineChart(d[0], loadedData, that.givenCountries, neededData, selected)
                    ipLineChart.makeLineChart()
                })
            })
        }

        svg.append('circle').style("fill", "blue").attr("r", 15).attr("cx", -75).attr("cy", -80)
        svg.append('text').attr("transform", "translate(-55,-70)").text("Attacks").style("font-size", "25px")
        svg.append('circle').style("fill", "green").attr("r", 15).attr("cx", -75).attr("cy", -45)
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
                that.dataForSecondViz(loadedData, selected)
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
    return jsonData
}

async function getData(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    let api_address = 'http://128.110.217.95/attacks_and_attackers?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected.join(',')+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    return jsonData

}