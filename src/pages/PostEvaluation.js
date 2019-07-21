import React from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
} from "react-native";
import Rating from '../components/Rating'

class PostEvaluation extends React.Component {
    render() {
        return (
            <ScrollView style={{ flex: 1}}>
                <View style={{padding:40}}>
                    <Rating
                        selected={true}
                    />
                </View>
                <View style={styles.card_container}>
                    <Text style={{color: 'black'}}>课程简述</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            placeholder={"输入内容"}
                            multiline={true}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.card_container}>
                    <Text style={{color: 'black'}}>考核形式</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            placeholder={"输入内容"}
                            multiline={true}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.card_container}>
                    <Text style={{color: 'black'}}>上课自由程度</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            placeholder={"输入内容"}
                            multiline={true}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.card_container}>
                    <Text style={{color: 'black'}}>课程个人体验</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            placeholder={"输入内容"}
                            multiline={true}
                            style={styles.input}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card_container:{
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    input_container:{

    },
    input:{
        padding:10,
    }
})

export default PostEvaluation