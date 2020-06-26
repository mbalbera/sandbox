import React from "react";
import { View,StyleSheet } from 'react-native';
// @ts-ignore
import ChartView from '@highcharts/highcharts-react-native'

const brandColor = "#00A99D";
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

export default class HDRchart extends React.Component {
    config = (maxRange,drawdownData,lastDrawdown) => {
        return ({
            exporting: { 
                enabled: false 
            },
            credits: {
                enabled: false,
            },
            scrollbar: {
                enabled: false,
            },
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
            },
            chart: {
                zoomType: "x",
            },
            title: {
                text: "",
            },
            xAxis: {
                type: "datetime",
            },
            yAxis: {
                opposite:false,
                title: {
                    text: "Risk",
                },
                maxZoom: 150,
                max: maxRange,
                min: 0,
                labels: {
                    format: "{value}%"
                }
            },
            legend: {
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
                            [0, lastDrawdown[1] < 0 ? "#E020202F" : "#28D1982F"],
                            [1, "#00000000"],
                        ],
                    },
                    marker: {
                        radius: 5,
                    },
                    lineColor: lastDrawdown[1] < 0 ? "#E02020" : "#28D198",
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 3,
                        },
                    },
                    threshold: null,
                },
            },

            series: [
                {
                    type: "area",
                    name: "CVar",
                    data: drawdownData,
                },
            ],
        })
    }
    render() {
        const { drawdown } = this.props
        const drawdownData = drawdown.map(ele => [ele[0], Math.abs(ele[1].toFixed(2))])
        let pcnts = drawdownData.map(ele => ele[1])
        let maxVal = Math.max(...pcnts)
        let minVal = Math.min(...pcnts)
        let maxRange = maxVal + ((maxVal - minVal) * 0.02)
        let lastDrawdown = drawdown[drawdown.length - 1]
        return(
            <View  style={{height: 405, marginTop: -80}}>
                <View>
                    <ChartView
                        styles={{ height: 400, marginTop: 20, width: '100%' }}
                        // config={this.config(maxRange, drawdownData, lastDrawdown)}
                        options={this.config(maxRange, drawdownData, lastDrawdown)}
                        // options={options}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        originWhitelist={[""]}
                        useSSL={true}
                        useCDN={true}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    componentContainer: {
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'rgb(255,255,255)'
    },
})