import React, { Component } from 'react'
import { View, Text } from 'react-native'
import navStyles from './styles/navStyles'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

class Post extends Component {
  static navigationOptions = {
    title: 'Post',
    ...navStyles
  }

  render() {
    return (
      <View>
        <CalendarList
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={months => {
            console.log('now these months are visible', months)
          }}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          markedDates={{
            '2019-01-17': {
              selected: true,
              marked: true,
              selectedColor: 'yellow'
            },
            '2019-01-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
            '2019-01-19': { disabled: true, disableTouchEvent: true }
          }}
        />
      </View>
    )
  }
}

export default Post
