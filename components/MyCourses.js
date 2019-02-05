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
import { Text, View } from 'react-native'

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
                <Header>
                  <Left />
                  <Body>
                    <Title>My Courses</Title>
                  </Body>
                  <Right />
                </Header>
                {courseData.map(course => (
                  <View key={course.id}>
                    <Card>
                      <CardItem>
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
              </View>
            )
          }}
        </Query>
      </ApolloProvider>
    )
  }
}

export default MyCourses
