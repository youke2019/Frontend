import React from "react";
import {Image, Text, View} from "react-native";

class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Image source={{uri: 'search'}} style={{width: 40, height: 40}} />
            </View>
        );
    }
}

export default Home