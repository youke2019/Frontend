import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import {Avatar} from "react-native-elements"
import Rating from './Rating'

class EvaluationCard extends React.Component {
    state = {
        showDetail: false,
        detail: [],
    }

    componentWillMount() {
        let detail = []
        for (let item in this.props.evaluation)
            if (item != 'course_id' && item != 'user_id' && item != 'credit_point')
                detail.push({
                    title: item,
                    content: this.props.evaluation[item]
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
                        <Text>老师人美讲课也耐心，能学到很多乐理知识，强推。老师人美讲课也耐心，能学到很多乐理知识，强推。</Text>
                    </View>
                    <View style={styles.star}>
                        <View style={styles.star_icon_container}>
                            <Text style={styles.star_text}>评分:</Text>
                            <Rating
                                rate={evaluation.credit_point/10}
                            />
                        </View>
                        <Text style={styles.star_number}>{evaluation.credit_point/10}</Text>
                    </View>
                    {
                        showDetail &&
                        <View style={styles.details}>
                            {
                                detail.map((item,index) =>
                                    <View style={styles.detail}>
                                        <View style={styles.detail_title_container}>
                                            <Text style={styles.detail_title}>{item.title}</Text>
                                        </View>
                                        <View style={styles.detail_content_container}>
                                            <Text style={styles.detail_content}>{item.content}老师人美讲课也耐心，能学到很多乐理知识，强推。老师人美讲课也耐心，能学到很多乐理知识，强推。</Text>
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    }
                    <View style={styles.bottom}>
                        <View style={styles.user}>
                            <Avatar
                                size="small"
                                rounded
                                source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                            />
                            <Text style={styles.user_name}>五柳寄书</Text>
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
        height: 100,
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
    }
})

export default EvaluationCard