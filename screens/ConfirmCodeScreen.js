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
import {Auth} from 'aws-amplify';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';


export default class ConfirmCode extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        loading: true,
        username:'',
        code:''
    };
  }
  static navigationOptions = {
    header: null,
  };

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  tryConfirm(){
    let username = this.state.username;
    let code = this.state.code;
    Auth.confirmSignUp(username, code, {
        forceAliasCreation: true
    }).then(data => {
      // console.log(data);
      console.log('Confirmed successfully!')
      this.props.navigation.navigate('SignIn');
    })
      .catch(err => {
        console.log("Couldn't confirm user",err);
      });
  }

  tryResendCode(){
    let username = this.state.username;
    Auth.resendSignUp(username).then(() => {
        console.log('code resent successfully');
    }).catch(e => {
        console.log("Couldn't resend code",e);
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <Form style={{top: 50}}>
        <Text style={styles.forgotTitle}>Confirm Code</Text>
        <Item regular style={{top: 50, paddingBottom:30}}>
          <Input placeholderTextColor={'white'} placeholder='username' onChangeText={(e) => {this.handleChange('username', e)}} style={styles.input}/>
        </Item>
        <Item regular style={{top: 50,  paddingBottom:10}}>
          <Input placeholderTextColor={'white'} placeholder='code' onChangeText={(e) => {this.handleChange('code', e)}} style={styles.input}/>
        </Item>
        <Button onPress={() => {this.tryResendCode();}} style={[styles.inputButton, {top: 80, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Resend Code</Text>
        </Button>
        <Button onPress={() => {this.tryConfirm();}} style={[styles.inputButton, {top: 100, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Confirm</Text>
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
