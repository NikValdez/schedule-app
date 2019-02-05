import { AsyncStorage } from 'react-native'

let token

export const login = newToken => {
  return AsyncStorage.setItem('AUTH_TOKEN', newToken)
}
export const getToken = async () => {
  if (token) {
    return Promise.resolve(token)
  }
  token = await AsyncStorage.getItem('AUTH_TOKEN')
  return token
}
export const logout = () => {
  token = undefined
  return AsyncStorage.remove('AUTH_TOKEN')
}
