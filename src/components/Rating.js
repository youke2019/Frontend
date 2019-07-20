import React from "react";
import {
    Image,
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
            if ((index+1)*2 == this.state.rate)
                this.setState({
                    rate: 0
                })
            else
                this.setState({
                    rate: (index+1)*2
                })
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
                            <View
                                style={styles.star_container}
                            >
                                <Image
                                    style={styles.star}
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
        paddingHorizontal: 2,
    },
    star:{
        width: 24,
        height: 24
    }
})

export default Rating