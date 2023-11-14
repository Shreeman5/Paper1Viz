class VariablesForTable{

    constructor(neededData, baseTime, selectedTimes){
        this.neededData = neededData
        this.baseTime = baseTime
        this.selectedTimes = selectedTimes
    }

    continentMaxAbsoluteAttacks(){
        let collectedKeys = []
        for (let continent of this.neededData){
            for (let country of continent.meta){
                for (const [key, numbers] of Object.entries(country)) {
                    if (key !== 'country' && key !== 'cc' && !collectedKeys.includes(key)){
                        collectedKeys.push(key)
                    }
                }
            }
        }
        //console.log(collectedKeys)

        let i = 1

        for (let givenKey of collectedKeys){
            for (let continent of this.neededData){    
                continent.isForecast = true
                continent.isExpanded = false
                continent.number = this.baseTime
                let maxNum = 0
                for (let country of continent.meta){
                    //country.number = this.baseTime
                    for (const [key, numbers] of Object.entries(country)) {
                        if (key === givenKey){
                            for (const [key2, value] of Object.entries(numbers)) {
                                if (key2 === 'attacks'){
                                    maxNum = Math.max(maxNum, value)
                                }
                            }
                        }
                    }
                    country.selectedTimes = this.selectedTimes
                }
                continent['continent_max_attacks_' + i] = maxNum
                continent.selectedTimes = this.selectedTimes
            }
            i++
        }

        //console.log(this.neededData)
    }

    continentMaxPercentageAttacks(){
        let collectedKeys = []
        for (let continent of this.neededData){
            for (let country of continent.meta){
                for (const [key, numbers] of Object.entries(country)) {
                    if (key !== 'country' && key !== 'cc' && !collectedKeys.includes(key) && key !== this.baseTime){
                        collectedKeys.push(key)
                    }
                }
            }
        }
        //console.log(collectedKeys)

        let i = 1

        for (let givenKey of collectedKeys){

            for (let continent of this.neededData){ 
                let maxNum = -101
                for (let country of continent.meta){
                    let timePeriodAttacks = country[this.baseTime]
                    let attackVal = timePeriodAttacks.attacks
                    country.number = this.baseTime
                    for (const [key, numbers] of Object.entries(country)) {
                        if (key === givenKey){
                            for (const [key2, value] of Object.entries(numbers)) {
                                if (key2 === 'attacks'){
                                    let change = ((value - attackVal)/attackVal) * 100
                                    if (change > maxNum){
                                        if (isFinite(change)){
                                            maxNum = change
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                continent['continent_max_increase_attacks_' + i] = maxNum
            }
            i++
        }

        //console.log(this.neededData)

    }

    continentAndCountryTotalAttacks(){
        for (let continent of this.neededData){
            let continentTotal = 0
            let metaValues = continent.meta
            for (let country of metaValues){
                let countryTotal = 0
                for (const [key, value] of Object.entries(country)) {
                    if (key !== 'cc' && key !== 'country' && key !== 'number' && key !== 'selectedTimes'){
                        for (const [key2, value2] of Object.entries(value)) {
                            if (key2 === 'attacks'){
                                continentTotal += value2
                                countryTotal += value2
                            }
                        }
                    }
                }
                //console.log(countryTotal)
                country.totalAttacks = this.convert(countryTotal)
            }
            //console.log(continentTotal)
            continent.totalAttacks = this.convert(continentTotal)
        } 
    }


    dataForTable(givenData, dateselected, index){
        // console.log(givenData)
        // console.log(dateselected)
        // let trackerForTop3 = {}
        // let trackerForTop5 = {}
        let trackerForTop10 = {}

        for (let continent of this.neededData){
            let metaValues = continent.meta
            for (let country of metaValues){
                let a = givenData[country.cc]
                if (a != null){

                    // concerning root admin top
                    let b = a[dateselected]
                    let c = b[0]
                    // if (country.cc === 'NL'){
                    //     console.log(c)
                    // }

                    //  || c.username === 'Admin'
                    if (c.username === 'root' || c.username === 'admin'){
                        country['country_root_admin_top_' + index] = 'yes'
                    }
                    else{
                        country['country_root_admin_top_' + index] = 'no'
                    }

                    // concerning top 3
                    // for (let i = 0; i < b.length && i < 3; i++){
                    //     let keyValueObject = b[i]
                    //     let currentUsername = keyValueObject['username']
                    //     if (currentUsername in trackerForTop3){
                    //         trackerForTop3[currentUsername] += b[i].count
                    //     }
                    //     else{
                    //         trackerForTop3[currentUsername] = b[i].count
                    //     }
                    // }


                    // concerning top 5
                    // for (let i = 0; i < b.length && i < 5; i++){
                    //     let keyValueObject = b[i]
                    //     let currentUsername = keyValueObject['username']
                    //     if (currentUsername in trackerForTop5){
                    //         trackerForTop5[currentUsername] += b[i].count
                    //     }
                    //     else{
                    //         trackerForTop5[currentUsername] = b[i].count
                    //     }
                    // }

                    // concerning top 10
                    for (let i = 0; i < b.length && i < 10; i++){
                        let keyValueObject = b[i]
                        let currentUsername = keyValueObject['username']
                        if (currentUsername in trackerForTop10){
                            trackerForTop10[currentUsername] += b[i].count
                        }
                        else{
                            trackerForTop10[currentUsername] = b[i].count
                        }
                    }

                    if (b.length >= 2){
                        let keyValueObject1 = b[0]
                        let keyValueObject2 = b[1]
                        if (keyValueObject1['username'] === 'root'){
                            let myRatio = keyValueObject1['count']/keyValueObject2['count']
                            let value = 'no'
                            if (myRatio >= 50){
                                value = 'yes'
                            }
                            country['root_second_place_ratio_' + index] = value
                        }
                        else{
                            country['root_second_place_ratio_' + index] = 'no'
                        }
                    }
                    else{
                        country['root_second_place_ratio_' + index] = 'no'
                    }
                }
                // concerning root admin top
                else{
                    country['country_root_admin_top_' + index] = 'yes'
                    country['root_second_place_ratio_' + index] = 'no'
                }
            }
        }

        //console.log(trackerForTop3)
        // console.log(trackerForTop5)
        //console.log(trackerForTop10)
        // concerning top 5

        // let top3Usernames = Object
        //             .entries(trackerForTop3) // create Array of Arrays with [key, value]
        //             .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
        //             .slice(0,3) // return only the first 3 elements of the intermediate result
        //             .map(([n])=> n); // and map that to an array with only the name
        // console.log(top3Usernames)

        // let top5Usernames = Object
        //             .entries(trackerForTop5) // create Array of Arrays with [key, value]
        //             .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
        //             .slice(0,5) // return only the first 3 elements of the intermediate result
        //             .map(([n])=> n); // and map that to an array with only the name
        // console.log(top5Usernames)

        let top10Usernames = Object
                    .entries(trackerForTop10) // create Array of Arrays with [key, value]
                    .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                    .slice(0,10) // return only the first 3 elements of the intermediate result
                    .map(([n])=> n); // and map that to an array with only the name
        // console.log(top10Usernames)

        // let top10UsernamesWithException = Object
        //             .entries(trackerForTop10) // create Array of Arrays with [key, value]
        //             .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
        //             .slice(0,12) // return only the first 3 elements of the intermediate result
        //             .map(([n])=> n); // and map that to an array with only the name
        // console.log('A:', top10UsernamesWithException)
        // top10UsernamesWithException = top10UsernamesWithException.filter(item => item !== 'root')
        // top10UsernamesWithException = top10UsernamesWithException.filter(item => item !== 'admin')
        // if (top10UsernamesWithException.length === 12){top10UsernamesWithException.slice(-2)}
        // if (top10UsernamesWithException.length === 11){top10UsernamesWithException.slice(-1)}
        // console.log('B:', top10UsernamesWithException)


        // for (let continent of this.neededData){
        //     let metaValues = continent.meta
        //     for (let country of metaValues){
        //         let a = givenData[country.cc]
        //         if (a != null){
        //             let b = a[dateselected]
        //             let counterMatch = 0
        //             for (let i = 0; i < b.length && i < 3; i++){
        //                 let keyValueObject = b[i]
        //                 let currentUsername = keyValueObject['username']
        //                 if (!top3Usernames.includes(currentUsername)){
        //                     counterMatch += 1
        //                 }
        //             }
                    
        //             let relevantArr = []
        //             for (let x = 0; x < counterMatch; x++){
        //                 relevantArr.push(1)
        //             }
        //             for (let x = 0; x < 3 - counterMatch; x++){
        //                 relevantArr.push(0)
        //             }
        //             country['country_username_top_3_differ_' + index] = relevantArr
        //         }
        //         else{
        //             country['country_username_top_3_differ_' + index] = [0,0,0]
        //         }
        //         //console.log(country)
        //     }
        // }

        // for (let continent of this.neededData){
        //     let metaValues = continent.meta
        //     for (let country of metaValues){
        //         let a = givenData[country.cc]
        //         if (a != null){
        //             let b = a[dateselected]
        //             let counterMatch = 0
        //             for (let i = 0; i < b.length && i < 5; i++){
        //                 let keyValueObject = b[i]
        //                 let currentUsername = keyValueObject['username']
        //                 if (!top5Usernames.includes(currentUsername)){
        //                     counterMatch += 1
        //                 }
        //             }
        //             let relevantArr = []
        //             for (let x = 0; x < counterMatch; x++){
        //                 relevantArr.push(1)
        //             }
        //             for (let x = 0; x < 5 - counterMatch; x++){
        //                 relevantArr.push(0)
        //             }
        //             country['country_username_top_5_differ_' + index] = relevantArr
        //         }
        //         else{
        //             country['country_username_top_5_differ_' + index] = [0,0,0,0,0]
        //         }
        //     }
        // }

        for (let continent of this.neededData){
            let metaValues = continent.meta
            for (let country of metaValues){
                let a = givenData[country.cc]
                if (a != null){
                    let b = a[dateselected]
                    let counterMatch = 0
                    for (let i = 0; i < b.length && i < 10; i++){
                        let keyValueObject = b[i]
                        let currentUsername = keyValueObject['username']
                        if (!top10Usernames.includes(currentUsername)){
                            // if (country.cc === 'SG'){
                            //     console.log(currentUsername)
                            // }
                            counterMatch += 1
                        }
                    }
                    let relevantArr = []
                    for (let x = 0; x < counterMatch; x++){
                        relevantArr.push(1)
                    }
                    for (let x = 0; x < 10 - counterMatch; x++){
                        relevantArr.push(0)
                    }
                    country['country_username_top_10_differ_' + index] = relevantArr
                }
                else{
                    country['country_username_top_10_differ_' + index] = [0,0,0,0,0,0,0,0,0,0]
                }
            }
        }

        // for (let continent of this.neededData){
        //     let metaValues = continent.meta
        //     for (let country of metaValues){
        //         let a = givenData[country.cc]
        //         if (a != null){
        //             let b = a[dateselected]
        //             console.log(b)
        //             let counterMatch = 0
        //             for (let i = 0; i < b.length && i < 10; i++){
        //                 let keyValueObject = b[i]
        //                 let currentUsername = keyValueObject['username']
        //                 if (!top10UsernamesWithException.includes(currentUsername)){
        //                     // if (country.cc === 'SG'){
        //                     //     console.log(currentUsername)
        //                     // }
        //                     counterMatch += 1
        //                 }
        //             }
        //             let relevantArr = []
        //             for (let x = 0; x < counterMatch; x++){
        //                 relevantArr.push(1)
        //             }
        //             for (let x = 0; x < 10 - counterMatch; x++){
        //                 relevantArr.push(0)
        //             }
        //             country['country_username_top_10_differ_wout_root_and_admin_' + index] = relevantArr
        //         }
        //         else{
        //             country['country_username_top_10_differ_wout_root_and_admin_' + index] = [0,0,0,0,0,0,0,0,0,0]
        //         }
        //     }
        // }


        // let top5HistoricUsernames = ['root', 'admin', 'test', 'a', 'guest']

        // for (let continent of this.neededData){
        //     let metaValues = continent.meta
        //     for (let country of metaValues){
        //         let a = givenData[country.cc]
        //         if (a != null){
        //             let b = a[dateselected]
        //             let counterMatch = 0
        //             for (let i = 0; i < b.length && i < 5; i++){
        //                 let keyValueObject = b[i]
        //                 let currentUsername = keyValueObject['username']
        //                 if (!top5HistoricUsernames.includes(currentUsername)){
        //                     counterMatch += 1
        //                 }
        //             }
        //             let relevantArr = []
        //             for (let x = 0; x < counterMatch; x++){
        //                 relevantArr.push(1)
        //             }
        //             for (let x = 0; x < 5 - counterMatch; x++){
        //                 relevantArr.push(0)
        //             }
        //             country['country_username_historic_top_5_differ_' + index] = relevantArr
        //         }
        //         else{
        //             country['country_username_historic_top_5_differ_' + index] = [0,0,0,0,0]
        //         }
        //     }
        // }

        let top10HistoricUsernames = ['root', 'admin', 'test', 'guest', 'mysql', 'user', 'administrator', 'oracle', 'postgres', 'nagios']

        for (let continent of this.neededData){
            let metaValues = continent.meta
            for (let country of metaValues){
                let a = givenData[country.cc]
                if (a != null){
                    let b = a[dateselected]
                    let counterMatch = 0
                    for (let i = 0; i < b.length && i < 10; i++){
                        let keyValueObject = b[i]
                        let currentUsername = keyValueObject['username']
                        if (!top10HistoricUsernames.includes(currentUsername)){
                            // if (country.cc === 'SG'){
                            //     console.log(currentUsername)
                            // }
                            counterMatch += 1
                        }
                    }
                    let relevantArr = []
                    for (let x = 0; x < counterMatch; x++){
                        relevantArr.push(1)
                    }
                    for (let x = 0; x < 10 - counterMatch; x++){
                        relevantArr.push(0)
                    }
                    country['country_username_historic_top_10_differ_' + index] = relevantArr
                }
                else{
                    country['country_username_historic_top_10_differ_' + index] = [0,0,0,0,0,0,0,0,0,0]
                }
            }
        }
    }

    userNameParsing(){
        let countries = []
        for (let continent of this.neededData){
            let metaValues = continent.meta
            for (let country of metaValues){
                countries.push(country.cc)
            }
        }

        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]')
        let selected = Array.from(checkedBoxes).map(x => x.value)


        let that = this
        for (let i = 0; i < selected.length; i++){
            getData4(selected[i], countries).then(function(loadedData){
                that.dataForTable(loadedData, selected[i], i+1)
            })
        }
    }

    convert(value){
        if (value >= 100000){
            return (value/1000000).toFixed(1) + 'M'
        }
        else if (value >= 1000){
            return (value/1000).toFixed(1) + 'K'
        }
        else{
            return value
        }
    }
}

async function getData4(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value



    let api_address = 'http://128.110.217.128/top/usernames?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    //console.log('op:', jsonData)
    return jsonData

}