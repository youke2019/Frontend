import React from "react";
import {
    ImageBackground,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";

const stars=[
    {empty:'star1',full:'fullstar1'},
    {empty:'star2',full:'fullstar2'},
    {empty:'star3',full:'fullstar3'},
    {empty:'star4',full:'fullstar4'},
    {empty:'star5',full:'fullstar5'},
]

class Rating extends React.Component {
    state = {
        rate: -1,
        selected : this.props.selected
    }

    isFull = (rate, index) => {
        if(this.state.selected){
            return (index+1)*2 <= this.state.rate
        } else {
            return (index+1)*2 <= rate
        }
    }

    updateStar = (index) => {
        if(this.state.selected){
            if ((index+1)*2 == this.state.rate){
                this.setState({
                    rate: 0
                })
                this.props.onUpdate(0)
            }
            else{
                this.setState({
                    rate: (index+1)*2
                })
                this.props.onUpdate((index+1)*2)
            }
        }
    }

    render() {
        const {
            rate,
        } = this.props

        return (
            <View style={styles.container}>
                {
                    stars.map((item,index) =>
                        <TouchableWithoutFeedback
                            onPress={() => this.updateStar(index)}
                            key={index}
                        >
                            <View style={styles.star_container}>
                                <ImageBackground
                                    style={styles.star}
                                    imageStyle={{resizeMode: 'cover'}}
                                    source={{uri:  this.isFull(rate, index) ? item.full:item.empty}}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    star_container:{
        paddingHorizontal: 5,
    },
    star:{
        height:25,
        width: 25,
    }
})

export default Rating