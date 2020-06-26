import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';


export default Header = () => {
    return(
        <View>
            <View>
                <Text>Header</Text>
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
