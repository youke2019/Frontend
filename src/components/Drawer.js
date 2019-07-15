import React from "react";
import { View } from "react-native";
import {Overlay} from 'react-native-elements'
import FilterItem from './FilterItem'

class Drawer extends React.Component {
    state = {
        list:{
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
            ]
        }
    }

    updateFilter = (filter) => {
        this.props.updateFilter(filter)
    }

    render() {
        const {
            visible = false,
            onBackdropPress=() => {},
        } = this.props

        const {list} = this.state

        return (
            <Overlay
                isVisible={visible}
                onBackdropPress={onBackdropPress}
            >
                <View>
                    <FilterItem
                        title="学分"
                        list={list.credits}
                        updateFilter={(filter) => this.updateFilter(filter)}
                    />
                    <FilterItem
                        title="通识类型"
                        list={list.general}
                        updateFilter={(filter) => this.updateFilter(filter)}
                    />
                    <FilterItem
                        title="上课时间"
                        list={list.time}
                        updateFilter={(filter) => this.updateFilter(filter)}
                    />
                </View>
            </Overlay>
        );
    }
}

export default Drawer