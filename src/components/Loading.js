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
                            color="yellow"
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
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 100,
        width: 100
    },
    text: {
        textAlign: 'center',
    }
});

export default Loading