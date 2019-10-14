import React ,{Component} from 'react';
import {View,Text,TextInput,KeyboardAvoidingView} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
const fontSize1=30;
const fontSize2=15;
const input_text_color='#33d9e1'
const styles=StyleSheet.create({
    background_view:{
      backgroundColor:'#484848',
      flex:1
    },
    button:{
      backgroundColor:'#7b7b7b',
      width:'40%',
      height:'60%',
      alignSelf:'center'

    },
    text:{
      color:"#ffffff",
    },
    form: {
      flex: 1,
      justifyContent: 'space-between',
    }
});
export default class Client_connect_success extends Component<Props>{
  constructor(props){
    super(props);
    this.name="";
  }
  render(){
//console.log("master1 props",this.props.screenProps);
    return(

        <View style={styles.background_view}>
            <KeyboardAvoidingView behavior=""  style={styles.form}>
                <View style={{flex:2}}></View>
                <View style={{backgroundColor:'',flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:24, fontWeight: 'bold', color:styles.text.color, textAlign:'center'}}>Connect Successfully!!</Text>
                </View>

                <View style={{flex:3,alignItems:'center'}}>

                    <View style={{flex:6}}>
                        <Image
                          source={require('./images/link.png')}
                          style={{ width: 100, height:100 }}
                        />
                    </View>

                </View>

                <View style={{backgroundColor:'',flex:1,alignSelf:'center',alignItems:'flex-start',flexDirection:'row'}}>
                    <Text style={{fontSize:24, fontWeight: 'bold',color:styles.text.color,marginRight: 5}}>Enter your name:</Text>

                </View>
                <View style={{backgroundColor:'',flex:2,alignSelf:'center',alignItems:'flex-start',flexDirection:'row'}}>
                <View style={{width:100}}>
                <TextInput
                     placeholder="My Name"
                     autoFocur='true'
                     underlineColorAndroid='#33d9e1'
                     style={{fontSize:22, color:input_text_color,height:45}}
                     onChangeText={n=>{this.name=n;}}
                /></View>
                </View>

                <View style={{flex:3}}>
                    <Button type='solid' title="OK" buttonStyle={styles.button} onPress={()=>{
                      //this.props.ch_page(2);
                    // this.props.screenProps.send({event:'join_room',user_id:'master',room:this.room_number});
                     //this.props.screenProps.set_room_number(this.room_number);
                      //this.props.ch_mode(2);
                      this.props.screenProps.send({event:'ch_name',  new_name:this.name,  room:this.room_number});
                      this.props.screenProps.ch_name(this.name);
                      this.props.navigation.navigate("Master_main_page");
                    }}/>

                </View>
          </KeyboardAvoidingView>
        </View>

    );
  }

}
