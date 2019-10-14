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
      width:'60%',
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
export default class Master1 extends Component<Props>{
  constructor(props){
    super(props);
    this.room_number=-1;
  }
  render(){
    return(

        <View style={styles.background_view}>
            <KeyboardAvoidingView behavior="height"  style={styles.form}>
                <View style={{flex:2}}></View>
                <View style={{backgroundColor:'',flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:fontSize1, color:styles.text.color}}>First,</Text>
                    <Text style={{fontSize:fontSize1 ,color:styles.text.color}}>Create a connection number!</Text>

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

                <View style={{backgroundColor:'',flex:3,alignSelf:'center',alignItems:'flex-start',flexDirection:'row'}}>
                    <Text style={{fontSize:fontSize1,color:styles.text.color}}>Enter Here:</Text>
                    <TextInput
                         keyboardType='numeric'
                         autoFocur='true'
                         underlineColorAndroid={input_text_color}
                         style={{color:input_text_color,fontSize:fontSize1}}
                         maxLength={4}  //setting limit of input
                         onChangeText={n=>{this.room_number=n;}}
                    />
                </View>

                <View style={{flex:3}}>
                    <Button type='solid' title="Create" buttonStyle={styles.button} onPress={()=>{
                      this.props.ch_page(2);
                      this.props.send({event:'create_room',user_id:'master',room_number:this.room_number});
                      this.props.set_room_number(this.room_number);
                      this.props.ch_mode(2);
                    }}/>

                </View>
          </KeyboardAvoidingView>
        </View>

    );
  }

}
