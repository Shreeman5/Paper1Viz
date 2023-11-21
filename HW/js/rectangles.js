class Rectangle{

    constructor(){
        this.slider3Value = document.getElementById("myRange3").value
        this.slider3ValueMin = document.getElementById("myRange3").min
        this.colorScaleForPercentAttacks= d3.scaleSequential()
        .interpolator(d3.interpolateGreens)
        .domain([this.slider3ValueMin,this.slider3Value])

        this.slider4Value = document.getElementById("myRange4").value
        this.slider4ValueMin = document.getElementById("myRange4").min
        this.colorScaleForAbsoluteAttacks = d3.scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([this.slider4ValueMin,this.slider4Value])
    }


    setBackgroundOfCell(containerSelect){
        // let stuff = containerSelect['_parents']
        // for (let i = 0; i < stuff.length; i++){
        //     // console.log()
        //     let nextStuff = stuff[i] 
        //     console.log(nextStuff)
        //     nextStuff.fill = "red"
        //     //nextStuff['preserveAspectRatio'] = "none"
        // }

        containerSelect
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 160)
            .attr('height', d => {
                if (d.value4 === undefined || d.value4 === 'yes'){
                    return 0
                }
                else{
                    return 10
                }
            })     
            // .attr('stroke', 'black')
            // .attr('stroke-width', 0)
            .attr('fill', d => {
                if (d.value4 === 'no'){
                    return 'red'
                }
            })
    }

    addRectangles(containerSelect) {
        console.log(containerSelect)

        this.rectangles = containerSelect.append('rect')
            .attr('x', 70)
            .attr('y', 0)
            .attr('width', 20)
            .attr('height', 20)     
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value >= this.slider4Value){
                    return 'purple'
                }
                else{
                    return this.colorScaleForAbsoluteAttacks(d.value)
                }
            })
            .classed('margin-bar', true);

        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        this.rectangles.on("mouseover", function(e, d) {
            //console.log(d)
            let tiptext
            if (d.isForecast === true){
                tiptext = "This continent has a country which had "+that.better(d.value)+ " attacks (max value among all countries) for this time period."
            }
            else{
                tiptext = "This country had a total of "+that.better(d.value)+ " attacks for this time period."
            }
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })

        //console.log(containerSelect)
    }


    addRectangles2(containerSelect) {
        this.rectangles3 = containerSelect.append('rect')
            .attr('x', 70)
            .attr('y', 25)
            .attr('width', 20)
            .attr('height', 20)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value2 >= this.slider3Value){
                    return 'purple'
                }
                else{
                    return this.colorScaleForPercentAttacks(d.value2)
                }
            })
            .classed('margin-bar', true);

        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        this.rectangles3.on("mouseover", function(e, d) {
            //console.log(d)
            let text 
            if (d.value2 < 0){
                text = 'decrease'
            }
            else{
                text = 'increase'
            }
            let tiptext
            if (d.isForecast === true){
                tiptext = "This continent has a country which had attacks "+ text +" by "+that.better(d.value2)+ "%(max value among all countries) for this time period compared to the base time period."
            }
            else{
                tiptext = "This country had attacks "+ text +" by "+that.better(d.value2)+ "% for this time period compared to the base time period. Absolute change was "+that.better(d.value3)+"."
            }
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })
    }

    better(number){  
        if (Math.abs(number) >= 1000000){
            return (number/1000000).toFixed(2) + 'M'
        } 
        else if (Math.abs(number) >= 1000){
            return (number/1000).toFixed(2) + 'K'
        }
        else if (Math.abs(number) < 1000){
            if (number % 1 != 0){
                return number.toFixed(2)
            }
            else{
                return number
            }
        }
    }

}