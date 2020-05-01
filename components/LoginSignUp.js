import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default LoginSignUp = () => {
    render(
        <View>
            <View>
                <Text>LoginSignUp</Text>
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
