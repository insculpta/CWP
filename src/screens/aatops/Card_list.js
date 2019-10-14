import React ,{Component} from 'react';
import {View,Text} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body ,Right,Icon} from 'native-base';
import Connected_card from './Connected_card';
const fontSize1=30;
const fontSize2=20;
const fontSize3=15;
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

export default class Card_list extends Component<Props>{
    constructor(props){
      super(props);
    }

    render(){
     //console.log("g",this.props.connected_device());
      return(
        <View style={{backgroundColor:''}}>
            <Text style={{fontSize:fontSize2,color:styles.text.color}}>{this.props.type} device:{this.props.connected_device_cnt}</Text>
            <Card >
              <Connected_card connected_device={this.props.connected_device} type={this.props.type}/>
           </Card>
        </View>
      );
    }
}
