import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createMaterialTopTabNavigator, createAppContainer, navigationOptions } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import InventoryListScreen from './src/screens/InventoryListScreen';
import SalesMainScreen from './src/screens/SalesMainScreen';
import SignInScreen from './src/screens/SignInScreen';
import CreateUserScreen from './src/screens/CreateUserScreen';

 //consider splitting this into another file
const AuthStack = createSwitchNavigator(
  {
    SignIn: { screen: SignInScreen },
    CreateUser: { screen: CreateUserScreen },
  },
  {
    initialRouteName: 'SignIn',
  }
);

 //consider splitting this into another file
const AppStack = createMaterialBottomTabNavigator(
	{
		Home: { screen: HomeScreen, navigationOptions: { icon: Icon.home } },
		AddItem: { screen: AddItemScreen },
		InventoryList: { screen: InventoryListScreen },
    SalesMain: { screen: SalesMainScreen },
	},
	{
    shifting: 'false',
    labeled: 'true',
    activeColor: '#FFFFFF',
    inactiveColor: '#000000',
    barStyle: { backgroundColor: 'green'},
		initialRouteName: 'Home',
    //order: ['Home','InventoryList','AddItem','SalesMain'],
    backBehavior: 'initialRoute',
	}
);

 //This should stay here
const AppContainer = createAppContainer(createSwitchNavigator(
    {
      AppStack,
      AuthStack,
    },
    {
      initialRouteName: 'AuthStack',
    }
  )
);

export default class App extends Component {
	render() {
		return <AppContainer/>;
	}
}

const styles = StyleSheet.create({
	page: {
		padding: 25,
		paddingTop: 75,
		backgroundColor: 'bisque'
	},
	formField: {

	}
});
