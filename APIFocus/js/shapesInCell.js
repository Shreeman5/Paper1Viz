class ShapesInCell{

    constructor(){
        this.slider3Value = document.getElementById("myRange3").value
        // if (this.slider3Value < 0){
        //     this.slider3Value = 0
        // }
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

    // addBlackStars(containerSelect){
    //     for (let j = 0; j < 3; j++){
    //         containerSelect
    //         .append("path")
    //         .attr("id", "blackStar")
    //         .attr("d",  d3.symbol().type(d3.symbolStar)
    //         .size(d => {
    //             //console.log(d.value5)
    //             let givenArray = d.value5
    //             if (givenArray[0] === 0 && givenArray[1] === 0 && givenArray[2] === 0){
    //                 return 0
    //             }
    //             else{
    //                 return 200
    //             }
    //         })
    //         )
    //         .style("stroke", "black")
    //         .attr("fill", d => {
    //             // console.log(d.value5)
    //             let a = d.value5
    //             // if (a == undefined){
    //             //     console.log('here')
    //             //     //console.log('here')
    //             //     // return "white"
    //             // }
    //             // else{
    //             let b = a[j]
    //             // console.log(b)
    //             if (b === 1){
    //                 return "black"
    //             }
    //             else{
    //                 return "white"
    //             }
    //             // }
    //         })
    //         .attr("transform", "translate("+(20 +(j*30))+", 70)")
    //     }
    // }

    setBoundariesOfCell(containerSelect){
        containerSelect
            .append('rect')
            .attr("id", "bgrect")
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 10)
            .attr('height', d => {
                //console.log(d.value4)
                if (d.value4 === 'yes'){
                    return 0
                }
                else{
                    return 50
                }
            })     
            .attr('fill', d => {
                if (d.value4 === 'no'){
                    return 'red'
                }
            })

        
        containerSelect
            .append('rect')
            .attr("id", "bgrect2")
            .attr('x', 60)
            .attr('y', 0)
            .attr('width', 10)
            .attr('height', d => {
                //console.log(d.value7)
                if (d.value7 === 'yes'){
                    return 50
                }
                else{
                    return 0
                }
            })     
            .attr('fill', d => {
                if (d.value7 === 'yes'){
                    return 'black'
                }
            })

        
        containerSelect
            .append('rect')
            .attr("id", "bgrect3")
            .attr('x', 10)
            .attr('y', 0)
            .attr('width', d => {
                //console.log(d.value7)
                if (d.value5 === 'yes'){
                    return 50
                }
                else{
                    return 0
                }
            })   
            .attr('height', 10)
            .attr('fill', d => {
                if (d.value5 === 'yes'){
                    return 'brown'
                }
            })

        
        containerSelect
            .append('rect')
            .attr("id", "bgrect4")
            .attr('x', 10)
            .attr('y', 40)
            .attr('width', d => {
                //console.log(d.value7)
                if (d.value6 === 'yes'){
                    return 50
                }
                else{
                    return 0
                }
            })   
            .attr('height', 10)
            .attr('fill', d => {
                if (d.value6 === 'yes'){
                    return 'grey'
                }
            })
    }

    addTrianglesOrConstants(containerSelect) {
        this.triangles = containerSelect
            .append("path")
            .attr("id", "changeTriangles")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            if (d.value2 !== 0){
                                return 200
                            }
                            else{
                                return 0
                            }
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", d => {
                // console.log('YY:', d.value2)
                if (d.value2 > this.slider3Value){
                    return 'purple'
                }
                else if (d.value2 > 0){
                    return this.colorScaleForPercentAttacks(d.value2)
                }
                else if (d.value2 === 0){
                    return 'white'
                }
                else if (d.value2 < 0){
                    return 'grey'
                }
            })
            .attr("transform", d => {
                if (d.value2 > 0){
                    return "translate(45, 28)"
                }
                else if (d.value2 < 0){
                    return "translate(45, 23)rotate(180)"
                } 
            })
        
        this.rectangles2 = containerSelect.append('rect')
            .attr("id", "rect2")
            .attr('x', 32)
            .attr('y', 25)
            .attr('width', 20)
            .attr('height', d => {
                if (d.value2 === 0){
                    return 4
                }
                else{
                    return 0
                }
            })     
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value2 === 0){
                    return 'grey'
                }
            })


        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
        this.triangles.on("mouseover", function(e, d) {
            //console.log(d)
            let text 
            if (d.value2 < 0){
                text = 'decrease'
            }
            else{
                text = 'increase'
            }
            let tiptext = "This country had attacks "+ text +" by "+that.better(d.value2)+ "% for this time period compared to the base time period. Absolute change was "+that.better(d.value3)+"."
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })

        this.rectangles2.on("mouseover", function(e, d) {
            let tiptext = "This country had no change in attacks(assuming that base period number != 0) for this time period compared to the base time period."
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })
    }

    
    addRectangles(containerSelect) {
        this.rectangles = containerSelect.append('rect')
            .attr("id", "rect1")
            .attr('x', 10)
            .attr('y', 15)
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

        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
        this.rectangles.on("mouseover", function(e, d) {
            //console.log(d)
            let tiptext = "This country had a total of "+that.better(d.value)+ " attacks for this time period."
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })

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

}