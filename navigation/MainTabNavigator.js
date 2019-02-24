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
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import PostInfoScreen from '../screens/PostInfoScreen';

class TestScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        loading: true,
    };
  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        <Grid>
          <Col size={10.5} style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <Text ref="title">Test</Text>
          </Col>
        </Grid>
      </Container>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  PostInfo: PostInfoScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name="home"
      size={24}
    />
  ),
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name="camera"
      size={20}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  ChangePassword: ChangePasswordScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name="cogs"
      size={24}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
});
