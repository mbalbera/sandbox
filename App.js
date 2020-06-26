import React from 'react';
import { StyleSheet, View } from 'react-native';
// import HomeScreen from './screens/HomeScreen'
import TestingScreen from './screens/testingScreen';
console.disableYellowBox = true;
console.warn = () => { }
class App extends React.Component {
  render(){
    let stocks = ["AAPL","TSLA", "PENN", "GE", "MSFT"]
    return (
      <View style={styles.container}>
        <TestingScreen stocks={stocks}/>
      </View>
    );
  }
}

export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
