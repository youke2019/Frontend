import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from "react-native";

class ListItem extends React.Component {
    render(){
        const {
            text= '',
            image= '',
            onPress= () => {},
        } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.text_container}>
                    <Image
                        style={styles.text_image}
                        source={{uri:image}}
                    />
                    <Text style={styles.text}>{text}</Text>
                </View>
                <TouchableOpacity
                    style={styles.arrow_container}
                    onPress={onPress}
                >
                    <Image
                        source={{uri:'right_arrow'}}
                        style={styles.arrow_image}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 8
    },
    text_container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    text_image:{
        width:22,
        height:22,
    },
    text:{
        paddingHorizontal:8,
        fontSize: 16,
    },
    arrow_container:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrow_image:{
        width:20,
        height:20,
    },
    divider:{
        height:1
    },
})

export default ListItem