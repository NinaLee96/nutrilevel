import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Alert, Button } from 'react-native';





export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      username:'',
      password:'',

    };
  }
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }


  render() {
    return ( <View style={styles.container}>
      <TextInput
        value={this.state.username}
        onChangeText={(username) => this.setState({ username })}
        placeholder={'Username'}
        placeholderTextColor={'white'}
        style={styles.input}
      />
      <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        placeholder={'Password'}
        placeholderTextColor={'white'}
        secureTextEntry={true}
        style={styles.input}
      />
      
      <Button
        title={'Login'}
        color='#000000'
        style={styles.input}
        onPress={this.onLogin.bind(this)}
      />
      <Button
        title={'Sign up'}
        color='#000000'
        style={styles.inputTop}
        onPress={this.onLogin.bind(this)}
      />
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
    backgroundColor: 'black',
    color:'white'
  },
  inputTop: {
    width: 200,
    height: 44,
    padding: 10,
    top: 300,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
    backgroundColor: 'black',
    color:'white'
  },
});
