import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Gauge from './riskGauge'
import HDRchart from './HDRchart';

const brandColor = "#00A99D";

const uncolored = {
    activeBarColor:"#a3a5a8",
    name:''
}

const colored = [
    { 
        labelColor: "rgb(0,202,148)",
        activeBarColor: "rgb(0,202,148)",
        name: 'Low Risk',
    },
    { 
        labelColor: "rgb(0,202,148)",
        activeBarColor: "rgb(0,202,148)",
        name: 'Low Risk',
    },
    { 
        labelColor: "rgb(0,202,148)",
        activeBarColor: "rgb(0,202,148)",
        name: 'Low Risk',
    },
    { 
        labelColor: "rgb(255,150,48)",
        activeBarColor: "rgb(255,150,48)",
        name: 'Medium Risk',
    },
    { 
        labelColor: "rgb(255,150,48)",
        activeBarColor: "rgb(255,150,48)",
        name: 'Medium Risk',
    },
    { 
        labelColor: "rgb(255,150,48)",
        activeBarColor: "rgb(255,150,48)",
        name: 'Medium Risk',
    },
    { 
        labelColor: "rgb(252,32,28)",
        activeBarColor: "rgb(252,32,28)",
        name:'High Risk'
    },
    { 
        labelColor: "rgb(252,32,28)",
        activeBarColor: "rgb(252,32,28)",
        name:'High Risk'
    },
    { 
        labelColor: "rgb(252,32,28)",
        activeBarColor: "rgb(252,32,28)",
        name:'High Risk'
    },
    { 
        labelColor: "rgb(252,32,28)",
        activeBarColor: "rgb(252,32,28)",
        name:'High Risk'
    },
]

const labels= [
    {
        name: 'Low Risk',
        labelColor: '#ff2900',
        activeBarColor: '#ff2900',
        name: 'Low Risk',
    },
    {
        name: 'Low Risk',
        labelColor: '#ff5400',
        activeBarColor: '#ff5400',
        name: 'Low Risk',
    },
    {
        name: 'Medium Risk',
        labelColor: '#f4ab44',
        activeBarColor: '#f4ab44',
        name: 'Low Risk',
    },
    {
        name: 'Medium Risk',
        labelColor: '#f2cf1f',
        activeBarColor: '#f2cf1f',
        name: 'Low Risk',
    },
    {
        name: 'High Risk',
        labelColor: '#14eb6e',
        activeBarColor: '#14eb6e',
        name: 'Low Risk',
    },
    {
        name: 'High Risk',
        labelColor: '#00ff6b',
        activeBarColor: '#00ff6b',
        name: 'Low Risk',
    },
]
export default class arRisk extends React.Component{
    state={
        showRisk: true
    }

    setColoredGauges(input) {
        let pivotPoint = ((Math.abs(input) * 2) / 5) * 100;
        let answer = [...colored];
        return answer.map((ele, i) => {
            if (i > pivotPoint) {
                return uncolored;
            } else {
                return ele;
            }
        });
    }

    render(){
        return (
            <View style={{marginTop: 10,height: this.state.showRisk ? 300:650 }}>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        RISK
                </Text>
                </View>
                <View style={{ ...styles.componentContainer, backgroundColor: 'rgb(255,255,255)',height: this.state.showRisk ? 250 : 400, }}>
                    {this.state.showRisk?
                        <View style={{ marginVertical: 5 }}>
                            <View style={{display:'flex', justifyContent:'center', alignItems:'center', margin:0}}>
                                <Gauge 
                                    cvar={this.props.cvar}
                                />
                            </View>
                        </View> 
                        :
                        <View>
                            <View style={{marginTop: 70}}>
                                <HDRchart drawdown={this.props.riskData.drawdown} />
                            </View>
                            <View style={{ height: 50, backgroundColor: 'rgb(240,244,251)', borderRadius: 8, marginTop: 40 }}>
                                <View style={{ ...styles.componentContainer, display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ fontWeight: 'bold', }}>
                                        Max Historical Drawdown
                                    </Text>
                                    <Text style={{ color: 'rgb(32,179,125)', fontWeight: 'bold' }}>
                                        {this.props.riskData.maxDrawdownVal.toFixed(2)}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }
                    <View style={{marginTop: this.state.showRisk?20:0, height: 100, marginBottom: 10}}>
                        <TouchableOpacity onPress={()=>this.setState({showRisk: !this.state.showRisk})} style={{ ...styles.button, ...styles.spacing, marginTop: 40 }}>
                            <Text style={{ fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.showRisk ? 'see historical risk' :'see current risk'}</Text>
                            <Text style={{ fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 10, fontSize: 18 }}>{this.state.showRisk ? '→' : '←'}</Text>
                        </TouchableOpacity>
                    </View>
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
        // backgroundColor: 'rgb(255,255,255)'
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(240,244,251)',
        fontWeight: "bold",
        width: '100%',
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center'
        
    },
    spacing: {
        marginVertical: 5
    },
    buttonText: {
        fontWeight: 'bold',
    }
})