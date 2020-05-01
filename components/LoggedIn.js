import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default LoggedIn = () => {
    render(
        <View>
            <View>
                <Text>LoggedIn</Text>
            </View>
            <View>
                <Text onPress={() => console.log('nav to Test')}>To Test Screen</Text>
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
