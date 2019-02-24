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

export default class ChangePassword extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        email: '',
        old_password: '',
        new_password: '',
    };
  }
  static navigationOptions = {
    header: null,
  };

  handleChange(name, value) {
    this.setState({ [name]: value });
  };

  tryChangePassword(){
    let old_password = this.state.old_password;
    let new_password = this.state.new_password;

    Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, old_password, new_password);
        })
        .then(data => {
          console.log("Successfully changed password!");
          this.props.navigation.goBack();
        })
        .catch(err => {
          console.log("Something went wrong when trying to change password.", err);
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
      <Text style={styles.forgotTitle}>Change Password</Text>
      <Form>
        <Item style={{top: 100}} regular>
          <Input placeholderTextColor={'white'} placeholder='Old Password' onChangeText={(e) => {this.handleChange('old_password', e)}} style={styles.input}/>
        </Item>
        <Item style={{top: 110}} regular>
          <Input placeholderTextColor={'white'} placeholder='New Password' onChangeText={(e) => {this.handleChange('new_password', e)}} style={styles.input}/>
        </Item>
        <Button onPress={() => {this.tryChangePassword()}} style={[styles.inputButton, {top: 150, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Submit</Text>
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
