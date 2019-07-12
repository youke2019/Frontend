import React from "react";
import {View} from "react-native";
import { SearchBar, Button } from 'react-native-elements';

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
            <View>
                <SearchBar
                    placeholder="请输入课程名"
                    onChangeText={this.updateKeyword}
                    value={this.state.keyword}
                    platform='android'
                />
                <Button
                    title='搜索'
                    type='clear'
                    onPress={() => onPress(this.state.keyword)}
                />
            </View>
        )
    }
}

export default SearchBox