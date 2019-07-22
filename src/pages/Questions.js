import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import axios from 'axios'
import QuestionCard from '../components/QuestionCard'
import ReplyBox from '../components/ReplyBox'
import {connect} from "react-redux";
import StackNavBar from "../components/StackNavBar";

const mapStateToProps = state => {
    return {
        user: state.user_info
    }
}

class Questions extends React.Component {
    state={
        questions:[],
        question_visible: false,
    }

    componentWillMount() {
        this.flush()
    }

    comeUpQuestion = (data) => {
        axios.post(baseUrl+'/courses/questions/add',{
            course_id: this.props.navigation.state.params.course_info.course_id,
            user_id: this.props.user.id,
            question_content: data
        }).then((res) => {
            this.hideInput()
            this.flush()
        }).catch(err => {
            console.log(err)
        })
    }

    displayInput = () => {
        this.setState({
            question_visible: true
        })
    }

    hideInput = () => {
        this.setState({
            question_visible: false
        })
    }

    flush = () => {
        axios.get(baseUrl+'/courses/questions/find',{
            params:{
                course_id: this.props.navigation.state.params.course_info.course_id,
                user_id: this.props.user.id,
            }
        }).then(res=>{
            this.setState({
                questions: res.data
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <ScrollView
              style={styles.container}
              keyboardShouldPersistTaps={'handled'}
            >
                <ReplyBox
                    onBackdropPress={this.hideInput}
                    onReplyDone={this.comeUpQuestion}
                    visible={this.state.question_visible}
                />
                <ImageBackground
                    style={styles.header_container}
                    imageStyle={{resizeMode:'stretch'}}
                    source={{uri:'questions_bg'}}
                >
                    <StackNavBar
                        navigation={this.props.navigation}
                    />
                    <View style={styles.title_container}>
                        <Text style={styles.title}>解疑</Text>
                        <View style={styles.subtitle_container}>
                            <Image
                                style={styles.subtitle_icon}
                                source={{uri:'qanda'}}
                            />
                            <Text style={styles.subtitle}>Q&A</Text>
                        </View>
                    </View>
                    <View style={styles.option_container}>
                        <View style={styles.new_question_container}>
                            <TouchableOpacity
                                onPress={this.displayInput}
                            >
                                <ImageBackground
                                    imageStyle={{resizeMode:'stretch'}}
                                    style={styles.new_question}
                                    source={{uri:'black_rectangle'}}
                                >
                                    <Image
                                        style={styles.new_question_icon}
                                        source={{uri:'new_question'}}
                                    />
                                    <Text style={styles.new_question_text}>新的问题</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.questions_container}>
                    {
                        this.state.questions.map((item,index) =>
                            <QuestionCard
                                onAnswer={this.flush}
                                QandA = {item}
                                key={index}
                                userId={this.props.user.id}
                            />
                        )
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header_container:{
        height:210,
    },
    title_container:{
        flex:1,
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title:{
        color: '#000000',
        fontSize: 50,
        fontFamily: '字魂95号-手刻宋'
    },
    subtitle_container:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    subtitle_icon:{
        width: 30,
        height: 30,
    },
    subtitle:{
        padding: 3,
        color: '#000000',
        fontSize: 12,
    },
    option_container:{
        paddingRight: 30,
        flex:2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    new_question_container:{
        paddingBottom: 60,
    },
    new_question:{
        flexDirection: 'row',
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    new_question_icon:{
        width: 24,
        height: 24,
    },
    new_question_text:{
        paddingTop: 3,
        paddingHorizontal: 3,
        color: '#FFFFFF',
        letterSpacing: 3,
        fontSize: 15,
        fontFamily: '字魂95号-手刻宋',
        lineHeight: 20,
    },
    questions_container:{
        paddingHorizontal:25,
    },
})

export default connect(
    mapStateToProps,
)(Questions)