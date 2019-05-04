import React, {Component} from 'react';
import {Modal, TouchableHighlight, View, Alert,TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';
import { auth, db } from '../config';
import OfflineNotice from './OfflineNotice';
import styles from '../styles/stylesComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class EditModal extends Component {
    constructor(props){
        super(props);
    }
    static propTypes = {
      item: PropTypes.object,
      refresh: PropTypes.func
    };
    state = {
        modalVisible: false,
        itemId: this.props.item.id,
        itemName: this.props.item.name,
        itemPrice: this.props.item.price,
        itemQty: this.props.item.quantity,
        userId: this.props.item.uid,
        errorQty: false,
       errorPrice: false,
        errorName: false,
        submitValid: true
      };
              
    toggleModalVisibility = () => {
        this.setState({
          modalVisible: !this.state.modalVisible
        });
      };

  handleDelete = (itemId) => {  
    let userId = auth.currentUser.uid;  
    db.ref('products/' + userId).child(itemId).remove();
  }

  deleteCombo = () => {
    this.toggleModalVisibility();
    this.props.refresh();
    this.handleDelete(this.state.itemId);
    
  }

  updateCombo = () => {
    this.toggleModalVisibility();
    this.handleSubmit();
  }

  handleNameVal = (nam) => {
    const reg = /^[a-zA-Z\s]*$/;
    let correctName = nam.match(reg) ? this.setState({submitValid: true, errorName: false}) : this.setState({errorName: true,  submitValid: false});
    this.setState({
    itemName: nam
    });
  }


  handlePriceVal = (pri) => {
    const reg = /^(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.[0-9]{2})?$/;
    let correctPrice = pri.match(reg) ? this.setState({submitValid: true, errorPrice: false}) : this.setState({errorPrice: true, submitValid: false});
    this.setState({
     itemPrice: pri
    })
  }

  handleQtyVal = (qty) => {
    const reg = /^[1-9]\d*$/;
    let correctQuantity = qty.match(reg) ? this.setState({submitValid: true, errorQty: false}) : this.setState({errorQty: true, submitValid: false});
    this.setState({
      itemQty: qty
    });
  }


  handleSubmit = () => {

    if(this.state.submitValid){ 
      db.ref('products/' + this.state.userId + '/' + this.state.itemId + '/name').set(
      this.state.itemName
    );
    db.ref('products/' + this.state.userId + '/' + this.state.itemId + '/price').set(
      this.state.itemPrice
      );
    db.ref('products/' + this.state.userId + '/' + this.state.itemId + '/quantity').set(
      this.state.itemQty
      );
      //alert('item edited!');
    
    }

  };

  render() {
    let errorQtyVisible;
    let errorNameVisible;
    let errorPriceVisible;
    this.state.errorName ? (errorNameVisible = <Text style={styles.errorMessage} >Only accepts text input</Text>) : null;
    this.state.errorPrice ? (errorPriceVisible = <Text style={styles.errorMessage} >Only accepts price format:XX.XX </Text>) : null;
    this.state.errorQty ? (errorQtyVisible = <Text style={styles.errorMessage} >Only accepts a number</Text>) : null;
    return (
      <View>
        <OfflineNotice/>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={styles.modalContainer}>
            <View>
              <TextInput
              ref={ref => this.nameInputRef = ref}
              style={this.state.errorName ? styles.modalErrorInput: styles.modalInput}
              onChangeText={(text) => this.handleNameVal(text)}
              placeholder={this.props.item.name}
              />
            {errorNameVisible}
            <TextInput
                ref={ref => this.priceInputRef = ref}
                style={this.state.errorPrice ? styles.modalErrorInput: styles.modalInput}
                onChangeText={(text) => this.handlePriceVal(text)}
                placeholder={this.props.item.price}
               
            />
            {errorPriceVisible}
            <TextInput
                ref={ref => this.quantityInputRef = ref}
                style={this.state.errorQty ? styles.modalErrorInput: styles.modalInput}
                onChangeText={(text) => this.handleQtyVal(text)}
                placeholder={this.props.item.quantity}
               
            />
            {errorQtyVisible}
            <View style={styles.buttonLayout} >

              <TouchableHighlight
                style={styles.button}
                onPress={this.deleteCombo}                  
              >
              <Text style={{color:'white'}}>Delete</Text>
              </TouchableHighlight>
          

              
              <TouchableHighlight
                style={styles.button}
                onPress={this.updateCombo}                     
              >
                <Text style={{color:'white'}}>Update</Text>
              </TouchableHighlight>
              

              
                <TouchableHighlight
                style={styles.button}
                onPress={this.toggleModalVisibility} 
                >
                <Text style={{color:'white'}}>Cancel</Text>
                </TouchableHighlight>
              
                </View>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
        style={styles.button}
         onPress={this.toggleModalVisibility}
        >
         
          <Text style={{color:'white'}}>Edit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}