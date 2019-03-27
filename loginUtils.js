import { AsyncStorage } from 'react-native'

let token

export const login = newToken => {
  return AsyncStorage.setItem('AUTH_TOKEN', newToken)
}
export const getToken = async () => {
  token = await AsyncStorage.getItem('AUTH_TOKEN')
  return token
}
// export const logout = () => {
//   token = undefined
//   return AsyncStorage.removeItem('AUTH_TOKEN')
// }

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('AUTH_TOKEN')
    return true
  } catch (exception) {
    return false
  }
}
