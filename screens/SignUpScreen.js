import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { WebBrowser, ImagePicker, Permissions } from 'expo';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { MonoText } from '../components/StyledText';

import Amplify, { Auth, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);

export default class SignUp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        email: '',
        username: '',
        password: '',
        phone_number:''
    };
  }
  static navigationOptions = {
    header: null,
  };

  handleChange(name, value) {
    this.setState({ [name]: value });
  };

  trySignUp(){
    let email = this.state.email;
    let username = this.state.username;
    let password = this.state.password;
    let phone_number = this.state.phone_number;

    Auth.signUp({
    username,
    password,
    attributes: {
        email,          // optional
        phone_number,   // optional - E.164 number convention
    },
    validationData: []  //optional
    })
    .then(data => {
      console.log("Successfully signed up!");
      this.props.navigation.navigate('ConfirmCode');
    })
    .catch(err => {
      console.log("Couldn't sign up.",err);
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'white' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        enableOnAndroid={true}
      >
      <Text style={styles.forgotTitle}>Sign Up</Text>
      <Form>
        <Item style={{top: 100}} regular>
          <Input placeholderTextColor={'white'} placeholder='Email' onChangeText={(e) => {this.handleChange('email', e)}} style={styles.input}/>
        </Item>
        <Item style={{top: 110}} regular>
          <Input placeholderTextColor={'white'} placeholder='Username' onChangeText={(e) => {this.handleChange('username', e)}} style={styles.input}/>
        </Item>
        <Item style={{top: 120}} regular>
          <Input secureTextEntry={true} placeholderTextColor={'white'} placeholder='Password' onChangeText={(e) => {this.handleChange('password', e)}} style={styles.input}/>
        </Item>
        <Item style={{top: 130}} regular>
          <Input placeholderTextColor={'white'} placeholder='Phone Number' onChangeText={(e) => {this.handleChange('phone_number', e)}} style={styles.input}/>
        </Item>
        <Button onPress={() => {this.trySignUp()}} style={[styles.inputButton, {top: 150, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Sign Up</Text>
        </Button>
        <Button onPress={() => {this.props.navigation.navigate('ConfirmCode')}} style={[styles.inputButton, {top: 160, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Confirm a code</Text>
        </Button>
      </Form>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  forgotTitle: {
    fontSize: 46,
    textAlign: 'center',
    top: 60
  },
  input: {
    width: 100,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: 'black',
    color:'white'
  },
  inputButton: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'black',
  },
});
