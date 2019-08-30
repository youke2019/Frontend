import React from "react";
import {
    View,
    Text,
    SectionList,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity, TouchableWithoutFeedback,
} from "react-native";
import {Button, Divider} from 'react-native-elements';
import Detail from "../pages/Detail";

class CourseList extends React.Component {
    state = {
        tagList: this.props.tagList
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            tagList: nextProps.tagList
        })
    }

    onClick = (item) => {
      this.props.navigation.navigate('Detail', {
        course_id: item.course_id
      })
    }

    render() {
        const {tagList=[]} = this.state
        const {deleteTag = () => {}} = this.props
        return (
            <View style={styles.container}>
                {
                    this.props.course_list.length > 0?
                        <SectionList
                            sections={[{title: 'courseList', data:this.props.course_list}]}
                            renderSectionHeader={() =>
                                <View style={styles.tag_container}>
                                    {
                                        tagList.map((item,index) => {
                                            return (
                                                <View style={styles.tag_list} key={index}>
                                                    {
                                                        item.tag.length > 0 ?
                                                            <Text style={styles.tag_type_text}>{item.type}:</Text>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        item.tag.map((tag) => {
                                                            return (
                                                                <Button
                                                                    key={tag.name}
                                                                    title={tag.name}
                                                                    type="clear"
                                                                    onPress={()=>deleteTag(item.type,index,tag)}
                                                                    icon={<Image source={{uri:'cancel'}} style={{width:16,height:16}}/>}
                                                                    iconRight={true}
                                                                    containerStyle={styles.tag_button_container}
                                                                    buttonStyle={styles.tag_button}
                                                                    titleStyle={styles.tag_title}
                                                                    TouchableComponent={TouchableWithoutFeedback}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            }
                            renderItem={({item}) =>
                                <ImageBackground
                                    style={styles.card_container}
                                    imageStyle={{resizeMode: 'stretch'}}
                                    source={{uri:'course_card'}}
                                >
                                    <View style={styles.card}>
                                        <View style={styles.header}>
                                            <Text style={styles.title}>{item.course_name}</Text>
                                            <TouchableOpacity
                                                style={styles.detail}
                                                onPress = {() => this.onClick(item)}
                                            >
                                                <View style={styles.detail_text_container}>
                                                    <Text style={styles.detail_text}>详情查看</Text>
                                                </View>
                                                <Image
                                                    style={styles.detail_enter_arrow}
                                                    source={{uri:'right_arrow'}}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Divider style={styles.divider} />
                                        <View style={styles.content}>
                                            <View>
                                                <Image
                                                    style={styles.course_image}
                                                    source={{uri:'course'}}
                                                />
                                            </View>
                                            <View style={{ justifyContent: 'space-evenly'}}>
                                                <View style={styles.course_info}>
                                                    <Image
                                                        style={styles.icon}
                                                        source={{uri:'course_id_search'}}
                                                    />
                                                    <Text>课程编号：{item.course_id}</Text>
                                                </View>
                                                <View style={styles.course_info}>
                                                    <Image
                                                        style={styles.icon}
                                                        source={{uri:'course_credit'}}
                                                        source={{uri:'course_credit'}}
                                                    />
                                                    <Text>学分：{item.course_credits}</Text>
                                                </View>
                                                <View style={styles.course_info}>
                                                    <Image
                                                        style={styles.icon}
                                                        source={{uri:'general'}}
                                                    />
                                                    <Text>是否通识：{item.general?'是':'否'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            }
                            keyExtractor={(item) => item.course_id.toString()}
                        />
                        :
                        <View>
                            <View style={styles.tag_container}>
                                {
                                    tagList.map((item,index) => {
                                        return (
                                            <View style={styles.tag_list} key={index}>
                                                {
                                                    item.tag.length > 0 ?
                                                        <Text style={styles.tag_type_text}>{item.type}:</Text>
                                                        :
                                                        null
                                                }
                                                {
                                                    item.tag.map((tag) => {
                                                        return (
                                                            <Button
                                                                key={tag.name}
                                                                title={tag.name}
                                                                type="clear"
                                                                onPress={()=>deleteTag(item.type,index,tag)}
                                                                icon={<Image source={{uri:'cancel'}} style={{width:16,height:16}}/>}
                                                                iconRight={true}
                                                                containerStyle={styles.tag_button_container}
                                                                buttonStyle={styles.tag_button}
                                                                titleStyle={styles.tag_title}
                                                                TouchableComponent={TouchableWithoutFeedback}
                                                            />
                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={styles.empty_container}>
                                <Image
                                    source={{uri:'empty'}}
                                    style={styles.icon}
                                />
                                <Text>没有找到您要的课，请重新搜索</Text>
                            </View>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    card_container:{
        height:200,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card:{
        width: 300,
        height: 160,
        paddingHorizontal: 15,
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title:{
        flex:3,
        fontSize: 18,
        paddingHorizontal:10,
        color: 'black',
        fontFamily: '字魂95号-手刻宋',
    },
    detail:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    detail_text_container:{
        justifyContent: 'center',
        alignItems:'flex-end'
    },
    detail_text:{
        fontSize: 12,
    },
    detail_enter_arrow:{
        width:17,
        height:17,
    },
    divider:{
        height: 1,
        backgroundColor: '#DCDCDC'
    },
    content:{
        flex: 3,
        flexDirection: 'row',
        padding:12,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    course_image:{
        width:80,
        height:80,
    },
    course_info:{
        flex:1,
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    icon:{
        width:24,
        height:24,
        margin: 6,
    },
    empty_container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 240,
    },
    tag_container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    tag_list:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    tag_type_text:{
        paddingHorizontal: 5,
    },
    tag_button_container:{
        padding:5,
    },
    tag_button:{
        borderColor: '#FDAF26',
        borderWidth: 1,
        borderRadius: 30,
        padding: 5,
    },
    tag_title:{
        color: '#FF9611',
        fontSize: 15,
    },
})

export default CourseList