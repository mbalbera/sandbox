import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
// @ts-ignore 
import ChartView from '@highcharts/highcharts-react-native';

const options = {
    global: {
        useUTC: false
    },
    lang: {
        decimalPoint: ".",
        thousandsSep: ",",
        rangeSelectorZoom: ""
    }
};
const brandColor = "#00A99D"

class PricesCharts extends React.Component {

    state = {
        prices: {
            oneWeek: this.props.prices, // ANTI PATTERN TO SAVE EXTRA API CALL
            oneMonth: this.props.isCrypto ? this.props.oneWeek : [], //ANTI PATTERN TO SAVE API CALL FOR CRYPTOS
            sixMonth: []
        },
        volumes: {
            oneWeek: this.props.volumes, // ANTI PATTERN TO SAVE EXTRA API CALL
            oneMonth: this.props.isCrypto ? this.props.volumes : [], //ANTI PATTERN TO SAVE API CALL FOR CRYPTOS
            sixMonth: []
        },
        selectedTimePeriod: 'oneWeek'
    }

    configBar(volumeData) {
        return {
            chart: {
                height: 200,
                zoomType: "x",
                backgroundColor: "hsla(0, 100%, 90%, 0.0)",
            },
            exporting: { enabled: false },
            title: {
                text: "",
            },
            scrollbar: {
                enabled: false,
            },
            xAxis: {
                ordinal: true,
                type: "datetime",
                labels: {
                    format: "{value:%m/%d}",
                },
                visible: false
            },
            navigator: {
                enabled: false,
            },
            rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: "hidden",
                },
                labelStyle: {
                    visibility: "hidden",
                },
            },
            yAxis: {
                opposite: true,
                title: {
                    text: "Volume",
                },
                maxZoom: 150,
                align: "right",
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                column: {
                    pointWidth: 5,
                    pointPadding: 2,
                    borderWidth: 0,
                    shadow: false,
                },
            },
            series: [
                {
                    type: "column",
                    id: `${this.props.symbol} volume`,
                    name: `${this.props.symbol} volume`,
                    data: volumeData,
                    // yAxis: 1
                },
            ],
        };
    }
    configLine(priceData) {
        const firstPrice = priceData[0][0];
        const lastPrice = priceData[priceData.length - 1][0];
        let prices = priceData.map(ele => ele[1])
        let maxVal = Math.max(...prices)
        let minVal = Math.min(...prices)
        let maxRange = maxVal + ((maxVal - minVal) * 0.01)
        let minRange = minVal - ((maxVal - minVal) * 0.01)
        return {
            chart: {
                zoomType: "xy",
            },
            useCDN:false,
            exporting: { enabled: false },
            rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: "hidden",
                },
                labelStyle: {
                    visibility: "hidden",
                },
            },
            scrollbar: {
                enabled: false,
            },
            title: {
                text: "",
            },
            xAxis: {
                type: "datetime",
                labels: {
                    format: "{value:%m/%d}",
                    align: "left",
                },
                ordinal: true,
                crosshair: true,
                alignTicks: true,
                endOnTick: false,
                startOnTick: false,
                break: [{
                    from: 'friday 4pm',
                    to: 'monday 9am',
                    breakSize: 1
                }]
            },
            yAxis: {
                title: {
                    text: "Price",
                },
                opposite: false,
                maxZoom: 50,
                max: maxRange,
                min: minRange,
            },
            legend: {
                enabled: false,
            },
            navigator: {
                enabled: false,
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1,
                        },
                        stops: [
                            [0, lastPrice < firstPrice ? "#E020202F" : "#28D1982F"],
                            [1, "#00000000"],
                        ],
                    },
                    marker: {
                        radius: 5,
                    },
                    lineColor: lastPrice < firstPrice ? "#E02020" : "#28D198",
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 3,
                        },
                    },
                    threshold: null,
                },
            },
            tooltip: {
                // valuePrefix: "$",
                valueDecimals: 2
            },
            credits: {
                enabled: false,
            },
            series: [
                {
                    type: "area",
                    name: "Price",
                    data: priceData,
                },
            ],
        };
    }
    changeTimeperiod = (timeFrame) => {
        const { prices } = this.state;
        let period = ""
        switch (timeFrame) {
            case 'oneWeek': period = '1W'
                break
            case 'oneMonth': period = '1M'
                break
            default: period = '6M'
                break
        }
        if (prices[timeFrame].length === 0) {
            this.fetchPeriodData(period)
        }
        this.setState({ selectedTimePeriod: timeFrame })
    }

    fetchPeriodData = (period) => {
        let { prices, volumes } = this.state
        const { symbol } = this.props
        let url = `https://api.allocaterite.com/risk-monkey/ticker/price/${symbol}/${period}`
        var periodKey = ""

        switch (period) {
            case '6M': periodKey = 'sixMonth'
                break
            case '1M': periodKey = 'oneMonth'
                break
            default: periodKey = 'oneWeek'
                break
        }

        fetch(url,
            {
                'Access-Control-Allow-Headers': {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Access-Control-Request-Headers': "*",
                    'Access-Control-Allow-Origin': "*",
                    "Access-Control-Allow-Methods": "*",
                }
            }
        )
            .then(res => res.json())
            .then(responseJson => {
                // prices[periodKey] = responseJson.volumes
                // volumesupdated[periodKey] = responseJson.volumes
                const pricesUpdated = { ...prices, [periodKey]: responseJson.prices }
                const volumesUpdated = { ...volumes, [periodKey]: responseJson.volumes }


                this.setState({ prices: pricesUpdated, volumes: volumesUpdated, })
            })
            .catch(error => console.log(error))
    }
    parseDate = (dt) => {
        let full = new Date(dt * 1000)
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        let month = full.getMonth()
        let day = full.getDate()
        let hours = full.getHours()
        let min = full.getMinutes()
        // let year = full.getFullYear()
        // if(this.state.selectedTimePeriod === 'oneWeek'){
        //     return `${months[month]} ${day} ${hours}:${min}`
        // }else{
            return `${months[month]} ${day}`
        // }
    }

    configTogether(volumeData, priceData, dates) {
        const firstPrice = priceData[0][0];
        const lastPrice = priceData[priceData.length - 1][0];
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let prices = priceData.map(ele => ele[1])
        let maxVal = Math.max(...prices)
        let minVal = Math.min(...prices)
        let maxRange = maxVal + ((maxVal - minVal) * 0.01)
        let minRange = minVal - ((maxVal - minVal) * 0.01)
        return {
            tooltip: {
                shared: true,
                split: false,
                followPointer: true,
                followTouchMove: true,
            },
            scrollbar: {
                enabled: false,
            },
            exporting: { enabled: false },
            credits: {
                enabled: false,
            },
            navigator: {
                enabled: false,
            },
            rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: "hidden",
                },
                labelStyle: {
                    visibility: "hidden",
                },
            },
            chart: {
                zoomType: "x",
            },
            title: {
                text: "",
            },
            xAxis: {
                type: "category",
                // type: "datetime",
                crosshair: true,
                alignTicks: true,
                endOnTick: false,
                startOnTick: false,
                categories: dates,

                labels: {
                    formatter: function () {
                        return'<span>'+ [this.value] + '</span>'
                    }
                }
            //     breaks:[{ // Nights
            //     from: Date.UTC(2020, 9, 6, 16),
            //     to: Date.UTC(2020, 9, 7, 8),
            //     repeat: 24 * 36e5
            // }, { // Weekends
            //     from: Date.UTC(2020, 5, 19, 16, 0),
            //     to: Date.UTC(2020, 1, 22, 5, 30),
            //     repeat: 7 * 24 * 36e5
            // }]
            },
            yAxis: [
                {
                    // Primary yAxis
                    opposite: false,
                    max: maxRange,
                    min: minRange,
                    labels: {
                        // format: "${value}",
                        rotation: 0,
                    },
                    title: {
                        text: "Price",
                    },
                },
                {
                    // Secondary yAxis
                    opposite:true,
                    height: "50%",
                    top: "50%",
                    gridLineWidth: 0,
                    title: {
                        text: "Volume",
                    },
                    labels: {
                        formatter: function () {
                            var label = this.axis.defaultLabelFormatter.call(this);
                            if (parseInt(this.value) >= 1000000) {
                                return `${this.value / 1000000}M`;
                            }
                            else {
                                return `${this.value / 1000}K`;
                            }
                           
                        },
                        rotation: 0,
                    },
                },
            ],
            legend: {
                layout: "vertical",
                align: "left",
                x: 80,
                verticalAlign: "top",
                y: 55,
                floating: true,
            },
            series: [
                {
                    name: "Volume",
                    type: "column",
                    yAxis: 1,
                    data: volumeData,
                    // tooltip: false,
                    enableMouseTracking: true,
                },
                {
                    name: "Price",
                    type: "area",
                    yAxis: 0,
                    data: priceData,
                    enableMouseTracking: true,
                    marker: {
                        radius: 5,
                    },
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1,
                        },
                        stops: [
                            [0, lastPrice < firstPrice ? "#E020202F" : "#28D1982F"],
                            [1, "#00000000"],
                        ],
                    },
                    marker: {
                        radius: 5,
                    },
                    tooltip: {
                        // valuePrefix: "$",
                        valueDecimals: 2
                    },
                    threshold: null,
                    color: brandColor,
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                floating: false,
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                                x: 0,
                                y: 0,
                            },
                            yAxis: [
                                {
                                    labels: {
                                        align: "right",
                                        x: 0,
                                        y: -6,
                                    },
                                    showLastLabel: false,
                                },
                                {
                                    labels: {
                                        align: "left",
                                        x: 0,
                                        y: -6,
                                    },
                                    showLastLabel: false,
                                },
                                {
                                    visible: false,
                                },
                            ],
                        },
                    },
                ],
            },
        };
    };

    oneMonthButtonColors = () => {  //THIS METHOD HANDLES BUTTON COLORING WHEN USING CRYPTOS bc NO 1W 
        const { isCrypto } = this.props
        const { selectedTimePeriod } = this.state
        const active = { color: '#FFF', backgroundColor: 'rgb(52,207,153)' }
        const inactive = { color: '#000000', backgroundColor: '#FFF' }

        if ((isCrypto && selectedTimePeriod !== 'sixMonth') || !isCrypto && selectedTimePeriod === 'oneMonth') {
            return active
        }
        else {
            return inactive
        }

    }

    render() {
        // const dow = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"]
        const { prices, selectedTimePeriod, volumes} = this.state;
        let dates
        let priceData
        let volumeData
        if (prices[selectedTimePeriod]) {
            // priceData = prices[selectedTimePeriod].map((ele, i) => { return [ele[0]*1000 , (parseFloat(ele[1]))] }) // DATETIME
            // volumeData = volumes[selectedTimePeriod].map((ele, i) => { return [ele[0]*1000 , (parseFloat(ele[1]))] }) // DATETIME
            priceData = prices[selectedTimePeriod].map((ele, i) => { return [i , (parseFloat(ele[1]))] }) // LINEAR
            volumeData = volumes[selectedTimePeriod].map((ele, i) => { return [i , (parseFloat(ele[1]))] }) // LINEAR
            dates = prices[selectedTimePeriod].map(ele => { return this.parseDate(ele[0]) })//LINEAR
        } else {
            return null
        }
        if (this.state.prices[this.state.selectedTimePeriod].length === 0) {
            return (
                <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', height: 200, marginTop: 148 }}>
                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                        loading...
                </Text>
                </View>
            )
        } else {
            return (
                <View >
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: 'rgb(110,110,110)', margin: 0, marginBottom: 10, fontSize: 'smaller', fontWeight: 'bold' }}>
                            Interact with chart for detailed values
                        </Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View>
                            <ChartView 
                                styles={{ height: 400, zoomType:'xy', width: '100%' }}
                                options={this.configTogether(volumeData, priceData, dates)}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                originWhitelist={[""]}
                                useSSL={true}
                                useCDN={true}
                            />
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <View style={{
                                display:'flex',
                                flexDirection: 'row',
                                backgroundColor: 'rgb(244,253,250)',
                                borderRadius: 15,
                                padding: 8,
                                justifyContent: 'space-around',
                                width: '80%',
                                
                            }}>
                                {this.props.isCrypto ? null :
                                    <TouchableOpacity style={{
                                        backgroundColor: selectedTimePeriod === 'oneWeek' ? 'rgb(52,207,153)' : '#FFF',
                                        borderRadius: 12,
                                        padding: 5,
                                        borderWidth: 0
                                    }} onPress={() => {
                                        this.changeTimeperiod('oneWeek')
                                    }}
                                    >
                                        <Text style={{color: selectedTimePeriod === 'oneWeek' ? '#FFF' : '#000000', fontWeight:'bold'}}>1W</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity style={{
                                    color: this.oneMonthButtonColors().color,
                                    backgroundColor: this.oneMonthButtonColors().backgroundColor,
                                    borderRadius: 12,
                                    padding: 5,
                                    borderWidth: 0
                                }} onPress={() => {
                                    this.changeTimeperiod('oneMonth')
                                }}>
                                    <Text style={{ color: this.oneMonthButtonColors().color, fontWeight: 'bold'}}>1M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{
                                        color: selectedTimePeriod === 'sixMonth' ? '#FFF' : '#000000',
                                        backgroundColor: selectedTimePeriod === 'sixMonth' ? 'rgb(52,207,153)' : '#FFF',
                                        borderRadius: 12,
                                        padding: 5,
                                        borderWidth: 0
                                    }} 
                                    onPress={() => this.changeTimeperiod('sixMonth')}>
                                    <Text style={{ color: selectedTimePeriod === 'sixMonth' ? '#FFF' : '#000000', fontWeight: 'bold' }}>6M</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            paddingLeft: 20,
                        }} />
                    </View>
                </View>
            );
        }
    }
}

export default PricesCharts