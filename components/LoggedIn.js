import React from 'react';
import { StyleSheet, View,  } from 'react-native';
import Header from '../constants/Header'
import Body from '../components/Body'

export default class LoggedIn extends React.Component {
    render(){
    return(
        <View>
            <View>
               <Header/>
            </View>
            <View>
                <Body/>
            </View>
        </View>
    )
}}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
