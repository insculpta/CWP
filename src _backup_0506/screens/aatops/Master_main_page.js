import React ,{Component} from 'react';
import {View,Text} from 'react-native';
import { StyleSheet } from 'react-native';
import { Image} from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

import {
  Header,
  Icon,
  Left,
  Right,
  Body,
  Container,
  Content,
  Button,
  Title,
  Card, CardItem,
  Thumbnail
} from "native-base";
import No_connected from './No_connected';
import Card_list from './Card_list';
const fontSize1=30;
const fontSize2=20;
const fontSize3=15;
const special_text_color='#33d9e1';
const styles=StyleSheet.create({
    background_view:{
      backgroundColor:'#484848',
      flex:1
    },
    header: {
      backgroundColor: "#212121",
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

export default class Master_main_page extends Component<Props>{
    constructor(props){
      super(props);
    }

    render() {
      let info,info2;
      //console.log(this.props.screenProps.get_connected_device());
      //console.log(this.props.screenProps)
      //if(this.props.connected_device_cnt==0)
    //  console.log("main");
    //let connected_device=this.props.screenProps.get_connected_device();
    //let connected_device=this.props.screenProps.connected_device;
    //let disconnected_device=this.props.screenProps.get_disconnected_device();
  //  let connected_device_cnt=this.props.screenProps.get_connected_device_cnt();
    //let disconnected_device_cnt=this.props.screenProps.get_disconnected_device_cnt();
  //  console.log(connected_device);
    //console.log(this.props.screenProps.get_connected_device());
    //  info=<Card_list type="connected" connected_device={this.props.screenProps.get_connected_device} connected_device_cnt={this.props.screenProps.get_connected_device_cnt}/>;
    //  info2=<Card_list type="disconnected" connected_device={this.props.screenProps.get_disconnected_device} connected_device_cnt={this.props.screenProps.get_disconnected_device_cnt}/>;
      info=<Card_list type="connected" connected_device={this.props.screenProps.connected_device} connected_device_cnt={this.props.screenProps.connected_device_cnt}/>;
      info2=<Card_list type="disconnected" connected_device={this.props.screenProps.disconnected_device} connected_device_cnt={this.props.screenProps.disconnected_device_cnt}/>;
    ;
      return (
        <View style={styles.background_view}>
        {
          <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Connection</Title>
          </Body>

          <Right><Button transparent
          onPress={()=>{
            if(this.props.screenProps.mode==1){
                this.props.screenProps.all_close();
                console.log("go ot main page");
                this.props.navigation.navigate("Mastermode");
              }
            else {
                this.props.screenProps.close();
                console.log("go ot recorder");
                this.props.navigation.navigate("Recordermode2");
              }
          }}
          ><Thumbnail
           square small source={require("../../../assets/Connection/delete.png")}
            style={{ width: 30, height:30}} />
            </Button></Right>
        </Header>
      }


          <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:fontSize3,color:special_text_color}}>connection number:{this.props.screenProps.get_room()}</Text>
            {
            //   <Button  title="Recoder" onPress={()=>{
            //       if(this.props.screenProps.mode==2)this.props.navigation.navigate("Recordermode2");
            //       else this.props.navigation.navigate("MasterMode");
            //   }}/>
            }
          </View>

          <Card >
             <CardItem bordered >
                  <View style={{flex:1,backgroundColor:'',flexDirection:'row',justifyContent:'space-between'}}>
                      <View style={{alignSelf:'flex-start',backgroundColor:''}}><Text style={{fontSize:fontSize2}}>Master</Text></View>
                      <View style={{alignSelf:'flex-end',backgroundColor:''}}><Text style={{fontSize:fontSize2}}>master</Text></View>
                  </View>
             </CardItem>
         </Card>

        {info}
        {info2}

        </View>
      );
  }
}
