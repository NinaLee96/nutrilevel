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

import { WebBrowser, ImagePicker, Permissions } from 'expo';
//import Amplify, { Auth, Storage } from 'aws-amplify';
//import awsmobile from '../aws-exports';
//Amplify.configure(awsmobile);
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
//import { RNS3 } from 'react-native-aws3';
//import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        loading: true,
        email: '',
        username: '',
        password: '',
        confirmPass:'',
        phone:''
    };
  }
  static navigationOptions = {
    header: null,
  };

  /*async componentWillMount(){
    const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
  }
  */
  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  /*trySignIn() {
    let username = this.state.username.trim();
    let password = this.state.password;
    Auth.signIn(
      username,
      password,
    ).then(user => {
      console.log("Success!")
      console.log(user);
    })
    .catch(err => {
      console.log("Error!")
      console.log(err);
    });
  }

  async takeImage() {
   let result = await ImagePicker.launchCameraAsync({
     allowsEditing: false,
     aspect: [4, 3]
   });
   console.log(result);
   this.setState({image: result.uri});
   this.uploadImage();
 };

 uploadImage(){
   let name = new Date();
   const file = {
      uri: this.state.image,
      name: `${name}.png`,
      type: "image/png"
    }

  const options = {
    keyPrefix: "images/",
    bucket: "nutrilevel-media-nutrienv",
    region: "us-west-2",
    accessKey: "AKIAJXYYAMGXKDUQB27Q",
    secretKey: "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",
    successActionStatus: 201
  }

  RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");
    console.log(response.body);
    /**
     * {
     *   postResponse: {
     *     bucket: "your-bucket",
     *     etag : "9f620878e06d28774406017480a59fd4",
     *     key: "uploads/image.png",
     *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
     *   }
     * }
     *//*
  });
 }

 pickImage = async () => {
   const result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: false,
     ratio: [4, 3]
   });

   if (!result.cancelled) {
     this.setState({
       image: result.uri,
     });
   }
   console.log(this.state.image);
   this.uploadImage();
 };*/

 doNothing(){}

  render() {
    return (
      <View style={styles.container}>

      <Form style={{top: 50}}>
        <Item regular>
          <Input placeholder = 'Email' onChangeText={(e) => {this.handleChange('email', e)}} style={styles.input}/>
        </Item>
        <Item regular>
          <Input placeholder = 'Username' onChangeText={(e) => {this.handleChange('username', e)}} style={styles.input}/>
        </Item>
        <Item regular>
          <Input placeholder = 'Password' onChangeText={(e) => {this.handleChange('password', e)}} style={styles.input}/>
        </Item>
        <Item regular>
          <Input placeholder = 'Confirm Password' onChangeText={(e) => {this.handleChange('confirmPass', e)}} style={styles.input}/>
        </Item>
        <Item regular>
          <Input placeholder = 'Phone Number' onChangeText={(e) => {this.handleChange('phone', e)}} style={styles.input}/>
        </Item>
        <Button onPress={() => {this.doNothing()}} style={[styles.inputButton, {top: 100, width: 120, alignSelf: 'center', justifyContent: 'center'}]}>
          <Text style={{textAlign:'center',color:'white'}}>Sign Up</Text>
        </Button>
      </Form>
      </View>
    );
  }

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
    //height: 44,
    //padding: 10,
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
