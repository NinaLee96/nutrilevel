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
import Amplify, { Auth, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { RNS3 } from 'react-native-aws3';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
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

  async componentWillMount(){
    const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
  }

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
     base64: true,
     aspect: [4, 3]
   });
   this.setState({image: result.uri});
   // console.log(result);
   this.analyzeText(result.base64);
 };

 async pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      base64: true,
      ratio: [4, 3]
    });

    if (!result.cancelled) {
      // console.log(result);
      this.analyzeText(result.base64);
      // this.setState({image: result.uri});
      // this.uploadImage(result.uri);
    }
  };

 async analyzeText(image) {
   // console.log(response.body.postResponse.location)
   try {
     let response = await fetch(
       'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCA3xZkHjuIT7TZZvc7cT2k2IGi2ZF-Voc',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "requests": [
              {
                "image": {
                  "content": image
                },
                "features": [
                  {
                    "type": "TEXT_DETECTION",
                    "maxResults": 1
                  }
                ]
              }
            ]
          }),
       });
     let responseJson = await response.json();
     // console.log(responseJson);
    // console.log(responseJson.responses[0].fullTextAnnotation.text);
     let jsonString =responseJson.responses[0].fullTextAnnotation.text; // have a string that has all the nutrition facts
     console.log(jsonString);
     let x=jsonString.search("Nutrition" ||"nutrition"); // index where nutrtion information starts.
     console.log(x);
     //let y= jsonString.search("2,000 calories"||"2000 calories"); // Where nutrition information ends we are not using vitamins. not working
     //console.log(y);
     var nutri=jsonString.slice(x,jsonString.length-1);
     console.log(nutri);
     x=nutri.search("calories"||"Calories");
     let y =nutri.search("Total");
     var calories=nutri.slice(x,y);
     console.log(calories);
    
    // function parseInfo(str,info,info2){
     //   let x =str.search(info);
      //  let y=str.search("..0")


    // }
     
   } catch (error) {
     console.error(error);
   }
 }

  render() {
    return (
      <View style={styles.container}>

      <Form style={{top: 50}}>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input onChangeText={(e) => {this.handleChange('username', e)}}/>
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input onChangeText={(e) => {this.handleChange('password', e)}}/>
        </Item>
        <Button onPress={() => {this.trySignIn()}} style={{top: 15, width: 120, alignSelf: 'center'}}>
          <Text style={{justifyContent:'center'}}>Sign In</Text>
        </Button>
        <Button onPress={() => {this.takeImage()}} style={{top: 45, width: 120, alignSelf: 'center'}}>
          <Text style={{justifyContent:'center'}}>Take Image</Text>
        </Button>
        <Button onPress={() => {this.pickImage()}} style={{top: 75, width: 120, alignSelf: 'center'}}>
          <Text style={{justifyContent:'center'}}>Image Picker</Text>
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
});
