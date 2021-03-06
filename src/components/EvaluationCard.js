import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import Rating from './Rating'
import {UserIdText} from '../components/UserIdText'
import {UserAvatarImg} from "./UserAvatarImg";

class EvaluationCard extends React.Component {
    state = {
        showDetail: false,
        detail: [],
    }

    componentWillMount() {
        let detail = []
        for (let item in this.props.evaluation.evaluate_content)
            if (item != 'course_id' && item != 'user_id' && item != 'evaluate_point' && item != '课程简述' && item != 'evaluate_id')
                detail.push({
                    title: item,
                    content: this.props.evaluation.evaluate_content[item]
                })
        this.setState({
            detail: detail
        })
    }

    switchDetailState = () => {
        this.props.onDetail()
        this.setState({
            showDetail: !this.state.showDetail
        })
    }

    render(){
        const {
            evaluation={}
        } = this.props

        const {
            detail,
            showDetail,
        } = this.state

        console.log(evaluation)
        return (
            <View
                style={styles.background}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.header}
                        source={{uri:'uber'}}
                        resizeMode='cover'
                    >
                    </Image>
                    <View style={styles.outline}>
                        <Text>授课教师: {evaluation.evaluate_content.授课教师}</Text>
                    </View>
                    <View style={styles.star}>
                        <View style={styles.star_icon_container}>
                            <Text style={styles.star_text}>评分:</Text>
                            <Rating
                                rate={evaluation.evaluate_content.evaluate_point}
                            />
                        </View>
                        <Text style={styles.star_number}>{evaluation.evaluate_content.evaluate_point}</Text>
                    </View>
                    {
                        showDetail &&
                        <View style={styles.details}>
                            {
                                detail.map((item,index) =>
                                    <View
                                        style={styles.detail}
                                        key={index}
                                    >
                                        <View style={styles.detail_title_container}>
                                            <Text style={styles.detail_title}>{item.title}</Text>
                                        </View>
                                        <View style={styles.detail_content_container}>
                                            <Text style={styles.detail_content}>{item.content}</Text>
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    }
                    <View style={styles.bottom}>
                        <View style={styles.user}>
                            <UserAvatarImg
                                style={styles.avatar}
                                img_style={styles.avatar_img}
                                user_id={evaluation.user_id}
                            />
                            <UserIdText
                                style={styles.user_name}
                                user_id={evaluation.user_id}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={this.switchDetailState}
                            style={styles.showDetail}
                        >
                            <Text>查看详情</Text>
                            <Image
                                style={styles.arrow}
                                source={{uri: showDetail? 'arrow_up':'arrow_down'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: '#FFFFFF',
        flex:1,
        width: 300,
        borderRadius: 20,
        elevation:1,
    },
    container: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    header:{
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outline:{
        height: 80,
        paddingHorizontal: 10,
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    star:{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    star_icon_container:{
        flex:7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    star_text:{
        paddingRight: 10,
    },
    star_number:{
        flex:2,
        textAlign: 'right',
        fontSize: 21,
    },
    details:{
    },
    detail:{
        padding: 15,
        flex:1,
    },
    detail_title_container:{},
    detail_title:{
        fontSize: 15,
        fontWeight: '500'
    },
    detail_content_container:{
        padding: 8,
    },
    detail_content:{
    },
    bottom:{
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    user:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    user_name:{
        paddingLeft: 5,
    },
    showDetail:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow:{
        width: 15,
        height: 15,
    },
    avatar: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    avatar_img: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
})

export default EvaluationCard