import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView
} from "react-native";
import Modal from 'react-native-modal'
import FilterItem from './FilterItem'

const LIST = {
    credits:[
        {name:'1',value:'1'},
        {name:'2',value:'2'},
        {name:'3',value:'3'},
        {name:'4',value:'4'},
    ],
    general:[
        {name:'人文学科',value:'人文学科'},
        {name:'社会科学',value:'社会科学'},
        {name:'自然科学',value:'自然科学'},
        {name:'工程科学与技术',value:'工程科学与技术'},
    ],
    time:[
        {name:'周一',value:1},
        {name:'周二',value:2},
        {name:'周三',value:3},
        {name:'周四',value:4},
        {name:'周五',value:5},
        {name:'周六',value:6},
        {name:'周日',value:7},
    ],
    department:[
        {name:'农业与生物学院', value:'农业与生物学院'},
        {name:'设计学院', value:'设计学院'},
        {name:'安泰经济与管理学院', value:'安泰经济与管理学院'},
        {name:'媒体与传播学院', value:'媒体与传播学院'},
        {name:'机械与动力工程学院', value:'机械与动力工程学院'},
        {name:'学生创新中心', value:'学生创新中心'},
        {name:'图书馆', value:'图书馆'},
        {name:'船舶海洋与建筑工程学院', value:'船舶海洋与建筑工程学院'},
        {name:'体育系', value:'体育系'},
        {name:'人文学院', value:'人文学院'},
        {name:'物理与天文学院', value:'物理与天文学院'},
        {name:'电子信息与电气工程学院', value:'电子信息与电气工程学院'},
        {name:'航空航天学院', value:'航空航天学院'},
        {name:'生命科学技术学院', value:'生命科学技术学院'},
        {name:'生物医学工程学院', value:'生物医学工程学院'},
        {name:'致远学院', value:'致远学院'},
        {name:'药学院', value:'药学院'},
        {name:'校医院', value:'校医院'},
        {name:'医学院', value:'医学院'},
        {name:'外国语学院', value:'外国语学院'},
        {name:'上海中医药大学', value:'上海中医药大学'},
        {name:'医学院(原二医大)', value:'医学院(原二医大)'},
        {name:'数学科学学院', value:'数学科学学院'},
        {name:'材料科学与工程学院', value:'材料科学与工程学院'},
        {name:'巴黎高科卓越工程师学院', value:'巴黎高科卓越工程师学院'},
        {name:'化学化工学院', value:'化学化工学院'},
        {name:'国际与公共事务学院', value:'国际与公共事务学院'},
        {name:'环境科学与工程学院', value:'环境科学与工程学院'},
        {name:'凯原法学院', value:'凯原法学院'},
        {name:'教务处', value:'教务处'},
        {name:'马克思主义学院', value:'马克思主义学院'},
        {name:'国际教育学院', value:'国际教育学院'},
        {name:'网络信息中心', value:'网络信息中心'},
        {name:'科学史与科学文化研究院', value:'科学史与科学文化研究院'},
        {name:'电子工程系', value:'电子工程系'},
        {name:'人文艺术研究院', value:'人文艺术研究院'},
        {name:'学指委、团委(含学生处、人武部)', value:'学指委、团委(含学生处、人武部)'},
        {name:'海洋研究院', value:'海洋研究院'},
        {name:'分析测试中心', value:'分析测试中心'},
        {name:'医学院（并校前）', value:'医学院（并校前）'},
        {name:'软件学院', value:'软件学院'},
        {name:'军事教研室', value:'军事教研室'},
        {name:'总装备部驻交大选培办', value:'总装备部驻交大选培办'},
        {name:'密西根学院', value:'密西根学院'},
    ],
    building:[
        {name:'上院', value:'上院'},
        {name:'中院', value:'中院'},
        {name:'下院', value:'下院'},
        {name:'东上院', value:'东上院'},
        {name:'东中院', value:'东中院'},
        {name:'东下院', value:'东下院'},
    ]
}

class Drawer extends React.Component {
    state = {
        list: LIST,
        filterList: this.props.list,
    }

    componentWillMount() {
        let list = this.state.list
        for (let entry in list) {
            for (let item of list[entry]){
                item['selected'] = false
            }
        }

        this.setState({
            list: list
        })
    }

    flush = () => {
        this.setState({
            filterList: this.props.list
        })

        let list = this.state.list
        for (let item of list['credits']) {
            item.selected = false
            for (let new_item of this.props.list['学分'])
                if (item.value == new_item.value){
                    item.selected = true
                    break
                }
        }

        for (let item of list['general']){
            item.selected = false
            for (let new_item of this.props.list['通识类型'])
                if (item.value == new_item.value){
                    item.selected = true
                    break
                }
        }

        for (let item of list['time']){
            item.selected = false
            for (let new_item of this.props.list['上课时间'])
                if (item.value == new_item.value){
                    item.selected = true
                    break
                }
        }

        for (let item of list['building'])
            if (this.props.list['上课地点'] != null && item.value == this.props.list['上课地点'].value){
                item.selected = true
            } else item.selected = false


        for (let item of list['department'])
            if (this.props.list['开设学院'] != null && item.value == this.props.list['开设学院'].value){
                item.selected = true
            } else item.selected = false

        this.setState({
            list: list
        })
    }

    onConfirm = () => {
        this.props.onFilterReturn(this.state.filterList)
    }

    onCancel = () => {
        this.props.onFilterReturn({})
    }

    updateFilter = (filter) => {
        this.setState({
            filterList: Object.assign({}, this.state.filterList, filter),
        })
    }

    render() {
        const {
            visible = false,
        } = this.props

        const {
            list,
        } = this.state

        return (
            <Modal
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                isVisible={visible}
                onBackdropPress={this.onCancel}
                coverScreen={false}
                animationInTiming={400}
                animationOutTiming={500}
                backdropTransitionOutTiming={0}
                backdropOpacity={0.4}
                onModalShow={this.flush}
            >
                <View style={styles.container}>
                    <ScrollView style={styles.filter_item_container}>
                        <FilterItem
                            title="学分"
                            list={list.credits}
                            updateFilter={this.updateFilter}
                        />
                        <FilterItem
                            title="通识类型"
                            list={list.general}
                            updateFilter={this.updateFilter}
                        />
                        <FilterItem
                            title="上课时间"
                            list={list.time}
                            updateFilter={this.updateFilter}
                        />
                        <FilterItem
                            title="上课地点"
                            list={list.building}
                            updateFilter={this.updateFilter}
                            single={true}
                        />
                        <FilterItem
                            title="开设学院"
                            list={list.department}
                            updateFilter={this.updateFilter}
                            single={true}
                        />
                    </ScrollView>
                    <View style={styles.button_container}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onConfirm}
                        >
                            <Text>确定</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onCancel}
                        >
                            <Text>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height: 400,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    filter_item_container:{

    },
    button_container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button:{
        backgroundColor: '#FDD32A',
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 18,
        marginBottom: 5,
        marginHorizontal: 6,
    }
})

export default Drawer