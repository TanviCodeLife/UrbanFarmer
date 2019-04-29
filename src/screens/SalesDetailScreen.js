import React, { Component } from 'react';
import { View, Text, RefreshControl, ScrollView } from 'react-native';
import { auth, db } from '../config';
import OfflineNotice from '../components/OfflineNotice';

import Loading from '../components/Loading';
import TransactionDetail from '../components/TransactionDetailComponent';
import styles from '../styles/stylesComponent';

export default class ItemDetailScreen extends Component {
	state = {
		transactions: [],
		loading: true,
		refreshing: false
	}

	componentDidMount() {
		this.getTransactions()
	}

	getTransactions = async () => {
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
				transactions: Object.values(data),
				loading: false
			});
		})
	}

	clearTransactions = () => {
		this.setState({
			transactions: []
		});
	}

	handleRefresh = () => {

		this.setState({
			refreshing: true,
			loading: true
		});
		this.clearTransactions();
		this.getTransactions().then(() => {
			this.setState({refreshing: false});
		});
	}

	render() {
		let content;
		if (this.state.loading == false) {
			{this.state.transactions.length > 0 ? (
				content = 
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.handleRefresh}
						/>
					}
				>
					<TransactionDetail
						transactionData={this.state.transactions}
					/>
				</ScrollView>
			) : (
				content = <Text>No sales yet</Text>
			)}
		} else {
			content = <Loading />
		}

		return (
			<View>
				<OfflineNotice />
				{content}
			</View>
		);
	}
}
