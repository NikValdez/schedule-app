import { Ionicons } from '@expo/vector-icons'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import {
  Body,
  Card,
  CardItem,
  Header,
  Icon,
  Left,
  Right,
  Title
} from 'native-base'
import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import { Button, Text, View } from 'react-native'
import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import Courses from './Courses'
import FullSchedule from './FullSchedule'

const client = new ApolloClient({
  uri: 'http://localhost:4444',
  credentials: 'include'
})

const MY_COURSES_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      myCourses {
        id
        courses {
          id
          title
          description
          credits
          courseCode
          color
        }
      }
    }
  }
`

class MyCourses extends Component {
  // removeToken = () => {
  //   logout()
  //   this.props.navigation.navigate('Home')
  // }

  // goToCalendar = () => {
  //   this.props.navigation.navigate('Calendar')
  // }
  // fullSchedule = () => {
  //   this.props.navigation.navigate('FullSchedule')
  // }
  // test = () => {
  //   this.props.navigation.navigate('Test')
  // }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer()
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={MY_COURSES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>
            if (error) return <Text>Error :(</Text>
            const courseData = data.me.myCourses.map(course => course)

            return (
              <View>
                <Header
                  style={{
                    backgroundColor: '#fffcdf'
                  }}
                >
                  <Ionicons
                    name="md-menu"
                    size={32}
                    onPress={this.toggleDrawer}
                  />

                  <Left />
                  <Body>
                    <Title>My Courses</Title>
                  </Body>

                  <Right />
                  <Button onPress={this.removeToken} title="Logout" />
                </Header>
                {courseData.map(course => (
                  <View key={course.id}>
                    <Card>
                      <CardItem
                        header
                        button
                        // onPress={() => alert(course.courses.description)}
                      >
                        <Text>{course.courses.title}</Text>
                        <Right>
                          <Icon name="arrow-forward" />
                        </Right>
                      </CardItem>
                      <CardItem>
                        <Text>{course.courses.courseCode}</Text>
                      </CardItem>
                    </Card>
                  </View>
                ))}
                {/* <Button onPress={this.goToCalendar} title="Calendar" />
                <Button onPress={this.fullSchedule} title="Full Schedule" />
                <Button onPress={this.test} title="Test" />
                <Button onPress={this.openDrawer} title="menu" /> */}
              </View>
            )
          }}
        </Query>
      </ApolloProvider>
    )
  }
}

const MainNavigator = createDrawerNavigator({
  MyCourses: {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-home" style={{ color: tintColor }} />
      ),
      drawerLabel: 'MyCourses'
    },
    screen: MyCourses
  },
  FullSchedule: {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-home" style={{ color: tintColor }} />
      ),
      drawerLabel: 'FullSchedule'
    },
    screen: FullSchedule
  },

  Courses: {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-settings" style={{ color: tintColor }} />
      ),
      drawerLabel: 'Courses'
    },
    screen: Courses
  }
})

export default createAppContainer(MainNavigator)
