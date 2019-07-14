import React from 'react'
import { Text ,Image} from 'react-native-elements'
import { StyleSheet,View } from 'react-native'

export const UnshadowedTitle = (props) =>{
  return (
    <View style = {styles.container}>
      <Image source = {{uri: props.uri}} style ={styles.background}/>
      <Text style={styles.titleText}>
        {props.title + ": "}
      </Text>
      <Text style={styles.contentText}>
        {props.content}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  background:{
    height:14,
    width:14,
  },
  titleText:{
    fontSize:14,
    fontWeight: '100',
    textAlign: 'left',
    marginLeft:10,
  },
  contentText:{
    fontSize:14,
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft:10,
  }
})