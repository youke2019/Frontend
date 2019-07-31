import React from 'react'
import { Text ,Image} from 'react-native-elements'
import { StyleSheet,View } from 'react-native'

export const ShadowedTitle = (props) =>{
  return (
    <View style = {styles.title_container}>
      <Image source={{uri:props.uri}} style={{height:20,width:20,resizeMode: 'contain'}}/>
      <View style = {styles.container}>
        <Image source = {{uri:"yellow_line"}} style ={styles.background}/>
        <Text style={styles.titleText}>
          {props.text}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title_container:{
    marginVertical: 5,
    marginHorizontal: 20,
    justifyContent:'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container:{
  },
  background:{
    width: 40,
    height: 10,
    position: 'absolute',
    left: 8,
    top: 12,
  },
  titleText:{
    lineHeight:25,
    fontSize:18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft:10,
    maxWidth:250,
  }
})