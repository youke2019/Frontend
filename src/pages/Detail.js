import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


var MOCKED_MAIN_DATA = [
    {
        title: "Yoke - 有课",
        postil: "——上海交通大学课程分享平台",
        posters: { thumbnail: "http://hbimg.huabanimg.com/1e48ede3e705fb1f8db05ac1b760cd6d30a307962e522-5JU1eS_fw658" },
        user:{name,level}
    }
];

export default class Detail extends Component {
    render() {
        var main = MOCKED_MAIN_DATA[0];
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>{main.title}</Text>
            <Text style={styles.instructions}>{main.postil}</Text>
            <View>
            <Image source = {{ uri = main.posters.thumbnail }} style = {styles.image}/>
        <View>
        <Text style={styles.instructions}>{main.user.name}</Text>
            <Text style={styles.instructions}>{main.user.level}</Text>
            </View>

            </View>
            <View>
            <Text>


            </View>
            <View style={styles.navbar}>
            <TouchableOpacity
        style={styles.button}
        onPress ={()=>{alert("主页")}}
    >
    <Text style = {styles.instructions}>主页</Text>
            </TouchableOpacity>
            <TouchableOpacity
        style={styles.button}
        onPress ={()=>{alert("课程库")}}
    >
    <Text style = {styles.instructions}>课程库</Text>
            </TouchableOpacity>
            <TouchableOpacity
        style={styles.button}
        onPress ={()=>{alert("课程表")}}
    >
    <Text style = {styles.instructions}>课程表</Text>
            </TouchableOpacity>
            <TouchableOpacity
        style={styles.button}
        onPress ={()=>{alert("精彩瞬间")}}
    >
    <Text style = {styles.instructions}>精彩瞬间</Text>
            </TouchableOpacity>
            <TouchableOpacity
        style={styles.button}
        onPress ={()=>{alert("我的")}}
    >
    <Text style = {styles.instructions}>我的</Text>
            </TouchableOpacity>
            </View>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        marginBottom: 5,
    },
    image:{
        width:70,
        height:70,
        resizeMode:contain,
        blurRadius:30,
        borderWidth: 1,
        borderColor:'Black'
    },
    navbar:{
        position:'absolute',
        buttom:0,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    button:{
        height:40,
        width:100,
        borderRadius:20,
        justifyContent:'center.',
        overflow:'hidden'
    }
});
