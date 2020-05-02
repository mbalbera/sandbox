import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';


export default Body = () => {
    render(
        <View>
            <View>
                <Text>TemplateScreen</Text>
            </View>
            <View>
                <View>
                    <Text>Header</Text>
                </View>
                <View>
                    <Text>Body</Text>
                </View>
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
