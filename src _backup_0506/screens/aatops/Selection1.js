import React ,{Component} from 'react';
import {AppRegistry,View,Text, ActivityIndicator,StyleSheet, TextInput,KeyboardAvoidingView,ScrollView, Keyboard,WebView } from 'react-native';
//import { WebView } from 'react-native-webview';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Image,} from 'react-native-elements';
import {
  Thumbnail,
  Container,
  Header,
  Title,
  Content,
  Icon,
  Badge,
  Button,
  Left,
  Right,
  Body,
  Footer,
  Item,
  Input,
  
} from "native-base";

WEBVIEW_REF = 'webview';

export default class Connection extends Component<props>{
    constructor(props){
      super(props);

this.userAccount = null;
this.userPassword = null;

//this.props.screenProps.set_officeID=this.props.screenProps.set_officeID.bind(this);
//this.props.screenProps.get_officeID=this.props.screenProps.get_officeID.bind(this);
//this.props.screenProps.get_userID = this.props.screenProps.get_userID.bind(this);
    
	this.state={
          userData:168171,
		  officeData:[],
		  testdata : [{ 
		  "name" :"168171",
		  }],	  		  
      		}
      }




    OnGetuserdata = () => {

   
        if (this.userAccount == "") {
            alert("Please enter Account");
            //this.setState({account:'Please enter Account'})

        }

        else if (this.userPassword == "") {
            alert("Please enter Password");
            //this.setState({account:'Please enter password'})
        }
        else {

            fetch('http://140.114.54.22:8080/userdata.php/', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    // we will pass our input data to server
                    account: this.userAccount,
                    password: this.userPassword
                })

            }).then((response) => response.json())
              .then((jsonData) => {
                
				if (jsonData == "Wrong Account") {
					alert("Wrong Account");
					this.userAccount = null;
					this.userPassword = null;
				}
			   
				else if (jsonData == "Wrong Password"){
					alert("Wrong Password");
					this.userPassword = null;
			   
				}				   
													   
				else if (jsonData != "") {
					// redirect to profile page
					this.setState({ userData: jsonData,});
					//this.props.screenProps.set_userID(jsonData);
					//this.goodjob;														
					alert('Login Successfully');					
					this.props.navigation.navigate("Mastermode");
				}
			 
				else
				{alert("Something goes wrong here!");}
			})
			.catch((error) => {
				console.error(error);
			});
        }

    }
	
	 goBack(){
        this.refs[WEBVIEW_REF].goBack();
        }

        goForward(){
        this.refs[WEBVIEW_REF].goForward();
       }


    render(){

    
	const data = this.state.userData;
	//const data = this.props.screenProps.get_userID();
	/* let dataDisplay = data.map(function(jsonData){
	 return (
	   <View key={jsonData.id}>
		<View style={{flexDirection: 'row'}}>
		  <Text style={{color: '#000',width: 30}}>{jsonData.id}</Text>
		  <Text style={{color: '#00f',width: 60}}>{jsonData.name}</Text>
		  <Text style={{color: '#000',width: 80}}>{jsonData.date}</Text>
		  <Text style={{color: '#00f',width: 60}}>{jsonData.work}</Text>
		</View>
	   </View>
	 )
	}); */

	this.userAccount = null;
	this.userPassword = null;
		
      return(


        <Container style={styles.container}>


            <Header style={styles.header}>
              <Left>
                <Image  source={require('./images/cwp_logo.png')}
                style={{ width: 50, height:50,alignSelf:'center',backgroundColor: '#1e2d28'}}/ >
              </Left>
              <Body>
                <Title>中華郵政</Title>
              </Body>
              <Right></Right>
            </Header>

				
            <View  style={styles.content}> 
		
             		
				
			
			<KeyboardAwareScrollView>
			<ScrollView>	     

                <View style={{flex:3,justifyContent: 'center',alignSelf: 'center'}}>
                    <Image  source={require('./images/cwp_logo.png')} style={{ width: 150, height:150,alignSelf: 'center',margin:15}}/ >
                    <Text style={{fontWeight: 'bold', fontSize: 30, height:34, color:'#435366',alignItems:  'flex-start',margin:15,}}>郵務智慧排班系統</Text>

                </View>

            <View style={{height:10}}>
            </View>

                <View style={{flex:2,alignItems :'center',justifyContent: 'center'}}>

                        <View style={styles.input}>
                        <TextInput
                             placeholder="  請輸入帳號"
                             keyboardType='default'
                             autoFocus={true}
                             underlineColorAndroid='#d6dee2'
                             onChangeText={(text) => {this.userAccount = text}}
                             style={{fontSize:20, color:'#6A6C6E',height:45}}
                             ref={input => { this.accountInput = input }}
                        /></View>
                        <View style={styles.input}>
                        <TextInput
                             placeholder="  請輸入密碼"
                             keyboardType='default'
                             secureTextEntry= {true}
                             autoFocus={true}
                             underlineColorAndroid='#d6dee2'
                             onChangeText={(text) => {this.userPassword = text}}
                             style={{fontSize:20, color:'#d6dee2',height:45}}
                             ref={input => { this.passwordInput = input }}

                        /></View>

                 </View>


            <View style={{height:30}}>
            </View>

            <View style={{flex:2,flexDirection: 'row',alignItems: 'center',}} >

              <View style={{flex: 1 ,alignItems: 'center',justifyContent: 'flex-end',flexDirection: 'column'}}>

                <View>
                    <Button transparent onPress={() => {  
                    this.OnGetuserdata();
					//this.goodjob();
					//alert('login successfully!');				
					//this.props.navigation.navigate("Mastermode");
					

                    }}><Image
                      source={require('./images/login.png')}
                      style={{ }}/>
                      </Button>
                  </View>


              </View>

          </View>

            <View style={{height:30}}>
            </View>



          <View style={{flex:2, alignSelf:'center',justifyContent: 'flex-start'} }>

              <View style={{alignSelf: 'center',justifyContent: 'center'}}>
              <Button transparent   
			  onPress ={()=>{
				//alert("Please contact the system manager!");
			  //this.props.screenProps.set_userID(this.state.userdata);
			  this.props.navigation.navigate("Mastermode");}} >
              <Text style={styles.underline}>測試人員點此</Text>				
              </Button>
              </View>

		</View>
		


		

		
		
        </ScrollView>
        </KeyboardAwareScrollView>

      <Footer  style={styles.footer}>
      </Footer>


      </View>


      </Container>
      );
    }
}




const fontSize1=30;
const fontSize2=20;
const styles=StyleSheet.create({
    container:{
      backgroundColor:'#f5f9f8',
      flex:1
    },
    button:{
      backgroundColor:'#7b7b7b',
      width:'80%',
      height:'60%',
      alignSelf:'center'

    },
    text:{
      color:"#ffffff"
    },

    header: {
      backgroundColor: "#1e2d28",


    },
    content:{
               position: 'absolute',
               top: 56,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor: 'transparent'
    },
    footer:{
      backgroundColor: "#019875",
      height:50,

    },
    modetext:{
      fontSize:10
    },
    underline:{
      textDecorationLine: 'underline',
      fontWeight: 'bold',fontSize:15, color:'#7b7b7b',

    },

    input:{
      borderColor: '#d6dee2',
      borderRadius:3,
      width:300,
      fontSize:30, color:'#d6dee2',height:45,
      margin:5,
    },
});

