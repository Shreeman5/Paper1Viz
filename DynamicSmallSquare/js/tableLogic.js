class TableLogic{

    constructor(){

    }

    
    rowToCellDataTransform(d) {
        //console.log('SHreeman:', typeof d.number)
        let stateInfo = {
            type: 'text',
            class: d.isForecast ? 'continent' : 'country',
            value: d.isForecast ? d.region : d.country
        };


        let marginInfo 
        let margin2Info
        let margin3Info
        let margin4Info
        let margin5Info
        let margin6Info
        let margin7Info
        let margin8Info
        let margin9Info
        if (d.number === "0"){
            //console.log("MMM")
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            };       
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ? d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: d.isForecast ? 
                    d.continent_max_increase_attacks_1 : 
                        isFinite(100 * ((d.count_W2 - d.count_W1)/d.count_W1))? 
                            100 * ((d.count_W2 - d.count_W1)/d.count_W1): 0,
                value4: d.isForecast ? 
                    d.continent_max_increase_attackers_1 : 
                        isFinite(100 * ((d.count_W2_attackers - d.count_W1_attackers)/d.count_W1_attackers))? 
                            100 * ((d.count_W2_attackers - d.count_W1_attackers)/d.count_W1_attackers): 0,
                value5: d.count_W2 - d.count_W1
            };
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: d.isForecast ? 
                    d.continent_max_increase_attacks_2 : 
                        isFinite(100 * ((d.count_W3 - d.count_W1)/d.count_W1))? 
                            100 * ((d.count_W3 - d.count_W1)/d.count_W1): 0,
                value4: d.isForecast ? 
                    d.continent_max_increase_attackers_2 : 
                        isFinite(100 * ((d.count_W3_attackers - d.count_W1_attackers)/d.count_W1_attackers))? 
                            100 * ((d.count_W3_attackers - d.count_W1_attackers)/d.count_W1_attackers): 0,
                value5: d.count_W3 - d.count_W1
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: d.isForecast ? 
                    d.continent_max_increase_attacks_3 : 
                        isFinite(100 * ((d.count_W4 - d.count_W1)/d.count_W1))? 
                            100 * ((d.count_W4 - d.count_W1)/d.count_W1): 0,
                value4: d.isForecast ? 
                    d.continent_max_increase_attackers_3 : 
                        isFinite(100 * ((d.count_W4_attackers - d.count_W1_attackers)/d.count_W1_attackers))? 
                            100 * ((d.count_W4_attackers - d.count_W1_attackers)/d.count_W1_attackers): 0,
                value5: d.count_W4 - d.count_W1
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: d.isForecast ? 
                    d.continent_max_increase_attacks_4 : 
                        isFinite(100 * ((d.count_W5 - d.count_W1)/d.count_W1))? 
                            100 * ((d.count_W5 - d.count_W1)/d.count_W1): 0,
                value4: d.isForecast ? 
                    d.continent_max_increase_attackers_4 : 
                        isFinite(100 * ((d.count_W5_attackers - d.count_W1_attackers)/d.count_W1_attackers))? 
                            100 * ((d.count_W5_attackers - d.count_W1_attackers)/d.count_W1_attackers): 0,
                value5: d.count_W5 - d.count_W1
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6 : d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: d.isForecast ? 
                    d.continent_max_increase_attacks_5 : 
                        isFinite(100 * ((d.count_W6 - d.count_W1)/d.count_W1))? 
                            100 * ((d.count_W6 - d.count_W1)/d.count_W1): 0,
                value4: d.isForecast ? 
                    d.continent_max_increase_attackers_5 : 
                        isFinite(100 * ((d.count_W6_attackers - d.count_W1_attackers)/d.count_W1_attackers))? 
                            100 * ((d.count_W6_attackers - d.count_W1_attackers)/d.count_W1_attackers): 0,
                value5: d.count_W6 - d.count_W1
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: d.isForecast ? 
                    d.continent_max_increase_attacks_6 : 
                        isFinite(100 * ((d.count_W7 - d.count_W1)/d.count_W1))? 
                            100 * ((d.count_W7 - d.count_W1)/d.count_W1): 0,
                value4: d.isForecast ? 
                    d.continent_max_increase_attackers_6 : 
                        isFinite(100 * ((d.count_W7_attackers - d.count_W1_attackers)/d.count_W1_attackers))? 
                            100 * ((d.count_W7_attackers - d.count_W1_attackers)/d.count_W1_attackers): 0,
                value5: d.count_W7 - d.count_W1
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ? d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: d.isForecast ? 
                    d.continent_max_increase_attacks_7 : 
                        isFinite(100 * ((d.count_W8 - d.count_W1)/d.count_W1))? 
                            100 * ((d.count_W8 - d.count_W1)/d.count_W1): 0,
                value4: d.isForecast ? 
                    d.continent_max_increase_attackers_7 : 
                        isFinite(100 * ((d.count_W8_attackers - d.count_W1_attackers)/d.count_W1_attackers))? 
                            100 * ((d.count_W8_attackers - d.count_W1_attackers)/d.count_W1_attackers): 0,
                value5: d.count_W8 - d.count_W1
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: d.isForecast ? 
                    d.continent_max_increase_attacks_8 : 
                        isFinite(100 * ((d.count_W9 - d.count_W1)/d.count_W1))? 
                            100 * ((d.count_W9 - d.count_W1)/d.count_W1): 0,
                value4: d.isForecast ? 
                    d.continent_max_increase_attackers_8 : 
                        isFinite(100 * ((d.count_W9_attackers - d.count_W1_attackers)/d.count_W1_attackers))? 
                            100 * ((d.count_W9_attackers - d.count_W1_attackers)/d.count_W1_attackers): 0,
                value5: d.count_W9 - d.count_W1               
            };
        }

        else if (d.number === "1"){
            //console.log("NNN")
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_1 :
                        isFinite(100 * ((d.count_W1 - d.count_W2)/d.count_W2))?
                            100 * ((d.count_W1 - d.count_W2)/d.count_W2): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_1 :
                        isFinite(100 * ((d.count_W1_attackers - d.count_W2_attackers)/d.count_W2_attackers))?
                            100 * ((d.count_W1_attackers - d.count_W2_attackers)/d.count_W2_attackers): 0,
                value5: d.count_W1 - d.count_W2
            };
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ? d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            }; 
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_2 :
                        isFinite(100 * ((d.count_W3 - d.count_W2)/d.count_W2))?
                            100 * ((d.count_W3 - d.count_W2)/d.count_W2): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_2 :
                        isFinite(100 * ((d.count_W3_attackers - d.count_W2_attackers)/d.count_W2_attackers))?
                            100 * ((d.count_W3_attackers - d.count_W2_attackers)/d.count_W2_attackers): 0,
                value5: d.count_W3 - d.count_W2
                
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_3 :
                        isFinite(100 * ((d.count_W4 - d.count_W2)/d.count_W2))?
                            100 * ((d.count_W4 - d.count_W2)/d.count_W2): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_3 :
                        isFinite(100 * ((d.count_W4_attackers - d.count_W2_attackers)/d.count_W2_attackers))?
                            100 * ((d.count_W4_attackers - d.count_W2_attackers)/d.count_W2_attackers): 0,
                value5: d.count_W4 - d.count_W2
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_4 :
                        isFinite(100 * ((d.count_W5 - d.count_W2)/d.count_W2))?
                            100 * ((d.count_W5 - d.count_W2)/d.count_W2): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_4 :
                        isFinite(100 * ((d.count_W5_attackers - d.count_W2_attackers)/d.count_W2_attackers))?
                            100 * ((d.count_W5_attackers - d.count_W2_attackers)/d.count_W2_attackers): 0,
                value5: d.count_W5 - d.count_W2
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6: d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_5 :
                        isFinite(100 * ((d.count_W6 - d.count_W2)/d.count_W2))?
                            100 * ((d.count_W6 - d.count_W2)/d.count_W2): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_5 :
                        isFinite(100 * ((d.count_W6_attackers - d.count_W2_attackers)/d.count_W2_attackers))?
                            100 * ((d.count_W6_attackers - d.count_W2_attackers)/d.count_W2_attackers): 0,
                value5: d.count_W6 - d.count_W2
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_6 :
                        isFinite(100 * ((d.count_W7 - d.count_W2)/d.count_W2))?
                            100 * ((d.count_W7 - d.count_W2)/d.count_W2): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_6 :
                        isFinite(100 * ((d.count_W7_attackers - d.count_W2_attackers)/d.count_W2_attackers))?
                            100 * ((d.count_W7_attackers - d.count_W2_attackers)/d.count_W2_attackers): 0,
                value5: d.count_W7 - d.count_W2
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ? d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_7 :
                        isFinite(100 * ((d.count_W8 - d.count_W2)/d.count_W2))?
                            100 * ((d.count_W8 - d.count_W2)/d.count_W2): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_7:
                        isFinite(100 * ((d.count_W8_attackers - d.count_W2_attackers)/d.count_W2_attackers))?
                            100 * ((d.count_W8_attackers - d.count_W2_attackers)/d.count_W2_attackers): 0,
                value5: d.count_W8 - d.count_W2
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_8 :
                        isFinite(100 * ((d.count_W9 - d.count_W2)/d.count_W2))?
                            100 * ((d.count_W9 - d.count_W2)/d.count_W2): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_8 :
                        isFinite(100 * ((d.count_W9_attackers - d.count_W2_attackers)/d.count_W2_attackers))?
                            100 * ((d.count_W9_attackers - d.count_W2_attackers)/d.count_W2_attackers): 0,
                value5: d.count_W9 - d.count_W2
            };
        }
        else if (d.number === "2"){
            //console.log("ooo")
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_1 :
                        isFinite(100 * ((d.count_W1 - d.count_W3)/d.count_W3))?
                            100 * ((d.count_W1 - d.count_W3)/d.count_W3): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_1 :
                        isFinite(100 * ((d.count_W1_attackers - d.count_W3_attackers)/d.count_W3_attackers))?
                            100 * ((d.count_W1_attackers - d.count_W3_attackers)/d.count_W3_attackers): 0,
                value5: d.count_W1 - d.count_W3
            };
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ? d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_2 :
                    isFinite(100 * ((d.count_W2 - d.count_W3)/d.count_W3))?
                        100 * ((d.count_W2 - d.count_W3)/d.count_W3): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_2 :
                        isFinite(100 * ((d.count_W2_attackers - d.count_W3_attackers)/d.count_W3_attackers))?
                            100 * ((d.count_W2_attackers - d.count_W3_attackers)/d.count_W3_attackers): 0,
                value5: d.count_W2 - d.count_W3
            };
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_3 :
                    isFinite(100 * ((d.count_W4 - d.count_W3)/d.count_W3))?
                        100 * ((d.count_W4 - d.count_W3)/d.count_W3): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_3 :
                        isFinite(100 * ((d.count_W4_attackers - d.count_W3_attackers)/d.count_W3_attackers))?
                            100 * ((d.count_W4_attackers - d.count_W3_attackers)/d.count_W3_attackers): 0,
                value5: d.count_W4 - d.count_W3
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_4 :
                    isFinite(100 * ((d.count_W5 - d.count_W3)/d.count_W3))?
                        100 * ((d.count_W5 - d.count_W3)/d.count_W3): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_4 :
                        isFinite(100 * ((d.count_W5_attackers - d.count_W3_attackers)/d.count_W3_attackers))?
                            100 * ((d.count_W5_attackers - d.count_W3_attackers)/d.count_W3_attackers): 0,
                value5: d.count_W5 - d.count_W3
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6 : d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_5 :
                    isFinite(100 * ((d.count_W6 - d.count_W3)/d.count_W3))?
                        100 * ((d.count_W6 - d.count_W3)/d.count_W3): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_5 :
                        isFinite(100 * ((d.count_W6_attackers - d.count_W3_attackers)/d.count_W3_attackers))?
                            100 * ((d.count_W6_attackers - d.count_W3_attackers)/d.count_W3_attackers): 0,
                value5: d.count_W6 - d.count_W3
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_6 :
                    isFinite(100 * ((d.count_W7 - d.count_W3)/d.count_W3))?
                        100 * ((d.count_W7 - d.count_W3)/d.count_W3): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_6 :
                        isFinite(100 * ((d.count_W7_attackers - d.count_W3_attackers)/d.count_W3_attackers))?
                            100 * ((d.count_W7_attackers - d.count_W3_attackers)/d.count_W3_attackers): 0,
                value5: d.count_W7 - d.count_W3
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ? d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_7 :
                    isFinite(100 * ((d.count_W8 - d.count_W3)/d.count_W3))?
                        100 * ((d.count_W8 - d.count_W3)/d.count_W3): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_7 :
                        isFinite(100 * ((d.count_W8_attackers - d.count_W3_attackers)/d.count_W3_attackers))?
                            100 * ((d.count_W8_attackers - d.count_W3_attackers)/d.count_W3_attackers): 0,
                value5: d.count_W8 - d.count_W3
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_8 :
                    isFinite(100 * ((d.count_W9 - d.count_W3)/d.count_W3))?
                        100 * ((d.count_W9 - d.count_W3)/d.count_W3): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_8 :
                        isFinite(100 * ((d.count_W9_attackers - d.count_W3_attackers)/d.count_W3_attackers))?
                            100 * ((d.count_W9_attackers - d.count_W3_attackers)/d.count_W3_attackers): 0,
                value5: d.count_W9 - d.count_W3
            };
        }
        else if (d.number === "3"){
            //console.log('here')
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_1 :
                        isFinite(100 * ((d.count_W1 - d.count_W4)/d.count_W4))?
                            100 * ((d.count_W1 - d.count_W4)/d.count_W4): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_1 :
                        isFinite(100 * ((d.count_W1_attackers - d.count_W4_attackers)/d.count_W4_attackers))?
                            100 * ((d.count_W1_attackers - d.count_W4_attackers)/d.count_W4_attackers):0,
                value5: d.count_W1 - d.count_W4
            };
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ? d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_2 :
                        isFinite(100 * ((d.count_W2 - d.count_W4)/d.count_W4))?
                            100 * ((d.count_W2 - d.count_W4)/d.count_W4): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_2 :
                        isFinite(100 * ((d.count_W2_attackers - d.count_W4_attackers)/d.count_W4_attackers))?
                            100 * ((d.count_W2_attackers - d.count_W4_attackers)/d.count_W4_attackers):0,
                value5: d.count_W2 - d.count_W4
            };
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_3 :
                        isFinite(100 * ((d.count_W3 - d.count_W4)/d.count_W4))?
                            100 * ((d.count_W3 - d.count_W4)/d.count_W4): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_3 :
                        isFinite(100 * ((d.count_W3_attackers - d.count_W4_attackers)/d.count_W4_attackers))?
                            100 * ((d.count_W3_attackers - d.count_W4_attackers)/d.count_W4_attackers):0,
                value5: d.count_W3 - d.count_W4
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_4 :
                        isFinite(100 * ((d.count_W5 - d.count_W4)/d.count_W4))?
                            100 * ((d.count_W5 - d.count_W4)/d.count_W4): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_4 :
                        isFinite(100 * ((d.count_W5_attackers - d.count_W4_attackers)/d.count_W4_attackers))?
                            100 * ((d.count_W5_attackers - d.count_W4_attackers)/d.count_W4_attackers):0,
                value5: d.count_W5 - d.count_W4
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6 : d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_5 :
                        isFinite(100 * ((d.count_W6 - d.count_W4)/d.count_W4))?
                            100 * ((d.count_W6 - d.count_W4)/d.count_W4): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_5 :
                        isFinite(100 * ((d.count_W6_attackers - d.count_W4_attackers)/d.count_W4_attackers))?
                            100 * ((d.count_W6_attackers - d.count_W4_attackers)/d.count_W4_attackers):0,
                value5: d.count_W6 - d.count_W4
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_6 :
                        isFinite(100 * ((d.count_W7 - d.count_W4)/d.count_W4))?
                            100 * ((d.count_W7 - d.count_W4)/d.count_W4): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_6 :
                        isFinite(100 * ((d.count_W7_attackers - d.count_W4_attackers)/d.count_W4_attackers))?
                            100 * ((d.count_W7_attackers - d.count_W4_attackers)/d.count_W4_attackers):0,
                value5: d.count_W7 - d.count_W4
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ? d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_7 :
                        isFinite(100 * ((d.count_W8 - d.count_W4)/d.count_W4))?
                            100 * ((d.count_W8 - d.count_W4)/d.count_W4): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_7 :
                        isFinite(100 * ((d.count_W8_attackers - d.count_W4_attackers)/d.count_W4_attackers))?
                            100 * ((d.count_W8_attackers - d.count_W4_attackers)/d.count_W4_attackers):0,
                value5: d.count_W8 - d.count_W4
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_8 :
                        isFinite(100 * ((d.count_W9 - d.count_W4)/d.count_W4))?
                            100 * ((d.count_W9 - d.count_W4)/d.count_W4): 0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_8 :
                        isFinite(100 * ((d.count_W9_attackers - d.count_W4_attackers)/d.count_W4_attackers))?
                            100 * ((d.count_W9_attackers - d.count_W4_attackers)/d.count_W4_attackers):0,
                value5: d.count_W9 - d.count_W4
            };
        }
        else if (d.number === "4"){
            //console.log('here')
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_1 :
                        isFinite(100 * ((d.count_W1 - d.count_W5)/d.count_W5))?
                            100 * ((d.count_W1 - d.count_W5)/d.count_W5):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_1 :
                        isFinite(100 * ((d.count_W1_attackers - d.count_W5_attackers)/d.count_W5_attackers))?
                            100 * ((d.count_W1_attackers - d.count_W5_attackers)/d.count_W5_attackers):0,
                value5: d.count_W1 - d.count_W5
            };
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ? d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_2 :
                        isFinite(100 * ((d.count_W2 - d.count_W5)/d.count_W5))?
                            100 * ((d.count_W2 - d.count_W5)/d.count_W5):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_2 :
                        isFinite(100 * ((d.count_W2_attackers - d.count_W5_attackers)/d.count_W5_attackers))?
                            100 * ((d.count_W2_attackers - d.count_W5_attackers)/d.count_W5_attackers):0,
                value5: d.count_W2 - d.count_W5
            };
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_3 :
                        isFinite(100 * ((d.count_W3 - d.count_W5)/d.count_W5))?
                            100 * ((d.count_W3 - d.count_W5)/d.count_W5):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_3 :
                        isFinite(100 * ((d.count_W3_attackers - d.count_W5_attackers)/d.count_W5_attackers))?
                            100 * ((d.count_W3_attackers - d.count_W5_attackers)/d.count_W5_attackers):0,
                value5: d.count_W3 - d.count_W5
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_4 :
                        isFinite(100 * ((d.count_W4 - d.count_W5)/d.count_W5))?
                            100 * ((d.count_W4 - d.count_W5)/d.count_W5):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_4 :
                        isFinite(100 * ((d.count_W4_attackers - d.count_W5_attackers)/d.count_W5_attackers))?
                            100 * ((d.count_W4_attackers - d.count_W5_attackers)/d.count_W5_attackers):0,
                value5: d.count_W4 - d.count_W5
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6 : d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_5 :
                        isFinite(100 * ((d.count_W6 - d.count_W5)/d.count_W5))?
                            100 * ((d.count_W6 - d.count_W5)/d.count_W5):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_5 :
                        isFinite(100 * ((d.count_W6_attackers - d.count_W5_attackers)/d.count_W5_attackers))?
                            100 * ((d.count_W6_attackers - d.count_W5_attackers)/d.count_W5_attackers):0,
                value5: d.count_W6 - d.count_W5
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_6 :
                        isFinite(100 * ((d.count_W7 - d.count_W5)/d.count_W5))?
                            100 * ((d.count_W7 - d.count_W5)/d.count_W5):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_6 :
                        isFinite(100 * ((d.count_W7_attackers - d.count_W5_attackers)/d.count_W5_attackers))?
                            100 * ((d.count_W7_attackers - d.count_W5_attackers)/d.count_W5_attackers):0,
                value5: d.count_W7 - d.count_W5
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ? d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_7 :
                        isFinite(100 * ((d.count_W8 - d.count_W5)/d.count_W5))?
                            100 * ((d.count_W8 - d.count_W5)/d.count_W5):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_7 :
                        isFinite(100 * ((d.count_W8_attackers - d.count_W5_attackers)/d.count_W5_attackers))?
                            100 * ((d.count_W8_attackers - d.count_W5_attackers)/d.count_W5_attackers):0,
                value5: d.count_W8 - d.count_W5
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_8 :
                        isFinite(100 * ((d.count_W9 - d.count_W5)/d.count_W5))?
                            100 * ((d.count_W9 - d.count_W5)/d.count_W5):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_8 :
                        isFinite(100 * ((d.count_W9_attackers - d.count_W5_attackers)/d.count_W5_attackers))?
                            100 * ((d.count_W9_attackers - d.count_W5_attackers)/d.count_W5_attackers):0,
                value5: d.count_W9 - d.count_W5
            };
        }
        else if (d.number === "5"){
            //console.log('here')
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_1 :
                        isFinite(100 * ((d.count_W1 - d.count_W6)/d.count_W6))?
                            100 * ((d.count_W1 - d.count_W6)/d.count_W6):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_1 :
                        isFinite(100 * ((d.count_W1_attackers - d.count_W6_attackers)/d.count_W6_attackers))?
                            100 * ((d.count_W1_attackers - d.count_W6_attackers)/d.count_W6_attackers):0,
                value5: d.count_W1 - d.count_W6
            };
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ? d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_2 :
                        isFinite(100 * ((d.count_W2 - d.count_W6)/d.count_W6))?
                            100 * ((d.count_W2 - d.count_W6)/d.count_W6):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_2 :
                        isFinite(100 * ((d.count_W2_attackers - d.count_W6_attackers)/d.count_W6_attackers))?
                            100 * ((d.count_W2_attackers - d.count_W6_attackers)/d.count_W6_attackers):0,
                value5: d.count_W2 - d.count_W6
            };
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_3 :
                        isFinite(100 * ((d.count_W3 - d.count_W6)/d.count_W6))?
                            100 * ((d.count_W3 - d.count_W6)/d.count_W6):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_3 :
                        isFinite(100 * ((d.count_W3_attackers - d.count_W6_attackers)/d.count_W6_attackers))?
                            100 * ((d.count_W3_attackers - d.count_W6_attackers)/d.count_W6_attackers):0,
                value5: d.count_W3 - d.count_W6
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_4 :
                        isFinite(100 * ((d.count_W4 - d.count_W6)/d.count_W6))?
                            100 * ((d.count_W4 - d.count_W6)/d.count_W6):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_4 :
                        isFinite(100 * ((d.count_W4_attackers - d.count_W6_attackers)/d.count_W6_attackers))?
                            100 * ((d.count_W4_attackers - d.count_W6_attackers)/d.count_W6_attackers):0,
                value5: d.count_W4 - d.count_W6
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_5 :
                        isFinite(100 * ((d.count_W5 - d.count_W6)/d.count_W6))?
                            100 * ((d.count_W5 - d.count_W6)/d.count_W6):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_5 :
                        isFinite(100 * ((d.count_W5_attackers - d.count_W6_attackers)/d.count_W6_attackers))?
                            100 * ((d.count_W5_attackers - d.count_W6_attackers)/d.count_W6_attackers):0,
                value5: d.count_W5 - d.count_W6
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6 : d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_6 :
                        isFinite(100 * ((d.count_W7 - d.count_W6)/d.count_W6))?
                            100 * ((d.count_W7 - d.count_W6)/d.count_W6):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_6 :
                        isFinite(100 * ((d.count_W7_attackers - d.count_W6_attackers)/d.count_W6_attackers))?
                            100 * ((d.count_W7_attackers - d.count_W6_attackers)/d.count_W6_attackers):0,
                value5: d.count_W7 - d.count_W6
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ? d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_7 :
                        isFinite(100 * ((d.count_W8 - d.count_W6)/d.count_W6))?
                            100 * ((d.count_W8 - d.count_W6)/d.count_W6):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_7 :
                        isFinite(100 * ((d.count_W8_attackers - d.count_W6_attackers)/d.count_W6_attackers))?
                            100 * ((d.count_W8_attackers - d.count_W6_attackers)/d.count_W6_attackers):0,
                value5: d.count_W8 - d.count_W6
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_8 :
                        isFinite(100 * ((d.count_W9 - d.count_W6)/d.count_W6))?
                            100 * ((d.count_W9 - d.count_W6)/d.count_W6):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_8 :
                        isFinite(100 * ((d.count_W9_attackers - d.count_W6_attackers)/d.count_W6_attackers))?
                            100 * ((d.count_W9_attackers - d.count_W6_attackers)/d.count_W6_attackers):0,
                value5: d.count_W9 - d.count_W6
            };
        }
        else if (d.number === "6"){
            //console.log('here')
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_1 :
                        isFinite(100 * ((d.count_W1 - d.count_W7)/d.count_W7))?
                            100 * ((d.count_W1 - d.count_W7)/d.count_W7):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_1 :
                        isFinite(100 * ((d.count_W1_attackers - d.count_W7_attackers)/d.count_W7_attackers))?
                            100 * ((d.count_W1_attackers - d.count_W7_attackers)/d.count_W7_attackers):0,
                value5: d.count_W1 - d.count_W7
            };
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ? d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_2 :
                        isFinite(100 * ((d.count_W2 - d.count_W7)/d.count_W7))?
                            100 * ((d.count_W2 - d.count_W7)/d.count_W7):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_2 :
                        isFinite(100 * ((d.count_W2_attackers - d.count_W7_attackers)/d.count_W7_attackers))?
                            100 * ((d.count_W2_attackers - d.count_W7_attackers)/d.count_W7_attackers):0,
                value5: d.count_W2 - d.count_W7
            };
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_3 :
                        isFinite(100 * ((d.count_W3 - d.count_W7)/d.count_W7))?
                            100 * ((d.count_W3 - d.count_W7)/d.count_W7):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_3 :
                        isFinite(100 * ((d.count_W3_attackers - d.count_W7_attackers)/d.count_W7_attackers))?
                            100 * ((d.count_W3_attackers - d.count_W7_attackers)/d.count_W7_attackers):0,
                value5: d.count_W3 - d.count_W7
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_4 :
                        isFinite(100 * ((d.count_W4 - d.count_W7)/d.count_W7))?
                            100 * ((d.count_W4 - d.count_W7)/d.count_W7):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_4 :
                        isFinite(100 * ((d.count_W4_attackers - d.count_W7_attackers)/d.count_W7_attackers))?
                            100 * ((d.count_W4_attackers - d.count_W7_attackers)/d.count_W7_attackers):0,
                value5: d.count_W4 - d.count_W7
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_5 :
                        isFinite(100 * ((d.count_W5 - d.count_W7)/d.count_W7))?
                            100 * ((d.count_W5 - d.count_W7)/d.count_W7):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_5 :
                        isFinite(100 * ((d.count_W5_attackers - d.count_W7_attackers)/d.count_W7_attackers))?
                            100 * ((d.count_W5_attackers - d.count_W7_attackers)/d.count_W7_attackers):0,
                value5: d.count_W5 - d.count_W7
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6 : d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_6 :
                        isFinite(100 * ((d.count_W6 - d.count_W7)/d.count_W7))?
                            100 * ((d.count_W6 - d.count_W7)/d.count_W7):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_6 :
                        isFinite(100 * ((d.count_W6_attackers - d.count_W7_attackers)/d.count_W7_attackers))?
                            100 * ((d.count_W6_attackers - d.count_W7_attackers)/d.count_W7_attackers):0,
                value5: d.count_W6 - d.count_W7
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ?d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_7 :
                        isFinite(100 * ((d.count_W8 - d.count_W7)/d.count_W7))?
                            100 * ((d.count_W8 - d.count_W7)/d.count_W7):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_7 :
                        isFinite(100 * ((d.count_W8_attackers - d.count_W7_attackers)/d.count_W7_attackers))?
                            100 * ((d.count_W8_attackers - d.count_W7_attackers)/d.count_W7_attackers):0,
                value5: d.count_W8 - d.count_W7
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_8 :
                        isFinite(100 * ((d.count_W9 - d.count_W7)/d.count_W7))?
                            100 * ((d.count_W9 - d.count_W7)/d.count_W7):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_8 :
                        isFinite(100 * ((d.count_W9_attackers - d.count_W7_attackers)/d.count_W7_attackers))?
                            100 * ((d.count_W9_attackers - d.count_W7_attackers)/d.count_W7_attackers):0,
                value5: d.count_W9 - d.count_W7
            };
        }
        else if (d.number === "7"){
            //console.log('here')
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_1 :
                        isFinite(100 * ((d.count_W1 - d.count_W8)/d.count_W8))?
                            100 * ((d.count_W1 - d.count_W8)/d.count_W8):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_1 :
                        isFinite(100 * ((d.count_W1_attackers - d.count_W8_attackers)/d.count_W8_attackers))?
                            100 * ((d.count_W1_attackers - d.count_W8_attackers)/d.count_W8_attackers):0,
                value5: d.count_W1 - d.count_W8
            };
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ?d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_2 :
                        isFinite(100 * ((d.count_W2 - d.count_W8)/d.count_W8))?
                            100 * ((d.count_W2 - d.count_W8)/d.count_W8):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_2 :
                        isFinite(100 * ((d.count_W2_attackers - d.count_W8_attackers)/d.count_W8_attackers))?
                            100 * ((d.count_W2_attackers - d.count_W8_attackers)/d.count_W8_attackers):0,
                value5: d.count_W2 - d.count_W8
            };
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_3 :
                        isFinite(100 * ((d.count_W3 - d.count_W8)/d.count_W8))?
                            100 * ((d.count_W3 - d.count_W8)/d.count_W8):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_3 :
                        isFinite(100 * ((d.count_W3_attackers - d.count_W8_attackers)/d.count_W8_attackers))?
                            100 * ((d.count_W3_attackers - d.count_W8_attackers)/d.count_W8_attackers):0,
                value5: d.count_W3 - d.count_W8
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_4 :
                        isFinite(100 * ((d.count_W4 - d.count_W8)/d.count_W8))?
                            100 * ((d.count_W4 - d.count_W8)/d.count_W8):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_4 :
                        isFinite(100 * ((d.count_W4_attackers - d.count_W8_attackers)/d.count_W8_attackers))?
                            100 * ((d.count_W4_attackers - d.count_W8_attackers)/d.count_W8_attackers):0,
                value5: d.count_W4 - d.count_W8
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_5 :
                        isFinite(100 * ((d.count_W5 - d.count_W8)/d.count_W8))?
                            100 * ((d.count_W5 - d.count_W8)/d.count_W8):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_5 :
                        isFinite(100 * ((d.count_W5_attackers - d.count_W8_attackers)/d.count_W8_attackers))?
                            100 * ((d.count_W5_attackers - d.count_W8_attackers)/d.count_W8_attackers):0,
                value5: d.count_W5 - d.count_W8
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6 : d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_6 :
                        isFinite(100 * ((d.count_W6 - d.count_W8)/d.count_W8))?
                            100 * ((d.count_W6 - d.count_W8)/d.count_W8):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_6 :
                        isFinite(100 * ((d.count_W6_attackers - d.count_W8_attackers)/d.count_W8_attackers))?
                            100 * ((d.count_W6_attackers - d.count_W8_attackers)/d.count_W8_attackers):0,
                value5: d.count_W6 - d.count_W8
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_7 :
                        isFinite(100 * ((d.count_W7 - d.count_W8)/d.count_W8))?
                            100 * ((d.count_W7 - d.count_W8)/d.count_W8):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_7 :
                        isFinite(100 * ((d.count_W7_attackers - d.count_W8_attackers)/d.count_W8_attackers))?
                            100 * ((d.count_W7_attackers - d.count_W8_attackers)/d.count_W8_attackers):0,
                value5: d.count_W7 - d.count_W8
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ? d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_8 :
                        isFinite(100 * ((d.count_W9 - d.count_W8)/d.count_W8))?
                            100 * ((d.count_W9 - d.count_W8)/d.count_W8):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_8 :
                        isFinite(100 * ((d.count_W9_attackers - d.count_W8_attackers)/d.count_W8_attackers))?
                            100 * ((d.count_W9_attackers - d.count_W8_attackers)/d.count_W8_attackers):0,
                value5: d.count_W9 - d.count_W8
            };
        }
        else if (d.number === "8"){
            //console.log('here')
            marginInfo = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W1 : d.count_W1,
                value: d.isForecast ? d.continent_max_attacks_1 : d.count_W1,
                value2: d.isForecast ? d.continent_attackers_W1 : d.count_W1_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_1 :
                        isFinite(100 * ((d.count_W1 - d.count_W9)/d.count_W9))?
                            100 * ((d.count_W1 - d.count_W9)/d.count_W9):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_1 :
                        isFinite(100 * ((d.count_W1_attackers - d.count_W9_attackers)/d.count_W9_attackers))?
                            100 * ((d.count_W1_attackers - d.count_W9_attackers)/d.count_W9_attackers):0,
                value5: d.count_W1 - d.count_W9
            };
            margin2Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W2 : d.count_W2,
                value: d.isForecast ? d.continent_max_attacks_2 : d.count_W2,
                value2: d.isForecast ? d.continent_attackers_W2 : d.count_W2_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_2 :
                        isFinite(100 * ((d.count_W2 - d.count_W9)/d.count_W9))?
                            100 * ((d.count_W2 - d.count_W9)/d.count_W9):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_2 :
                        isFinite(100 * ((d.count_W2_attackers - d.count_W9_attackers)/d.count_W9_attackers))?
                            100 * ((d.count_W2_attackers - d.count_W9_attackers)/d.count_W9_attackers):0,
                value5: d.count_W2 - d.count_W9
            };
            margin3Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W3 : d.count_W3,
                value: d.isForecast ? d.continent_max_attacks_3 : d.count_W3,
                value2: d.isForecast ? d.continent_attackers_W3 : d.count_W3_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_3 :
                        isFinite(100 * ((d.count_W3 - d.count_W9)/d.count_W9))?
                            100 * ((d.count_W3 - d.count_W9)/d.count_W9):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_3 :
                        isFinite(100 * ((d.count_W3_attackers - d.count_W9_attackers)/d.count_W9_attackers))?
                            100 * ((d.count_W3_attackers - d.count_W9_attackers)/d.count_W9_attackers):0,
                value5: d.count_W3 - d.count_W9
            };
            margin4Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W4 : d.count_W4,
                value: d.isForecast ? d.continent_max_attacks_4 : d.count_W4,
                value2: d.isForecast ? d.continent_attackers_W4 : d.count_W4_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_4 :
                        isFinite(100 * ((d.count_W4 - d.count_W9)/d.count_W9))?
                            100 * ((d.count_W4 - d.count_W9)/d.count_W9):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_4 :
                        isFinite(100 * ((d.count_W4_attackers - d.count_W9_attackers)/d.count_W9_attackers))?
                            100 * ((d.count_W4_attackers - d.count_W9_attackers)/d.count_W9_attackers):0,
                value5: d.count_W4 - d.count_W9
            };
            margin5Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W5 : d.count_W5,
                value: d.isForecast ? d.continent_max_attacks_5 : d.count_W5,
                value2: d.isForecast ? d.continent_attackers_W5 : d.count_W5_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_5 :
                        isFinite(100 * ((d.count_W5 - d.count_W9)/d.count_W9))?
                            100 * ((d.count_W5 - d.count_W9)/d.count_W9):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_5 :
                        isFinite(100 * ((d.count_W5_attackers - d.count_W9_attackers)/d.count_W9_attackers))?
                            100 * ((d.count_W5_attackers - d.count_W9_attackers)/d.count_W9_attackers):0,
                value5: d.count_W5 - d.count_W9
            };
            margin6Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W6 : d.count_W6,
                value: d.isForecast ? d.continent_max_attacks_6 : d.count_W6,
                value2: d.isForecast ? d.continent_attackers_W6 : d.count_W6_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_6 :
                        isFinite(100 * ((d.count_W6 - d.count_W9)/d.count_W9))?
                            100 * ((d.count_W6 - d.count_W9)/d.count_W9):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_6 :
                        isFinite(100 * ((d.count_W6_attackers - d.count_W9_attackers)/d.count_W9_attackers))?
                            100 * ((d.count_W6_attackers - d.count_W9_attackers)/d.count_W9_attackers):0,
                value5: d.count_W6 - d.count_W9
            };
            margin7Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W7 : d.count_W7,
                value: d.isForecast ? d.continent_max_attacks_7 : d.count_W7,
                value2: d.isForecast ? d.continent_attackers_W7 : d.count_W7_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_7 :
                        isFinite(100 * ((d.count_W7 - d.count_W9)/d.count_W9))?
                            100 * ((d.count_W7 - d.count_W9)/d.count_W9):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_7 :
                        isFinite(100 * ((d.count_W7_attackers - d.count_W9_attackers)/d.count_W9_attackers))?
                            100 * ((d.count_W7_attackers - d.count_W9_attackers)/d.count_W9_attackers):0,
                value5: d.count_W7 - d.count_W9
            };
            margin8Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W8 : d.count_W8,
                value: d.isForecast ? d.continent_max_attacks_8 : d.count_W8,
                value2: d.isForecast ? d.continent_attackers_W8 : d.count_W8_attackers,
                value3: d.isForecast ?
                    d.continent_max_increase_attacks_8 :
                        isFinite(100 * ((d.count_W8 - d.count_W9)/d.count_W9))?
                            100 * ((d.count_W8 - d.count_W9)/d.count_W9):0,
                value4: d.isForecast ?
                    d.continent_max_increase_attackers_8 :
                        isFinite(100 * ((d.count_W8_attackers - d.count_W9_attackers)/d.count_W9_attackers))?
                            100 * ((d.count_W8_attackers - d.count_W9_attackers)/d.count_W9_attackers):0,
                value5: d.count_W8 - d.count_W9
            };
            margin9Info = {
                type: 'viz',
                //value: d.isForecast ? d.continent_attacks_W9 : d.count_W9,
                value: d.isForecast ? d.continent_max_attacks_9 : d.count_W9,
                value2: d.isForecast ? d.continent_attackers_W9 : d.count_W9_attackers,
                value3: 0,
                value4: 0,
                value5: 0
            };
        }
        
        //console.log(marginInfo)
        

        

        let dataList = [stateInfo, marginInfo, margin2Info, margin3Info, margin4Info, margin5Info, margin6Info, margin7Info, margin8Info, margin9Info];
        //console.log('rrr:', dataList)
        //console.log(dataList)

        for (let point of dataList)
        {
            point.isForecast = d.isForecast;
        }
        return dataList;
    }
}