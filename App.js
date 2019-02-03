import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Button, StyleSheet, View } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Courses from './components/Courses'
import Post from './components/Post'
import Signin from './components/Signin'
import navStyles from './components/styles/navStyles'

const client = new ApolloClient({
  uri: 'http://localhost:4444',
  credentials: 'include'
})

class App extends React.Component {
  static navigationOptions = {
    title: 'Home',
    ...navStyles
  }

  goToPost = () => {
    this.props.navigation.navigate('Post')
  }
  goToSignin = () => {
    this.props.navigation.navigate('Signin')
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Courses />
          <Button onPress={this.goToPost} title="Post page" />
          <Signin />
        </View>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Post: Post,
    Signin: Signin
  },
  { initialRouteName: 'Home' }
)

export default createAppContainer(AppNavigator)
