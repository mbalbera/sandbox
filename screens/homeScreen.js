import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoggedIn from '../components/LoggedIn'
import LoginSignUp from '../components/LoginSignUp'


 class HomeScreen extends React.Component{
    state={
        user: true,
    }

    return(){
        render(
            <View>
                <View>
                    { this.state.user ? <LoggedIn/> : <LoginSignUp/> }
                </View>
                <View>
                    <Text onPress={()=>console.log('nav to Test')}>To Test Screen</Text>
                </View>
            </View>
        )
    }
}
export default HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
