import React,{Component} from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import {Text} from 'react-native-elements'
import PropTypes from 'prop-types'


export default class StackNavBar extends Component{
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  goBack = ()=>{
    this.props.navigation.goBack(null);
  }

  onPress = () => {
    this.props.onPress()
  }

  render () {
    const {
      backIconUri = "navigate_return",
      title = '课程',
      buttonText=null
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
        {
          buttonText != null &&
          <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
          >
            <Text>{buttonText}</Text>
          </TouchableOpacity>
        }
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
    paddingLeft: 8,
    fontSize: 16,
    color: '#000000'
  },
  button:{
    width: 80,
    height: 32,
    marginRight: 10,
    backgroundColor: '#FDAF26',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems:'center',
  }
})