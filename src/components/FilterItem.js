import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import {Button} from 'react-native-elements'

class FilterItem extends React.Component {
    state = {
        fold: true,
        list: this.props.list
    }

    componentDidMount() {
        for (let item of this.state.list) {
            item['selected'] = false
        }
    }

    changeFoldState = () => {
        this.setState({
            fold: !this.state.fold
        })
    }

    changeSelectState = (name) => {
        for (let item of this.state.list)
            if (item.name == name){
                item.selected = !item.selected
                this.setState({
                    list: this.state.list
                })
            }

        let filter = {}
        filter[this.props.title] = []
        for (let item of this.state.list)
            if (item.selected == true)
                filter[this.props.title].push(item.value)

        this.props.updateFilter(filter)
    }

    render() {
        const {title} = this.props
        const {list,fold} = this.state

        return (
            <View>
                <View style={styles.title_container}>
                    <Text style={{flex: 8}}>{title}</Text>
                    <TouchableOpacity
                        style={{flex:1}}
                        onPress={this.changeFoldState}>
                        <Image
                            style={styles.arrow}
                            source={{uri: fold? 'arrow_up' : 'arrow_down' }}
                        />
                    </TouchableOpacity>
                </View>
                {
                    fold &&
                    <View  style={styles.button_container}>
                        {list.map((item) =>
                            <View
                                key={item.name}
                                style={styles.button_wrap}
                            >
                                <Button
                                    title={item.name}
                                    raised={item.selected? true:false}
                                    type="clear"
                                    onPress={()=>this.changeSelectState(item.name)}
                                    buttonStyle={item.selected?styles.button_selected:styles.button_unselected}
                                    titleStyle={item.selected?styles.text_selected:styles.text_unselected}
                                />
                            </View>
                        )}
                    </View>
                }
            </View>
        );
    }
}

const styles=StyleSheet.create({
    button_container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        display:'flex',
    },
    button_wrap:{
        padding: 6
    },
    title_container:{
        flexDirection: 'row',
    },
    arrow:{
        width:30,
        height:30,
    },
    button_selected:{
        backgroundColor: '#ffe8d9',
    },
    button_unselected:{
        backgroundColor: '#F8F8FF',
    },
    text_selected:{
        color: '#ff961e',
        fontSize: 15
    },
    text_unselected:{
        color: 'black',
        fontSize: 15,
    }
})

export default FilterItem