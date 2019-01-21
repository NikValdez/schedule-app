import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Post from './Post'
import navStyles from './styles/navStyles'
import Courses from './Courses'

const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/nikvaldez-073802/schedule/dev',
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
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Courses />
          <Button onPress={this.goToPost} title="Post page" />
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
    Post: Post
  },
  { initialRouteName: 'Home' }
)

export default createAppContainer(AppNavigator)
