import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import upArrow from "../../assets/single_up.png";
import downArrow from "../../assets/single_down.png";
import strongUpArrow from "../../assets/double_up.png";
import strongDownArrow from "../../assets/double_down.png";
import flatArrow from "../../assets/flat.png";

export default class priceTrend extends React.Component {

    parseDate(date){
        let dt = new Date(date * 1000)
        return dt.toLocaleString()
    }

    arrowDescriptor = (d)=>{
        switch (d) {
            case -1:
                return 'DOWN';
            case 1:
                return 'UP';
            case 2:
                return 'STRONG UP';
            case -2:
                return 'STRONG DOWN';
            default:
                return 'FLAT';
        }

    }

    getArrow = (d) => {
        switch (d) {
            case -1:
                return downArrow;
            case 1:
                return upArrow;
            case 2:
                return strongUpArrow;
            case -2:
                return strongDownArrow;
            default:
                return flatArrow;
        }
    };
    render(){
    return (
        <View>
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    PRICE TREND
                </Text>
            </View>
            <View style={styles.componentContainer}>
                <View style={{ marginVertical: 5}}>
                        <View>
                            <Text style={{ fontWeight: 'bold',marginBottom: 10, textAlign:'center' }}>Current Trend</Text>
                        </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{display:'flex', }}>
                            <Text style={{ fontWeight: 'bold', color: 'rgb(32,179,125)', textAlign:'center', fontSize: 18}}>${this.props.signalPrice.toFixed(2)}</Text>
                            <Text style={{textAlign: 'center'}}>signal price</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{fontWeight: 'bold', width:60, textAlign: "right"}}>{this.arrowDescriptor(this.props.direction)}</Text>
                            <Image
                                style={{marginLeft: 10}}
                                source={this.getArrow(this.props.direction)}
                            />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, alignContent:'center', justifyContent:'center' }}>
                        <Text style={{ color: 'rgb(120,120,120)' }}>generated on:</Text>
                        <Text style={{ fontWeight: 'bold', marginLeft: 3, color: 'rgb(120,120,120)' }}>{this.parseDate(this.props.newUpdate)}</Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:10 }}>
                    <View style={{ display: 'flex', justifyContent:'center' }}>
                        <Text style={{ fontWeight: 'bold', }}>Prior Trend</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' , width:60, textAlign: "right"}}>{this.arrowDescriptor(this.props.directionPrev)}</Text>
                        <Image
                            style={{marginLeft: 10}}
                            source={this.getArrow(this.props.directionPrev)}
                        />
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, alignContent:'center', justifyContent:'center' }}>
                    <Text style={{ color: 'rgb(120,120,120)'}}>generated on:</Text>
                    <Text style={{ fontWeight: 'bold', marginLeft: 3, color: 'rgb(120,120,120)'}}>{this.parseDate(this.props.prevUpdate)}</Text>
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
        backgroundColor: 'rgb(255,255,255)'
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