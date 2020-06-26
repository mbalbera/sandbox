import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import ArRisk from './arRisk'
import CompanyInfo from './companyInfo'
import Events from './events'
import PriceTrend from './priceTrend'
import Price from './price'
import TkHeader from './tkHeader'
import TestChart from './TestChart'

class TickerModal extends React.Component {
    
    state={
        sourceData: null
    }

    fetchData = ()=>{
        let url = `https://api.allocaterite.com/risk-monkey/ticker/${this.props.ticker}`
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
                var sourceData = responseJson
                this.setState({ sourceData })

            })
            .catch(error => console.log(error))
    }
    

    componentDidMount(){
        this.fetchData()
    }
    render() {
        const {sourceData} = this.state
        return (
            <View style={{height: '100%', width: '100%', backgroundColor: 'rgb(242,242,242)', margin: 0, padding: 0}}>
                <View style={{ width: '100%', margin: 0, padding: 0, backgroundColor: "#00A99D", color: 'rgb(255,255,255)', }}>
                    <TkHeader hideModal={this.props.hideModal} ticker={this.props.ticker}/>
                </View>
                { sourceData ? 
                <ScrollView>
                    {/* <TestChart /> */}
                    <CompanyInfo sourceData={sourceData}/>
                    <PriceTrend 
                        signalPrice={sourceData.signalPrice}
                        direction={sourceData.direction}
                        directionPrev={sourceData.directionPrev}
                        newUpdate={sourceData.directionLastUpdate}
                        prevUpdate={sourceData.directionPrevLastUpdate}
                    />
                    <ArRisk 
                        cvar={Math.abs(sourceData.tickerRisk)} 
                        riskDescription={sourceData.riskDescription}
                        riskData={sourceData.riskData}
                    />
                    <Price 
                        correlation={(sourceData.riskData.rSquared * 100).toFixed(2)}
                        leverage={sourceData.leverage.toFixed(2)}
                        shortInterest={sourceData.shortInterest.toFixed(2)}
                        dividendAmount={sourceData.dividendsAmount}
                        prices={sourceData.historicalPrice}
                        volumes={sourceData.historicalVolume}
                        symbol={sourceData.symbol}
                        isCrypto={sourceData.isCrypto}
                        volume = {sourceData.volume}
                    />
                    <Events
                        exDividend={sourceData.nextDividendDate}
                        nextEarnings={sourceData.nextEarningsDate}
                    />
                    <View style={{height: 50}}/>
                </ScrollView>
                : 
                <View>
                    <Text>Loading...</Text>
                </View>
                }
            </View>
        )
    }
}
export default TickerModal
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
