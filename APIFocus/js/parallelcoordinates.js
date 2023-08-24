class ParallelCoordinate{

    constructor(){
        
    }

    dataForThirdViz(neededData){
        // set the dimensions and margins of the graph
        let margin = {top: 100, right: 30, bottom: 100, left: 50},
        width = 2000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

        let starterValue = document.getElementById('mySidebar').offsetWidth + 
            document.getElementsByClassName('linechartviewAttacks')[0].offsetWidth +
            document.getElementById('predictionTable').offsetWidth
        let parallelCoordinateStarter = starterValue + "px"

        document.getElementById("parallelCoordinatesGraph").style.left = parallelCoordinateStarter
        document.getElementById("parallelCoordinatesGraph").style.top = "900px"
        document.getElementById("parallelCoordinatesGraph").style.width = "2000px"
        document.getElementById("parallelCoordinatesGraph").style.height = "1000px"

        // append the svg object to the body of the page
        const svg = d3.select("#parallelCoordinatesGraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
                `translate(${margin.left},${margin.top})`)
        .attr("id", "x")

        //svg.append('text').attr("x", 200).attr("y", parallelCoordinateStarter).text("Melvins").style("font-size", "25px")

        let usernameCollection = []
        for (const property in neededData) {
            let x = neededData[property]
            for (const values of x){
                let usernameValue = values['username']
                if (!usernameCollection.includes(usernameValue)){
                    usernameCollection.push(usernameValue)
                }
            }
        }

        let dates = []
        for (const property in neededData) {
            dates.push(property)
        }

        let desiredData = []
        for (let usernames in usernameCollection){
            let chosenUsername = usernameCollection[usernames]
            let collection = []
            for (const property in neededData) {
                let x = neededData[property]
                for (const values of x){
                    if (chosenUsername === values['username']){
                        const prop1 = property
                        collection[prop1] = values['count']
                    }
                }
            }
            collection['username'] = chosenUsername
            desiredData.push(collection)
        }

        console.log(desiredData)

        for (const property in neededData) {
            for (const things in desiredData){
                let value =  desiredData[things]
                if (!value.hasOwnProperty(property)){
                    const prop1 = property
                    value[prop1] = 0
                }
            }
        }

        this.vizPart(desiredData, height, width, svg, usernameCollection, dates)
    }

    vizPart(data, height, width, svg, usernameCollection, dates){
        //console.log(data)
        //let lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(usernameCollection)
        let dimensions = Object.keys(data[0]).filter(function(d) { return d != "username" })
        console.log(dimensions)
        const y = {}
        for (let i in dimensions) {
            let name = dimensions[i]
            y[name] = d3.scaleLog()
            .clamp(true)
            .domain(d3.extent(data, function(d) { 
                if (d[name] === 0){
                    return 0.1
                }
                else{
                    return +d[name]; 
                }
            }))
            .range([height, 0])
            .nice()
        }
        
        let x = d3.scalePoint()
            .range([0, width])
            .padding(1)
            .domain(dimensions);

        function path(d) {
            return d3.line()(dimensions.map(function(p) { 
                return [x(p), y[p](d[p])]; 
            }));
        }

        // Draw the lines
        svg.selectAll("myPath")
            .data(data)
            .join("path")
            .attr("d",  path)
            .style("fill", "none")
            .attr('stroke-width', 2)
            .style("stroke", "grey")
            //.style("opacity", 0.5)
            .on('mouseover', function(d, i){
                d3.select(this).attr('stroke-width', 10).style("stroke", "red")//.style('opacity', 1)
            })
            .on('mouseout', function(d, i){
                d3.select(this).attr('stroke-width', 2).style("stroke", "grey")//.style('opacity', 0.5)
            })

        
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        const stuff = document.getElementById('x')
        stuff.addEventListener("mouseover", (event) => {
            let value = event.toElement.__data__
            let tiptext = ''

            if (value !== null){
                tiptext = value['username']
            }
            // else{
            //     console.log('line')
            // }

            tip.style("opacity", 5)
            .html(tiptext)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY) + "px")
        })
        stuff.addEventListener("mouseout", (event) => {
            tip.style("opacity", 0)
        })

        this.hardcodedKeys = {}
        let i = 1
        for (let j = 0; j < dates.length; j++){
            this.hardcodedKeys[dates[j]] = 'TP' + i
            i++
        }

        this.lineIDs = {}
        let k = 1
        for (let j = 0; j < dates.length; j++){
            this.lineIDs[dates[j]] = 'ID' + k
            k++
        }
        

        let that = this
        svg.selectAll("myAxis")
            .data(dimensions).enter()
            .append("g")
            .style("font", "25px times")
            .attr("transform", function(d) { 
                return "translate(" + x(d) + ")"; 
            })
            .attr('id', function(d){
                return that.lineIDs[d]; 
            })
            .each(function(d) { 
                //console.log(this)
                d3.select(this).call(d3.axisLeft()
                .tickFormat(x => {
                    //console.log(x)
                    if (x === 0.1){
                        return 0
                    }
                    else {
                        let integerCheck = Math.log10(x)
                        if (Number.isInteger(integerCheck)){
                            if (x >= 1000000){
                                return x/1000000 + 'M'
                            }
                            else if (x < 1000000 && x >= 1000){
                                return x/1000 + 'K'
                            }
                            else if (x < 1000){
                                return x
                            }
                        }
                    }
                })
                .scale(y[d])); 
            })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", 830)
            .text(function(d) { 
                //console.log(hardcodedKeys)
                return that.hardcodedKeys[d]; 
            })
            .style("fill", "black")

        let values = document.getElementById('ID1')
        let firstLineString = window.getComputedStyle(values).transform
        let firstLineCoord = Number(firstLineString.substring(19, 22))
        console.log(firstLineCoord)
        svg.append('text').attr("transform", "translate("+(firstLineCoord-70)+",450)rotate(270)").text("Username frequency").style("font-size", "25px")
        

        let totalDatesLength = dates.length
        let valuesN = document.getElementById('ID'+totalDatesLength)
        console.log(valuesN)
        let lastLineString = window.getComputedStyle(valuesN).transform
        let lastLineCoord = Number(lastLineString.substring(19, 23))
        console.log(lastLineCoord)
        let xaxistextAtMiddlePoint = (firstLineCoord + lastLineCoord)/2 - 60
        console.log(xaxistextAtMiddlePoint)
        svg.append('text').attr("transform", "translate("+xaxistextAtMiddlePoint+",850)").text("Time Periods").style("font-size", "25px")

        svg.append('text').attr("transform", "translate("+(xaxistextAtMiddlePoint-220)+",-20)").text("Username Frequency Over Time Periods").style("font-size", "35px")
    }

    fetchData2(){
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)
        // console.log('Weeks:', selected)
        // console.log(this.countryCode)

        let that = this
        if (selectedWeeksLength >= 2 && Table.countryCode != null){
            getData2(selected).then(function(loadedData){
                that.dataForThirdViz(loadedData, selected)
            })
        }
        else{
            console.log("not enough checks")
        }
    }

}

async function getData2(selected){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    let api_address = 'http://128.110.217.130/top/usernames?cluster='+givenValue+'&cc='+Table.countryCode+'&range='+selected.join(',')+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    //console.log('op:', jsonData)
    return jsonData

}