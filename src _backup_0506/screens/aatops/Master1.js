import React ,{Component} from 'react';
import {View,Text,TextInput,KeyboardAvoidingView} from 'react-native';
import { StyleSheet,Item,Input } from 'react-native';
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
    },

});
export default class Master1 extends Component<Props>{
  constructor(props){
    super(props);
    this.room_number=-1;
  }
  render(){
//console.log("master1 props",this.props.screenProps);
  //console.log(this.props);
    return(

        <View style={styles.background_view}>
            <KeyboardAvoidingView behavior=""  style={styles.form}>
                <View style={{flex:2}}></View>
                <View style={{backgroundColor:'',flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:28,fontWeight: 'bold',color:styles.text.color,textAlign:"center"}}>First,</Text>
                    <Text style={{fontSize:24, fontWeight: 'bold',color:styles.text.color,textAlign:"center"}}>create a connection number!</Text>

                </View>

                <View style={{backgroundColor:'',flex:3,alignItems:'center'}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:6}}>
                        <Image
                          source={require('./images/connect.png')}
                          style={{ width: 100, height:100 }}
                        />
                    </View>

                </View>

                <View style={{flex:3,alignSelf:'center',alignItems:'center',paddingBottom: 30,flexDirection:'row'}}>
                    <Text style={{fontSize:24,fontWeight: 'bold',color:styles.text.color,marginRight: 5}}>Enter Here:</Text>
                    <View style={{width:60}}>
                    <TextInput
                         placeholder="####"
                         keyboardType='numeric'
                         autoFocur='true'
                         underlineColorAndroid='#33d9e1'
                         style={{fontSize:22, color:'#33d9e1',height:45}}
                         maxLength={4}  //setting limit of input
                         onChangeText={n=>{this.room_number=n;}}
                    /></View>
                </View>

                <View style={{flex:3}}>
                    <Button type='solid' title="Create" buttonStyle={styles.button} onPress={()=>{
                      //this.props.ch_page(2);
                     this.props.screenProps.send({event:'create_room',user_name:'master',room:this.room_number});
                     this.props.screenProps.set_room_number(this.room_number);
                      //this.props.ch_mode(2);
                      this.props.navigation.navigate("Master2")
                    }}/>
                    {
                      // <Button title="download "onPress={
                      //   ()=>{this.props.screenProps.upload("ddd.jpg");}
                      // }/>
                    }

                </View>
          </KeyboardAvoidingView>

        </View>

    );
  }

}
