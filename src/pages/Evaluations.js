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
                user_id: this.props.user_id
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
        console.log(this.props.user_id)
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
                <ImageBackground
                    style={styles.header_container}
                    imageStyle={{resizeMode:'stretch'}}
                    source={{uri:'questions_bg'}}
                >
                    <StackNavBar
                        navigation={this.props.navigation}
                        title='评测'
                    />
                    <View style={styles.header}>
                        <Text style={styles.title}>课程评测</Text>
                    </View>
                </ImageBackground>
                <View
                    style={styles.slider_container}
                >
                    <TouchableOpacity
                        style={styles.plus_container}
                        onPress={this.postEvaluation}
                    >
                        <View
                            style={styles.plus_button}
                            imageStyle={{resizeMode: 'stretch'}}
                            source={{uri:'button_orange'}}
                        >
                            <Text style={styles.plus_text}>发布我的评测</Text>
                        </View>
                    </TouchableOpacity>
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
        backgroundColor: '#F5F5F5',
    },
    header_container:{
        height:150,
    },
    header:{
        height: 50,
        paddingBottom: 20,
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
        padding: 10,
    },
    plus_container:{
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus_button:{
        width: 180,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FDAF26',
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