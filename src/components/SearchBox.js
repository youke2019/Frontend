import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    ImageBackground,
} from "react-native";
import {  Button } from 'react-native-elements';

class SearchBox extends React.Component {
    state = {
        keyword: ''
    }

    updateKeyword = keyword => {
        this.setState({ keyword });
    };

    render() {
        const {
            onPress = () => {}
        } = this.props

        return (
            <View style={styles.container}>
                <View
                    style={styles.search_container}
                >
                    <ImageBackground
                        style={styles.search_container_background}
                        imageStyle={{resizeMode: 'stretch'}}
                        source={{uri:'search_text'}}
                    >
                        <View style={styles.search_image_container}>
                            <Image
                                style={styles.search_image}
                                source={{uri: 'search'}}
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
                    <Button
                        title='搜索'
                        titleStyle={styles.button_text}
                        type='clear'
                        onPress={() => onPress(this.state.keyword)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:100,
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
    },
    button_text:{
        color: 'black',
        fontSize: 15,
    }
})

export default SearchBox