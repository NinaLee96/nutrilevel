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

import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        loading: true,
        username:'',
        confirmCode:''
    };
  }
  static navigationOptions = {
    header: null,
  };

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

 
 doNothing(){}

  render() {
    return (
      <View style={styles.container}>

      <Form style={{top: 50}}>
        <Text style={styles.forgotTitle}>Confirm Sign Up</Text>
        <Item regular style={{top: 50, paddingBottom:10}}>
          <Input placeholder = 'username' onChangeText={(e) => {this.handleChange('username', e)}} style={styles.input}/>
        </Item>
        <Item regular style={{top: 50,  paddingBottom:10}}>
          <Input placeholder = 'code' onChangeText={(e) => {this.handleChange('code', e)}} style={styles.input}/>
        </Item>
        <Button onPress={() => {this.doNothing()}} style={[styles.inputButton, {top: 100, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Resend Code</Text>
        </Button>
      </Form>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  forgotTitle: {
    fontSize: 46,
    textAlign: 'center'
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
