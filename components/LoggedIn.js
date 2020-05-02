import React from 'react';
import { StyleSheet, View,  } from 'react-native';
import Header from '../components/Header'
import Body from '../components/Body'

export default LoggedIn = () => {
    render(
        <View>
            <View>
               <Header/>
            </View>
            <View>
                <Body/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
