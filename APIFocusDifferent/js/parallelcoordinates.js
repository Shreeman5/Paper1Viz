class ParallelCoordinate{

    //static countriesAcquired = []

    constructor(givenCountries){
        this.givenCountries = givenCountries
        //console.log(givenCountries)
    }

    dataForThirdViz(neededData){
        console.log('X:', neededData)
        // if ('US' in neededData){
        //     console.log(yes)
        // }
        
        let idSelector = function() { return this.id; }
        let checkedBoxes = $(":checkbox:checked").map(idSelector).get()

        let widthNumber = 0
        let assignedWidth = ''

        let workingLength = 0
        if (checkedBoxes.length > this.givenCountries.length){
            workingLength = checkedBoxes.length
        }
        else{
            workingLength = this.givenCountries.length
        }


        if (workingLength <= 22){
            widthNumber = 2100
            assignedWidth = widthNumber + 'px'
        }
        else{
            widthNumber = 2100 + (50 * (workingLength - 22))
            assignedWidth = widthNumber + 'px'
        }

        let margin = {top: 100, right: 30, bottom: 100, left: 50},
        width = widthNumber - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

        let starterValue = document.getElementById('mySidebar').offsetWidth + 
            document.getElementsByClassName('linechartviewAttacks')[0].offsetWidth +
            document.getElementById('predictionTable').offsetWidth + 380
        let parallelCoordinateStarter = starterValue + "px"

        document.getElementById("parallelCoordinatesGraph").style.left = parallelCoordinateStarter
        document.getElementById("parallelCoordinatesGraph").style.top = "1050px"
        document.getElementById("parallelCoordinatesGraph").style.width = assignedWidth
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

        
        let usernameCollection = []
        for (const property in neededData) {
            let x = neededData[property]
            for (const values in x){
                for (const values2 of x[values]){
                    let usernameValue = values2['username']
                    if (!usernameCollection.includes(usernameValue)){
                        usernameCollection.push(usernameValue)
                    }
                }
            }
        }
        //console.log(usernameCollection)

        let datesOrCountries = []
        if (this.givenCountries.length === 1){
            for (const property in neededData) {
                let x = neededData[property]
                for (const values in x){
                    datesOrCountries.push(values)
                }
            }
        }
        else{
            for (const property in neededData) {
                datesOrCountries.push(property)
            }
        }
        // console.log(datesOrCountries)

        let desiredData = []
        if (this.givenCountries.length === 1){
            for (let usernames in usernameCollection){
                let chosenUsername = usernameCollection[usernames]
                let collection = []
                for (const property in neededData) {
                    let x = neededData[property]
                    for (const values in x){
                        for (const values2 of x[values]){
                            if (chosenUsername === values2['username']){
                                const prop1 = values
                                collection[prop1] = values2['count']
                            }
                        } 
                    }
                }
                collection['username'] = chosenUsername
                desiredData.push(collection)
            }
        }
        else{
            for (let usernames in usernameCollection){
                let chosenUsername = usernameCollection[usernames]
                let collection = []
                for (const property in neededData) {
                    let x = neededData[property]
                    for (const values in x){
                        let y = x[values]
                        for (const values2 of y){
                            if (chosenUsername === values2['username']){
                                const prop1 = property
                                collection[prop1] = values2['count'] 
                            }
                        }
                    }
                }
                collection['username'] = chosenUsername
                desiredData.push(collection)
            }
        }

        for (let i = 0; i < datesOrCountries.length; i++) {
            let property = datesOrCountries[i]
            for (const things in desiredData){
                let value =  desiredData[things]
                if (!value.hasOwnProperty(property)){
                    const prop1 = property
                    value[prop1] = 0
                }
            }
        }

        
        //console.log(desiredData)

        this.vizPart(desiredData, height, width, svg, usernameCollection, datesOrCountries)
    }

    vizPart(data, height, width, svg, usernameCollection, datesOrCountries){
        //console.log(data)
        //let lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(usernameCollection)
        let dimensions = Object.keys(data[0]).filter(function(d) { return d != "username" })
        //console.log(dimensions)
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
                d3.select(this).attr('stroke-width', 5).style("stroke", "red")//.style('opacity', 1)
            })
            .on('mouseout', function(d, i){
                d3.select(this).attr('stroke-width', 2).style("stroke", "grey")//.style('opacity', 0.5)
            })

        
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        const stuff = document.getElementById('x')
        stuff.addEventListener("mouseover", (event) => {
            let value = event.toElement.__data__

            // let givenNumbers = []
            // for (const property in value) {
            //     if (property !== 'username'){
            //         let desiredNumber = value[property]
            //         if (desiredNumber >= 1000000){
            //             givenNumbers.push((desiredNumber/1000000).toFixed(1) + 'M')
            //         }
            //         else if (desiredNumber >= 1000){
            //             givenNumbers.push((desiredNumber/1000).toFixed(1) + 'K')
            //         }
            //         else{
            //             givenNumbers.push(desiredNumber + '')
            //         }
            //     }
            // }
            // console.log(givenNumbers)

            // for (let z = 0; z < givenNumbers.length; z++){
            //     let givenLine = document.getElementById('ID'+(z+1))
            //     let position = givenLine.getBoundingClientRect();
            //     var x = position.left;
            //     var y = position.top
            //     svg.append('text').attr("id", "userNameNumbers").attr("transform", `translate(${x}, ${y})`)
            //                     .text(givenNumbers[z]).style("font-size", "55px").style("fill", "red")
            // }
            

            let tiptext = null

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
            .style("font", "55px times")
        })
        stuff.addEventListener("mouseout", (event) => {
            tip.style("opacity", 0)
            //document.getElementById("userNameNumbers").remove()
        })

        //console.log(datesOrCountries)

        let idSelector = function() { return this.id; }
        let checkedBoxes = $(":checkbox:checked").map(idSelector).get()
        //console.log(checkedBoxes)
        let weekData = []
        for(let i = 0; i < checkedBoxes.length;i++){
            weekData.push(checkedBoxes[i])
        }
        // console.log(weekData)

        this.hardcodedKeys = {}
        for (let j = 0; j < datesOrCountries.length; j++){
            this.hardcodedKeys[datesOrCountries[j]] = weekData[j]
        }
        // console.log(this.hardcodedKeys)

        this.lineIDs = {}
        let k = 1
        for (let j = 0; j < datesOrCountries.length; j++){
            this.lineIDs[datesOrCountries[j]] = 'ID' + k
            k++
        }
        // console.log(this.lineIDs)
        

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
                // console.log(d)
                //console.log(that.hardcodedKeys[d])
                if(that.givenCountries.length === 1){
                    return that.hardcodedKeys[d]; 
                }
                else{
                    return d
                }
            })
            .style("fill", "black")

        let values = document.getElementById('ID1')
        let firstLineString = window.getComputedStyle(values).transform
        let firstLineCoord = Number(firstLineString.substring(19, 22))
        //console.log(firstLineCoord)
        svg.append('text').attr("transform", "translate("+(firstLineCoord-60)+",500)rotate(270)").text("Username frequency").style("font-size", "25px")
        

        let totalDatesLength = datesOrCountries.length
        let valuesN = document.getElementById('ID'+totalDatesLength)
        //console.log(valuesN)
        let lastLineString = window.getComputedStyle(valuesN).transform
        let lastLineCoord = Number(lastLineString.substring(19, 23))
        //console.log(lastLineCoord)
        let xaxistextAtMiddlePoint = (firstLineCoord + lastLineCoord)/2 - 60
        //console.log(xaxistextAtMiddlePoint)
        let that2 = this

        svg.append('text').attr("transform", "translate("+xaxistextAtMiddlePoint+",850)")
        .text(function(){
            if (that.givenCountries.length === 1){
                return "Time Periods"
            }
            else{
                return "Countries"
            }
        })
        .style("font-size", "25px")

        svg.append('text').attr("transform", "translate("+(xaxistextAtMiddlePoint-260)+",-20)")
        .text(function(){
            if (that.givenCountries.length === 1){
                return that.givenCountries[0]+"[Username Frequency Over Time Periods]"
            }
            else{
                return weekData[0]+"[Username Frequency For Countries]"
            }
        })
        .style("font-size", "35px")
    }

    fetchData2(){
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)
        // console.log('Weeks:', selected)
        // console.log(this.countryCode)

        // console.log('A:', selected)
        // console.log('B:', this.givenCountries)

        // && Table.countryCode != null

        let that = this
        if ( (selectedWeeksLength >= 2 && this.givenCountries.length === 1)  || 
        (selectedWeeksLength === 1 && this.givenCountries.length >= 2)  ){
            getData2(selected, this.givenCountries).then(function(loadedData){
                that.dataForThirdViz(loadedData, selected)
            })
        }
        else{
            console.log("not enough checks")
        }
    }

}

async function getData2(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value



    let api_address = 'http://128.110.217.128/top/usernames?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected.join(',')+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    //console.log('op:', jsonData)
    return jsonData

}