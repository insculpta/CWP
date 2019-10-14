import React ,{Component} from 'react';
import {View,Text,TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
const fontSize1=30;
const fontSize1_5=25;
const fontSize2=15;
const special_text_color='#33d9e1';
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
    }
});
export default class Master2 extends Component<Props>{
  constructor(props){
    super(props);
  }
  render(){
    return(

        <View style={styles.background_view}>

                <View style={{flex:2}}></View>
                <View style={{backgroundColor:'',flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:fontSize1, color:styles.text.color}}>Create Sucessfully!!</Text>
                </View>

                <View style={{backgroundColor:'',flex:3,alignItems:'center'}}>

                  <Image
                    source={require('./images/check.png')}
                    style={{ width: 100, height:100 }}
                  />
                  <Text style={{fontSize:fontSize1,color:special_text_color}}>{this.props.room_number}</Text>
                </View>



                <View style={{backgroundColor:'',flex:3,flexDirection:'column',alignSelf:'center',alignItems:'center'}}>

                    <Text style={{fontSize:fontSize1_5,color:styles.text.color,textAlign:'center'}}>Now, let recoders enter the number to conneect with you</Text>

                </View>
                <View style={{flex:3}}>
                    <Button type='solid' title="OK" buttonStyle={styles.button} onPress={()=>this.props.ch_page(3)}/>

                </View>

        </View>

    );
  }

}

//
// <View style={{flex:3,alignSelf:'center',alignItems:'center',flexDirection:'row'}}>
//
// </View>

// <View style={{flex:5,flexDirection:'column',alignSelf:'center',alignItems:'center'}}>
//     <Text style={{fontSize:fontSize1_5,color:styles.text.color,alignSelf:'center'}}>Now, let recoders enter the number</Text>
//     <Text style={{fontSize:fontSize1_5,color:styles.text.color,alignSelf:'center'}}>to conneect with you</Text>
// </View>
