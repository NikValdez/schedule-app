import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { withNavigation } from 'react-navigation'

class Signin extends Component {
  state = {
    email: '',
    password: ''
  }
  submitForm = async e => {
    e.preventDefault()
    const response = await this.props.mutate({
      variables: this.state
    })
    const { payload, error } = response.data.signin
    this.setState({ email: '', password: '' })
    this.props.navigation.navigate('Post')
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.submitForm}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  }
})

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

export default graphql(SIGNIN_MUTATION)(withNavigation(Signin))
