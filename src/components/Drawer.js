import React from "react";
import {
    Text,
    View
} from "react-native";
import {Overlay, Button} from 'react-native-elements'
import FilterItem from './FilterItem'

class Drawer extends React.Component {
    updateFilter = (filter) => {
        this.props.updateFilter(filter)
    }

    render() {
        const {
            visible = false,
            onBackdropPress=()=>{},
        } = this.props

        return (
            <Overlay
                isVisible={visible}
                onBackdropPress={onBackdropPress}
            >
                <View>
                    <FilterItem
                        title="学分"
                        list={[{name:'1'},{name:'2'},{name:'3'},{name:'4'}]}
                        updateFilter={(filter) => this.updateFilter(filter)}
                    />
                </View>
            </Overlay>
        );
    }
}

export default Drawer