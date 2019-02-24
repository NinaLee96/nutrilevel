import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Auth} from 'aws-amplify';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SettingsScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
    }
  }
  static navigationOptions = {
    title: 'Settings',
  };

  async componentWillMount(){
    const session = Auth.currentAuthenticatedUser({
          bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then((user) => {
        // console.log(user.signInUserSession.idToken.payload);
        let payload = user.signInUserSession.idToken.payload
        this.setState({
          username: user.username,
          email: payload.email,
          phone_number: payload.phone_number,
        });
        this.setState({loading: false})
      })
      .catch((err) => {
        console.log('Error:',err);
      });
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
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <View style={{backgroundColor:'white',flex:1}}>
      <View style={{flex:1}}>
        <SettingsList>
          <SettingsList.Item
            icon={
              <View style={{marginTop: 10, height:70,marginLeft:10,alignSelf:'center'}}>
                <Icon name="user-circle" size={60}/>
              </View>
            }
            itemWidth={60}
            title={this.state.username}
            hasNavArrow={false}
          />
          <SettingsList.Item titleInfo={this.state.email} hasNavArrow={false} title='Email'/>
          <SettingsList.Item titleInfo={this.state.phone_number} hasNavArrow={false} title='Phone number'/>
          <SettingsList.Item onPress={() => this.props.navigation.navigate('ChangePassword')} hasNavArrow={true} title='Change Password'/>
          <SettingsList.Item itemWidth={100} hasNavArrow={false}/>
          <SettingsList.Item onPress={() => this.trySignOut()} hasNavArrow={true} title='Sign Out'/>

        </SettingsList>
      </View>
    </View>
    );
  }
}
