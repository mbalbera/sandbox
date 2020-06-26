import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import {Header, Icon }from 'react-native-elements'

export default function tkHeader(props) {

    return (
        <Header
            statusBarProps={{ barStyle: 'light-content' }}
            leftComponent={<Icon name='bars' type='font-awesome-5' color='rgb(255,255,255)' />}
            centerComponent={<Text style={{color: 'rgb(255,255,255)', fontWeight: 'bold', fontSize: 18}}>{props.ticker}</Text>}
            rightComponent={<Icon name='times' type='font-awesome-5' color='rgb(255,255,255)' onPress={()=>props.hideModal()}/>}  
            backgroundColor='#00A99D'
        />
        
    )

}