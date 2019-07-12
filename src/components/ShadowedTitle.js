import React from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet } from 'react-native'

export const ShadowedTitle = (props) =>{
  return (
    <Text style={styles.titleText}>
      {props.text}
    </Text>
  )
}

const styles = StyleSheet.create({
  titleText:{
    backgroundImage:{
      uri: "yellow_line"
    }
  }
})