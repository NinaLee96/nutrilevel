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

export default class PostInfoScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      user: '',
      key: '',
      item: '',
      image: '',
      serving_size: '',
      calories: '',
      total_fat: '',
      sodium: '',
      carbs: '',
      sugars: '',
      protein: '',
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    const { navigation } = this.props;
    const post = navigation.getParam('postData', 'no post data');
    this.setState({
      user: post.user,
      key: post.key,
      item: post.item,
      image: post.image,
      serving_size: post.serving_size,
      calories: post.calories,
      total_fat: post.total_fat,
      sodium: post.sodium,
      carbs: post.carbs,
      sugars: post.sugars,
      protein: post.protein,
    });
  }


  outputState(){
    console.log(this.state);
  }


  render() {
    return (
      <Container>
      <Header />
      <Content padder>
        <Card>
          <CardItem button header bordered>
            {this.state.image ? (<Image source={{uri: `${this.state.image}`}} style={{width: 200, height: 200, flex: 1}}/>) : (<Text>No Image</Text>)}
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={{fontWeight: 'bold'}} >Calories: {this.state.calories}</Text>
              <Text style={{fontWeight: 'bold'}} >Total Fat: {this.state.total_fat}</Text>
              <Text style={{fontWeight: 'bold'}} >Sodium: {this.state.sodium}</Text>
              <Text style={{fontWeight: 'bold'}} >Total Carb: {this.state.carbs}</Text>
              <Text style={{fontWeight: 'bold'}} >Sugars: {this.state.sugars}</Text>
              <Text style={{fontWeight: 'bold'}} >Protein: {this.state.protein}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
