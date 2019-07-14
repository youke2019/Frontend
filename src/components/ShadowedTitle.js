import React from 'react'
import { Text ,Image} from 'react-native-elements'
import { StyleSheet,View } from 'react-native'

export const ShadowedTitle = (props) =>{
  return (
    <View style = {styles.container}>
      <Text style={styles.titleText}>
        {props.text}
      </Text>
      <Image source = {{uri:"yellow_line"}} style ={styles.background}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height: 35,
  },
  background:{
    width:'auto',
    height:25,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  titleText:{
    fontSize:20,
    fontWeight: '100',
    textAlign: 'left',
    marginLeft:10,
  }
})