import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import ChangeSinceYest from './ChangeSinceYest'


// function addToWatchList(ticker){
//     fetch (url){
//         body:{
//             {
//                 "add": [ticker],
//                 "delete": []
//             }
//         }
//     }
// }
// function removeFromWatchList(){
//     fetch(url){
//         body: {
//             {
//                 "add": [],
//                     "delete": [ticker]
//             }
//         }
//     }
// }

// }
export default function companyInfo (props){

    let { sourceData } = props
    let { currentPrice, isWatchlisted } = sourceData
    let currentPriceInt = parseFloat(currentPrice.currentPrice)
    // let hiPriceInt = parseFloat(currentPrice.hiPrice)
    // let loPriceInt = parseFloat(currentPrice.loPrice)
    let openPriceInt = parseFloat(currentPrice.openPrice)
    let prevCloseInt = parseFloat(currentPrice.prevClose)
    let prevClosePrice = parseFloat(currentPrice.closePrice)
    let dollarChange = currentPriceInt - prevClosePrice
    let textColor = currentPrice < openPriceInt ? '#E02020' : 'rgb(32,179,125)'

    return(
        <View style={styles.componentContainer}>
            <View style={{...styles.spacing, display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                <View>
                    <Text style={{ display: 'flex', flex: 1, fontSize: 22, fontWeight: "bold", color: prevCloseInt > 0 ? 'rgb(32,179,125)' : 'rgb(180,47,48)'}}>${currentPriceInt.toFixed(2)}</Text>
                </View>
                <View style={{marginLeft: 20}}>
                    <ChangeSinceYest style={{ display: 'flex', flex: 1 }}textColor={textColor} dollarChange={dollarChange} changePercent={prevCloseInt}/>
                </View>
            </View>
            <View style={styles.spacing}>
                <Text style={{ fontSize: 16, color: 'rgb(100,100,100)', fontWeight:"bold" }}>{sourceData.companyName}</Text>
            </View>
            { isWatchlisted?null: 
                <TouchableOpacity style={{...styles.button, ...styles.spacing,}} >
                    <Text style={{fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 10}}>ADD TO WATCHLIST</Text>
                    {/* <Text style={{fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 10, fontSize: 18}}>+</Text> */}
                </TouchableOpacity>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    componentContainer:{
        marginHorizontal: 20,
        marginVertical: 20,
         padding: 20,
         flex: 1,
         justifyContent: 'center',
         backgroundColor: 'rgb(255,255,255)',
         borderRadius: 8
    },
    button: { 
        display: 'flex', 
        flexDirection: 'row', 
        // justifyContent: 'space-between', 
        justifyContent: 'center', 
        backgroundColor: 'rgb(240,244,251)', 
        fontWeight: "bold", 
        width: '100%', 
        paddingVertical: 7, 
        paddingHorizontal: 5, 
        borderRadius: 8,
        flex: 1,
        alignItems: 'center'
    },
    spacing:{
        marginVertical: 5
    },
    buttonText:{
        fontWeight: 'bold',

    }
})