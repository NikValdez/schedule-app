import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import { Text, View } from 'react-native'

const client = new ApolloClient({
  uri: 'http://localhost:4444',
  credentials: 'include'
})

const ALL_COURSES_QUERY = gql`
  query ALL_COURSES_QUERY {
    courses {
      id
      title
      description
      courseCode
      credits
    }
  }
`

class Courses extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={ALL_COURSES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>
            if (error) return <Text>Error :(</Text>

            return (
              <View>
                {data.courses.map(course => (
                  <View key={course.id}>
                    <Text>{course.title}</Text>

                    <Text>{course.courseCode}</Text>
                    <Text>{course.credits}</Text>
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

export default Courses
