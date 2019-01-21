import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
    console.log(this.props.data)
    return (
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
    )
  }
}

export default Courses
