import React ,{Component} from 'react';
import {View,Text} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body ,Right,Icon} from 'native-base';

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

export default class Connected_card extends Component<Props>{

    constructor(props){
      super(props);
    }

    render(){
    //  console.log(this.props.connected_device);
      return this.props.connected_device.map((device)=>{
            return(
              <View>
                  <CardItem bordered >
                      <View style={{flex:1,backgroundColor:'',flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{alignSelf:'flex-start',backgroundColor:''}}>
                                <Text style={{fontSize:fontSize2}}>{device.user_name}</Text>
                            </View>
                            <View style={{alignSelf:'flex-end',backgroundColor:''}}>
                                <Text style={{fontSize:fontSize2}}>{this.props.type}, {device.track}</Text>
                            </View>
                        </View>
                  </CardItem>
              </View>
            );
        });

    }
}
