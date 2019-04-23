import React, { Component } from 'react';
import { View, TextInput,	Button, Text,	Alert } from 'react-native';
import { auth } from '../config';
import AsyncStorage from '@react-native-community/async-storage';

import styles from '../styles/stylesComponent';

export default class CreateUserScreen extends Component {
	state = {
		email: '',
		password: ''
	};

	handleSubmit = () => {
		auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(response => {
			if (response.user) {
				this.storeData('uid', response.user.uid).then(() => {
					this.props.navigation.navigate('AppStack');
				})
			} else {
				alert('Oops! There was a problem with that. Try again plz.');
			}
		});
	}

	storeData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			Alert.alert(e.message)
		}
	}



	render() {
		return(
			<View style={styles.container}>
				<Text style={{fontWeight: 'bold', fontSize: 24}}>URBAN FARMER</Text>
				<Text>Sign Up</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => this.setState({email: text})}
					placeholder="E-Mail"
				/>
				<TextInput
					style={styles.input}
					onChangeText={(text) => this.setState({password:text})}
					secureTextEntry={true}
					placeholder="Password"
				/>
				<Button
					onPress={this.handleSubmit}
					title="Submit"
					color="#4a822f"
				/>
			<Text>{'\nOops, I\'m already an returning user...\n'}</Text>
				<Button
					onPress={() => this.props.navigation.navigate('SignIn')}
					title="Return to Login"
					color="#4a822f"
				/>
			</View>
		);
	}
}