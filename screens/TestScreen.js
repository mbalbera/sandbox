import React from 'react';
import { StyleSheet, View, Text, Slider } from 'react-native';


export default TestScreen = () => {
    render(
        <View>
            <View>
                <Text>TestScreen</Text>
            </View>
            <View>
                <Slider
                    minimumValue={1}
                    maximumValue={10}
                    step={0.5}
                />
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
