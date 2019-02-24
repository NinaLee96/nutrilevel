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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { WebBrowser, ImagePicker, Permissions } from 'expo';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

import Amplify, { Auth, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);

export default class SignIn extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        loading: true,
        username: '',
        password: ''
    };
  }
  static navigationOptions = {
    header: null,
  };

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  trySignIn() {
    let username = this.state.username.trim();
    let password = this.state.password;

    Auth.signIn(
      username,
      password,
    ).then(user => {
      console.log("Signed in successfully!")
      console.log(user);
      this.props.navigation.navigate('Main');
    })
    .catch(err => {
      console.log("Error! user not authenticated, check logs.")
      console.log(err);
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
      <Image
        source={require('../assets/images/icon.png')}
        style={{position: 'absolute', alignSelf: 'center', top: 100}}
      />
        <Form style={{top: 50}}>

          <Item style={{top: 300}} regular>
            <Input placeholderTextColor={'white'} placeholder = 'username' onChangeText={(e) => {this.handleChange('username', e)}} style={styles.input}/>
          </Item>

          <Item style={{top: 310}} regular>
            <Input secureTextEntry={true} placeholderTextColor={'white'} placeholder = 'password' onChangeText={(e) => {this.handleChange('password', e)}} style={styles.input}/>
          </Item>

          <Button onPress={() => {this.trySignIn()}} style={[styles.inputButton, {top: 320, width: 120, alignSelf: 'center' , justifyContent: 'center'}]}>
            <Text style={{flexDirection: "row", justifyContent: "center",color:'white'}}>Sign In</Text>
          </Button>

          <Button onPress={() => {this.props.navigation.navigate('SignUp')}} style={[styles.inputButton, {top: 330, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
            <Text style={{textAlign:'center',color:'white'}}>Sign Up</Text>
          </Button>
          <Button onPress={() => {this.props.navigation.navigate('ForgotPassword')}} style={[styles.inputButton, {top: 340, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
            <Text style={{textAlign:'center',color:'white'}}>Forgot Password?</Text>
          </Button>
        </Form>
      </KeyboardAwareScrollView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  input: {
    width: 100,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 20,
    backgroundColor: 'black',
    color:'white'
  },
  inputButton: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'black',
  },
});
