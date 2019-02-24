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
import { Auth } from 'aws-amplify';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';


export default class ConfirmChange extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        loading: true,
        username:'',
        code:'',
        new_password: ''
    };
  }
  static navigationOptions = {
    header: null,
  };

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  tryChangePassword(){
    let username = this.state.username;
    let code = this.state.code;
    let new_password = this.state.new_password;

    Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => {
      console.log("Successfully changed password!");
      this.props.navigation.navigate('SignIn');
    })
    .catch(err => {
      console.log("Couldn't change password.", err);
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <Form style={{top: 50}}>
        <Text style={styles.forgotTitle}>Change Password</Text>
        <Item regular style={{top: 50, paddingBottom:20}}>
          <Input placeholderTextColor={'white'} placeholder='username' onChangeText={(e) => {this.handleChange('username', e)}} style={styles.input}/>
        </Item>
        <Item regular style={{top: 50,  paddingBottom:20}}>
          <Input placeholderTextColor={'white'} placeholder='code' onChangeText={(e) => {this.handleChange('code', e)}} style={styles.input}/>
        </Item>
        <Item regular style={{top: 50}}>
          <Input placeholderTextColor={'white'} placeholder='new password' onChangeText={(e) => {this.handleChange('new_password', e)}} style={styles.input}/>
        </Item>
        <Button onPress={() => {this.tryChangePassword()}} style={[styles.inputButton, {top: 100, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Submit</Text>
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
    //height: 44,
    padding: 15,
    borderWidth: 0,
    borderColor: 'black',
    // marginBottom: 20,
    backgroundColor: 'black',
    color:'white'
  },
  inputButton: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'black',
  },
});
