class TableLogic{

    constructor(){

    }

    rowToCellDataTransform(d) {
        
        let stateInfo = {
            type: 'text',
            class: d.isForecast ? 'continent' : 'country',
            value: d.isForecast ? d.region + '[' + d.totalAttacks + ']' : d.country + '[' + d.totalAttacks + ']'
        };

        let dataList = [stateInfo]

        let i = 1
        let j = 1
        for (let time of d.selectedTimes){
            if (time === d.number){
                let marginInfo = {
                    type: 'viz',
                    value: d.isForecast ? d['continent_max_attacks_' + i] : d[d.number].attacks,
                    value2: 0,
                    value3: 0,
                    //value4: d.isForecast ? 'yes' : 
                }
                dataList.push(marginInfo)
            }
            else{
                let marginInfo = {
                    type: 'viz',
                    value: d.isForecast ? d['continent_max_attacks_' + i] : d[time].attacks,
                    value2: d.isForecast ? d['continent_max_increase_attacks_' + j] : 
                        isFinite(100 * ((d[time].attacks - d[d.number].attacks)/d[d.number].attacks))?
                            100 * ((d[time].attacks - d[d.number].attacks)/d[d.number].attacks): 0,
                    value3: d.isForecast ? 0 : d[time].attacks - d[d.number].attacks
                }
                dataList.push(marginInfo)
                j++
            }
            i++
        }

        for (let i = 1; i < dataList.length; i++){
            let thisCell = dataList[i]
            // console.log(thisCell)
            if (d.isForecast){
                // console.log('am I ver here?')
                thisCell['value4'] = 'yes'
                // thisCell['value5'] = [0,0,0]
                // thisCell['value5'] = [0,0,0,0,0]
                thisCell['value6'] = [0,0,0,0,0,0,0,0,0,0]
                // thisCell['value7'] = [0,0,0,0,0]
                thisCell['value8'] = [0,0,0,0,0,0,0,0,0,0]
                thisCell['value9'] = 'no'
            }
            else{
                thisCell['value4'] = d['country_root_admin_top_' + i]
                // thisCell['value5'] = d['country_username_top_3_differ_' + i]
                // thisCell['value5'] = d['country_username_top_5_differ_' + i]
                thisCell['value6'] = d['country_username_top_10_differ_' + i]
                // thisCell['value7'] = d['country_username_historic_top_5_differ_' + i]
                thisCell['value8'] = d['country_username_historic_top_10_differ_' + i]
                thisCell['value9'] = d['root_second_place_ratio_' + i]
            }
        }

        //console.log(dataList)
        for (let point of dataList)
        {
            point.isForecast = d.isForecast;
        }
        return dataList;
        // if base was 2023-01-01
        // let marginInfo = {
        //     type: 'viz',
        //     value: d.isForecast ? d.continent_max_attacks_1 : d['2023-01-01'].attacks,
        //     value2: 0,
        //     value3: 0
        // }

        // let margin2Info = {
        //     type: 'viz',
        //     value: d.isForecast ? d.continent_max_attacks_2 : d['2023-01-02'].attacks,
        //     value2: d.isForecast ? d.continent_max_increase_attacks_1 : 
        //         isFinite(100 * ((d['2023-01-02'].attacks - d['2023-01-01'].attacks)/d['2023-01-01'].attacks))?
        //             100 * ((d['2023-01-02'].attacks - d['2023-01-01'].attacks)/d['2023-01-01'].attacks): 0,
        //     value3: d['2023-01-02'].attacks - d['2023-01-01'].attacks
        // }

        // let margin3Info = {
        //     type: 'viz',
        //     value: d.isForecast ? d.continent_max_attacks_3 : d['2023-01-03'].attacks,
        //     value2: d.isForecast ? d.continent_max_increase_attacks_2 : 
        //         isFinite(100 * ((d['2023-01-03'].attacks - d['2023-01-01'].attacks)/d['2023-01-01'].attacks))?
        //             100 * ((d['2023-01-03'].attacks - d['2023-01-01'].attacks)/d['2023-01-01'].attacks): 0,
        //     value3: d['2023-01-03'].attacks - d['2023-01-01'].attacks
        // }

        
    }

}