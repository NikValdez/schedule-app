import React, { Component } from 'react'
import { View, Text } from 'react-native'
import navStyles from './styles/navStyles'
import Calendar from 'react-native-calendario'

class Post extends Component {
  static navigationOptions = {
    title: 'Post',
    ...navStyles
  }

  render() {
    return (
      <View>
        <Calendar
          onChange={range => console.log(range)}
          minDate="2018-04-20"
          startDate="2018-04-30"
          endDate="2018-05-05"
          theme={{
            weekColumnTextStyle: {
              color: '#f9c321'
            },
            weekColumnStyle: {
              paddingVertical: 20
            },
            weekColumnsContainerStyle: {
              backgroundColor: 'lightgrey'
            },
            monthTitleStyle: {
              color: 'blue'
            },
            nonTouchableDayContainerStyle: {
              backgroundColor: '#f9c321'
            },
            nonTouchableDayTextStyle: {
              color: 'green'
            },
            dayTextStyle: {
              color: 'blue'
            },
            activeDayContainerStyle: {
              backgroundColor: 'lightgrey'
            },
            activeDayTextStyle: {
              color: '#f9c321'
            }
          }}
        />
      </View>
    )
  }
}

export default Post
