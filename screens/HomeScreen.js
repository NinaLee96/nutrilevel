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
import * as mutations from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries';
import ActionButton from 'react-native-action-button';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import API, { graphqlOperation } from '@aws-amplify/api';
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


  async takeImage() {
   let result = await ImagePicker.launchCameraAsync({
     allowsEditing: false,
     base64: true,
     aspect: [4, 3]
   });
   // this.setState({image: result.uri});
   // console.log(result);
   // this.analyzeText(result.base64);
 };

 async pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      base64: true,
      ratio: [4, 3]
    });

    // if (!result.cancelled) {
      // console.log(result);
      // this.analyzeText(result.base64);
      // this.setState({image: result.uri});
      // this.uploadImage(result.uri);
    // }
  };

 // async analyzeText(image) {
 //   // console.log(response.body.postResponse.location)
 //   try {
 //     let response = await fetch(
 //       'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCA3xZkHjuIT7TZZvc7cT2k2IGi2ZF-Voc',{
 //          method: 'POST',
 //          headers: {
 //            'Accept': 'application/json',
 //            'Content-Type': 'application/json',
 //          },
 //          body: JSON.stringify({
 //            "requests": [
 //              {
 //                "image": {
 //                  "content": image
 //                },
 //                "features": [
 //                  {
 //                    "type": "TEXT_DETECTION",
 //                    "maxResults": 1
 //                  }
 //                ]
 //              }
 //            ]
 //          }),
 //       });
 //     let responseJson = await response.json();
 //     // console.log(responseJson);
 //     console.log(responseJson.responses[0].fullTextAnnotation.text);
 //   } catch (error) {
 //     console.error(error);
 //   }
 // }

  addPost() {
    data = {
      user: "ecast96",
      item: "RedBull",
      image: "base64datagoeshere",
      serving_size: "1 can",
      calories: "170",
      total_fat: "0g",
      sodium: "60mg",
      carbs: "29g",
      sugars: "28g",
      protein: "less than 1g",
    };
    const newPin = API.graphql(graphqlOperation(mutations.createTodo,{input: data}));
  }

  async getPosts(){
    const allPosts = await API.graphql(graphqlOperation(queries.listTodos, {limit: 100}));
    this.setState({data: allPosts});
    console.log(this.state.data);
  }

  trySignOut(){
    Auth.signOut()
    .then(data => {
      console.log("Signed out!");
      this.props.navigation.navigate('SignIn');
    })
    .catch(err => {
      console.log("Couldn't sign out.", err);
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <Form style={{top: 50}}>
        <Button onPress={() => {this.addPost();}} style={{top: 75, width: 120, alignSelf: 'center'}}>
          <Text style={{justifyContent:'center'}}>Add Post</Text>
        </Button>
        <Button onPress={() => {this.getPosts();}} style={{top: 85, width: 120, alignSelf: 'center'}}>
          <Text style={{justifyContent:'center'}}>Get Posts</Text>
        </Button>
        <Button onPress={() => {this.props.navigation.navigate('Test')}} style={{top: 95, width: 120, alignSelf: 'center'}}>
          <Text style={{justifyContent:'center'}}>Navigate</Text>
        </Button>
      </Form>
      <ActionButton
        buttonColor="#03a9f4"
        backgroundTappable={true}
        fixNativeFeedbackRadius={true}
        offsetX={15}
        offsetY={15}
        >
          <ActionButton.Item size={40} buttonColor='white' title="Select Image" onPress={() => this.pickImage()}>
            <Icon name="image" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item size={40} buttonColor='white' title="Capture Image" onPress={() => this.takeImage()}>
            <Icon name="camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actionButtonIcon: {
  fontSize: 20,
  height: 22,
  color: '#03a9f4',
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
