import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';


export default SettingsScreen = () => {
    render(
        <View>
            <View>
                <Text>Settings</Text>
            </View>
            <View>
                <Text>On - Off</Text>
                <Switch>On - Off</Switch>
            </View>
            <View>
                <Text>On - Off</Text>
                <Switch>On - Off</Switch>
            </View>
            <View>
                <Text>On - Off</Text>
                <Switch>On - Off</Switch>
            </View>
            <View>
                <Text>On - Off</Text>
                <Switch>On - Off</Switch>
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
