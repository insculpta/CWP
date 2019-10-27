import React ,{Component} from 'react';
import {AppRegistry,View,Text, ActivityIndicator,StyleSheet, TextInput,KeyboardAvoidingView,ScrollView, Keyboard} from 'react-native';
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
  Input
} from "native-base";

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



export default class Connection extends Component{
    constructor(props){
      super(props);
      this.state={

      		}
this.userAccount = null;
this.userPassword = null;

      }


login = () =>{

    //const {employee,work} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(this.userAccount==""){
        alert("Please enter Account");
      //this.setState({account:'Please enter Account'})

    }

/* 	else if(reg.test(this.employee) === false)
    {
    //alert("Account is Not Correct");
    this.setState({account:'Account is Not Correct'})
    return false;
      } */

    else if(this.userPassword==""){
    alert("Please enter Password");
    //this.setState({account:'Please enter password'})
    }
    else{

    fetch('http://140.114.54.22:8080/login.php/',{
        method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            // we will pass our input data to server
            account: this.userAccount,
            password: this.userPassword
        })

    })
    .then((response) => response.json())
     .then((jsonData)=>{

         if(jsonData == "Correct"){
             // redirect to profile page
             alert("Successfully Login");
             this.props.navigation.navigate("Mastermode")

         }else if (jsonData == "Wrong Password"){
             alert("Wrong Password");
             this.passwordInput.clear();
             this.userPassword=null;
         }
         else if (jsonData == "Wrong Account"){
            alert("Wrong Account");
            this.accountInput.clear();
            this.passwordInput.clear();
            this.userAccount=null;
            this.userPassword=null;
         }
     })
     .catch((error)=>{
     console.error(error);
     });
    }




}

    render(){


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
              <Right />
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
                    <Button transparent onPress={
                     this.login

                    }><Image
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
              <Button transparent onPress={()=>{
                this.props.navigation.navigate("Mastermode");
                }}>
              <Text style={styles.underline}>無法登入？</Text>

              </Button>
              </View>

          </View>

            <View style={{height:45}}>
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
