import React from 'react'
import {View, Text, Image} from 'react-native'
import GreenUpArrow from '../../assets/green_up_arrow_icon.png';
import RedDownArrow from '../../assets/red_down_arrow_icon.png';
import Flat_Arrow from '../../assets/flat_arrow.png';


export default class ChangeSinceYest extends React.Component {

    positive = () => {
        return (
            <View
                style={{
                    backgroundColor: "rgb(229,246,234)",
                    display: "flex",
                    borderRadius: 6,
                    justifyContent: "space-around",
                    width: 150,
                    padding: 8,
                    flexDirection: "row",
                }}
            >
                <View style={{ marginTop: 3 }}>
                    <Image
                        style={{ height: 12 }}
                        source={GreenUpArrow}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            color: this.props.textColor,
                            textAlign: "left",

                        }}
                    >
                        +${this.props.dollarChange.toFixed(2)}{" "}
                        {`(+${(this.props.changePercent * `100`).toFixed(2)}%)`}
                    </Text>
                </View>
            </View>
        );
    }
    negative = () => {
        return (
            <View
                style={{
                    backgroundColor: "rgb(246,229,229)",
                    display: "flex",
                    borderRadius: 6,
                    justifyContent: "space-around",
                    width: 150,
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    padding: 8

                }}
            >
                <View>
                    <Image
                        style={{ height: 12, marginTop: 3 }}
                        source={RedDownArrow}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            color: "rgb(181,23,28)",
                            textAlign: "left",
                        }}
                    >
                        -${Math.abs(this.props.dollarChange).toFixed(2)}
                        {`(${(this.props.changePercent * `100`).toFixed(2)}%)`}
                    </Text>
                </View>
            </View>
        );
    }

    zero = () => {
        return (
            <View
                style={{
                    backgroundColor: "rgb(119,119,119)",
                    display: "flex",
                    borderRadius: 6,
                    justifyContent: "space-evenly",
                    minHeight: 35,
                    width: 150,
                    flexDirection: "row",
                    padding: 8

                }}
            >
                <View>
                    <Image
                        style={{ height: 12, marginTop: 7.5 }}
                        source={Flat_Arrow}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text
                        style={{
                            fontSize: 12,          
                            fontWeight: "bold",
                            color: "rgb(255,255,255)",
                            textAlign: "left",

                        }}
                    >
                        {this.props.changePercent > 0 ? "+" : null}
                        {(this.props.dollarChange).toFixed(2)}{" (0.00%)"}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        if (this.props.changePercent > 0) {

        } else if (this.props.changePercent === 0) {

        } else {

        }
        return (
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    margin: "auto",
                }}
            >
                {parseFloat(this.props.changePercent).toFixed(2) == 0.00 ? this.zero() : null}
                {parseFloat(this.props.changePercent).toFixed(2) > 0 ? this.positive() : null}
                {parseFloat(this.props.changePercent).toFixed(2) < 0 ? this.negative() : null}
            </View>
        );
    }
}