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
        text: this.props.navigation.state.params.user.nickname
    }

    onChangeText = (text) => {
        this.setState({
            text: text
        })
    }

    onComfirm = () => {
        this.props.navigation.state.params.onComfirm(this.state.text)
        this.props.navigation.goBack()
    }

    render() {
        const {
            navigation
        } = this.props

        const {
            text
        } = this.state
        return (
            <View style={styles.container}>
                <StackNavBar
                    navigation={navigation}
                    title={'修改'}
                    buttonText={'保存'}
                    onPress={this.onComfirm}
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