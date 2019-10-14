import React ,{Component} from 'react';
import {View,Text} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body ,Right,Icon} from 'native-base';
const fontSize1=30;
const fontSize2=15;
const special_text_color='#33d9e1'
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

export default class No_connect extends Component<Props>{
    constructor(){
      super();
    }

    render(){
      return(
        <View style={{alignItems:'center'}}>
          <Text style={{textAlign:'center',fontSize:fontSize1,color:styles.text.color}}>No connected device</Text>
          <Text style={{textAlign:'center',fontSize:fontSize2,color:styles.text.color}}>let recoder devices enter the connection number</Text>
        </View>
      );
    }
}
