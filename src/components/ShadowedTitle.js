import React from 'react'
import { Text ,Image} from 'react-native-elements'
import { StyleSheet,View } from 'react-native'

export const ShadowedTitle = (props) =>{
  return (
    <View style = {styles.title_container}>
      <Image source={{uri:props.uri}} style={{height:25,width:25,resizeMode: 'contain'}}/>
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
    marginTop:15,
    marginBottom:15,
    marginLeft:20,
    justifyContent:'flex-start',
    flexDirection: 'row',
    display:'flex',
  },
  container:{
    height: 25,
  },
  background:{
    width: 40,
    height: 10,
    position: 'absolute',
    left: 8,
    top: 12,
  },
  titleText:{
    fontSize:18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft:10,
    maxWidth:300,
  }
})