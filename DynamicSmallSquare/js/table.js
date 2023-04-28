class Table {

    static country

    constructor(neededData, baseNumber){
        this.neededData = neededData
        this.baseNumber = baseNumber

        let variables = new StartingVariables(this.neededData, this.baseNumber)
        //variables.continentAbsoluteAttacks()
        //variables.continentAbsoluteAttackers()
        variables.continentMaxAbsoluteAttacks()
        variables.continentMaxPercentageAttacks()
        //variables.continentMaxPercentageAttackers()
        //variables.vals()

        console.log('xyx:', this.neededData)

        this.vizWidth = 20;
        this.vizHeight = 45; //originally 30
        this.smallVizHeight = 45;//originally 20
        //console.log(neededData)

    }

    drawLegend(){
        let legend = d3.select('#legend')
        legend.append("rect").attr("x", "20").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.1))
        legend.append("rect").attr("x", "40").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.3))
        legend.append("rect").attr("x", "60").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.5))
        legend.append("rect").attr("x", "80").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(0.8))
        legend.append("rect").attr("x", "100").attr("y", "0").attr("width", "20").attr("height", "20").style("fill", d3.interpolateBlues(1.0))

        legend.append("rect").attr("x", "20").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.1))
        legend.append("rect").attr("x", "40").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.3))
        legend.append("rect").attr("x", "60").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.5))
        legend.append("rect").attr("x", "80").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(0.8))
        legend.append("rect").attr("x", "100").attr("y", "25").attr("width", "20").attr("height", "20").style("fill", d3.interpolateGreens(1.0))
    
        legend.append("rect").attr("x", "100").attr("y", "50").attr("width", "20").attr("height", "20").style("fill", "purple")

    }

    drawTable(){
        this.drawLegend()

        let rowSelection = d3.select('#predictionTableBody')
            .selectAll('tr')
            .data(this.neededData)
            .join('tr')

        //console.log('X:', this.neededData.length)
        if (this.neededData.length === 6){
            document.getElementById('box1').disabled = true
            document.getElementById('box2').disabled = true
            document.getElementById('box3').disabled = true
            document.getElementById('box4').disabled = true
            document.getElementById('box5').disabled = true
            document.getElementById('box6').disabled = true
            document.getElementById('box7').disabled = true
            document.getElementById('box8').disabled = true
            document.getElementById('box9').disabled = true
            document.getElementById('box1').checked = false
            document.getElementById('box2').checked = false
            document.getElementById('box3').checked = false
            document.getElementById('box4').checked = false
            document.getElementById('box5').checked = false
            document.getElementById('box6').checked = false
            document.getElementById('box7').checked = false
            document.getElementById('box8').checked = false
            document.getElementById('box9').checked = false
        }
        else{
            document.getElementById('box1').disabled = false
            document.getElementById('box2').disabled = false
            document.getElementById('box3').disabled = false
            document.getElementById('box4').disabled = false
            document.getElementById('box5').disabled = false
            document.getElementById('box6').disabled = false
            document.getElementById('box7').disabled = false
            document.getElementById('box8').disabled = false
            document.getElementById('box9').disabled = false
        }

        
        rowSelection.on('click', (event, d) => 
        {
            if (d.isForecast){
                //console.log('yeah') 
                         
                let things = document.getElementById("comparisonGroupedBarGraph")
                things.innerHTML = ''
                // if (this.neededData.length > 6){
                //     console.log(this.neededData.length)
                //     console.log('paper')
                //     let barGraph = new BarGraph(Table.country)
                //     barGraph.fetchData()
                // }
                this.toggleRow(d, this.neededData.indexOf(d));
            }
            else{
                //console.log('no')
                // console.log(event)
                // console.log(d)
                let things = document.getElementById("comparisonGroupedBarGraph")
                things.innerHTML = ''
                Table.country = d.country
                let barGraph = new BarGraph(Table.country)
                barGraph.fetchData()
            }
        })





        let tabularLogic = new TableLogic()
        let forecastSelection = rowSelection.selectAll('td')
            .data(tabularLogic.rowToCellDataTransform)
            .join('td')
            .attr('class', d => d.class);
        // console.log(forecastSelection)

        //rowSelection.select('td').innerHTML = "<input type=checkbox>"

        forecastSelection.filter(d => d.type === 'text').text(d => d.class === 'continent' ? '+'+d.value : d.value).style("font", d => d.class === 'continent' ? "20px times": "14px times")

        let vizSelection = forecastSelection.filter(d => d.type === 'viz');

        let svgSelect = vizSelection.selectAll('svg')
            .data(d => [d])
            .join('svg')
            .attr('width', this.vizWidth)
            .attr('height', d => d.isForecast ? this.vizHeight : this.smallVizHeight);

        let grouperSelect = svgSelect.selectAll('g')
        .data(d => [d])
        .join('g')

        

        this.rect = new Rectangle(this.scaleX, this.percentScale, this.vizHeight)
        this.rect.addRectangles(grouperSelect.filter((d,i) => i === 0));
        //this.rect.addRectangles2(grouperSelect.filter((d,i) => i === 0));
        this.rect.addRectangles3(grouperSelect.filter((d,i) => i === 0));
        //this.rect.addRectangles4(grouperSelect.filter((d,i) => i === 0));

        
        let tableBody = document.getElementById('predictionTableBody');
        let changeStyle = function(e) {
            for (let i = 0, row; row = tableBody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.style.color = 'black'
                    if (col.className === 'continent'){
                        col.style.font = "20px times"
                    }
                    else{
                        col.style.font = "14px times"
                    }
                }  
            }
            if (e.target.tagName === 'TD' && e.target.__data__.class !== 'continent') {
                e.target.style.color = 'red';
                e.target.style.font = "20px times"
            }
        };
        tableBody.addEventListener('click', changeStyle, false)


    }

    toggleRow(rowData, index) {
        //console.log(rowData)
        // console.log(index)
        
        
        //console.log('C:', rowData.isExpanded)
        if (rowData.isExpanded){
            d3.selectAll('rect').remove()
            let negateRows = rowData.meta
            let negateCountries = []
            for (let row of negateRows){
                negateCountries.push(row.country)
            }
            //console.log('D:', negateCountries)
            // collapse - remove rows
            this.neededData = this.neededData.filter(d => d.isForecast || !negateCountries.includes(d.country));
            
            
            //console.log('toggleA:', this.neededData)

        }
        else{
            d3.selectAll('rect').remove()
            let addList = rowData.meta
            //console.log(addList)
            let currentBaseWeek = document.getElementById("dataset-select").value
            let sortWeek = document.getElementById("dataset-select-2").value
            // console.log('RR:', currentBaseWeek)
            // console.log('RRRRR:', sortWeek)

            if (currentBaseWeek === '0'){     
                if (sortWeek === '0'){     
                    addList.sort((rowA, rowB) => rowB.count_W1 - rowA.count_W1)
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W2 - rowB.count_W1)/rowB.count_W1 
                        let x = (rowA.count_W2 - rowA.count_W1)/rowA.count_W1     
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '2'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W3 - rowB.count_W1)/rowB.count_W1 
                        let x = (rowA.count_W3 - rowA.count_W1)/rowA.count_W1    
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '3'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W4 - rowB.count_W1)/rowB.count_W1 
                        let x = (rowA.count_W4 - rowA.count_W1)/rowA.count_W1 
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W5 - rowB.count_W1)/rowB.count_W1 
                        let x = (rowA.count_W5 - rowA.count_W1)/rowA.count_W1 
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '5'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W6 - rowB.count_W1)/rowB.count_W1 
                        let x = (rowA.count_W6 - rowA.count_W1)/rowA.count_W1 
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '6'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W7 - rowB.count_W1)/rowB.count_W1 
                        let x = (rowA.count_W7 - rowA.count_W1)/rowA.count_W1 
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W8 - rowB.count_W1)/rowB.count_W1 
                        let x = (rowA.count_W8 - rowA.count_W1)/rowA.count_W1 
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W9 - rowB.count_W1)/rowB.count_W1 
                        let x = (rowA.count_W9 - rowA.count_W1)/rowA.count_W1 
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
            }
            else if (currentBaseWeek === '1'){
                if (sortWeek === '0'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W1 - rowB.count_W2)/rowB.count_W2 
                        let x = (rowA.count_W1 - rowA.count_W2)/rowA.count_W2
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => rowB.count_W2 - rowA.count_W2)
                }
                else if (sortWeek === '2'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W3 - rowB.count_W2)/rowB.count_W2 
                        let x = (rowA.count_W3 - rowA.count_W2)/rowA.count_W2
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '3'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W4 - rowB.count_W2)/rowB.count_W2 
                        let x = (rowA.count_W4 - rowA.count_W2)/rowA.count_W2
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W5 - rowB.count_W2)/rowB.count_W2 
                        let x = (rowA.count_W5 - rowA.count_W2)/rowA.count_W2
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '5'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W6 - rowB.count_W2)/rowB.count_W2 
                        let x = (rowA.count_W6 - rowA.count_W2)/rowA.count_W2
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '6'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W7 - rowB.count_W2)/rowB.count_W2 
                        let x = (rowA.count_W7 - rowA.count_W2)/rowA.count_W2
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W8 - rowB.count_W2)/rowB.count_W2 
                        let x = (rowA.count_W8 - rowA.count_W2)/rowA.count_W2
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W9 - rowB.count_W2)/rowB.count_W2 
                        let x = (rowA.count_W9 - rowA.count_W2)/rowA.count_W2
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
            }
            else if (currentBaseWeek === '2'){
                if (sortWeek === '0'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W1 - rowB.count_W3)/rowB.count_W3 
                        let x = (rowA.count_W1 - rowA.count_W3)/rowA.count_W3
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W2 - rowB.count_W3)/rowB.count_W3 
                        let x = (rowA.count_W2 - rowA.count_W3)/rowA.count_W3
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '2'){      
                    addList.sort((rowA, rowB) => rowB.count_W3 - rowA.count_W3)
                }
                else if (sortWeek === '3'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W4 - rowB.count_W3)/rowB.count_W3 
                        let x = (rowA.count_W4 - rowA.count_W3)/rowA.count_W3
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W5 - rowB.count_W3)/rowB.count_W3 
                        let x = (rowA.count_W5 - rowA.count_W3)/rowA.count_W3
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '5'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W6 - rowB.count_W3)/rowB.count_W3 
                        let x = (rowA.count_W6 - rowA.count_W3)/rowA.count_W3
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '6'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W7 - rowB.count_W3)/rowB.count_W3 
                        let x = (rowA.count_W7 - rowA.count_W3)/rowA.count_W3
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W8 - rowB.count_W3)/rowB.count_W3 
                        let x = (rowA.count_W8 - rowA.count_W3)/rowA.count_W3
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W9 - rowB.count_W3)/rowB.count_W3 
                        let x = (rowA.count_W9 - rowA.count_W3)/rowA.count_W3
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
            }
            else if (currentBaseWeek === '3'){
                if (sortWeek === '0'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W1 - rowB.count_W4)/rowB.count_W4
                        let x = (rowA.count_W1 - rowA.count_W4)/rowA.count_W4
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W2 - rowB.count_W4)/rowB.count_W4
                        let x = (rowA.count_W2 - rowA.count_W4)/rowA.count_W4
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '2'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W3 - rowB.count_W4)/rowB.count_W4
                        let x = (rowA.count_W3 - rowA.count_W4)/rowA.count_W4
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '3'){  
                    addList.sort((rowA, rowB) => rowB.count_W4 - rowA.count_W4)
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W5 - rowB.count_W4)/rowB.count_W4
                        let x = (rowA.count_W5 - rowA.count_W4)/rowA.count_W4
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '5'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W6 - rowB.count_W4)/rowB.count_W4
                        let x = (rowA.count_W6 - rowA.count_W4)/rowA.count_W4
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '6'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W7 - rowB.count_W4)/rowB.count_W4
                        let x = (rowA.count_W7 - rowA.count_W4)/rowA.count_W4
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W8 - rowB.count_W4)/rowB.count_W4
                        let x = (rowA.count_W8 - rowA.count_W4)/rowA.count_W4
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W9 - rowB.count_W4)/rowB.count_W4
                        let x = (rowA.count_W9 - rowA.count_W4)/rowA.count_W4
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
            }
            else if (currentBaseWeek === '4'){
                if (sortWeek === '0'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W1 - rowB.count_W5)/rowB.count_W5
                        let x = (rowA.count_W1 - rowA.count_W5)/rowA.count_W5
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W2 - rowB.count_W5)/rowB.count_W5
                        let x = (rowA.count_W2 - rowA.count_W5)/rowA.count_W5
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '2'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W3 - rowB.count_W5)/rowB.count_W5
                        let x = (rowA.count_W3 - rowA.count_W5)/rowA.count_W5
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '3'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W4 - rowB.count_W5)/rowB.count_W5
                        let x = (rowA.count_W4 - rowA.count_W5)/rowA.count_W5
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => rowB.count_W5 - rowA.count_W5)
                }
                else if (sortWeek === '5'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W6 - rowB.count_W5)/rowB.count_W5
                        let x = (rowA.count_W6 - rowA.count_W5)/rowA.count_W5
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '6'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W7 - rowB.count_W5)/rowB.count_W5
                        let x = (rowA.count_W7 - rowA.count_W5)/rowA.count_W5
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W8 - rowB.count_W5)/rowB.count_W5
                        let x = (rowA.count_W8 - rowA.count_W5)/rowA.count_W5
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W9 - rowB.count_W5)/rowB.count_W5
                        let x = (rowA.count_W9 - rowA.count_W5)/rowA.count_W5
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
            }
            else if (currentBaseWeek === '5'){
                if (sortWeek === '0'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W1 - rowB.count_W6)/rowB.count_W6
                        let x = (rowA.count_W1 - rowA.count_W6)/rowA.count_W6
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W2 - rowB.count_W6)/rowB.count_W6
                        let x = (rowA.count_W2 - rowA.count_W6)/rowA.count_W6
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '2'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W3 - rowB.count_W6)/rowB.count_W6
                        let x = (rowA.count_W3 - rowA.count_W6)/rowA.count_W6
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '3'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W4 - rowB.count_W6)/rowB.count_W6
                        let x = (rowA.count_W4 - rowA.count_W6)/rowA.count_W6
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W5 - rowB.count_W6)/rowB.count_W6
                        let x = (rowA.count_W5 - rowA.count_W6)/rowA.count_W6
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '5'){ 
                    addList.sort((rowA, rowB) => rowB.count_W6 - rowA.count_W6)
                }
                else if (sortWeek === '6'){  
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W7 - rowB.count_W6)/rowB.count_W6
                        let x = (rowA.count_W7 - rowA.count_W6)/rowA.count_W6
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W8 - rowB.count_W6)/rowB.count_W6
                        let x = (rowA.count_W8 - rowA.count_W6)/rowA.count_W6
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W9 - rowB.count_W6)/rowB.count_W6
                        let x = (rowA.count_W9 - rowA.count_W6)/rowA.count_W6
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
            }
            else if (currentBaseWeek === '6'){
                if (sortWeek === '0'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W1 - rowB.count_W7)/rowB.count_W7
                        let x = (rowA.count_W1 - rowA.count_W7)/rowA.count_W7
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W2 - rowB.count_W7)/rowB.count_W7
                        let x = (rowA.count_W2 - rowA.count_W7)/rowA.count_W7
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '2'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W3 - rowB.count_W7)/rowB.count_W7
                        let x = (rowA.count_W3 - rowA.count_W7)/rowA.count_W7
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '3'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W4 - rowB.count_W7)/rowB.count_W7
                        let x = (rowA.count_W4 - rowA.count_W7)/rowA.count_W7
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W5 - rowB.count_W7)/rowB.count_W7
                        let x = (rowA.count_W5 - rowA.count_W7)/rowA.count_W7
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '5'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W6 - rowB.count_W7)/rowB.count_W7
                        let x = (rowA.count_W6 - rowA.count_W7)/rowA.count_W7
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '6'){
                    addList.sort((rowA, rowB) => rowB.count_W7 - rowA.count_W7)
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W8 - rowB.count_W7)/rowB.count_W7
                        let x = (rowA.count_W8 - rowA.count_W7)/rowA.count_W7
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W9 - rowB.count_W7)/rowB.count_W7
                        let x = (rowA.count_W9 - rowA.count_W7)/rowA.count_W7
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
            }
            else if (currentBaseWeek === '7'){
                if (sortWeek === '0'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W1 - rowB.count_W8)/rowB.count_W8
                        let x = (rowA.count_W1 - rowA.count_W8)/rowA.count_W8
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W2 - rowB.count_W8)/rowB.count_W8
                        let x = (rowA.count_W2 - rowA.count_W8)/rowA.count_W8
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '2'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W3 - rowB.count_W8)/rowB.count_W8
                        let x = (rowA.count_W3 - rowA.count_W8)/rowA.count_W8
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '3'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W4 - rowB.count_W8)/rowB.count_W8
                        let x = (rowA.count_W4 - rowA.count_W8)/rowA.count_W8
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W5 - rowB.count_W8)/rowB.count_W8
                        let x = (rowA.count_W5 - rowA.count_W8)/rowA.count_W8
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '5'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W6 - rowB.count_W8)/rowB.count_W8
                        let x = (rowA.count_W6 - rowA.count_W8)/rowA.count_W8
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '6'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W7 - rowB.count_W8)/rowB.count_W8
                        let x = (rowA.count_W7 - rowA.count_W8)/rowA.count_W8
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => rowB.count_W8 - rowA.count_W8)
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W9 - rowB.count_W8)/rowB.count_W8
                        let x = (rowA.count_W9 - rowA.count_W8)/rowA.count_W8
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
            }
            else if (currentBaseWeek === '8'){
                if (sortWeek === '0'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W1 - rowB.count_W9)/rowB.count_W9
                        let x = (rowA.count_W1 - rowA.count_W9)/rowA.count_W9
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '1'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W2 - rowB.count_W9)/rowB.count_W9
                        let x = (rowA.count_W2 - rowA.count_W9)/rowA.count_W9
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '2'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W3 - rowB.count_W9)/rowB.count_W9
                        let x = (rowA.count_W3 - rowA.count_W9)/rowA.count_W9
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '3'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W4 - rowB.count_W9)/rowB.count_W9
                        let x = (rowA.count_W4 - rowA.count_W9)/rowA.count_W9
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '4'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W5 - rowB.count_W9)/rowB.count_W9
                        let x = (rowA.count_W5 - rowA.count_W9)/rowA.count_W9
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '5'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W6 - rowB.count_W9)/rowB.count_W9
                        let x = (rowA.count_W6 - rowA.count_W9)/rowA.count_W9
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '6'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W7 - rowB.count_W9)/rowB.count_W9
                        let x = (rowA.count_W7 - rowA.count_W9)/rowA.count_W9
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '7'){
                    addList.sort((rowA, rowB) => {
                        let y = (rowB.count_W8 - rowB.count_W9)/rowB.count_W9
                        let x = (rowA.count_W8 - rowA.count_W9)/rowA.count_W9
                        let b = isFinite(y) ? y : 0
                        let a = isFinite(x) ? x : 0
                        return b - a
                    })
                }
                else if (sortWeek === '8'){
                    addList.sort((rowA, rowB) => rowB.count_W9 - rowA.count_W9)
                }
            }

            this.neededData.splice(index + 1, 0, ...addList)
            //console.log(index)

            let slider = document.getElementById("myRange");
            let threshold = Number(slider.value)
            //console.log('T1:', threshold)
            //this.neededData.splice(2, 1)
            let finalFilter = this.findValues(threshold, currentBaseWeek)
            this.neededData = this.neededData.filter(function(el) { 
                if (finalFilter.includes(el.country) || finalFilter.includes(el.region)){
                    return el
                }
            });

            let slider2 = document.getElementById("myRange2");
            let threshold2 = Number(slider2.value)
            //console.log('T2:', threshold2)
            //this.neededData.splice(2, 1)
            let finalFilter2 = this.findValues2(threshold2, currentBaseWeek)
            this.neededData = this.neededData.filter(function(el) { 
                if (finalFilter2.includes(el.country) || finalFilter2.includes(el.region)){
                    return el
                }
            });


            //console.log('toggleB:', this.neededData)
        }
        rowData.isExpanded = !rowData.isExpanded
        this.drawTable()
    }


    findValues(threshold, currentBaseWeek){
        let finalFilter = []
        //console.log(typeof threshold)

        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
            if (!('region' in area)){
                let a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0
                if (currentBaseWeek === '0'){
                    a1 = ((area.count_W2 - area.count_W1)/ area.count_W1) * 100
                    a2 = ((area.count_W3 - area.count_W1)/ area.count_W1) * 100
                    a3 = ((area.count_W4 - area.count_W1)/ area.count_W1) * 100
                    a4 = ((area.count_W5 - area.count_W1)/ area.count_W1) * 100
                    a5 = ((area.count_W6 - area.count_W1)/ area.count_W1) * 100
                    a6 = ((area.count_W7 - area.count_W1)/ area.count_W1) * 100
                    a7 = ((area.count_W8 - area.count_W1)/ area.count_W1) * 100
                    a8 = ((area.count_W9 - area.count_W1)/ area.count_W1) * 100
                }
                else if (currentBaseWeek === '1'){
                    a1 = ((area.count_W1 - area.count_W2)/ area.count_W2) * 100
                    a2 = ((area.count_W3 - area.count_W2)/ area.count_W2) * 100
                    a3 = ((area.count_W4 - area.count_W2)/ area.count_W2) * 100
                    a4 = ((area.count_W5 - area.count_W2)/ area.count_W2) * 100
                    a5 = ((area.count_W6 - area.count_W2)/ area.count_W2) * 100
                    a6 = ((area.count_W7 - area.count_W2)/ area.count_W2) * 100
                    a7 = ((area.count_W8 - area.count_W2)/ area.count_W2) * 100
                    a8 = ((area.count_W9 - area.count_W2)/ area.count_W2) * 100
                }
                else if (currentBaseWeek === '2'){
                    a1 = ((area.count_W1 - area.count_W3)/ area.count_W3) * 100
                    a2 = ((area.count_W2 - area.count_W3)/ area.count_W3) * 100
                    a3 = ((area.count_W4 - area.count_W3)/ area.count_W3) * 100
                    a4 = ((area.count_W5 - area.count_W3)/ area.count_W3) * 100
                    a5 = ((area.count_W6 - area.count_W3)/ area.count_W3) * 100
                    a6 = ((area.count_W7 - area.count_W3)/ area.count_W3) * 100
                    a7 = ((area.count_W8 - area.count_W3)/ area.count_W3) * 100
                    a8 = ((area.count_W9 - area.count_W3)/ area.count_W3) * 100
                }
                else if (currentBaseWeek === '3'){
                    a1 = ((area.count_W1 - area.count_W4)/ area.count_W4) * 100
                    a2 = ((area.count_W2 - area.count_W4)/ area.count_W4) * 100
                    a3 = ((area.count_W3 - area.count_W4)/ area.count_W4) * 100
                    a4 = ((area.count_W5 - area.count_W4)/ area.count_W4) * 100
                    a5 = ((area.count_W6 - area.count_W4)/ area.count_W4) * 100
                    a6 = ((area.count_W7 - area.count_W4)/ area.count_W4) * 100
                    a7 = ((area.count_W8 - area.count_W4)/ area.count_W4) * 100
                    a8 = ((area.count_W9 - area.count_W4)/ area.count_W4) * 100
                }
                else if (currentBaseWeek === '4'){
                    a1 = ((area.count_W1 - area.count_W5)/ area.count_W5) * 100
                    a2 = ((area.count_W2 - area.count_W5)/ area.count_W5) * 100
                    a3 = ((area.count_W3 - area.count_W5)/ area.count_W5) * 100
                    a4 = ((area.count_W4 - area.count_W5)/ area.count_W5) * 100
                    a5 = ((area.count_W6 - area.count_W5)/ area.count_W5) * 100
                    a6 = ((area.count_W7 - area.count_W5)/ area.count_W5) * 100
                    a7 = ((area.count_W8 - area.count_W5)/ area.count_W5) * 100
                    a8 = ((area.count_W9 - area.count_W5)/ area.count_W5) * 100
                }
                else if (currentBaseWeek === '5'){
                    a1 = ((area.count_W1 - area.count_W6)/ area.count_W6) * 100
                    a2 = ((area.count_W2 - area.count_W6)/ area.count_W6) * 100
                    a3 = ((area.count_W3 - area.count_W6)/ area.count_W6) * 100
                    a4 = ((area.count_W4 - area.count_W6)/ area.count_W6) * 100
                    a5 = ((area.count_W5 - area.count_W6)/ area.count_W6) * 100
                    a6 = ((area.count_W7 - area.count_W6)/ area.count_W6) * 100
                    a7 = ((area.count_W8 - area.count_W6)/ area.count_W6) * 100
                    a8 = ((area.count_W9 - area.count_W6)/ area.count_W6) * 100
                }
                else if (currentBaseWeek === '6'){
                    a1 = ((area.count_W1 - area.count_W7)/ area.count_W7) * 100
                    a2 = ((area.count_W2 - area.count_W7)/ area.count_W7) * 100
                    a3 = ((area.count_W3 - area.count_W7)/ area.count_W7) * 100
                    a4 = ((area.count_W4 - area.count_W7)/ area.count_W7) * 100
                    a5 = ((area.count_W5 - area.count_W7)/ area.count_W7) * 100
                    a6 = ((area.count_W6 - area.count_W7)/ area.count_W7) * 100
                    a7 = ((area.count_W8 - area.count_W7)/ area.count_W7) * 100
                    a8 = ((area.count_W9 - area.count_W7)/ area.count_W7) * 100
                }
                else if (currentBaseWeek === '7'){
                    a1 = ((area.count_W1 - area.count_W8)/ area.count_W8) * 100
                    a2 = ((area.count_W2 - area.count_W8)/ area.count_W8) * 100
                    a3 = ((area.count_W3 - area.count_W8)/ area.count_W8) * 100
                    a4 = ((area.count_W4 - area.count_W8)/ area.count_W8) * 100
                    a5 = ((area.count_W5 - area.count_W8)/ area.count_W8) * 100
                    a6 = ((area.count_W6 - area.count_W8)/ area.count_W8) * 100
                    a7 = ((area.count_W7 - area.count_W8)/ area.count_W8) * 100
                    a8 = ((area.count_W9 - area.count_W8)/ area.count_W8) * 100
                }
                else if (currentBaseWeek === '8'){
                    a1 = ((area.count_W1 - area.count_W9)/ area.count_W9) * 100
                    a2 = ((area.count_W2 - area.count_W9)/ area.count_W9) * 100
                    a3 = ((area.count_W3 - area.count_W9)/ area.count_W9) * 100
                    a4 = ((area.count_W4 - area.count_W9)/ area.count_W9) * 100
                    a5 = ((area.count_W5 - area.count_W9)/ area.count_W9) * 100
                    a6 = ((area.count_W6 - area.count_W9)/ area.count_W9) * 100
                    a7 = ((area.count_W7 - area.count_W9)/ area.count_W9) * 100
                    a8 = ((area.count_W8 - area.count_W9)/ area.count_W9) * 100
                }
                let aset = [isFinite(a1) ? a1 : 0, 
                    isFinite(a2) ? a2 : 0, 
                    isFinite(a3) ? a3 : 0, 
                    isFinite(a4) ? a4 : 0, 
                    isFinite(a5) ? a5 : 0, 
                    isFinite(a6) ? a6 : 0, 
                    isFinite(a7) ? a7 : 0, 
                    isFinite(a8) ? a8 : 0]
                if (aset.some(el => el >= threshold)){
                    finalFilter.push(area.country)
                }
            }
            else{
                finalFilter.push(area.region)
            }
        }

        return finalFilter
    }


    findValues2(threshold2, currentBaseWeek){
        let finalFilter = []
        //console.log(typeof threshold)

        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
            if (!('region' in area)){
                let a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0
                if (currentBaseWeek === '0'){
                    a1 = area.count_W2 - area.count_W1
                    a2 = area.count_W3 - area.count_W1
                    a3 = area.count_W4 - area.count_W1
                    a4 = area.count_W5 - area.count_W1
                    a5 = area.count_W6 - area.count_W1
                    a6 = area.count_W7 - area.count_W1
                    a7 = area.count_W8 - area.count_W1
                    a8 = area.count_W9 - area.count_W1
                }
                else if (currentBaseWeek === '1'){
                    a1 = area.count_W1 - area.count_W2
                    a2 = area.count_W3 - area.count_W2
                    a3 = area.count_W4 - area.count_W2
                    a4 = area.count_W5 - area.count_W2
                    a5 = area.count_W6 - area.count_W2
                    a6 = area.count_W7 - area.count_W2
                    a7 = area.count_W8 - area.count_W2
                    a8 = area.count_W9 - area.count_W2
                }
                else if (currentBaseWeek === '2'){
                    a1 = area.count_W1 - area.count_W3
                    a2 = area.count_W2 - area.count_W3
                    a3 = area.count_W4 - area.count_W3
                    a4 = area.count_W5 - area.count_W3
                    a5 = area.count_W6 - area.count_W3
                    a6 = area.count_W7 - area.count_W3
                    a7 = area.count_W8 - area.count_W3
                    a8 = area.count_W9 - area.count_W3
                }
                else if (currentBaseWeek === '3'){
                    a1 = area.count_W1 - area.count_W4
                    a2 = area.count_W2 - area.count_W4
                    a3 = area.count_W3 - area.count_W4
                    a4 = area.count_W5 - area.count_W4
                    a5 = area.count_W6 - area.count_W4
                    a6 = area.count_W7 - area.count_W4
                    a7 = area.count_W8 - area.count_W4
                    a8 = area.count_W9 - area.count_W4
                }
                else if (currentBaseWeek === '4'){
                    a1 = area.count_W1 - area.count_W5
                    a2 = area.count_W2 - area.count_W5
                    a3 = area.count_W3 - area.count_W5
                    a4 = area.count_W4 - area.count_W5
                    a5 = area.count_W6 - area.count_W5
                    a6 = area.count_W7 - area.count_W5
                    a7 = area.count_W8 - area.count_W5
                    a8 = area.count_W9 - area.count_W5
                }
                else if (currentBaseWeek === '5'){
                    a1 = area.count_W1 - area.count_W6
                    a2 = area.count_W2 - area.count_W6
                    a3 = area.count_W3 - area.count_W6
                    a4 = area.count_W4 - area.count_W6
                    a5 = area.count_W5 - area.count_W6
                    a6 = area.count_W7 - area.count_W6
                    a7 = area.count_W8 - area.count_W6
                    a8 = area.count_W9 - area.count_W6
                }
                else if (currentBaseWeek === '6'){
                    a1 = area.count_W1 - area.count_W7
                    a2 = area.count_W2 - area.count_W7
                    a3 = area.count_W3 - area.count_W7
                    a4 = area.count_W4 - area.count_W7
                    a5 = area.count_W5 - area.count_W7
                    a6 = area.count_W6 - area.count_W7
                    a7 = area.count_W8 - area.count_W7
                    a8 = area.count_W9 - area.count_W7
                }
                else if (currentBaseWeek === '7'){
                    a1 = area.count_W1 - area.count_W8
                    a2 = area.count_W2 - area.count_W8
                    a3 = area.count_W3 - area.count_W8
                    a4 = area.count_W4 - area.count_W8
                    a5 = area.count_W5 - area.count_W8
                    a6 = area.count_W6 - area.count_W8
                    a7 = area.count_W7 - area.count_W8
                    a8 = area.count_W9 - area.count_W8
                }
                else if (currentBaseWeek === '8'){
                    a1 = area.count_W1 - area.count_W9
                    a2 = area.count_W2 - area.count_W9
                    a3 = area.count_W3 - area.count_W9
                    a4 = area.count_W4 - area.count_W9
                    a5 = area.count_W5 - area.count_W9
                    a6 = area.count_W6 - area.count_W9
                    a7 = area.count_W7 - area.count_W9
                    a8 = area.count_W8 - area.count_W9
                }
                let aset = [a1, a2,  a3, a4, a5, a6, a7, a8]
                // if (area.country === 'United States'){
                //     console.log('XXX:',aset)
                // }
                if (aset.some(el => el >= threshold2)){
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