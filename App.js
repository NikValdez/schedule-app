import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Post from './components/Post'
import navStyles from './components/styles/navStyles'
import Courses from './components/Courses'
import Signin from './components/Signin'

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
