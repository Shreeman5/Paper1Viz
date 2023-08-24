class Table{

    
    static countryCode

    constructor(neededData, baseTime, selectedTimes){
        this.neededData = neededData
        this.baseTime = baseTime
        this.selectedTimes = selectedTimes

        let variables = new VariablesForTable(this.neededData, this.baseTime, this.selectedTimes)
        
        variables.continentMaxAbsoluteAttacks()
        variables.continentMaxPercentageAttacks()
        //console.log(this.neededData)

        

        this.vizWidth = 20;
        this.vizHeight = 45; //originally 30
        this.smallVizHeight = 45;//originally 20
    }

    drawLegend(){
        let legend = d3.select('#legend')
        legend.append("rect").attr("x", "40").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.1))
        legend.append("rect").attr("x", "60").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.3))
        legend.append("rect").attr("x", "80").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.5))
        legend.append("rect").attr("x", "100").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.8))
        legend.append("rect").attr("x", "120").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(1.0))

        legend.append("rect").attr("x", "40").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.1))
        legend.append("rect").attr("x", "60").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.3))
        legend.append("rect").attr("x", "80").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.5))
        legend.append("rect").attr("x", "100").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.8))
        legend.append("rect").attr("x", "120").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(1.0))
    
        legend.append("rect").attr("x", "120").attr("y", "50").attr("width", "20").attr("height", "20").style("fill", "purple")

    }

    drawTable(){
        this.drawLegend()

        let rowSelection = d3.select('#predictionTableBody')
            .selectAll('tr')
            .data(this.neededData)
            .join('tr')
        //console.log(rowSelection)

        if (this.neededData.length === 6){
            for (let i = 1; i < this.selectedTimes.length+1; i++){
                let givenString = 'box' + i
                document.getElementById(givenString).disabled = true
                document.getElementById(givenString).checked = false
            }
        }
        else{
            for (let i = 1; i < this.selectedTimes.length+1; i++){
                let givenString = 'box' + i
                document.getElementById(givenString).disabled = false
            }
        }

        //get back to this later
        rowSelection.on('click', (event, d) => 
        {
            if (d.isForecast){
                //console.log('yeah') 
                         
                let things = document.getElementById("comparisonGroupedBarGraph")
                things.innerHTML = ''
                let things2 = document.getElementById("parallelCoordinatesGraph")
                things2.innerHTML = ''
                let things3 = document.getElementById("donutGraph")
                things3.innerHTML = ''

                // if (this.neededData.length > 6){
                //     // console.log(this.neededData.length)
                //     // console.log('paper')
                //     let barGraph = new BarGraph()
                //     barGraph.fetchData()
                //     let parallelCoordinate = new ParallelCoordinate()
                //     parallelCoordinate.fetchData2()
                //     let donutGraph = new Donut()
                //     donutGraph.fetchData3()
                // }
                this.toggleRow(d, this.neededData.indexOf(d));
            }
            else{      
                Table.countryCode = d.cc
                Table.country = d.country
                let cgbg = document.getElementById("comparisonGroupedBarGraph")
                cgbg.innerHTML = ''
                let barGraph = new BarGraph()
                barGraph.fetchData()

                let pcg = document.getElementById("parallelCoordinatesGraph")
                pcg.innerHTML = ''
                let parallelCoordinate = new ParallelCoordinate()
                parallelCoordinate.fetchData2()

                let dc = document.getElementById("donutGraph")
                dc.innerHTML = ''
                let donutGraph = new Donut()
                donutGraph.fetchData3()
            }
        })
        //get back to this later

        let tabularLogic = new TableLogic()
        let forecastSelection = rowSelection.selectAll('td')
            .data(tabularLogic.rowToCellDataTransform)
            .join('td')
            .attr('class', d => d.class);

        forecastSelection.filter(d => d.type === 'text').text(d => d.class === 'continent' ? '+'+d.value : d.value).style("font", d => d.class === 'continent' ? "25px times": "20px times")

        let vizSelection = forecastSelection.filter(d => d.type === 'viz');

        let svgSelect = vizSelection.selectAll('svg')
            .data(d => [d])
            .join('svg')
            .attr('width', this.vizWidth)
            .attr('height', d => d.isForecast ? this.vizHeight : this.smallVizHeight);

        let grouperSelect = svgSelect.selectAll('g')
        .data(d => [d])
        .join('g')

        this.rect = new Rectangle()
        this.rect.addRectangles(grouperSelect.filter((d,i) => i === 0));
        this.rect.addRectangles2(grouperSelect.filter((d,i) => i === 0));

        let tableBody = document.getElementById('predictionTableBody');
        let changeStyle = function(e) {
            for (let i = 0, row; row = tableBody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.style.color = 'black'
                    if (col.className === 'continent'){
                        col.style.font = "25px times"
                    }
                    else{
                        col.style.font = "20px times"
                    }
                }  
            }
            if (e.target.tagName === 'TD' && e.target.__data__.class !== 'continent') {
                e.target.style.color = 'red';
                e.target.style.font = "25px times"
            }
        };
        tableBody.addEventListener('click', changeStyle, false)
    }

    toggleRow(rowData, index) {
        //console.log(rowData)
        if (rowData.isExpanded){
            d3.selectAll('rect').remove()
            let negateRows = rowData.meta
            let negateCountries = []
            for (let row of negateRows){
                negateCountries.push(row.country)
            }
            this.neededData = this.neededData.filter(d => d.isForecast || !negateCountries.includes(d.country));
            //console.log('toggleA:', this.neededData)
        }
        else{
            d3.selectAll('rect').remove()
            let addList = rowData.meta
            //console.log(addList)
            let currentBaseTime = document.getElementById("dataset-select").value
            let sortTime = document.getElementById("dataset-select-2").value

            if (currentBaseTime === sortTime){
                addList.sort((rowA, rowB) => rowB[sortTime].attacks - rowA[sortTime].attacks)
            }
            else{
                addList.sort((rowA, rowB) => {
                    let y = (rowB[sortTime].attacks - rowB[currentBaseTime].attacks)/rowB[currentBaseTime].attacks
                    let x = (rowA[sortTime].attacks - rowA[currentBaseTime].attacks)/rowA[currentBaseTime].attacks 
                    let b = isFinite(y) ? y : 0
                    let a = isFinite(x) ? x : 0
                    return b - a
                })
            }
            this.neededData.splice(index + 1, 0, ...addList)

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
        }
        rowData.isExpanded = !rowData.isExpanded
        this.drawTable()
    }

    findValues(threshold, currentBaseTime){
        let finalFilter = []

        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
            //console.log(area)
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

}