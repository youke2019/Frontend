import React,{Component} from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import PropTypes from 'prop-types'


export default class StackNavBar extends Component{
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  goBack = ()=>{
    console.log(this.props.navigation)
    this.props.navigation.goBack();
  }
  render () {
    const {
      backIconUri = "navigate_return",
      title = '课程'
    } = this.props;
    return(
      <View style = {styles.container}>
        <TouchableOpacity
          style={styles.back}
          activeOpacity={0.3}
          onPress={this.goBack}>
          <Image
            style={styles.backImage}
            source={{uri: backIconUri }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <View style = {styles.subNav}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    marginTop: 24,
    marginLeft: 10,
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  back:{
    flex:1,
    paddingHorizontal: 6,
    height:'100%',
    justifyContent: 'center',
    alignItems:'center',
  },
  backImage:{
    width:20,
    height:20,
  },
  subNav:{
    flex:10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  title:{
    fontSize: 15,
    color: '#000000'
  }
})