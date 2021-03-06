import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { StyleSheet, View } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Calendar from './components/Calendar'
import Courses from './components/Courses'
import FullSchedule from './components/FullSchedule'
import MyCourses from './components/MyCourses'
import Signin from './components/Signin'
import navStyles from './components/styles/navStyles'
import Test from './components/Test'
import { getToken } from './loginUtils'

const client = new ApolloClient({
  uri: 'http://localhost:4444',
  credentials: 'include'
})

class App extends React.Component {
  static navigationOptions = {
    title: 'Home',
    ...navStyles
  }
  componentDidMount() {
    if (getToken()) {
      this.props.navigation.navigate('MyCourses')
    } else {
      this.props.navigation.navigate('Home')
    }
  }

  goToSignin = () => {
    this.props.navigation.navigate('Signin')
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
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
    Calendar: Calendar,
    Courses: Courses,
    Signin: Signin,
    MyCourses: MyCourses,
    FullSchedule: FullSchedule,
    Test: Test
  },
  { initialRouteName: 'Home' }
)

export default createAppContainer(AppNavigator)
