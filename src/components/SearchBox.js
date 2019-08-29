import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";

class SearchBox extends React.Component {
    state = {
        keyword: this.props.keyword
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            keyword: nextProps.keyword
        })
    }

    updateKeyword = keyword => {
        this.setState({ keyword });
    };

    render() {
        const {
            onPress = () => {},
            textChange = () => {},
            iconImage = '',
            buttonTitle = '',
            containerStyle={},
            buttonStyle = {},
            color = 'white',
            border = true
        } = this.props

        return (
            <View
                style={[styles.container,containerStyle]}
            >
                <View style={[styles.search_container_background,{backgroundColor:color,borderWidth:border?1:null}]}>
                    <View style={styles.search_image_container}>
                        <Image
                            style={styles.search_image}
                            source={{uri: iconImage}}
                        />
                    </View>
                    <TextInput
                        style={styles.search_text}
                        onChangeText={(keyword) => {
                            textChange(keyword)
                            this.updateKeyword(keyword)}}
                        value={this.state.keyword}
                    />
                </View>
                {
                    buttonTitle ?
                        <View style={styles.button_container}>
                            <TouchableOpacity
                                onPress={() => onPress(this.state.keyword)}
                                style={[styles.button,buttonStyle]}
                            >
                                <Text style={styles.button_text}>{buttonTitle}</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    round:{
        backgroundColor: '#FDD32A',
        borderRadius: 20,
    },
    container:{
        height:80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_container_background:{
        flex:7,
        marginHorizontal: 12,
        height: 40,
        flexDirection: 'row',
        borderRadius: 20,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_image_container:{
        flex:1,
        paddingLeft: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_image:{
        height: 16,
        width: 16,
    },
    search_text:{
        flex:6,
        fontSize: 15,
        padding: 2,
    },
    button_container:{
        flex: 2,
        padding: 6,
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_text:{
        color: 'black',
        fontSize: 18,
        fontFamily: '字魂95号-手刻宋',
    }
})

export default SearchBox