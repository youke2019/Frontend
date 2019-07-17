import React from "react";
import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity
} from "react-native";

class QuestionCard extends React.Component {
    state = {
        QandA: this.props.QandA
    }

    useful = () => {
        let tmp_QandA = this.state.QandA
        if (this.state.QandA.praised){
            tmp_QandA.praise_point--
            tmp_QandA.praised = false
            this.setState({
                QandA: tmp_QandA
            })
        } else {
            tmp_QandA.praise_point++
            tmp_QandA.praised = true
            this.setState({
                QandA: tmp_QandA
            })
        }
    }

    praise = (index) => {
        let tmp_QandA = this.state.QandA
        if (this.state.QandA.answers[index].praised){
            tmp_QandA.answers[index].praise_point--
            tmp_QandA.answers[index].praised = false
            this.setState({
                QandA: tmp_QandA
            })
        } else {
            tmp_QandA.answers[index].praise_point++
            tmp_QandA.answers[index].praised = true
            this.setState({
                QandA: tmp_QandA
            })
        }
    }

    render(){
        const {
            QandA = {
                question: '老师上课点名多吗',
                praise_point: 20,
                praised: false,
                answers: [
                    {
                        content: '点的不多',
                        praise_point: 2,
                        praised: false,
                    },
                    {
                        content: '一学期一两次左右啊啊啊啊啊啊啊啊啊啊啊啊啊',
                        praise_point: 10,
                        praised: true,
                    }
                ]
            }
        } = this.state

        return (
            <ImageBackground
                style={styles.container}
                imageStyle={{resizeMode: 'stretch'}}
                source={{uri:'course_card'}}
            >
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
                            {QandA.question}
                        </Text>
                        <TouchableOpacity
                            style={styles.bulb_container}
                            onPress={this.useful}
                        >
                            <Image
                                resizeMode='stretch'
                                style={[styles.bulb,QandA.praised? styles.selected:styles.unselected]}
                                source={{uri:'bulb'}}
                            />
                            <Text style={styles.praise_point}>有用({QandA.praise_point})</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.answers_container}>
                        {
                            QandA.answers.map((item, index) =>
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
                                        {item.content}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.praise_container}
                                        onPress={() => this.praise(index)}
                                    >
                                        <Image
                                            resizeMode='stretch'
                                            style={[styles.praise,item.praised? styles.selected:styles.unselected]}
                                            source={{uri:'dianzan'}}
                                        />
                                        <Text style={styles.praise_point}>{item.praise_point}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                    <View style={styles.to_answer_container}>
                        <TouchableOpacity>
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
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    content_container:{
        paddingLeft: 27,
        paddingVertical: 30,
        alignItems: 'flex-start',
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
        fontSize: 14
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
        paddingVertical: 8,
    },
    answer_container:{
        flexDirection: 'row',
        paddingVertical: 8,
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