import React from "react";
import {View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';


class SearchBox extends React.Component {
    render() {
        return (
            <View>
                <Input
                    placeholder="请输入课程名"
                    leftIcon={<Icon
                        name='search'
                        size={20}
                        color='orange'
                    />}
                />
                <Button
                    title='搜索'
                    type='clear'
                />
            </View>
        )
    }
}

export default SearchBox