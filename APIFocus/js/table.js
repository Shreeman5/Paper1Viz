class Table{
    static countriesChosenUsedInAnotherFunction

    constructor(neededData, baseTime, selectedTimes){
        this.neededData = neededData
        this.baseTime = baseTime
        this.selectedTimes = selectedTimes

        let variables = new VariablesForTable(this.neededData, this.baseTime, this.selectedTimes)
        variables.countrySpecificInfo()
        variables.userNameParsing()

        this.tableBody = document.getElementById('predictionTableBody');
        this.chosenCountries = []
        Table.countriesChosenUsedInAnotherFunction = []
        

        this.vizWidth = 90;
        this.vizHeight = 70; //originally 30
    }

    drawLegend(){
        document.getElementById('tableLegend').style.display = 'display'

        let legend = d3.select('#colorForLegend')
        legend.append("rect").attr("x", "70").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.1))
        legend.append("rect").attr("x", "90").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.3))
        legend.append("rect").attr("x", "110").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.5))
        legend.append("rect").attr("x", "130").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.8))
        legend.append("rect").attr("x", "150").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(1.0))

        legend.append("rect").attr("x", "70").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.1))
        legend.append("rect").attr("x", "90").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.3))
        legend.append("rect").attr("x", "110").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.5))
        legend.append("rect").attr("x", "130").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.8))
        legend.append("rect").attr("x", "150").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(1.0))
    
        legend.append("rect").attr("x", "150").attr("y", "50").attr("width", "20").attr("height", "20").style("fill", "purple")

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
        let currentBaseTime = document.getElementById("baseTP").value
        
        let slider = document.getElementById("myRange");
        let threshold = Number(slider.value)
        let finalFilter = this.findValues(threshold, currentBaseTime)
        this.neededData = this.neededData.filter(function(el) { 
            if (finalFilter.includes(el.country) || finalFilter.includes(el.region)){
                return el
            }
        });

        let slider2 = document.getElementById("myRange2");
        let threshold2 = Number(slider2.value)
        let finalFilter2 = this.findValues2(threshold2, currentBaseTime)
        this.neededData = this.neededData.filter(function(el) { 
            if (finalFilter2.includes(el.country) || finalFilter2.includes(el.region)){
                return el
            }
        });

        $('#countries').find('option').remove()

        let countrySelect = document.getElementById("countries")
        for (let country of this.neededData){
            let option = document.createElement("option")
            option.value = country.country
            option.text = country.country
            countrySelect.appendChild(option)
        }
    }

    
    findValues(threshold, currentBaseTime){
        let finalFilter = []
        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
            if (!('region' in area)){
                let values = []
                for (let time of this.selectedTimes){
                    if (time !== currentBaseTime){
                        let value = ((area[time].attacks - area[currentBaseTime].attacks)/area[currentBaseTime].attacks) * 100
                        let actualValue = isFinite(value) ? value : 0
                        values.push(actualValue)
                    }
                }
                if (values.some(el => el >= threshold)){
                    finalFilter.push(area.country)
                }
            }
            else{
                finalFilter.push(area.region)
            }
        }
        return finalFilter
    }

    findValues2(threshold2, currentBaseTime){
        let finalFilter = []
        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
            if (!('region' in area)){
                let values = []
                for (let time of this.selectedTimes){
                    if (time !== currentBaseTime){
                        let value = area[time].attacks - area[currentBaseTime].attacks
                        values.push(value)
                    }
                }
                if (values.some(el => el >= threshold2)){
                    finalFilter.push(area.country)
                }
            }
            else{
                finalFilter.push(area.region)
            }
        }
        return finalFilter
    }

    drawTable(){     
          
        this.drawLegend() 
        this.sortData()
        this.filterCountries()

        // if (this.neededData.length === 6){
        //     for (let i = 1; i < this.selectedTimes.length+1; i++){
        //         let givenString = 'TP' + i
        //         document.getElementById(givenString).disabled = true
        //         document.getElementById(givenString).checked = false
        //     }
        //     let things = document.getElementById("comparisonGroupedBarGraph")
        //     things.innerHTML = ''
        //     let things2 = document.getElementById("parallelCoordinatesGraph")
        //     things2.innerHTML = ''
        //     let things3 = document.getElementById("donutGraph")
        //     things3.innerHTML = ''
        // }
        // else{
        //     for (let i = 1; i < this.selectedTimes.length+1; i++){
        //         let givenString = 'TP' + i
        //         document.getElementById(givenString).disabled = false
        //     }
        // }

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

                    let cgbg = document.getElementById("comparisonGroupedBarGraph")
                    cgbg.innerHTML = ''
                    let pcg = document.getElementById("parallelCoordinatesGraph")
                    pcg.innerHTML = ''
                    let dc = document.getElementById("donutGraph")
                    dc.innerHTML = ''
                    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
                    document.getElementById("usernameFilter").style.width = "0px"
                    document.getElementById("usernameFilter").style.height = "0px"
                    $('#usernameFilter').find('option').remove()
                    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
                    document.getElementById("donutGraph").style.outline = "none"
                }
                else{
                    let cgbg = document.getElementById("comparisonGroupedBarGraph")
                    cgbg.innerHTML = ''
                    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
                    let barGraph = new BarGraph(Table.countriesChosenUsedInAnotherFunction)
                    barGraph.fetchData()

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
        this.shapes.setBoundariesOfCell(grouperSelect.filter((d,i) => i === 0))
        // // this.shapes.addBlackStars(grouperSelect.filter((d,i) => i === 0))
    }


}