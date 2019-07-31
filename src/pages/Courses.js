import React from "react";
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text, TouchableWithoutFeedback,
} from "react-native";
import {Button} from "react-native-elements"
import Drawer from '../components/Drawer'
import SearchBox from '../components/SearchBox'
import CourseList from '../components/CourseList'
import axios from "axios";
import {searchCourses} from "../redux/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {return{}}

const mapDispatchToProps = dispatch => {
    return {
        searchCourses: (data) => {
            dispatch(searchCourses(data))
        }
    }
}

class Courses extends React.Component {
    state = {
        filterVisible:false,
        filterList: {
            学分:[],
            通识类型:[],
            上课时间:[],
            开设学院:null,
            上课地点:null,
        },
        firstEnter: true,
        tagList: [{type:'学分',tag:[]},{type:'通识类型',tag:[]},{type:'上课时间',tag:[]},{type:'上课地点',tag:[]},{type:'开设学院',tag:[]}]
    }

    filterNotEmpty = () => {
        if (this.state.filterList['学分'].length > 0)
            return true
        if (this.state.filterList['通识类型'].length > 0)
            return true
        if (this.state.filterList['上课时间'].length > 0)
            return true
        if (this.state.filterList['开设学院'] != null)
            return true
        if (this.state.filterList['上课地点'] != null)
            return true

        return false
    }

    search = (keyword) => {
        const {filterList} = this.state

        if (keyword != '' || this.filterNotEmpty()) {
            let data = {
                course_name:keyword,
                course_credits: [],
                general_types: [],
                weekdays: [],
                building: null,
                dept_name: null,
            }

            this.setState({
                firstEnter: false,
            })

            for (let item of this.state.filterList['学分'])
                data.course_credits.push(item.value)
            if (data.course_credits.length == 0)
                delete data.course_credits

            for (let item of this.state.filterList['通识类型'])
                data.general_types.push(item.value)
            if (data.general_types.length == 0)
                delete data.general_types

            for (let item of this.state.filterList['上课时间'])
                data.weekdays.push(item.value)
            if (data.weekdays.length == 0)
                delete data.weekdays


            if (filterList['开设学院'] == null)
                delete data.dept_name
            else
                data.dept_name = filterList['开设学院'].name

            if (filterList['上课地点'] == null)
                delete data.building
            else
                data.building = filterList['上课地点'].name

            axios.post(baseUrl+'/courses/search',data).then((response) => {
                this.props.searchCourses(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    onFilterReturn = (filterList) => {
        if (Object.getOwnPropertyNames(filterList).length != 0)
        {
            this.setState({
                filterList: filterList,
                filterVisible: false
            })

            let tagList = [{type:'学分',tag:[]},{type:'通识类型',tag:[]},{type:'上课时间',tag:[]},{type:'上课地点',tag:[]},{type:'开设学院',tag:[]}]
            for (let i=0;i<filterList['学分'].length;i++)
                tagList[0].tag.push({
                    index: i,
                    name: filterList['学分'][i].name
                })

            for (let i=0;i<filterList['通识类型'].length;i++)
                tagList[1].tag.push({
                    index: i,
                    name: filterList['通识类型'][i].name
                })

            for (let i=0;i<filterList['上课时间'].length;i++)
                tagList[2].tag.push({
                    index: i,
                    name: filterList['上课时间'][i].name
                })

            if (filterList['上课地点'] != null)
                tagList[3].tag.push({
                    name: filterList['上课地点'].name
                })

            if (filterList['开设学院'] != null)
                tagList[4].tag.push({
                    name: filterList['开设学院'].name
                })

            this.setState({
                tagList : tagList
            })
        } else {
            this.setState({
                filterList: this.state.filterList,
                filterVisible: false
            })
        }

    }

    showFilter = () => {
        this.setState({
            filterVisible:true
        })
    }

    deleteTag = (type,typeIndex,tag) => {
        let filterList = this.state.filterList
        let tagList = this.state.tagList

        if (typeIndex > 2)
            filterList[type] = null
        else {
            for (let i=0;i<filterList[type].length;i++)
                if (filterList[type][i].name == tag.name)
                    filterList[type].splice(i,1)
        }

        for (let i=0;i<tagList[typeIndex].tag.length;i++)
            if (tagList[typeIndex].tag[i].name == tag.name)
                tagList[typeIndex].tag.splice(i,1)

        this.setState({
            filterList: filterList,
            tagList: tagList
        })
    }

    render() {
        const {
            firstEnter,
            filterVisible,
            filterList,
            tagList
        } = this.state

        return (
            <View style={{flex:1}}>
                {
                    firstEnter?
                        <View style={styles.initial_container}>
                            <Image
                                resizeMode='contain'
                                style={styles.logo}
                                source={{uri:'logo'}}
                            />
                            <SearchBox
                                onPress={(keyword) => this.search(keyword)}
                                iconImage = 'search'
                                buttonTitle = '搜索'
                            />
                        </View>
                        :
                        <ImageBackground
                            style={{flex:1}}
                            imageStyle={{resizeMode: 'cover'}}
                            source={{uri:'course_background'}}
                        >
                            <View style={styles.container}>
                                <View style={styles.search_container}>
                                    <View style={{flex:1}}>
                                        <Button
                                            icon={<Image
                                                style={styles.filter}
                                                source={{uri:'filter'}}
                                            />}
                                            containerStyle={styles.button}
                                            titleStyle={styles.text}
                                            onPress={this.showFilter}
                                            type="clear"
                                            title="筛选"
                                        />
                                    </View>
                                    <View style={{flex:5}}>
                                        <SearchBox
                                            onPress={(keyword) => this.search(keyword)}
                                            iconImage = 'search'
                                            buttonTitle = '搜索'
                                        />
                                    </View>
                                </View>
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
                                                                    onPress={()=>this.deleteTag(item.type,index,tag)}
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
                            </View>
                            <CourseList navigation = {this.props.navigation}/>
                            <Drawer
                                visible={filterVisible}
                                onFilterReturn = {this.onFilterReturn}
                                list={filterList}
                            />
                        </ImageBackground>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    initial_container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: 600,
        height: 80,
    },
    container:{
        paddingTop:15,
    },
    search_container:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    button_container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    filter_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filter:{
        height: 15,
        width: 15,
    },
    text:{
        color: 'black',
        fontSize: 14,
    },
    tag_container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag_list:{
        flexDirection: 'row',
        alignItems: 'center',
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
        color: '#ff961e',
        fontSize: 15,
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses)