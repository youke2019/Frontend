import React from 'react'
import { Text ,Image} from 'react-native-elements'
import { StyleSheet,View } from 'react-native'

export const UnshadowedTitle = (props) =>{
  return (
    <View style = {styles.container}>
      <Image source = {{uri: props.uri}} style ={styles.background}/>
      <Text style={styles.titleText}>
        {props.title + ":"}
      </Text>
      <Text
        numberOfLines={3}
        style={styles.contentText}>
        {props.content}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:5,
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
  },
  background:{
    height:14,
    width:14,
  },
  titleText:{
    fontSize:14,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft:10,
  },
  contentText:{
    fontSize:14,
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft:10,
    lineHeight:20,
  }
})