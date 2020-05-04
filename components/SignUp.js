import React from 'react';
import { StyleSheet, View, Text, TextInput, } from 'react-native';


class SignUp extends React.Component {

    state = {
        username: '',
        password: '',
        password2: ''
    }

    allowInput = (location, event) => {
        this.setState({
            [location]: event.value
        })
    }

    return() {
        render(
            <View>
                <View>
                    <Text>LoginSignUp</Text>
                </View>
                <View>
                    <View>
                        <Text>Username</Text>
                        <TextInput onChange={(event) => this.allowInput('username', event)} value={this.state.username} />
                    </View>
                    <View>
                        <Text>Password</Text>
                        <TextInput onChange={(event) => this.allowInput('password', event)} value={this.state.password} />
                    </View>
                    <View>
                        <Text>Repeat Password</Text>
                        <TextInput onChange={(event) => this.allowInput('password2', event)} value={this.state.password2} />
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default SignUp
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
