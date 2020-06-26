import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import TickerModal from '../components/TickerModal'
import Modal from 'react-native-modal'

class TestingScreen extends React.Component{
    state={
        modalVisible: false,
        ticker: ''
    }

    hideModal = ()=>{
        this.setState({modalVisible:false})
    }

    render(){
        return(
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <View >
                    <Text> Stocks Container</Text>
                    <View style={{ marginTop: 50, display:'flex',}}>
                        <FlatList
                            data={this.props.stocks}
                            renderItem={({ item }) => <TouchableOpacity key={item} onLongPress={() => this.setState({ticker:item, modalVisible:true})}><Text style={{ marginTop: 10 }}>{item}</Text></TouchableOpacity>}
                            keyExtractor={item => item}
                            contentContainerStyle={{ flex: 1, flexDirection: 'column', height: '100%', width: '100%' }}
                        />
                    </View>
                </View>
                <Modal isVisible={this.state.modalVisible} style={{height:'100%', width: '100%', margin: 0, padding: 0}}>
                    <TickerModal hideModal={this.hideModal} ticker={this.state.ticker}/> 
                </Modal>
            </View>
    )}
}
export default TestingScreen