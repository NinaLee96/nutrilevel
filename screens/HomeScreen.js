import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';

import { WebBrowser, ImagePicker, Permissions } from 'expo';
import Amplify, { Auth, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);
import * as mutations from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries';
import ActionButton from 'react-native-action-button';
import { Container, Header, Content, Form, Item, Input, Label, Button, Card, CardItem, Text, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import API, { graphqlOperation } from '@aws-amplify/api';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      loading: true,
      refreshing: false,
      posts: []
    };
  }
  static navigationOptions = {
    title: 'Home',
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getPosts();
  }

  async componentWillMount(){
    const session = Auth.currentAuthenticatedUser({
          bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then((user) => {
        // console.log(user.signInUserSession.idToken.payload);
        let payload = user.signInUserSession.idToken.payload
        this.setState({
          username: user.username,
        });
      })
      .catch((err) => {
        console.log('Error:',err);
      });
  }

  async componentDidMount(){
    const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
    this.getPosts();
  }


  async takeImage() {
   let result = await ImagePicker.launchCameraAsync({
     allowsEditing: false,
     base64: true,
     aspect: [4, 3]
   });
   // this.setState({image: result.uri});
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
     console.log(responseJson.responses[0].fullTextAnnotation.text);
     let jsonString =responseJson.responses[0].fullTextAnnotation.text; // have a string that has all the nutrition facts
       console.log(jsonString);
       var x=jsonString.split(/\r?\n/);
       console.log(x);
       var protein=[];
       var sugar=[];
       var carbs=[];
       var sodium=[];
       var fat=[];
       var cal=[];
       var fib=[];
       var cho=[];
       x.push(" ");

      for(i=0;i<x.length ;i++){
        var str = x[i];
        b=str.search("vitamin"||"Vitamin");
        if(b!=-1){
          i=x.length-1;
        }
        n=str.search("Calories" || "calories" || "Calorles" );
        if(n != -1){
         console.log(str);
         var parsed=str.split(" ");
          for(j =0; j < parsed.length; j++){
              if(!isNaN(parseInt(parsed[j]))){
                cal.push(parseInt(parsed[j]));
                //console.log(cal);
                }
              }
            }
       else if(str.search("Fat"|| "fat") != -1){
              console.log(str);
              var parsed=str.split(" ");
               for(j =0; j < parsed.length; j++){
                   if(!isNaN(parseInt(parsed[j]))){
                     fat.push(parseInt(parsed[j]));
                     //console.log(fat);
                      }
                   }
              }
        else if(str.search("Cholesterol"|| "cholesterol") != -1){
                console.log(str);
                var parsed=str.split(" ");
                 for(j =0; j < parsed.length; j++){
                     if(!isNaN(parseInt(parsed[j]))){
                      cho.push(parseInt(parsed[j]));
                       //console.log(cho);
                        }
                     }
                }
        else if(str.search("Sodium"|| "sodium") != -1){
                  console.log(str);
                  var parsed=str.split(" ");
                   for(j =0; j < parsed.length; j++){
                       if(!isNaN(parseInt(parsed[j]))){
                         sodium.push(parseInt(parsed[j]));
                         //console.log(sodium);
                          }
                       }
                  }
        else if(str.search("Carbohydrate"|| "carbohydrate") != -1){
                    console.log(str);
                    var parsed=str.split(" ");
                     for(j =0; j < parsed.length; j++){
                         if(!isNaN(parseInt(parsed[j]))){
                          carbs.push(parseInt(parsed[j]));
                           //console.log(carbs);
                            }
                         }
                    }
        else if(str.search("Fiber"|| "fiber") != -1){
                      console.log(str);
                      var parsed=str.split(" ");
                       for(j =0; j < parsed.length; j++){
                           if(!isNaN(parseInt(parsed[j]))){
                            fib.push(parseInt(parsed[j]));
                             //console.log(fib);
                              }
                           }
                      }
              else if(str.search("Sugar") != -1){
                console.log(str);
                var parsed=str.split(" ");
                 for(j =0; j < parsed.length; j++){
                     if(!isNaN(parseInt(parsed[j]))){
                       sugar.push(parseInt(parsed[j]));
                       //console.log(sugar);
                        }
                     }
                }

                  else if(str.search("Protein") != -1){
                    console.log(str);
                    var parsed=str.split(" ");
                     for(j =0; j < parsed.length; j++){
                         if(!isNaN(parseInt(parsed[j]))){
                           protein.push(parseInt(parsed[j]));
                           //console.log(protein);
                            }
                         }
                    }


          }

      console.log(cal);
      console.log(fat);
      console.log(cho);
      console.log(sodium);
      console.log(carbs);
      console.log(fib);
      console.log(sugar);
      console.log(protein);

    data = {
      user: this.state.username,
      item: "NA",
      image: "NA",
      serving_size: "NA",
      calories: cal[0],
      total_fat: fat[0]+"g",
      sodium: sodium[0]+"mg",
      carbs: carbs[0]+"g",
      sugars: sugar[0]+"g",
      protein: protein[0],
    };
    const newPost = API.graphql(graphqlOperation(mutations.createTodo,{input: data}));

  } catch (error) {
     console.error(error);
   }
 }

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
    console.log(this.state.user);
    this.setState({posts: []});
    const allPosts = await API.graphql(graphqlOperation(queries.listTodos, {limit: 100}));
    allPosts.data.listTodos.items.map(post => (
      this.setState({
        posts: [
          ...this.state.posts,
          {
            user: post.user,
            key: post.id,
            item: post.item,
            image: post.image,
            serving_size: post.serving_size,
            calories: post.calories,
            total_fat: post.total_fat,
            sodium: post.sodium,
            carbs: post.carbs,
            sugars: post.sugars,
            protein: post.protein,
          }
        ]
      })
    ))
    this.setState({refreshing: false});
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
      <Container>
      <ScrollView
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
      >
      <Content>
      {this.state.posts.filter(post => post.user === this.state.username).map((post, index) => (
        <Card key={post.key}>
          <CardItem
          header
          button
          onPress={() => {this.props.navigation.navigate('PostInfo', {postData: post})}}
          >
          <Text>
          No Image
          </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{fontWeight: 'bold'}}>
              {post.item}
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Calories: {post.calories}</Text>
          </CardItem>
       </Card>
     ))}
      </Content>
      </ScrollView>

      <ActionButton
        buttonColor="black"
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

      </Container>
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
  color: 'black',
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
