class BarGraph {


    constructor(){
    }

    dataForSecondViz(neededData, selected){
        //console.log(neededData)
        let margin = {top: 10, right: 30, bottom: 20, left: 50},
        width = 2000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

        
        
        let starterValue = document.getElementById('mySidebar').offsetWidth + 
            document.getElementsByClassName('linechartviewAttacks')[0].offsetWidth +
            document.getElementById('predictionTable').offsetWidth + 50
        let barGraphStarter = starterValue + "px"

        document.getElementById("comparisonGroupedBarGraph").style.left = barGraphStarter
        document.getElementById("comparisonGroupedBarGraph").style.top = "200px"
        document.getElementById("comparisonGroupedBarGraph").style.width = "2000px"
        document.getElementById("comparisonGroupedBarGraph").style.height = "600px"

        let svg = d3.select("#comparisonGroupedBarGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        let arr = []
        let weekData = []
        const entries = Object.entries(neededData)  
        //console.log(entries)
        for(let i = 0; i < entries.length;i++){
            //console.log(entries[i][1])
            // let entryData = entries[i][1]
            // for (let forecast of entryData){
            //     //console.log('ty:', forecast)
            //     for (let country of forecast.meta){
            //         if (country.country === this.country){
            //             arr.push(country)
            //         }
            //     }
            // }
            let text = 'TP' + (i+1) + '_TP' + (i+2) 
            weekData.push(text)
            arr.push(entries[i][1])
        }

        // console.log(arr)
        console.log(weekData)

        let arr_vals = []
        let barChartInput = []
        let pieChartInput = []
        let i = 0
        for (let entry of arr) {
            //console.log(entry)
            // let uat = entry['uat_w'+selected[0]];
            let val0 = entry['uat_'+selected[i]]
            arr_vals.push(val0)
            let val1 = entry['cat_'+selected[i]]
            arr_vals.push(val1)
            let val2 = entry['cat_'+selected[i+1]]
            arr_vals.push(val2)
            let val3 = entry['uat_'+selected[i+1]]
            arr_vals.push(val3)

            barChartInput.push({comparison: weekData[i], old_week_attacks_unique: ''+val0, 
            old_week_attacks_common: ''+val1, new_week_attacks_common: ''+val2, 
            new_week_attacks_unique: ''+val3})


            let val4 = entry['uatt_'+selected[i]]
            let val5 = entry['catt']
            let val6 = entry['uatt_'+selected[i+1]]

            pieChartInput.push({"Attackers_Unique_To_Old_Week": val4, "Attackers_Common_To_Both_Weeks": val5, "Attackers_Unique_To_New_Week": val6})

            i = i+1
        }
        //console.log('Arr_vals:', arr_vals)
        //console.log('Input:', barChartInput)
        //console.log('input1: ', pieChartInput)

        let rectPositions = this.makeBarChart(barChartInput, arr_vals, svg, width, height, margin)
        this.appendText(svg)
        this.makePieChart(pieChartInput, svg, rectPositions)
    }


    makePieChart(data, svg, rectPositions){
        let radius = 50;

        for (let i = 0; i < data.length; i++){
            let number = rectPositions[i] + 100
            //console.log(data[i])

            const g = svg.append("g")
                        .attr("transform", `translate(${number}, ${150})`)

            const color = d3.scaleOrdinal()
            .range(['grey','#377eb8','green'])

            const pie = d3.pie().value(function(d) {
                //console.log(d[1])
                return d[1]
            })
            const data_ready = pie(Object.entries(data[i]))


            const arcGenerator = d3.arc()
                                .innerRadius(0)
                                .outerRadius(radius)


            g.selectAll('arc')
            .data(data_ready)
            .join('path')
            .attr('d', arcGenerator)
            .attr('fill', function(d){ return(color(d.data[0])) })
            .attr("stroke", "black")
            .style("stroke-width", "0.5px")
            .style("opacity", 0.7)

            g.selectAll('arc')
            .data(data_ready)
            .join('text')
            .text(function(d){ return d.data[1]})
            .attr("transform", function(d) { 
                let c = arcGenerator.centroid(d)
                return "translate(" + c[0]*2.6 +"," + c[1]*2.6 + ")"
                //return `translate(${arcGenerator.centroid(d)})`
            })
            .style("text-anchor", "middle")
            .style("font-size", 14)
        }
    }

    appendText(svg){
        svg.append('rect').attr("x", 50).attr("y", 0).attr("width", 50).attr("height", 10).attr("fill", 'grey')
        svg.append('text').attr("x", 110).attr("y", 10).text("Old Time Period Attacks[Attackers Unique to Old Time Period]").style("font-size", "20px")
        svg.append('rect').attr("x", 50).attr("y", 25).attr("width", 50).attr("height", 10).attr("fill", '#377eb8')
        svg.append('text').attr("x", 110).attr("y", 35).text("Old to New Time Period Attacks[Attackers Common in Both Time Periods]").style("font-size", "20px")
        svg.append('rect').attr("x", 50).attr("y", 50).attr("width", 50).attr("height", 10).attr("fill", 'green')
        svg.append('text').attr("x", 110).attr("y", 60).text("New Time Period Attacks[Attackers Unique to New Time Period]").style("font-size", "20px")
        svg.append('text').attr("x", 900).attr("y", 15).text(Table.country+"[Attacks and Attackers distribution]").style("font-size", "30px")
        svg.append('text').attr("x", 720).attr("y", 45).text("First two bars for each category shows the total attacks that happened in the old time period.").style("font-size", "25px")
        svg.append('text').attr("x", 720).attr("y", 75).text("Last two bars for each category shows the total attacks that happened in the new time period.").style("font-size", "25px")
    }

    makeBarChart(input, arr_vals, svg, width, height, margin){
        let subgroups = ['old_week_attacks_unique', 'old_week_attacks_common',
        'new_week_attacks_common', 'new_week_attacks_unique']

        let groups = input.map(d => d.comparison)
        //console.log('yo:', groups)

        let rectPositions = []

        let x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])

        svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSize(1))


        let y = d3.scaleLinear()
        .domain([0, d3.max(arr_vals)*2])
        .range([height, 0]);

        svg.append("g")
        .attr("class", "axis2")
        .attr("transform", "translate(" + margin.left + "," + (-margin.bottom) + ")")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .text(d => {
            if (d >= 1000000){
                return (d/1000000).toFixed(1) + 'M'
            }
            else if (d >= 1000){
                return (d/1000).toFixed(1) + 'K'
            }
            else{
                return d
            }
        })
        .attr("transform", "rotate(-50)")

        svg.append('text').text('Attacks').attr('x', -350).attr('y', 0).attr('transform', 'rotate(-90)').attr("class", "axisxattacks")
        svg.append('text').text('Old Time Period -- New Time Period').attr('x', 800).attr('y', 590).attr("class", "axisxattacks")


        let xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([margin.left, x.bandwidth()])
            .padding([0.05])
        //console.log(xSubgroup)
        
        let color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['grey','#377eb8','#377eb8', 'green'])

        this.rectangles = svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(input)
            .join("g")
            .attr("transform", function(d) { 
                //console.log(x(d.comparison))
                rectPositions.push(x(d.comparison))
                return "translate(" + x(d.comparison) + ",0)"; 
            })
            .selectAll("rect")
            .data(function(d) { 
                //console.log('Xyx:', d)
                return subgroups.map(function(key) { 
                    //console.log('rere:', {key: key, value: d[key]})
                    return {key: key, value: d[key]}; 
                }); 
            })
            .join("rect")
            .attr("x", d => {
                //console.log('efe:', d.key)
                return xSubgroup(d.key)
            })
            .attr("y", d => {
                //console.log('A:', y(0))
                return y(0) - margin.bottom
            })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => {
                //console.log('B:', height - y(0))
                return height - y(0)
            })
            .attr("fill", d => color(d.key));

            svg.selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", function(d) { 
                //console.log('C:', y(d.value))
                return y(d.value) - margin.bottom; 
            })
            .attr("height", function(d) { 
                // console.log('D:', height - y(d.value))
                // console.log('E:', this.height)
                // console.log('F:', y(d.value))
                return height- y(d.value); 
            })
            .delay(function(d,i){return(i*100)})


        // let that = this
        // let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        // this.rectangles.on("mouseover", function(e, d) {
        //     console.log(d)
        //     console.log(d.key)
        //     console.log(d.value)
        //     // let tiptext
        //     // if (d.isForecast === true){
        //     //     tiptext = "This continent had a total of "+that.better(d.value)+ " attacks this week."
        //     // }
        //     // else{
        //     //     tiptext = "This country had a total of "+that.better(d.value)+ " attacks this week."
        //     // }
        //     // tip.style("opacity", 5)
        //     //     .html(tiptext)
        //     //     .style("left", (e.pageX) + "px")
        //     //     .style("top", (e.pageY) + "px")
        // })
        // .on("mouseout", function(d) {
        //     tip.style("opacity", 0)
        // })

        return rectPositions
    }

    fetchData(){
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)
        // console.log('Weeks:', selected)
        // console.log(this.countryCode)

        let that = this
        if (selectedWeeksLength >= 2 && Table.countryCode != null){
            getData(selected).then(function(loadedData){
                that.dataForSecondViz(loadedData, selected)
            })
        }
        else{
            console.log("not enough checks")
        }
    }

}

async function getData(selected){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    let api_address = 'http://128.110.217.130/comparison?cluster='+givenValue+'&cc='+Table.countryCode+'&period='+givenValue2+'&range='+selected.join(',')
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    //console.log('Translator:', jsonData)

    // let api_address_2 = 'http://128.110.217.130/top/usernames?cluster='+givenValue+'&cc='+Table.countryCode+'&period='+givenValue2+'&range='+selected.join(',')
    // console.log(api_address_2)
    // const data_2 = await fetch(api_address_2)
    // const jsonData_2 = await data_2.json()
    // console.log(jsonData_2)
    
    //console.log('op:', jsonData)
    return jsonData

}