import { StyleSheet, Dimensions } from 'react-native';
import AuthStackComponent from '../components/AuthStackComponent';



export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    color: '#91b43d',
    backgroundColor: '#91b43d',
    flex: 1,
  },
  containerAuthScreens: {
    padding: 30,
    paddingTop: 65,
    alignItems: 'center',
    color: '#91b43d',
    backgroundColor: '#91b43d',
    flex: 1,
  },
  modalContainer: {
    padding: 60,
    paddingTop: 65,
    alignItems: 'center',
    color: '#91b43d',
    backgroundColor: '#91b43d',
    flex: 1,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#656565"
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  footer: {
    alignSelf: "flex-end"
  },
  imageFit: {
    flex: 1,
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    width: '75%',
    margin: 5,
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderColor: '#d7ff8c',
    borderRadius: 4,
    borderWidth: 2,
  },
  errorInput: {
    height: 50,
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderColor: 'red',
    borderRadius: 4,
    borderWidth: 2,
  },
  modalErrorInput: {
    height: 50,
    margin: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
    borderColor: 'red',
    borderRadius: 4,
    borderWidth: 2,
  },
  itemInput: {
    height: 50,
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#d7ff8c',
    borderRadius: 4,
    borderWidth: 2,
  },
  modalInput: {
    height: 50,
    margin: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#d7ff8c',
    borderRadius: 4,
    borderWidth: 2,
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  scrollContainer: {
    backgroundColor: '#91b43d'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center'
  },
  buttonMargin: {
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4a822f',
    width: 120,
    height:30,
    margin:15,
    margin:10,
    paddingTop:5
  },
  buttonLayout:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'center', 
  },
  itemsList: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	itemtext: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 10
	},
	itemCard: {
		marginTop:10,
		marginRight:10,
		marginLeft:10,
		backgroundColor :'#f9f4eb'
  },
  sellButtonLayout: {
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  modalContainer: {
    padding: 60,
    paddingTop: 65,
    alignItems: 'stretch',
    color: '#91b43d',
    backgroundColor: '#91b43d',
    flex: 1,
    
  },

	accordionHeader: {
		backgroundColor: 'white',
		borderBottomColor: 'grey',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	accordionContent: {
		backgroundColor: '#eeeeee'
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  }
});
