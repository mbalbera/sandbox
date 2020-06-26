import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import PriceChart from './priceChart'

export default class price extends React.Component {
    addCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render(){
    return (
        <View style={{marginTop: 20}}>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    PRICE AND VOLUME
                </Text>
            </View>
            <View style={styles.componentContainer}>
                <PriceChart prices={this.props.prices} symbol={this.props.symbol} volumes={this.props.volumes}/>
            </View>
            <View style={{...styles.componentContainer, display:'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                <Text style={{fontWeight:'bold'}}>
                   Daily Volume
                </Text>
                <Text style={{ color: 'rgb(32,179,125)', fontWeight:'bold'}}>
                    {this.addCommas(this.props.volume)}
                </Text>
            </View>
            <View style={{...styles.componentContainer, display:'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                <Text style={{fontWeight:'bold'}}>
                   Correlation with S&P
                </Text>
                <Text style={{ color: 'rgb(32,179,125)', fontWeight:'bold'}}>
                    {this.props.correlation}%
                </Text>
            </View>
            <View style={{...styles.componentContainer, display:'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                <Text style={{fontWeight:'bold'}}>
                   Leverage Ratio
                </Text>
                <Text style={{ color: 'rgb(32,179,125)', fontWeight:'bold'}}>
                    {this.props.leverage}%
                </Text>
            </View>
            <View style={{...styles.componentContainer, display:'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                <Text style={{fontWeight:'bold'}}>
                   Short Interest
                </Text>
                <Text style={{ color: 'rgb(32,179,125)', fontWeight:'bold'}}>
                    {this.props.shortInterest}%
                </Text>
            </View>
            <View style={{...styles.componentContainer, display:'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                <Text style={{fontWeight:'bold'}}>
                   Dividend Amount
                </Text>
                <Text style={{ color: 'rgb(32,179,125)', fontWeight:'bold'}}>
                    {this.props.dividendAmount ? this.props.dividendAmount : 0}
                </Text>
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