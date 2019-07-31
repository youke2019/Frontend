import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import {Button} from 'react-native-elements'

class FilterItem extends React.Component {
    state = {
        fold: false,
        list: this.props.list
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            list: nextProps.list
        })
    }

    changeFoldState = () => {
        this.setState({
            fold: !this.state.fold
        })
    }

    changeSelectState = (name) => {
        let list = this.state.list
        let filter = {}

        if (this.props.single) {
            for (let item of list)
                if (item.name == name){
                    if (item.selected) {
                        item.selected = false
                        filter[this.props.title] = null
                    }
                    else {
                        item.selected = true
                        filter[this.props.title] = item
                    }
                } else
                    item.selected = false
        } else {
            for (let item of list)
                if (item.name == name)
                    item.selected = !item.selected

            filter[this.props.title] = []
            for (let item of list)
                if (item.selected)
                    filter[this.props.title].push(item)
        }

        this.setState({
            list: list
        })

        this.props.updateFilter(filter)
    }

    render() {
        const {title} = this.props
        const {list,fold} = this.state

        return (
            <View>
                <View style={styles.title_container}>
                    <Text style={{flex: 8, fontSize: 16}}>{title}</Text>
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
                                    icon={ item.selected?
                                        <Image source={{uri:'cancel'}} style={{width:16,height:16}}/>
                                        : null}
                                    iconRight={true}
                                    buttonStyle={item.selected?styles.button_selected:styles.button_unselected}
                                    titleStyle={item.selected?styles.text_selected:styles.text_unselected}
                                    TouchableComponent={TouchableWithoutFeedback}
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
        alignItems: 'center',
        padding: 8,
    },
    arrow:{
        width:21,
        height:21,
    },
    button_selected:{
        borderColor: '#FDAF26',
        borderWidth: 1,
        borderRadius: 30,
    },
    button_unselected:{
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 30,
    },
    text_selected:{
        color: '#ff961e',
        fontSize: 15,
        padding: 8,
    },
    text_unselected:{
        color: 'black',
        fontSize: 15,
        padding: 8,
    }
})

export default FilterItem