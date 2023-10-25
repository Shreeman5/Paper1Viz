class Table{
    static countriesChosenUsedInAnotherFunction

    constructor(neededData, baseTime, selectedTimes){
        this.neededData = neededData
        this.baseTime = baseTime
        this.selectedTimes = selectedTimes

        let variables = new VariablesForTable(this.neededData, this.baseTime, this.selectedTimes)
        variables.countrySpecificInfo()
        // variables.userNameParsing()

        this.tableBody = document.getElementById('predictionTableBody');
        this.chosenCountries = []
        Table.countriesChosenUsedInAnotherFunction = []
        

        this.vizWidth = 90;
        this.vizHeight = 70; //originally 30
    }

    drawLegend(){
        document.getElementById('tableLegend').style.display = 'display'

        let legend = d3.select('#colorForLegend')
        legend.append("rect").attr("x", "5").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.1))
        legend.append("rect").attr("x", "25").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.3))
        legend.append("rect").attr("x", "45").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.5))
        legend.append("rect").attr("x", "65").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.8))
        legend.append("rect").attr("x", "85").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(1.0))

        legend.append("rect").attr("x", "5").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.1))
        legend.append("rect").attr("x", "25").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.3))
        legend.append("rect").attr("x", "45").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.5))
        legend.append("rect").attr("x", "65").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.8))
        legend.append("rect").attr("x", "85").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(1.0))
    
        legend.append("rect").attr("x", "85").attr("y", "50").attr("width", "20").attr("height", "20").style("fill", "purple")

    }

    sortData(){
        let currentBaseTime = document.getElementById("baseTP").value
        let sortTime = document.getElementById("sortTP").value

        if (currentBaseTime === sortTime){
            this.neededData.sort((rowA, rowB) => rowB[sortTime].attacks - rowA[sortTime].attacks)
        }
        else{
            this.neededData.sort((rowA, rowB) => {
                let y = (rowB[sortTime].attacks - rowB[currentBaseTime].attacks)/rowB[currentBaseTime].attacks
                let x = (rowA[sortTime].attacks - rowA[currentBaseTime].attacks)/rowA[currentBaseTime].attacks 
                let b = isFinite(y) ? y : 0
                let a = isFinite(x) ? x : 0
                return b - a
            })
        }
    }

    filterCountries(){
        // console.log(document.getElementById("myRange").value)
        // console.log(document.getElementById("PERCHOOSE").value)
        // console.log(document.getElementById("PERWRITE").value)
        // console.log(document.getElementById("ABSCHOOSE").value)
        // console.log(document.getElementById("ABSWRITE").value)

        let writtenPvalue = document.getElementById("PERWRITE").value
        let minVal 
        let maxVal
        if (writtenPvalue === ''){
            // console.log('here')
            let turningPointValue = document.getElementById("PERCHOOSE").value
            if (turningPointValue === '0A'){
                minVal = document.getElementById("myRange").min
                maxVal = document.getElementById("myRange").max
            }
            else if (turningPointValue === '1A'){
                minVal = document.getElementById("myRange").min
                maxVal = 0
            }
            else if (turningPointValue === '2A'){
                minVal = 0
                maxVal = document.getElementById("myRange").max
            }
            else if (turningPointValue === '3A'){
                minVal = 100
                maxVal = document.getElementById("myRange").max
            }
            else if (turningPointValue === '4A'){
                minVal = 1000
                maxVal = document.getElementById("myRange").max
            }
            else if (turningPointValue === '5A'){
                minVal = 10000
                maxVal = document.getElementById("myRange").max
            }
            else if (turningPointValue === '6A'){
                minVal = 100000
                maxVal = document.getElementById("myRange").max
            }
            else if (turningPointValue === '7A'){
                minVal = 1000000
                maxVal = document.getElementById("myRange").max
            }
            //taking care of initial state where there is an exception
            else{
                minVal = document.getElementById("myRange").min
                maxVal = document.getElementById("myRange").max
            }
        }
        else{
            // console.log('there')
            minVal = Number(document.getElementById("myRange").value)
            // console.log(minVal)
            maxVal = document.getElementById("myRange").max
        }
        


        let currentBaseTime = document.getElementById("baseTP").value
        
        let finalFilter = this.findValues(minVal, maxVal, currentBaseTime)
        this.neededData = this.neededData.filter(function(el) { 
            if (finalFilter.includes(el.country)){
                return el
            }
        });
        // console.log('A:', this.neededData)

        let writtenAvalue = document.getElementById("ABSWRITE").value
        let minVal2 
        let maxVal2
        if (writtenAvalue === ''){
            // console.log('here2')
            let turningPointValue = document.getElementById("ABSCHOOSE").value
            if (turningPointValue === '0B'){
                minVal2 = document.getElementById("myRange2").min
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '1B'){
                minVal2 = document.getElementById("myRange2").min
                maxVal2 = 0
            }
            else if (turningPointValue === '2B'){
                minVal2 = 0
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '3B'){
                minVal2 = 1000
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '4B'){
                minVal2 = 10000
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '5B'){
                minVal2 = 100000
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '6B'){
                minVal2 = 1000000
                maxVal2 = document.getElementById("myRange2").max
            }
            //taking care of initial state where there is an exception
            else{
                minVal2 = document.getElementById("myRange2").min
                maxVal2 = document.getElementById("myRange2").max
            }
        }
        else{
            // console.log('there2')
            minVal2 = Number(document.getElementById("myRange2").value)
            // console.log(minVal2)
            maxVal2 = document.getElementById("myRange2").max
        }

        let finalFilter2 = this.findValues2(minVal2, maxVal2, currentBaseTime)
        this.neededData = this.neededData.filter(function(el) { 
            if (finalFilter2.includes(el.country)){
                return el
            }
        });
        // console.log('B:', this.neededData)

        $('#countries').find('option').remove()

        let countrySelect = document.getElementById("countries")
        for (let country of this.neededData){
            let option = document.createElement("option")
            option.value = country.country
            option.text = country.country
            countrySelect.appendChild(option)
        }
    }

    
    findValues(minVal, maxVal, currentBaseTime){
        // console.log(minVal)
        // console.log(maxVal)
        let finalFilter = []
        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
            let values = []
            for (let time of this.selectedTimes){
                if (time !== currentBaseTime){
                    let value = ((area[time].attacks - area[currentBaseTime].attacks)/area[currentBaseTime].attacks) * 100
                    let actualValue = isFinite(value) ? value : 0
                    values.push(actualValue)
                }
            }
            // console.log(values)
            if (maxVal === document.getElementById("myRange").max){
                if (values.some(el => el >= minVal && el <= maxVal)){
                    finalFilter.push(area.country)
                }
            }
            else{
                if (values.some(el => el >= minVal && el < maxVal)){
                    finalFilter.push(area.country)
                }
            }
        }
        // console.log(finalFilter)
        return finalFilter
    }

    findValues2(minVal2, maxVal2, currentBaseTime){
        let finalFilter = []
        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
            let values = []
            for (let time of this.selectedTimes){
                if (time !== currentBaseTime){
                    let value = area[time].attacks - area[currentBaseTime].attacks
                    values.push(value)
                }
            }
            if (maxVal2 === document.getElementById("myRange2").max){
                if (values.some(el => el >= minVal2 && el <= maxVal2)){
                    finalFilter.push(area.country)
                }
            }
            else{
                if (values.some(el => el >= minVal2 && el < maxVal2)){
                    finalFilter.push(area.country)
                }
            }
        }
        return finalFilter
    }

    drawTable(){     
          
        this.drawLegend() 
        this.sortData()
        this.filterCountries()

        let that = this
        this.changeStyle = function(e) {
            let countryChosen = e.target.__data__.value
            if (e.target.__data__.class !== 'continent'){
                if (that.chosenCountries.includes(countryChosen)){
                    that.chosenCountries = that.chosenCountries.filter(item => item !== countryChosen)
                }
                else{
                    that.chosenCountries.push(countryChosen)
                }
            }
            for (let i = 0, row; row = that.tableBody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    if (col.className === 'continent'){
                        col.style.font = "25px times" 
                        col.style.color = 'black'
                    }
                    else{
                        if (that.chosenCountries.includes(col.innerText)){
                            col.style.font = "25px times"
                            col.style.color = "red"
                        }
                        else{
                            col.style.font = "20px times"
                            col.style.color = 'black'
                        }
                    }
                }  
            }
        };
        this.tableBody.addEventListener('click', this.changeStyle, false)

        let rowSelection = d3.select('#predictionTableBody')
            .selectAll('tr')
            .data(this.neededData)
            .join('tr')

        
        rowSelection.on('click', (event, d) => 
        { 
            if(event.target.__data__.class === 'country'){ 
                if (Table.countriesChosenUsedInAnotherFunction.includes(d.cc)){
                    Table.countriesChosenUsedInAnotherFunction = Table.countriesChosenUsedInAnotherFunction.filter(item => item !== d.cc)
                }
                else{
                    Table.countriesChosenUsedInAnotherFunction.push(d.cc)
                }


                let checkedBoxes2 = document.querySelectorAll('input[type="checkbox"]:checked');
                let selectedTPsLength2 = checkedBoxes2.length

                if ((Table.countriesChosenUsedInAnotherFunction.length > 1 || Table.countriesChosenUsedInAnotherFunction.length === 0) && selectedTPsLength2 > 1){
                    alert("Press ok. Then, EITHER have multiple countries and one time period OR have multiple time periods and one country.")

                    let cgbg = document.getElementById("attacksAndAttackers")
                    cgbg.innerHTML = ''
                    let pcg = document.getElementById("parallelCoordinatesGraph")
                    pcg.innerHTML = ''
                    let dc = document.getElementById("donutGraph")
                    dc.innerHTML = ''
                    document.getElementById("attacksAndAttackers").style.outline = "none"
                    document.getElementById("exportButton").style.visibility = "hidden"
                    document.getElementById("goBackButton").style.visibility = "hidden"
                    document.getElementById("usernameFilter").style.width = "0px"
                    document.getElementById("usernameFilter").style.height = "0px"
                    $('#usernameFilter').find('option').remove()
                    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
                    document.getElementById("donutGraph").style.outline = "none"
                }
                else{
                    document.getElementById("exportButton").style.visibility = "hidden"
                    document.getElementById("goBackButton").style.visibility = "hidden"
                    let cgbg = document.getElementById("attacksAndAttackers")
                    cgbg.innerHTML = ''
                    document.getElementById("attacksAndAttackers").style.outline = "none"
                    let aAndALineChart = new AttacksAndAttackers(Table.countriesChosenUsedInAnotherFunction)
                    aAndALineChart.fetchData()
                    
                    document.getElementById("usernameFilter").style.width = "0px"
                    document.getElementById("usernameFilter").style.height = "0px"
                    $('#usernameFilter').find('option').remove()
                    let pcg = document.getElementById("parallelCoordinatesGraph")
                    pcg.innerHTML = ''
                    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
                    let parallelCoordinate = new ParallelCoordinate(Table.countriesChosenUsedInAnotherFunction, "no")
                    parallelCoordinate.fetchData2()

                    let dc = document.getElementById("donutGraph")
                    dc.innerHTML = ''
                    document.getElementById("donutGraph").style.outline = "none"
                    let donutGraph = new Donut(Table.countriesChosenUsedInAnotherFunction)
                    donutGraph.fetchData3()
                }
            }
        })

        let tabularLogic = new TableLogic()
        let forecastSelection = rowSelection.selectAll('td')
            .data(tabularLogic.rowToCellDataTransform)
            .join('td')
            .attr('class', d => d.class)
        
        forecastSelection.filter(d => d.type === 'text')
            .text(d => d.value)
            .style("font", "20px times")


        let vizSelection = forecastSelection.filter(d => d.type === 'viz');

        let svgSelect = vizSelection.selectAll('svg')
            .data(d => [d])
            .join('svg')
            .attr('width', this.vizWidth)
            .attr('height', this.vizHeight)

        let grouperSelect = svgSelect.selectAll('g')
        .data(d => [d])
        .join('g')

        this.shapes = new ShapesInCell()
        this.shapes.addRectangles(grouperSelect.filter((d,i) => i === 0));
        this.shapes.addTrianglesOrConstants(grouperSelect.filter((d,i) => i === 0));
        // this.shapes.setBoundariesOfCell(grouperSelect.filter((d,i) => i === 0))
    }


}