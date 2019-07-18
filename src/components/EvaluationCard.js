import React from "react";
import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity
} from "react-native";
import {Avatar} from "react-native-elements";

class QuestionCard extends React.Component {
    render(){
        const {
            evaluation={

            }
        } = this.props

        return (
            <ImageBackground
                style={styles.background}
                imageStyle={{resizeMode: 'stretch'}}
                source={{uri:'card'}}
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
                            <Image
                                style={styles.star_icon}
                                source={{uri:'star'}}
                            />
                            <Image
                                style={styles.star_icon}
                                source={{uri:'star'}}
                            />
                            <Image
                                style={styles.star_icon}
                                source={{uri:'star'}}
                            />
                            <Image
                                style={styles.star_icon}
                                source={{uri:'star'}}
                            />
                        </View>
                        <Text style={styles.star_number}>8.0</Text>
                    </View>
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
                            style={styles.detail}
                        >
                            <Text>查看详情</Text>
                            <Image
                                style={styles.right_arrow}
                                source={{uri:'right_arrow'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        width: 300,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 10,
        width: 250,
        height: 300,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    header:{
        flex:3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outline:{
        flex: 2,
        paddingHorizontal: 10,
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    star:{
        flex:2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    star_icon_container:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    star_text:{
        paddingRight: 10,
    },
    star_icon:{
        width: 25,
        height: 25,
    },
    star_number:{
        fontSize: 21,
    },
    bottom:{
        flex: 1,
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
    detail:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    right_arrow:{
        width: 15,
        height: 15,
    }
})

export default QuestionCard