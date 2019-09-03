import React from "react";
import {
    Image, StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import StackNavBar from "../components/StackNavBar";
import {Divider} from "react-native-elements";

class Edit extends React.Component {
    static navigationOptions =  () => ({
        header: null
    })

    state = {
        text: this.props.navigation.state.params.placeholder,
        returnText: this.props.navigation.state.params.returnText,
        title: this.props.navigation.state.params.title
    }

    onChangeText = (text) => {
        this.setState({
            text: text
        })
    }
    onConfirm = () => {
        this.props.navigation.state.params.onConfirm(this.state.text)
        this.props.navigation.goBack()
    }
    render() {
        const {
            navigation,
        } = this.props

        const {
            text,
            returnText = '保存',
            title = '修改'
        } = this.state
        return (
            <View style={styles.container}>
                <StackNavBar
                    navigation={navigation}
                    title={title}
                    buttonText={returnText}
                    onPress={this.onConfirm}
                />
                <View style={styles.input_container}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        onChangeText={this.onChangeText}
                        value={text}
                    />
                    <Divider style={styles.divider}/>
                </View>
                <Text style={styles.hint}>{navigation.state.params.hint}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    input_container:{
        margin:10,
    },
    input:{
        fontSize: 16,
    },
    divider:{
        backgroundColor: '#FDAF26',
        height: 0.5
    },
    hint:{
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
})

export default Edit