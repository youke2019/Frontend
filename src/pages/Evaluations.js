import React from "react";
import {
    Text,
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native"
import EvaluationCard from '../components/EvaluationCard'
import Carousel from 'react-native-snap-carousel'
import axios from "axios";

class Evaluations extends React.Component {
    state={
        evaluations: [],
        cardScrollEnable : true,
    }

    componentWillMount() {
        axios.get(baseUrl+'/courses/evaluates/find',{
            params:{
                course_id: '11004'
            }
        }).then(res=>{
            this.setState({
                evaluations: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    changeCardScroll = () => {
        this.setState({
            cardScrollEnable: !this.state.cardScrollEnable,
        })
    }

    postEvaluation = () => {
        this.props.navigation.navigate("PostEvaluation")
    }


    _renderItem = ({item,index}) => {
        return (
            <EvaluationCard
                key={item}
                evaluation={item}
                onDetail={() => {this.changeCardScroll()}}
            />
        )
    }

    render () {
        const {
            evaluations,
            cardScrollEnable,
        } = this.state

        return (
            <ScrollView
                style={styles.container}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>课程评测</Text>
                </View>
                <TouchableOpacity
                    style={styles.plus_container}
                    onPress={this.postEvaluation}
                >
                    <ImageBackground
                        style={styles.plus_button}
                        imageStyle={{resizeMode: 'stretch'}}
                        source={{uri:'button_orange'}}
                    >
                        <Text style={styles.plus_text}>发布我的评测</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <View
                    style={styles.slider}
                >
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={evaluations}
                        renderItem={this._renderItem}
                        sliderWidth={360}
                        itemWidth={300}
                        layout={'tinder'}
                        firstItem={evaluations.length}
                        layoutCardOffset={12}
                        scrollEnabled={cardScrollEnable}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FDD32A'
    },
    header:{
        paddingTop: 20,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: '#000000',
        fontSize: 40,
        fontFamily: '字魂95号-手刻宋'
    },
    slider:{
        flex:1,
        paddingVertical: 20,
    },
    plus_container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus_button:{
        width: 180,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus_text:{
        paddingHorizontal: 5,
        fontSize: 16,
        letterSpacing: 1,
        fontFamily: '字魂95号-手刻宋',
    }
})

export default Evaluations