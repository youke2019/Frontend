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
        text: null
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
            hint='暂时测试阿萨封闭哈大半个 i 沙登伯格 i 吧发吧额本菲卡比较法 i',
            navigation
        } = this.props
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
                    />
                    <Divider style={styles.divider}/>
                </View>
                <Text style={styles.hint}>{hint}</Text>
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