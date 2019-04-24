import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { auth, db } from '../config';

import TransactionDetail from '../components/TransactionDetailComponent';
import styles from '../styles/stylesComponent';

export default class ItemDetailScreen extends Component {
	state = {
		transactions: []
	}

	componentDidMount() {
		let uid = auth.currentUser.uid;
		db.ref("transactions/" + uid).on("value", snapshot => {
			let transaction = snapshot.val();
			let data = [];
			{
				Object.keys(transaction).map(index => {
					data.push({
						id: index,
						uid: uid,
						item: transaction[index].item,
						qtySold: transaction[index].qtySold,
						unitPrice: transaction[index].unitPrice,
						timestamp: transaction[index].timestamp
					});
				});
			}
			this.setState({
				transactions: Object.values(data)
			});
			console.log(this.state.transactions);
		})
	}

	render() {
		return (
			<View>
				<ScrollView>
					{this.state.transactions.length > 0 ? (
						<TransactionDetail
							transactionData={this.state.transactions}
						/>
					) : (
						<Text>No sales yet</Text>
					)}
				</ScrollView>
			</View>
		);
	}
}
