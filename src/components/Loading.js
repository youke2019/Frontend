import React from "react";
import {
    ActivityIndicator,
    Modal,
    Text,
    StyleSheet,
    View,
} from "react-native";

class Loading extends React.Component {
    render(){
        const {visible = true} = this.props;
        return (
            <Modal
                visible={visible}
                transparent={true}
            >
                <View style={styles.center}>
                    <View style={styles.box}>
                        <ActivityIndicator
                            size="large"
                            color="white"
                        />
                        <Text style={styles.text}>加载中</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        opacity: 0.6,
        height: 100,
        width: 100
    },
    text: {
        padding: 6,
        color: 'white',
        textAlign: 'center',
    }
});

export default Loading