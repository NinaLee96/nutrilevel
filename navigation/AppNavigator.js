import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Auth} from 'aws-amplify';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
import ConfirmCode from '../screens/ConfirmCodeScreen';
import ConfirmChange from '../screens/ConfirmChangeScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';

class LoadingScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        loading: true,
    };
  }

  static navigationOptions = {
    header: null
  }

  // Needed for Native-Base Buttons
  async componentDidMount() {
    this.setState({ loading: false });

    const session = Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then((user) => {
      setTimeout(() => {this.props.navigation.navigate('Main');}, 1000);
    })
    .catch((err) => {
      console.log('Error:',err);
      this.props.navigation.navigate('SignIn');
    });
  }


  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Grid>
          <Col size={10.5} style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <Text ref="title" style={styles.title}>Loading</Text>
            <ActivityIndicator ref="loading" style={{bottom: 50, backgroundColor: '#white'}} size="large" color="black"/>
          </Col>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 60,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
    fontWeight: Platform.OS === 'ios' ? "200" : 'normal',
    bottom: 70
  },
});

const AuthNavigator = createStackNavigator(
  {
    SignIn: {screen: SignIn},
    SignUp: {screen: SignUp},
    ConfirmCode: {screen: ConfirmCode},
    ConfirmChange: {screen: ConfirmChange},
    ForgotPassword: {screen: ForgotPassword}
  },
  {
    initialRoute: 'SignIn',
    navigationOptions: {
      headerVisible: false,
    }
  },
)

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: LoadingScreen,
  Auth: AuthNavigator,
  Main: MainTabNavigator,
}));
