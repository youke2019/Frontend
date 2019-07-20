import React,{Component} from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import PropTypes from 'prop-types'


export default class StackNavBar extends Component{
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  goBack = ()=>{
    console.log("goback");
    this.props.navigation.goBack();
  }
  render () {
    const {backIconUri = "navigate-return"} = this.props;
    return(
      <View style = {styles.container}>
        <TouchableOpacity
          style={{flex:0.7,height:20}}
          activeOpacity={0.3}
          onPress={this.goBack}>
          <Image
            style={styles.backImage}
            source={{uri: backIconUri }}
          />
        </TouchableOpacity>
        <View style = {styles.subNav}>
          <Text style={{flex:1}}> 课程</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    marginTop:35,
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  backImage:{
    width:25,
    height:25,
  },
  subNav:{
    flex:5,
    flexDirection:"row",
    justifyContent: 'center'
  }
})