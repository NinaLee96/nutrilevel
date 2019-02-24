import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';


export default class ForgotPassword extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        loading: true,
        username:''
    };
  }
  static navigationOptions = {
    header: null,
  };

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  tryForgotPassword(){
    let username = this.state.username;
    Auth.forgotPassword(username)
    .then(data => {
      console.log("Username accepted!");
      this.props.navigation.navigate("ConfirmChange");
    })
    .catch(err => {
      console.log("Something is wrong with your username.", err);
    });
  }


 doNothing(){}

  render() {
    return (
      <View style={styles.container}>

      <Form style={{top: 50}}>
        <Text style={styles.forgotTitle}>Forgot Password</Text>
        <Item style={{top: 90}} regular>
          <Input placeholderTextColor={'white'} placeholder='username' onChangeText={(e) => {this.handleChange('username', e)}} style={styles.input}/>
        </Item>
        <Button onPress={() => {this.tryForgotPassword()}} style={[styles.inputButton, {top: 130, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Send</Text>
        </Button>
      </Form>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  forgotTitle: {
    fontSize: 46,
    textAlign: 'center',
    top: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: 100,
    padding: 15,
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'black',
    color:'white'
  },
  inputButton: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'black',
  },
});
