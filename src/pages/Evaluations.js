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
import axios from "axios"
import {connect} from "react-redux"
import StackNavBar from "../components/StackNavBar"

const mapStateToProps = state => {
    return {
        user: state.user_info
    }
}

class Evaluations extends React.Component {
    state={
        evaluations: [],
        cardScrollEnable : true,
    }

    componentWillMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {this.getEvaluations()}
        )

        this.getEvaluations()
    }

    getEvaluations = () => {
        axios.get(baseUrl+'/courses/evaluates/find',{
            params:{
                course_id: this.props.navigation.state.params.course_info.course_id,
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
        this.props.navigation.navigate("NewEvaluation", {
            course_info: this.props.navigation.state.params.course_info,
            user_id: this.props.user.id
        })
    }


    _renderItem = ({item,index}) => {
        return (
            <EvaluationCard
                evaluation={item}
                onDetail={this.changeCardScroll}
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
                <StackNavBar
                    navigation={this.props.navigation}
                />
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
                    style={styles.slider_container}
                >
                    {
                        evaluations.length?
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={evaluations}
                                renderItem={this._renderItem}
                                sliderWidth={350}
                                itemWidth={300}
                                layout={'stack'}
                                firstItem={evaluations.length-1}
                                layoutCardOffset={10}
                                scrollEnabled={cardScrollEnable}
                                contentContainerCustomStyle={styles.slider}
                            />
                            :
                            null
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FDD32A',
    },
    header:{
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: '#000000',
        fontSize: 40,
        fontFamily: '字魂95号-手刻宋'
    },
    slider_container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider:{
        padding: 30,
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

export default connect(
    mapStateToProps,
)(Evaluations)