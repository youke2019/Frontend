import React from "react";
import {
    Text,
    View
} from "react-native";
import {Overlay, Button} from 'react-native-elements'
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
                {name:'社会学科',value:'社会学科'},
                {name:'自然学科',value:'自然学科'},
                {name:'工程科学与技术',value:'工程科学与技术'},
            ]
        }
    }

    updateFilter = (filter) => {
        this.props.updateFilter(filter)
    }

    render() {
        const {
            visible = false,
            onBackdropPress=()=>{},
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
                </View>
            </Overlay>
        );
    }
}

export default Drawer