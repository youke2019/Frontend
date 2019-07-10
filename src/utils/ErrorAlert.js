import { Alert } from 'react-native'


export function EmitError({error_msg}) {
  Alert.alert(
    '错误',
    error_msg,
    [
      {text: '确定', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
}