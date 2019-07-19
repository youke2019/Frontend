import React from "react";
import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity
} from "react-native";
import axios from 'axios'
import ReplyBox from "./ReplyBox";


class QuestionCard extends React.Component {
    state = {
        QandA: this.props.QandA,
        answer_visible: false,
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            QandA: nextProps.QandA
        })
    }

    useful = () => {
        let tmp_QandA = this.state.QandA
        if (this.state.QandA.current_user_praise){
            tmp_QandA.question_praise_point--
            tmp_QandA.current_user_praise = false
            this.setState({
                QandA: tmp_QandA
            })
            axios.get(baseUrl+'/courses/questions/unpraise',{
                params:{
                    user_id: '01231',
                    question_id: tmp_QandA.question_id
                }
            }).catch(err=>{
                console.log(err)
            })
        } else {
            tmp_QandA.question_praise_point++
            tmp_QandA.current_user_praise = true
            this.setState({
                QandA: tmp_QandA
            })
            axios.get(baseUrl+'/courses/questions/praise',{
                params:{
                    user_id: '01231',
                    question_id: tmp_QandA.question_id
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    praise = (index) => {
        let tmp_QandA = this.state.QandA
        if (this.state.QandA.courseAnswerList[index].current_user_praise){
            tmp_QandA.courseAnswerList[index].answer_praise_point--
            tmp_QandA.courseAnswerList[index].current_user_praise = false
            this.setState({
                QandA: tmp_QandA
            })
            axios.get(baseUrl+'/courses/answers/unpraise',{
                params:{
                    user_id: '01231',
                    answer_id: tmp_QandA.courseAnswerList[index].answer_id,
                }
            }).catch(err=>{
                console.log(err)
            })
        } else {
            tmp_QandA.courseAnswerList[index].answer_praise_point++
            tmp_QandA.courseAnswerList[index].current_user_praise = true
            this.setState({
                QandA: tmp_QandA
            })
            axios.get(baseUrl+'/courses/answers/praise',{
                params:{
                    user_id: '01231',
                    answer_id: tmp_QandA.courseAnswerList[index].answer_id,
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    displayInput = () => {
        this.setState({
            answer_visible: true
        })
    }

    hideInput = () => {
        this.setState({
            answer_visible: false
        })
    }

    answer = (data) => {
        axios.post(baseUrl+'/courses/answers/add',{
            question_id: this.state.QandA.question_id,
            user_id: '01231',
            answer_content: data
        }).then(() => {
            this.hideInput()
            this.props.onAnswer()
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        const {
            answer_visible = false,
            QandA = {
                courseAnswerList: []
            }
        } = this.state

        return (
            <View
                style={styles.container}
            >
                <ReplyBox
                    onBackdropPress={this.hideInput}
                    onReplyDone={(data) => this.answer(data)}
                    visible={this.state.answer_visible}
                />
                <View style={styles.content_container}>
                    <View style={styles.question_container}>
                        <View style={styles.question_mark}>
                            <Text style={styles.question_mark_text}>问题</Text>
                            <Image
                                style={styles.question_icon}
                                source={{uri:'question_mark'}}
                            />
                        </View>
                        <Text style={styles.question_text}>
                            {QandA.question_content}
                        </Text>
                        <TouchableOpacity
                            style={styles.bulb_container}
                            onPress={this.useful}
                        >
                            <Image
                                resizeMode='stretch'
                                style={[styles.bulb,QandA.current_user_praise? styles.selected:styles.unselected]}
                                source={{uri:'bulb'}}
                            />
                            <Text style={styles.praise_point}>有用({QandA.question_praise_point})</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.answers_container}>
                        {
                            QandA.courseAnswerList.map((item, index) =>
                                <View
                                    style={styles.answer_container}
                                    key={index}
                                >
                                    <View style={styles.answer_mark}>
                                        <Text style={styles.answer_mark_text}>回答</Text>
                                        <Image
                                            style={styles.answer_icon}
                                            source={{uri:'answer_mark'}}
                                        />
                                    </View>
                                    <Text style={styles.answer_text}>
                                        {item.answer_content}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.praise_container}
                                        onPress={() => this.praise(index)}
                                    >
                                        <Image
                                            resizeMode='stretch'
                                            style={[styles.praise,item.current_user_praise? styles.selected:styles.unselected]}
                                            source={{uri:'dianzan'}}
                                        />
                                        <Text style={styles.praise_point}>{item.answer_praise_point}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                    <View style={styles.to_answer_container}>
                        <TouchableOpacity
                            onPress={this.displayInput}
                        >
                            <ImageBackground
                                style={styles.to_answer_button}
                                imageStyle={{resizeMode: 'stretch'}}
                                source={{uri:'button_orange'}}
                            >
                                <Text style={styles.to_answer_text}>我来回答</Text>
                                <Image
                                    style={styles.to_answer_icon}
                                    source={{uri:'to_answer'}}
                                />
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 30,
    },
    content_container:{
        paddingLeft: 30,
        paddingVertical: 10,
        alignItems: 'flex-start',
        borderRadius: 20,
        elevation: 4,
        backgroundColor: '#FFFFFF',
    },
    question_container:{
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
    },
    question_mark:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 12,
    },
    question_mark_text:{
        fontSize: 14,
    },
    question_icon:{
        width: 20,
        height: 20,
    },
    question_text:{
        flex:5,
        fontWeight: '500',
        fontSize: 14,
        paddingHorizontal: 5,
    },
    bulb_container:{
        flex:2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15,

    },
    bulb:{
        width: 20,
        height: 20,
    },
    answers_container:{
        paddingVertical: 6,
    },
    answer_container:{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 8,
        width: 260,
        alignItems: 'center',
    },
    answer_mark:{
        flex:1,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answer_mark_text:{
        fontSize: 12,
    },
    answer_icon:{
        width: 20,
        height: 20,
    },
    answer_text:{
        paddingHorizontal: 10,
        flex:6,
        fontSize: 13,
    },
    praise_container:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    praise:{
        width: 12,
        height: 12,
    },
    praise_point:{
        paddingHorizontal: 4,
        fontSize: 8,
    },
    unselected:{
        tintColor: '#D3D3D3',
    },
    selected:{
        tintColor: '#FDAF26',
    },
    to_answer_container:{
        width: 240,
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    to_answer_button:{
        width: 110,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    to_answer_icon:{
        width: 20,
        height: 20,
    },
    to_answer_text:{
        paddingTop: 2,
        paddingHorizontal: 5,
        fontSize: 14,
        letterSpacing: 1,
        fontFamily: '字魂95号-手刻宋',
    }
});

export default QuestionCard