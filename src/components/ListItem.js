import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import {Divider} from "react-native-elements";

class ListItem extends React.Component {
    render(){
        const {
            text= '',
            image= '',
            onPress= () => {},
        } = this.props

        return (
            <View>
                <TouchableOpacity
                    style={styles.container}
                    onPress={onPress}
                >
                    <View style={styles.text_container}>
                        <Image
                            style={styles.text_image}
                            source={{uri:image}}
                            resizeMode='contain'
                        />
                        <Text style={styles.text}>{text}</Text>
                    </View>
                    <View
                        style={styles.arrow_container}
                    >
                        <Image
                            source={{uri:'right_arrow'}}
                            style={styles.arrow_image}
                        />
                    </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
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
        width:21,
        height:21,
    },
    text:{
        paddingHorizontal:20,
        fontSize: 17,
        color: '#000000'
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
        height:1,
        backgroundColor: '#F5F5F5',
    },
})

export default ListItem