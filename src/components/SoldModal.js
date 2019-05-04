import React, {Component} from 'react';
import { Button } from 'react-native';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import PropTypes from 'prop-types';
import { db } from '../config';
import styles from '../styles/stylesComponent';

export default class SoldModal extends Component {
  state = {
    modalVisible: false,
    itemId: this.props.item.id,
    itemName: this.props.item.name,
    itemPrice: this.props.item.price,
    itemQty: this.props.item.quantity,
    userId: this.props.item.uid,
    itemStock: this.props.item.quantity,
    quantityToSell: 0,
    purchase: false
  };
  
  handlePurchase = () => {
    let newQty = this.state.itemQty - this.state.quantityToSell;
    let strQty = newQty.toString();
    db.ref('products/' + this.state.userId + '/' + this.state.itemId + '/quantity').set(strQty);
    this.setState({
      itemQty: newQty
    });
    this.createSale();
    this.handleCloseModal();
  }
  
  createSale = () => {
    let sale = {
      item: this.state.itemName,
      unitPrice: this.state.itemPrice,
      qtySold: this.state.quantityToSell,
      timestamp: Date.now()
    }
    db.ref('transactions/'+ this.state.userId).push(sale);
  }

  handleCloseModal = () => {
    this.resetQuantityToSell();
    this.toggleModalVisibility();
  }
  
  handleAdd = () => {
    if (this.state.itemStock > this.state.quantityToSell) {
      const add = this.state.quantityToSell + 1;
      this.setState({
        quantityToSell: add
      });
    }
  }
    
  handleSubtract = () => {
    if (this.state.quantityToSell > 0) {
      const subtract = this.state.quantityToSell - 1;
      this.setState({
        quantityToSell: subtract
      });
    }
  }
    
  toggleModalVisibility = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  resetQuantityToSell = () => {
    this.setState({
      quantityToSell: 0
    });
  }

  static propTypes = {
    item: PropTypes.object
  };

  render() {
    let purchaseButton;

    if (this.state.quantityToSell == 0) {
      purchaseButton =  <TouchableHighlight 
      style={styles.button}>
      <Text>PurchaseButton</Text>
      </TouchableHighlight>

    } else {

      purchaseButton =  <TouchableHighlight 
      style={styles.button}
      onPress = {this.handlePurchase}>
      <Text style={{color:'white'}}> PurchaseButton</Text>
      </TouchableHighlight>
    }

    return (
      <View style={{marginTop: 25}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer} >
          {(this.state.itemQty  === 0) ? ( 
          <View >
            <Text>Out of Stock.</Text>
            <Button
              title="OK"
              onPress={this.toggleModalVisibility}
            />
          </View>) : (
          <View>
            <Text style={styles.itemInput}>{this.state.itemName}</Text>

				    <Text style={styles.itemInput}>{this.state.itemQty} available at ${this.state.itemPrice} each</Text>

            <Text style={styles.itemInput}>Sell: {this.state.quantityToSell} {this.state.itemName}</Text>
            <View style={styles.sellButtonLayout}>

              <TouchableHighlight
              style={styles.button}
               onPress={this.handleAdd}
              >
                <Text style={{color:'white'}}>+</Text>
              </TouchableHighlight>

              <TouchableHighlight
              style={styles.button}
              onPress={this.handleSubtract}
              >
                <Text style={{color:'white'}}>-</Text>
              </TouchableHighlight>
             
              <TouchableHighlight
              style={styles.button}
              onPress={this.handleCloseModal}
              >
                <Text style={{color:'white'}}>Cancel</Text>
              </TouchableHighlight>
              
              
              {purchaseButton}
           

              </View>
         
            </View>
          )}
          </View>
        </Modal>

        <TouchableHighlight
        style={styles.button}
          onPress={this.toggleModalVisibility}
        >
         <Text style={{color:'white'}}>Sell</Text>
        </TouchableHighlight>
      </View>
    );
  }
}




