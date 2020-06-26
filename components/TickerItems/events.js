import React from 'react'
import { StyleSheet, View, Text } from 'react-native';


function parseDate(dt){
    let full = new Date(dt * 1000)
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let month = full.getMonth()
    let day = full.getDate()
    let year = full.getFullYear()
    return `${months[month]} ${day}, ${year}`
}

export default function events(props) {

    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    EVENTS
                </Text>
            </View>
            <View style={{ ...styles.componentContainer, display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                <Text style={{ fontWeight: 'bold' }}>
                    Next Earnings Date
                </Text>
                <Text style={{ color: 'rgb(32,179,125)', fontWeight: 'bold' }}>
                    {parseDate(props.nextEarnings)}
                </Text>
            </View>
            <View style={{ ...styles.componentContainer, display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                <Text style={{ fontWeight: 'bold' }}>
                    Ex Dividend Date
                </Text>
                <Text style={{ color: 'rgb(32,179,125)', fontWeight: 'bold' }}>
                    { props.exDividend ? parseDate(props.exDividend) : 'N/A'}
                </Text>
            </View>
        </View>
    )

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