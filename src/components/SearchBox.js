import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
} from "react-native";

class SearchBox extends React.Component {
    state = {
        keyword: ''
    }

    updateKeyword = keyword => {
        this.setState({ keyword });
    };

    render() {
        const {
            onPress = () => {},
            iconImage = '',
            inputImage = 'search_text',
            buttonTitle = '',
            containerStyle={},
            buttonStyle = {},
        } = this.props

        return (
            <View
                style={[styles.container,containerStyle]}
            >
                <View
                    style={styles.search_container}
                >
                    <ImageBackground
                        style={styles.search_container_background}
                        imageStyle={{resizeMode: 'stretch'}}
                        source={{uri:inputImage}}
                    >
                        <View style={styles.search_image_container}>
                            <Image
                                style={styles.search_image}
                                source={{uri: iconImage}}
                            />
                        </View>
                        <TextInput
                            style={styles.search_text}
                            onChangeText={this.updateKeyword}
                            value={this.state.keyword}
                        />
                    </ImageBackground>
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity
                        onPress={() => onPress(this.state.keyword)}
                        style={[styles.button,buttonStyle]}
                    >
                        <Text style={styles.button_text}>{buttonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_container:{
        height:50,
        flex:7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_container_background:{
        height: 32,
        flexDirection: 'row',
    },
    search_image_container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_image:{
        height: 14,
        width: 14,
    },
    search_text:{
        flex:6,
        fontSize: 15,
        padding: 2,
    },
    button_container:{
        flex: 2,
        padding: 10,
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_text:{
        color: 'black',
        fontSize: 15,
        fontFamily: '字魂95号-手刻宋',
        lineHeight: 20,
    }
})

export default SearchBox