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
      width:'70%',
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
export default class Client_connect1 extends Component<Props>{
  constructor(props){
    super(props);
    this.room_number=-1;
  }
  render(){
//console.log("master1 props",this.props.screenProps);
    return(

        <View style={styles.background_view}>
            <KeyboardAvoidingView behavior="height"  style={styles.form}>
                <View style={{flex:2}}></View>
                <View style={{backgroundColor:'',flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:fontSize1, color:styles.text.color, textAlign:'center'}}>Connect Fail</Text>
                </View>

                <View style={{backgroundColor:'',flex:3,alignItems:'center'}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:6}}>
                        <Image
                          source={require('./images/key.png')}
                          style={{ width: 100, height:100 }}
                        />
                    </View>

                </View>

                <View style={{backgroundColor:'',flex:3,alignSelf:'center',alignItems:'flex-start',flexDirection:'row'}}>
                    <Text style={{fontSize:fontSize1,color:styles.text.color}}>Try again:</Text>
                    <TextInput
                         keyboardType='numeric'

                         underlineColorAndroid={input_text_color}
                         style={{color:input_text_color,fontSize:fontSize1}}
                         maxLength={4}  //setting limit of input
                         onChangeText={n=>{this.room_number=n;}}
                    />
                </View>

                <View style={{backgroundColor:'',flex:3,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <Button type='solid' title="Try" buttonStyle={styles.button} onPress={()=>{
                      //this.props.ch_page(2);
                    // this.props.screenProps.send({event:'join_room',user_id:'master',room:this.room_number});
                     //this.props.screenProps.set_room_number(this.room_number);
                      //this.props.ch_mode(2);
                      //this.props.navigation.navigate("Master2")
                    }}/>
                    <Button type='solid' title="Back" buttonStyle={styles.button} onPress={()=>{
                      //this.props.ch_page(2);
                    // this.props.screenProps.send({event:'join_room',user_id:'master',room:this.room_number});
                     //this.props.screenProps.set_room_number(this.room_number);
                      //this.props.ch_mode(2);
                      //this.props.navigation.navigate("Master2")
                    }}/>

                </View>
          </KeyboardAvoidingView>
        </View>

    );
  }

}
