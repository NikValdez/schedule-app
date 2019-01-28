import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Text, View, Button } from 'react-native'
import { Form, Item, Input, Label } from 'native-base'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

class Signin extends Component {
  state = {
    email: '',
    password: ''
  }
  submitForm = async e => {
    e.preventDefault()
    await signin()
    this.setState({ email: '', password: '' })
  }
  render() {
    return (
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
        {(signin, { error, loading }) => (
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item>
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>

            <Button title="Sign In" onPress={this.submitForm} />
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Signin
export { SIGNIN_MUTATION }
