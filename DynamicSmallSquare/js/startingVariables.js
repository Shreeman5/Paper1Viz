class StartingVariables{

    constructor(neededData, baseNumber){
        this.neededData = neededData
        this.baseNumber = baseNumber
    }

    // continentAbsoluteAttacks(){
    //     //let arr = []
    //     for (let forecast of this.neededData){
    //         let counter_W1 = 0
    //         let counter_W2 = 0
    //         let counter_W3 = 0
    //         let counter_W4 = 0
    //         let counter_W5 = 0
    //         let counter_W6 = 0
    //         let counter_W7 = 0
    //         let counter_W8 = 0
    //         let counter_W9 = 0
    //         for (let country of forecast.meta){
    //             counter_W1 += country.count_W1
    //             //arr.push(country.count_W1)
    //             counter_W2 += country.count_W2
    //             //arr.push(country.count_W2)
    //             counter_W3 += country.count_W3
    //             //arr.push(country.count_W3)
    //             counter_W4 += country.count_W4
    //             //arr.push(country.count_W4)
    //             counter_W5 += country.count_W5
    //             //arr.push(country.count_W5)
    //             counter_W6 += country.count_W6
    //             //arr.push(country.count_W6)
    //             counter_W7 += country.count_W7
    //             //arr.push(country.count_W7)
    //             counter_W8 += country.count_W8
    //             //arr.push(country.count_W8)
    //             counter_W9 += country.count_W9
    //             //arr.push(country.count_W9)
    //         }
    //         forecast.continent_attacks_W1 = counter_W1
    //         forecast.continent_attacks_W2 = counter_W2
    //         forecast.continent_attacks_W3 = counter_W3
    //         forecast.continent_attacks_W4 = counter_W4
    //         forecast.continent_attacks_W5 = counter_W5
    //         forecast.continent_attacks_W6 = counter_W6
    //         forecast.continent_attacks_W7 = counter_W7
    //         forecast.continent_attacks_W8 = counter_W8
    //         forecast.continent_attacks_W9 = counter_W9
    //     }
    //     //arr.sort(function(a, b){return a-b;})
        
    //     //console.log(arr)
    //     // 1728 numbers
    //     // 1614 below 100K, 93.4%
    //     // 1291 below 10K, 74.7%
    //     // 816 below 1K, 47.2%
    //     // 475 below 100, 27.4%
    //     // Range 0 to 4.1M.
    // }

    // continentAbsoluteAttackers(){
    //     for (let forecast of this.neededData){
    //         let counter_W1 = 0
    //         let counter_W2 = 0
    //         let counter_W3 = 0
    //         let counter_W4 = 0
    //         let counter_W5 = 0
    //         let counter_W6 = 0
    //         let counter_W7 = 0
    //         let counter_W8 = 0
    //         let counter_W9 = 0
    //         for (let country of forecast.meta){
    //             counter_W1 += country.count_W1_attackers
    //             counter_W2 += country.count_W2_attackers
    //             counter_W3 += country.count_W3_attackers
    //             counter_W4 += country.count_W4_attackers
    //             counter_W5 += country.count_W5_attackers
    //             counter_W6 += country.count_W6_attackers
    //             counter_W7 += country.count_W7_attackers
    //             counter_W8 += country.count_W8_attackers
    //             counter_W9 += country.count_W9_attackers
    //         }
    //         forecast.continent_attackers_W1 = counter_W1
    //         forecast.continent_attackers_W2 = counter_W2
    //         forecast.continent_attackers_W3 = counter_W3
    //         forecast.continent_attackers_W4 = counter_W4
    //         forecast.continent_attackers_W5 = counter_W5
    //         forecast.continent_attackers_W6 = counter_W6
    //         forecast.continent_attackers_W7 = counter_W7
    //         forecast.continent_attackers_W8 = counter_W8
    //         forecast.continent_attackers_W9 = counter_W9
    //     }
    // }

    continentMaxAbsoluteAttacks(){
        for (let forecast of this.neededData){

            forecast.isForecast = true
            forecast.isExpanded = false
            forecast.number = this.baseNumber

            let var_1 = 0
            let var_2 = 0
            let var_3 = 0
            let var_4 = 0
            let var_5 = 0
            let var_6 = 0
            let var_7 = 0
            let var_8 = 0
            let var_9 = 0
            for (let country of forecast.meta){
                country.number = this.baseNumber
                
                var_1 = Math.max(var_1, country.count_W1)
                var_2 = Math.max(var_2, country.count_W2)
                var_3 = Math.max(var_3, country.count_W3)
                var_4 = Math.max(var_4, country.count_W4)
                var_5 = Math.max(var_5, country.count_W5)
                var_6 = Math.max(var_6, country.count_W6)
                var_7 = Math.max(var_7, country.count_W7)
                var_8 = Math.max(var_8, country.count_W8)
                var_9 = Math.max(var_9, country.count_W9)
            }
            
            forecast.continent_max_attacks_1 = var_1
            forecast.continent_max_attacks_2 = var_2
            forecast.continent_max_attacks_3 = var_3
            forecast.continent_max_attacks_4 = var_4
            forecast.continent_max_attacks_5 = var_5
            forecast.continent_max_attacks_6 = var_6
            forecast.continent_max_attacks_7 = var_7
            forecast.continent_max_attacks_8 = var_8
            forecast.continent_max_attacks_9 = var_9
        }
    }


    continentMaxPercentageAttacks(){
        for (let forecast of this.neededData){

            forecast.isForecast = true
            forecast.isExpanded = false
            forecast.number = this.baseNumber

            
            let max_num_1 = -101
            let max_num_2 = -101
            let max_num_3 = -101
            let max_num_4 = -101
            let max_num_5 = -101
            let max_num_6 = -101
            let max_num_7 = -101
            let max_num_8 = -101


            for (let country of forecast.meta){
                country.number = this.baseNumber
                let var_1 = 0
                let var_2 = 0
                let var_3 = 0
                let var_4 = 0
                let var_5 = 0
                let var_6 = 0
                let var_7 = 0
                let var_8 = 0
                let var_9 = 0
                
                if (this.baseNumber === "0"){
                    //console.log('yes')
                    var_1 = country.count_W1
                    var_2 = country.count_W2
                    var_3 = country.count_W3
                    var_4 = country.count_W4
                    var_5 = country.count_W5
                    var_6 = country.count_W6
                    var_7 = country.count_W7
                    var_8 = country.count_W8
                    var_9 = country.count_W9
                }else if(this.baseNumber === "1"){
                    //console.log('no')
                    var_1 = country.count_W2
                    var_2 = country.count_W1
                    var_3 = country.count_W3
                    var_4 = country.count_W4
                    var_5 = country.count_W5
                    var_6 = country.count_W6
                    var_7 = country.count_W7
                    var_8 = country.count_W8
                    var_9 = country.count_W9
                }else if(this.baseNumber === "2"){
                    //console.log('maybe')
                    var_1 = country.count_W3
                    var_2 = country.count_W1
                    var_3 = country.count_W2
                    var_4 = country.count_W4
                    var_5 = country.count_W5
                    var_6 = country.count_W6
                    var_7 = country.count_W7
                    var_8 = country.count_W8
                    var_9 = country.count_W9
                }else if(this.baseNumber === "3"){
                    var_1 = country.count_W4
                    var_2 = country.count_W1
                    var_3 = country.count_W2
                    var_4 = country.count_W3
                    var_5 = country.count_W5
                    var_6 = country.count_W6
                    var_7 = country.count_W7
                    var_8 = country.count_W8
                    var_9 = country.count_W9
                }else if(this.baseNumber === "4"){
                    var_1 = country.count_W5
                    var_2 = country.count_W1
                    var_3 = country.count_W2
                    var_4 = country.count_W3
                    var_5 = country.count_W4
                    var_6 = country.count_W6
                    var_7 = country.count_W7
                    var_8 = country.count_W8
                    var_9 = country.count_W9
                }else if(this.baseNumber === "5"){
                    var_1 = country.count_W6
                    var_2 = country.count_W1
                    var_3 = country.count_W2
                    var_4 = country.count_W3
                    var_5 = country.count_W4
                    var_6 = country.count_W5
                    var_7 = country.count_W7
                    var_8 = country.count_W8
                    var_9 = country.count_W9
                }else if(this.baseNumber === "6"){
                    var_1 = country.count_W7
                    var_2 = country.count_W1
                    var_3 = country.count_W2
                    var_4 = country.count_W3
                    var_5 = country.count_W4
                    var_6 = country.count_W5
                    var_7 = country.count_W6
                    var_8 = country.count_W8
                    var_9 = country.count_W9
                }else if(this.baseNumber === "7"){
                    var_1 = country.count_W8
                    var_2 = country.count_W1
                    var_3 = country.count_W2
                    var_4 = country.count_W3
                    var_5 = country.count_W4
                    var_6 = country.count_W5
                    var_7 = country.count_W6
                    var_8 = country.count_W7
                    var_9 = country.count_W9
                }else if(this.baseNumber === "8"){
                    var_1 = country.count_W9
                    var_2 = country.count_W1
                    var_3 = country.count_W2
                    var_4 = country.count_W3
                    var_5 = country.count_W4
                    var_6 = country.count_W5
                    var_7 = country.count_W6
                    var_8 = country.count_W7
                    var_9 = country.count_W8
                }

                //for max
                let change_9 = ((var_2 - var_1)/var_1) * 100
                if (change_9 > max_num_1){
                    if (isFinite(change_9)){
                        max_num_1 = change_9
                    }
                }
                let change_10 = ((var_3 - var_1)/var_1) * 100
                if (change_10 > max_num_2){
                    if (isFinite(change_10)){
                        max_num_2 = change_10
                    }
                }
                let change_11 = ((var_4 - var_1)/var_1) * 100
                if (change_11 > max_num_3){
                    if (isFinite(change_11)){
                        max_num_3 = change_11
                    }
                }
                let change_12 = ((var_5 - var_1)/var_1) * 100
                if (change_12 > max_num_4){
                    if (isFinite(change_12)){
                        max_num_4 = change_12
                    }
                }
                let change_13 = ((var_6 - var_1)/var_1) * 100
                if (change_13 > max_num_5){
                    if (isFinite(change_13)){
                        max_num_5 = change_13
                    }
                }
                let change_14 = ((var_7 - var_1)/var_1) * 100
                if (change_14 > max_num_6){
                    if (isFinite(change_14)){
                        max_num_6 = change_14
                    }
                }
                let change_15 = ((var_8 - var_1)/var_1) * 100
                if (change_15 > max_num_7){
                    if (isFinite(change_15)){
                        max_num_7 = change_15
                    }
                }
                let change_16 = ((var_9 - var_1)/var_1) * 100
                if (change_16 > max_num_8){
                    if (isFinite(change_16)){
                        max_num_8 = change_16
                    }
                }
            }
            
            forecast.continent_max_increase_attacks_1 = max_num_1
            forecast.continent_max_increase_attacks_2 = max_num_2
            forecast.continent_max_increase_attacks_3 = max_num_3
            forecast.continent_max_increase_attacks_4 = max_num_4
            forecast.continent_max_increase_attacks_5 = max_num_5
            forecast.continent_max_increase_attacks_6 = max_num_6
            forecast.continent_max_increase_attacks_7 = max_num_7
            forecast.continent_max_increase_attacks_8 = max_num_8
        }
    }

    // continentMaxPercentageAttackers(){
    //     for (let forecast of this.neededData){
            
    //         //console.log(forecast)

    //         // forecast.isForecast = true
    //         // forecast.isExpanded = false
    //         // forecast.number = this.baseNumber

    //         let max_num_1 = -101
    //         let max_num_2 = -101
    //         let max_num_3 = -101
    //         let max_num_4 = -101
    //         let max_num_5 = -101
    //         let max_num_6 = -101
    //         let max_num_7 = -101
    //         let max_num_8 = -101


    //         for (let country of forecast.meta){
    //             //country.number = this.baseNumber
    //             let var_1 = 0
    //             let var_2 = 0
    //             let var_3 = 0
    //             let var_4 = 0
    //             let var_5 = 0
    //             let var_6 = 0
    //             let var_7 = 0
    //             let var_8 = 0
    //             let var_9 = 0
                
    //             if (this.baseNumber === "0"){
    //                 //console.log('yes')
    //                 var_1 = country.count_W1_attackers
    //                 var_2 = country.count_W2_attackers
    //                 var_3 = country.count_W3_attackers
    //                 var_4 = country.count_W4_attackers
    //                 var_5 = country.count_W5_attackers
    //                 var_6 = country.count_W6_attackers
    //                 var_7 = country.count_W7_attackers
    //                 var_8 = country.count_W8_attackers
    //                 var_9 = country.count_W9_attackers
    //             }else if(this.baseNumber === "1"){
    //                 //console.log('no')
    //                 var_1 = country.count_W2_attackers
    //                 var_2 = country.count_W1_attackers
    //                 var_3 = country.count_W3_attackers
    //                 var_4 = country.count_W4_attackers
    //                 var_5 = country.count_W5_attackers
    //                 var_6 = country.count_W6_attackers
    //                 var_7 = country.count_W7_attackers
    //                 var_8 = country.count_W8_attackers
    //                 var_9 = country.count_W9_attackers
    //             }else if(this.baseNumber === "2"){
    //                 //console.log('maybe')
    //                 var_1 = country.count_W3_attackers
    //                 var_2 = country.count_W1_attackers
    //                 var_3 = country.count_W2_attackers
    //                 var_4 = country.count_W4_attackers
    //                 var_5 = country.count_W5_attackers
    //                 var_6 = country.count_W6_attackers
    //                 var_7 = country.count_W7_attackers
    //                 var_8 = country.count_W8_attackers
    //                 var_9 = country.count_W9_attackers
    //             }else if(this.baseNumber === "3"){
    //                 var_1 = country.count_W4_attackers
    //                 var_2 = country.count_W1_attackers
    //                 var_3 = country.count_W2_attackers
    //                 var_4 = country.count_W3_attackers
    //                 var_5 = country.count_W5_attackers
    //                 var_6 = country.count_W6_attackers
    //                 var_7 = country.count_W7_attackers
    //                 var_8 = country.count_W8_attackers
    //                 var_9 = country.count_W9_attackers
    //             }else if(this.baseNumber === "4"){
    //                 var_1 = country.count_W5_attackers
    //                 var_2 = country.count_W1_attackers
    //                 var_3 = country.count_W2_attackers
    //                 var_4 = country.count_W3_attackers
    //                 var_5 = country.count_W4_attackers
    //                 var_6 = country.count_W6_attackers
    //                 var_7 = country.count_W7_attackers
    //                 var_8 = country.count_W8_attackers
    //                 var_9 = country.count_W9_attackers
    //             }else if(this.baseNumber === "5"){
    //                 var_1 = country.count_W6_attackers
    //                 var_2 = country.count_W1_attackers
    //                 var_3 = country.count_W2_attackers
    //                 var_4 = country.count_W3_attackers
    //                 var_5 = country.count_W4_attackers
    //                 var_6 = country.count_W5_attackers
    //                 var_7 = country.count_W7_attackers
    //                 var_8 = country.count_W8_attackers
    //                 var_9 = country.count_W9_attackers
    //             }else if(this.baseNumber === "6"){
    //                 var_1 = country.count_W7_attackers
    //                 var_2 = country.count_W1_attackers
    //                 var_3 = country.count_W2_attackers
    //                 var_4 = country.count_W3_attackers
    //                 var_5 = country.count_W4_attackers
    //                 var_6 = country.count_W5_attackers
    //                 var_7 = country.count_W6_attackers
    //                 var_8 = country.count_W8_attackers
    //                 var_9 = country.count_W9_attackers
    //             }else if(this.baseNumber === "7"){
    //                 var_1 = country.count_W8_attackers
    //                 var_2 = country.count_W1_attackers
    //                 var_3 = country.count_W2_attackers
    //                 var_4 = country.count_W3_attackers
    //                 var_5 = country.count_W4_attackers
    //                 var_6 = country.count_W5_attackers
    //                 var_7 = country.count_W6_attackers
    //                 var_8 = country.count_W7_attackers
    //                 var_9 = country.count_W9_attackers
    //             }else if(this.baseNumber === "8"){
    //                 var_1 = country.count_W9_attackers
    //                 var_2 = country.count_W1_attackers
    //                 var_3 = country.count_W2_attackers
    //                 var_4 = country.count_W3_attackers
    //                 var_5 = country.count_W4_attackers
    //                 var_6 = country.count_W5_attackers
    //                 var_7 = country.count_W6_attackers
    //                 var_8 = country.count_W7_attackers
    //                 var_9 = country.count_W8_attackers
    //             }

    //             //for max
    //             let change_9 = ((var_2 - var_1)/var_1) * 100
    //             if (change_9 > max_num_1){
    //                 if (isFinite(change_9)){
    //                     max_num_1 = change_9
    //                 }
    //             }
    //             let change_10 = ((var_3 - var_1)/var_1) * 100
    //             if (change_10 > max_num_2){
    //                 if (isFinite(change_10)){
    //                     max_num_2 = change_10
    //                 }
    //             }
    //             let change_11 = ((var_4 - var_1)/var_1) * 100
    //             if (change_11 > max_num_3){
    //                 if (isFinite(change_11)){
    //                     max_num_3 = change_11
    //                 }
    //             }
    //             let change_12 = ((var_5 - var_1)/var_1) * 100
    //             if (change_12 > max_num_4){
    //                 if (isFinite(change_12)){
    //                     max_num_4 = change_12
    //                 }
    //             }
    //             let change_13 = ((var_6 - var_1)/var_1) * 100
    //             if (change_13 > max_num_5){
    //                 if (isFinite(change_13)){
    //                     max_num_5 = change_13
    //                 }
    //             }
    //             let change_14 = ((var_7 - var_1)/var_1) * 100
    //             if (change_14 > max_num_6){
    //                 if (isFinite(change_14)){
    //                     max_num_6 = change_14
    //                 }
    //             }
    //             let change_15 = ((var_8 - var_1)/var_1) * 100
    //             if (change_15 > max_num_7){
    //                 if (isFinite(change_15)){
    //                     max_num_7 = change_15
    //                 }
    //             }
    //             let change_16 = ((var_9 - var_1)/var_1) * 100
    //             if (change_16 > max_num_8){
    //                 if (isFinite(change_16)){
    //                     max_num_8 = change_16
    //                 }
    //             }
    //         }
            
    //         forecast.continent_max_increase_attackers_1 = max_num_1
    //         forecast.continent_max_increase_attackers_2 = max_num_2
    //         forecast.continent_max_increase_attackers_3 = max_num_3
    //         forecast.continent_max_increase_attackers_4 = max_num_4
    //         forecast.continent_max_increase_attackers_5 = max_num_5
    //         forecast.continent_max_increase_attackers_6 = max_num_6
    //         forecast.continent_max_increase_attackers_7 = max_num_7
    //         forecast.continent_max_increase_attackers_8 = max_num_8
    //     }
    // }


    // vals(){
    //     let arr = []
    //     for (let forecast of this.neededData){
    //         for (let country of forecast.meta){
    //             //console.log(country)
    //             let a1 = isFinite(((country.count_W2 - country.count_W1)/country.count_W1) * 100) ? ((country.count_W2 - country.count_W1)/country.count_W1) * 100 : 0
    //             let a2 = isFinite(((country.count_W3 - country.count_W1)/country.count_W1) * 100) ? ((country.count_W3 - country.count_W1)/country.count_W1) * 100 : 0
    //             let a3 = isFinite(((country.count_W4 - country.count_W1)/country.count_W1) * 100) ? ((country.count_W4 - country.count_W1)/country.count_W1) * 100 : 0
    //             let a4 = isFinite(((country.count_W5 - country.count_W1)/country.count_W1) * 100) ? ((country.count_W5 - country.count_W1)/country.count_W1) * 100 : 0
    //             let a5 = isFinite(((country.count_W6 - country.count_W1)/country.count_W1) * 100) ? ((country.count_W6 - country.count_W1)/country.count_W1) * 100 : 0
    //             let a6 = isFinite(((country.count_W7 - country.count_W1)/country.count_W1) * 100) ? ((country.count_W7 - country.count_W1)/country.count_W1) * 100 : 0
    //             let a7 = isFinite(((country.count_W8 - country.count_W1)/country.count_W1) * 100) ? ((country.count_W8 - country.count_W1)/country.count_W1) * 100 : 0
    //             let a8 = isFinite(((country.count_W9 - country.count_W1)/country.count_W1) * 100) ? ((country.count_W9 - country.count_W1)/country.count_W1) * 100 : 0
    //             arr.push(a1)
    //             arr.push(a2)
    //             arr.push(a3)
    //             arr.push(a4)
    //             arr.push(a5)
    //             arr.push(a6)
    //             arr.push(a7)
    //             arr.push(a8)

    //             let b1 = isFinite(((country.count_W1 - country.count_W2)/country.count_W2) * 100) ? ((country.count_W1 - country.count_W2)/country.count_W2) * 100 : 0
    //             let b2 = isFinite(((country.count_W3 - country.count_W2)/country.count_W2) * 100) ? ((country.count_W3 - country.count_W2)/country.count_W2) * 100 : 0
    //             let b3 = isFinite(((country.count_W4 - country.count_W2)/country.count_W2) * 100) ? ((country.count_W4 - country.count_W2)/country.count_W2) * 100 : 0
    //             let b4 = isFinite(((country.count_W5 - country.count_W2)/country.count_W2) * 100) ? ((country.count_W5 - country.count_W2)/country.count_W2) * 100 : 0
    //             let b5 = isFinite(((country.count_W6 - country.count_W2)/country.count_W2) * 100) ? ((country.count_W6 - country.count_W2)/country.count_W2) * 100 : 0
    //             let b6 = isFinite(((country.count_W7 - country.count_W2)/country.count_W2) * 100) ? ((country.count_W7 - country.count_W2)/country.count_W2) * 100 : 0
    //             let b7 = isFinite(((country.count_W8 - country.count_W2)/country.count_W2) * 100) ? ((country.count_W8 - country.count_W2)/country.count_W2) * 100 : 0
    //             let b8 = isFinite(((country.count_W9 - country.count_W2)/country.count_W2) * 100) ? ((country.count_W9 - country.count_W2)/country.count_W2) * 100 : 0
    //             arr.push(b1)
    //             arr.push(b2)
    //             arr.push(b3)
    //             arr.push(b4)
    //             arr.push(b5)
    //             arr.push(b6)
    //             arr.push(b7)
    //             arr.push(b8)

    //             let c1 = isFinite(((country.count_W1 - country.count_W3)/country.count_W3) * 100) ? ((country.count_W1 - country.count_W3)/country.count_W3) * 100 : 0
    //             let c2 = isFinite(((country.count_W2 - country.count_W3)/country.count_W3) * 100) ? ((country.count_W2 - country.count_W3)/country.count_W3) * 100 : 0
    //             let c3 = isFinite(((country.count_W4 - country.count_W3)/country.count_W3) * 100) ? ((country.count_W4 - country.count_W3)/country.count_W3) * 100 : 0
    //             let c4 = isFinite(((country.count_W5 - country.count_W3)/country.count_W3) * 100) ? ((country.count_W5 - country.count_W3)/country.count_W3) * 100 : 0
    //             let c5 = isFinite(((country.count_W6 - country.count_W3)/country.count_W3) * 100) ? ((country.count_W6 - country.count_W3)/country.count_W3) * 100 : 0
    //             let c6 = isFinite(((country.count_W7 - country.count_W3)/country.count_W3) * 100) ? ((country.count_W7 - country.count_W3)/country.count_W3) * 100 : 0
    //             let c7 = isFinite(((country.count_W8 - country.count_W3)/country.count_W3) * 100) ? ((country.count_W8 - country.count_W3)/country.count_W3) * 100 : 0
    //             let c8 = isFinite(((country.count_W9 - country.count_W3)/country.count_W3) * 100) ? ((country.count_W9 - country.count_W3)/country.count_W3) * 100 : 0
    //             arr.push(c1)
    //             arr.push(c2)
    //             arr.push(c3)
    //             arr.push(c4)
    //             arr.push(c5)
    //             arr.push(c6)
    //             arr.push(c7)
    //             arr.push(c8)

    //             let d1 = isFinite(((country.count_W1 - country.count_W4)/country.count_W4) * 100) ? ((country.count_W1 - country.count_W4)/country.count_W4) * 100 : 0
    //             let d2 = isFinite(((country.count_W2 - country.count_W4)/country.count_W4) * 100) ? ((country.count_W2 - country.count_W4)/country.count_W4) * 100 : 0
    //             let d3 = isFinite(((country.count_W3 - country.count_W4)/country.count_W4) * 100) ? ((country.count_W3 - country.count_W4)/country.count_W4) * 100 : 0
    //             let d4 = isFinite(((country.count_W5 - country.count_W4)/country.count_W4) * 100) ? ((country.count_W5 - country.count_W4)/country.count_W4) * 100 : 0
    //             let d5 = isFinite(((country.count_W6 - country.count_W4)/country.count_W4) * 100) ? ((country.count_W6 - country.count_W4)/country.count_W4) * 100 : 0
    //             let d6 = isFinite(((country.count_W7 - country.count_W4)/country.count_W4) * 100) ? ((country.count_W7 - country.count_W4)/country.count_W4) * 100 : 0
    //             let d7 = isFinite(((country.count_W8 - country.count_W4)/country.count_W4) * 100) ? ((country.count_W8 - country.count_W4)/country.count_W4) * 100 : 0
    //             let d8 = isFinite(((country.count_W9 - country.count_W4)/country.count_W4) * 100) ? ((country.count_W9 - country.count_W4)/country.count_W4) * 100 : 0
    //             arr.push(d1)
    //             arr.push(d2)
    //             arr.push(d3)
    //             arr.push(d4)
    //             arr.push(d5)
    //             arr.push(d6)
    //             arr.push(d7)
    //             arr.push(d8)

    //             let e1 = isFinite(((country.count_W1 - country.count_W5)/country.count_W5) * 100) ? ((country.count_W1 - country.count_W5)/country.count_W5) * 100 : 0
    //             let e2 = isFinite(((country.count_W2 - country.count_W5)/country.count_W5) * 100) ? ((country.count_W2 - country.count_W5)/country.count_W5) * 100 : 0
    //             let e3 = isFinite(((country.count_W3 - country.count_W5)/country.count_W5) * 100) ? ((country.count_W3 - country.count_W5)/country.count_W5) * 100 : 0
    //             let e4 = isFinite(((country.count_W4 - country.count_W5)/country.count_W5) * 100) ? ((country.count_W4 - country.count_W5)/country.count_W5) * 100 : 0
    //             let e5 = isFinite(((country.count_W6 - country.count_W5)/country.count_W5) * 100) ? ((country.count_W6 - country.count_W5)/country.count_W5) * 100 : 0
    //             let e6 = isFinite(((country.count_W7 - country.count_W5)/country.count_W5) * 100) ? ((country.count_W7 - country.count_W5)/country.count_W5) * 100 : 0
    //             let e7 = isFinite(((country.count_W8 - country.count_W5)/country.count_W5) * 100) ? ((country.count_W8 - country.count_W5)/country.count_W5) * 100 : 0
    //             let e8 = isFinite(((country.count_W9 - country.count_W5)/country.count_W5) * 100) ? ((country.count_W9 - country.count_W5)/country.count_W5) * 100 : 0
    //             arr.push(e1)
    //             arr.push(e2)
    //             arr.push(e3)
    //             arr.push(e4)
    //             arr.push(e5)
    //             arr.push(e6)
    //             arr.push(e7)
    //             arr.push(e8)

    //             let f1 = isFinite(((country.count_W1 - country.count_W6)/country.count_W6) * 100) ? ((country.count_W1 - country.count_W6)/country.count_W6) * 100 : 0
    //             let f2 = isFinite(((country.count_W2 - country.count_W6)/country.count_W6) * 100) ? ((country.count_W2 - country.count_W6)/country.count_W6) * 100 : 0
    //             let f3 = isFinite(((country.count_W3 - country.count_W6)/country.count_W6) * 100) ? ((country.count_W3 - country.count_W6)/country.count_W6) * 100 : 0
    //             let f4 = isFinite(((country.count_W4 - country.count_W6)/country.count_W6) * 100) ? ((country.count_W4 - country.count_W6)/country.count_W6) * 100 : 0
    //             let f5 = isFinite(((country.count_W5 - country.count_W6)/country.count_W6) * 100) ? ((country.count_W5 - country.count_W6)/country.count_W6) * 100 : 0
    //             let f6 = isFinite(((country.count_W7 - country.count_W6)/country.count_W6) * 100) ? ((country.count_W7 - country.count_W6)/country.count_W6) * 100 : 0
    //             let f7 = isFinite(((country.count_W8 - country.count_W6)/country.count_W6) * 100) ? ((country.count_W8 - country.count_W6)/country.count_W6) * 100 : 0
    //             let f8 = isFinite(((country.count_W9 - country.count_W6)/country.count_W6) * 100) ? ((country.count_W9 - country.count_W6)/country.count_W6) * 100 : 0
    //             arr.push(f1)
    //             arr.push(f2)
    //             arr.push(f3)
    //             arr.push(f4)
    //             arr.push(f5)
    //             arr.push(f6)
    //             arr.push(f7)
    //             arr.push(f8)

    //             let g1 = isFinite(((country.count_W1 - country.count_W7)/country.count_W7) * 100) ? ((country.count_W1 - country.count_W7)/country.count_W7) * 100 : 0
    //             let g2 = isFinite(((country.count_W2 - country.count_W7)/country.count_W7) * 100) ? ((country.count_W2 - country.count_W7)/country.count_W7) * 100 : 0
    //             let g3 = isFinite(((country.count_W3 - country.count_W7)/country.count_W7) * 100) ? ((country.count_W3 - country.count_W7)/country.count_W7) * 100 : 0
    //             let g4 = isFinite(((country.count_W4 - country.count_W7)/country.count_W7) * 100) ? ((country.count_W4 - country.count_W7)/country.count_W7) * 100 : 0
    //             let g5 = isFinite(((country.count_W5 - country.count_W7)/country.count_W7) * 100) ? ((country.count_W5 - country.count_W7)/country.count_W7) * 100 : 0
    //             let g6 = isFinite(((country.count_W6 - country.count_W7)/country.count_W7) * 100) ? ((country.count_W6 - country.count_W7)/country.count_W7) * 100 : 0
    //             let g7 = isFinite(((country.count_W8 - country.count_W7)/country.count_W7) * 100) ? ((country.count_W8 - country.count_W7)/country.count_W7) * 100 : 0
    //             let g8 = isFinite(((country.count_W9 - country.count_W7)/country.count_W7) * 100) ? ((country.count_W9 - country.count_W7)/country.count_W7) * 100 : 0
    //             arr.push(g1)
    //             arr.push(g2)
    //             arr.push(g3)
    //             arr.push(g4)
    //             arr.push(g5)
    //             arr.push(g6)
    //             arr.push(g7)
    //             arr.push(g8)

    //             let h1 = isFinite(((country.count_W1 - country.count_W8)/country.count_W8) * 100) ? ((country.count_W1 - country.count_W8)/country.count_W8) * 100 : 0
    //             let h2 = isFinite(((country.count_W2 - country.count_W8)/country.count_W8) * 100) ? ((country.count_W2 - country.count_W8)/country.count_W8) * 100 : 0
    //             let h3 = isFinite(((country.count_W3 - country.count_W8)/country.count_W8) * 100) ? ((country.count_W3 - country.count_W8)/country.count_W8) * 100 : 0
    //             let h4 = isFinite(((country.count_W4 - country.count_W8)/country.count_W8) * 100) ? ((country.count_W4 - country.count_W8)/country.count_W8) * 100 : 0
    //             let h5 = isFinite(((country.count_W5 - country.count_W8)/country.count_W8) * 100) ? ((country.count_W5 - country.count_W8)/country.count_W8) * 100 : 0
    //             let h6 = isFinite(((country.count_W6 - country.count_W8)/country.count_W8) * 100) ? ((country.count_W6 - country.count_W8)/country.count_W8) * 100 : 0
    //             let h7 = isFinite(((country.count_W7 - country.count_W8)/country.count_W8) * 100) ? ((country.count_W7 - country.count_W8)/country.count_W8) * 100 : 0
    //             let h8 = isFinite(((country.count_W9 - country.count_W8)/country.count_W8) * 100) ? ((country.count_W9 - country.count_W8)/country.count_W8) * 100 : 0
    //             arr.push(h1)
    //             arr.push(h2)
    //             arr.push(h3)
    //             arr.push(h4)
    //             arr.push(h5)
    //             arr.push(h6)
    //             arr.push(h7)
    //             arr.push(h8)

    //             let i1 = isFinite(((country.count_W1 - country.count_W9)/country.count_W9) * 100) ? ((country.count_W1 - country.count_W9)/country.count_W9) * 100 : 0
    //             let i2 = isFinite(((country.count_W2 - country.count_W9)/country.count_W9) * 100) ? ((country.count_W2 - country.count_W9)/country.count_W9) * 100 : 0
    //             let i3 = isFinite(((country.count_W3 - country.count_W9)/country.count_W9) * 100) ? ((country.count_W3 - country.count_W9)/country.count_W9) * 100 : 0
    //             let i4 = isFinite(((country.count_W4 - country.count_W9)/country.count_W9) * 100) ? ((country.count_W4 - country.count_W9)/country.count_W9) * 100 : 0
    //             let i5 = isFinite(((country.count_W5 - country.count_W9)/country.count_W9) * 100) ? ((country.count_W5 - country.count_W9)/country.count_W9) * 100 : 0
    //             let i6 = isFinite(((country.count_W6 - country.count_W9)/country.count_W9) * 100) ? ((country.count_W6 - country.count_W9)/country.count_W9) * 100 : 0
    //             let i7 = isFinite(((country.count_W7 - country.count_W9)/country.count_W9) * 100) ? ((country.count_W7 - country.count_W9)/country.count_W9) * 100 : 0
    //             let i8 = isFinite(((country.count_W8 - country.count_W9)/country.count_W9) * 100) ? ((country.count_W8 - country.count_W9)/country.count_W9) * 100 : 0
    //             arr.push(i1)
    //             arr.push(i2)
    //             arr.push(i3)
    //             arr.push(i4)
    //             arr.push(i5)
    //             arr.push(i6)
    //             arr.push(i7)
    //             arr.push(i8)
    //         }
    //     }
    //     arr.sort(function(a, b){return a-b;})
        
    //     // console.log(arr)

    //     // let new_arr = []
    //     // for (let i = 0; i < arr.length; i++) { 
    //     //     if (i === 0){
    //     //         new_arr.push([arr[i+1] - arr[i], +1])
    //     //     } 
    //     //     else if (i === arr.length - 1){
    //     //         new_arr.push([arr[i] - arr[i-1], -1])
    //     //     }
    //     //     else{
    //     //         let a = Math.abs(arr[i+1] - arr[i])
    //     //         let b = Math.abs(arr[i] - arr[i-1])
    //     //         if (a <= b){
    //     //             new_arr.push([a, +1])
    //     //         }
    //     //         else{
    //     //             new_arr.push([b, -1])
    //     //         }
    //     //     }
    //     // }

    //     // let new_new_arr = []
    //     // for (let i = 0; i < new_arr.length; i++) { 
    //     //     if (i === 0){
    //     //         new_new_arr.push(new_arr[i][0]/new_arr[i+1][0])
    //     //     } 
    //     //     else if (i === arr.length - 1){
    //     //         new_new_arr.push(new_arr[i][0]/new_arr[i-1][0])
    //     //     }
    //     //     else{
    //     //         if (new_arr[i][1] === 1){
    //     //             new_new_arr.push(new_arr[i][0]/new_arr[i+1][0])
    //     //         }
    //     //         else{
    //     //             new_new_arr.push(new_arr[i][0]/new_arr[i-1][0])
    //     //         }
    //     //     }
    //     // }

    //     console.log(arr)
    //     // 13824 numbers 
    //     // 13744 below 10K, 99.4%
    //     // 12751 below 1K, 92.2%
    //     // 10126 below 100, 73.7%
    //     // 1496 undefined
    //     // Range -100 to 1M.
    // }
}