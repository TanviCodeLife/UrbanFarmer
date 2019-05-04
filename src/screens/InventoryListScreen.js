import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db, auth } from "../config";
import Loading from '../components/Loading';
import OfflineNotice from '../components/OfflineNotice';
import styles from '../styles/stylesComponent';



export default class InventoryListScreen extends Component {
  state = {
    products: [],
    refreshing: false,
  };
  

  componentDidMount() {
    this.getProducts()
  }
  
  getProducts = async () => {
    let uid = auth.currentUser.uid
    db.ref("/products/" + uid).on("value", snapshot => {
      let items = snapshot.val();
      let data = [];
      {
        Object.keys(items).map(index => {
          data.push({
            id: index,
            uid: uid,
            name: items[index].name,
            price: items[index].price,
            quantity: items[index].quantity
          });
        });
      }
      let products = Object.values(data);
      this.setState({ products });
    });
  }

  clearProductList = () => {
    this.setState({
      products: []
    });
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    this.clearProductList();
    this.getProducts().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <OfflineNotice/>
        {this.state.products.length > 0 ? (
          <ScrollView
            style={styles.scrollContainer}
           refreshControl= {
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }
          >
            {this.state.products.map((product) => {
              return(
                <ItemComponent
                  key={product.id}
                  product={product}
                  refresh={this.handleRefresh}
                />
              )
            })}
          </ScrollView>
          ) : (
            <Loading/>
          )}
      </View>
    );
  }
}