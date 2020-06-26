import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Gauge from 'react-native-speedometer'

const brandColor = "#00A99D";

const uncolored = {
    activeBarColor: "#a3a5a8",
    name: ''
}

const colored = [
    {
        labelColor: "rgb(0,202,148)",
        activeBarColor: "rgb(0,202,148)",
        name: 'Low Risk',
        key: 1,
    },
    {
        labelColor: "rgb(0,202,148)",
        activeBarColor: "rgb(0,202,148)",
        name: 'Low Risk',
        key: 2,
    },
    {
        labelColor: "rgb(0,202,148)",
        activeBarColor: "rgb(0,202,148)",
        name: 'Low Risk',
        key: 3,
    },
    {
        labelColor: "rgb(255,150,48)",
        activeBarColor: "rgb(255,150,48)",
        name: 'Medium Risk',
        key: 4,
    },
    {
        labelColor: "rgb(255,150,48)",
        activeBarColor: "rgb(255,150,48)",
        name: 'Medium Risk',
        key: 5,
    },
    {
        labelColor: "rgb(255,150,48)",
        activeBarColor: "rgb(255,150,48)",
        name: 'Medium Risk',
        key: 6,
    },
    {
        labelColor: "rgb(252,32,28)",
        activeBarColor: "rgb(252,32,28)",
        name: 'High Risk',
        key: 7,
    },
    {
        labelColor: "rgb(252,32,28)",
        activeBarColor: "rgb(252,32,28)",
        name: 'High Risk',
        key: 8,
    },
    {
        labelColor: "rgb(252,32,28)",
        activeBarColor: "rgb(252,32,28)",
        name: 'High Risk',
        key: 9,
    },
    {
        labelColor: "rgb(252,32,28)",
        activeBarColor: "rgb(252,32,28)",
        name: 'High Risk',
        key: 0,
    },
]

const labels = [
    {
        name: 'Low Risk',
        labelColor: '#ff2900',
        activeBarColor: '#ff2900',
    },
    {
        name: 'Low Risk',
        labelColor: '#ff5400',
        activeBarColor: '#ff5400',
    },
    {
        name: 'Medium Risk',
        labelColor: '#f4ab44',
        activeBarColor: '#f4ab44',
    },
    {
        name: 'Medium Risk',
        labelColor: '#f2cf1f',
        activeBarColor: '#f2cf1f',
    },
    {
        name: 'High Risk',
        labelColor: '#14eb6e',
        activeBarColor: '#14eb6e',
    },
    {
        name: 'High Risk',
        labelColor: '#00ff6b',
        activeBarColor: '#00ff6b',
    },
];

function textColor(input){
    let num = ((Math.abs(input) * 2) / 5) * 100
    if (colored[num.toFixed(0)]) {
        return colored[num.toFixed(0)];
    } else {
        return colored[19]
    }
}
export default function RiskGauge(props){
    return(
        <View>
            <Gauge
                value={props.cvar * 100}
                showPercent={true}
                percentStyle={{ fontSize: 18, fontWeight: 'bold', color: textColor(props.cvar) }}
                internalColor={textColor(props.cvar)}
                minValue={0}
                maxValue={50}
                size={200}
                labels={colored}
                labelStyle={{color:textColor(props.cvar)}}
                defaultValue={0}
            />
        </View>
    )

} 