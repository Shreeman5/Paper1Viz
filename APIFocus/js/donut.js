class Donut{

    constructor(){

    }

    dataForFourthViz(neededData){
        console.log(neededData)

        let margin = {top: 100, right: 30, bottom: 20, left: 50},
        width = 1300 - margin.left - margin.right,
        height = 1300 - margin.top - margin.bottom;

        let starterValue = document.getElementById('mySidebar').offsetWidth + 
            document.getElementsByClassName('linechartviewAttacks')[0].offsetWidth +
            document.getElementById('predictionTable').offsetWidth + 50
        let donutStarter = starterValue + "px"
        
        document.getElementById("donutGraph").style.left = donutStarter
        document.getElementById("donutGraph").style.top = "2300px"
        document.getElementById("donutGraph").style.width = "1300px"
        document.getElementById("donutGraph").style.height = "1300px"

        let svg = d3.select("#donutGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        //console.log(BarGraph.rectPositions)
        this.makeDonutChart(neededData, svg)
    }

    makeDonutChart(data, svg){
        let radius = 100;
        let number = 100

        for (const key in data){

            let desiredData = {}
            let asn_types = []
            for (const values of data[key]){
                desiredData[values['asn_type']] = values['count']
                asn_types.push(values['asn_type'])
            }

            console.log(asn_types)

            const g = svg.append("g")
                        .attr("transform", `translate(${number}, ${150})`)

            let color = d3.scaleOrdinal(d3.schemeTableau10).domain(asn_types)

            let pie = d3.pie()
                .sort(null) // Do not sort group by size
                .value(function(d) {return d[1] })
            let data_ready = pie(Object.entries(desiredData))
            console.log(data_ready)


            // The arc generator
            let arc = d3.arc()
                .innerRadius(radius * 0.5)         // This is the size of the donut hole
                .outerRadius(radius * 0.8)
            
            // Another arc that won't be drawn. Just for labels positioning
            // let outerArc = d3.arc()
            //     .innerRadius(radius * 0.9)
            //     .outerRadius(radius * 0.9)
            let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
            g.selectAll('allSlices')
                .data(data_ready)
                .join('path')
                .attr('d', arc)
                .attr('fill', function(d){ 
                    return(color(d.data[0])) 
                })
                .attr("stroke", "white")
                .style("stroke-width", "2px")
                .style("opacity", 0.7)
                .on('mouseover', function(e, d){
                    tip.style("opacity", 5)
                    .html(d.data[0] + ':' + d.data[1])
                    .style("left", (e.pageX) + "px")
                    .style("top", (e.pageY) + "px")  
                })
                .on('mouseout', function(d, i){
                    tip.style("opacity", 0)
                })
            
            
            svg.append('text').attr("x", number-50).attr("y", 10).text(key).style("font-size", "20px")

            // g.selectAll('allPolylines')
            //     .data(data_ready)
            //     .join('polyline')
            //       .attr("stroke", "black")
            //       .style("fill", "none")
            //       .attr("stroke-width", 1)
            //       .attr('points', function(d) {
            //         let posA = arc.centroid(d)// line insertion in the slice
            //         let val = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
            //         let posB = val.map(function(x) {return x * 1.1})
            //         // let val2 = outerArc.centroid(d)
            //         // let posC = val2.map(function(x) {return x * 1.7}); // Label position = almost the same as posB
            //         // var midangle = d.startAngle + (d.endAngle - d.startAngle)  // we need the angle to see if the X position will be at the extreme right or extreme left
            //         // posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            //         return [posA, posB]
            //       })

            // g.selectAll('allLabels')
            //     .data(data_ready)
            //     .join('text')
            //     .text( function(d) { console.log(d.data[0]) ; return d.data[0] + ':' + d.data[1] } )
            //     .attr('transform', function(d) {
            //         let val = outerArc.centroid(d);
            //         let pos = val.map(function(x) {return x * 1.8})
            //         var midangle = d.startAngle + (d.endAngle - d.startAngle)
            //         pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            //         return 'translate(' + pos + ')';
            //     })
            //     .style('text-anchor', function(d) {
            //         var midangle = d.startAngle + (d.endAngle - d.startAngle)
            //         return (midangle < Math.PI ? 'start' : 'end')
            //     })

            number += 170

            //console.log(desiredData)
        }
    }



    fetchData3(){
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)
        // console.log('Weeks:', selected)
        // console.log(this.countryCode)

        let that = this
        if (selectedWeeksLength >= 2 && Table.countryCode != null){
            getData3(selected).then(function(loadedData){
                that.dataForFourthViz(loadedData, selected)
            })
        }
        else{
            console.log("not enough checks")
        }
    }

}


async function getData3(selected){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    let api_address = 'http://128.110.217.130/top/asn/type?cluster='+givenValue+'&cc='+Table.countryCode+'&range='+selected.join(',')+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    //console.log('op:', jsonData)
    return jsonData

}