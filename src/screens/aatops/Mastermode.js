import React, { Component } from "react";
import { TouchableOpacity, StyleSheet,Text, Platform, Image,View, Dimensions, ScrollView,} from 'react-native';
import {
  Thumbnail,
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Badge,
  Left,
  Right,
  Body,
  Footer,
  Item,
  Input
} from "native-base";

import VerticalSlider from 'rn-vertical-slider'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const { width, height } = Dimensions.get('window');

//import styles from "./styles";
const styles=StyleSheet.create({
  container: {
    backgroundColor: "#f5f9f8",
    flex:1,
  },
  header: {
    backgroundColor: "#212121",
  },
  content:{
    flex:1
  },
   box1:{
     flex:1
   },
   box2:{
     flex:2
   },
   box3:{

   },
  mb: {
    marginBottom: 10
  },

  buttonon: {
  margin: 10,
  backgroundColor: '#33d9e1',
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  height: 28,
  width: 45
},

buttonoff: {
margin: 10,
backgroundColor: '#fff',
borderRadius: 5,
alignItems: 'center',
justifyContent: 'center',
height: 28,
width: 45
},

  buttonText: {
  color: '#000000',
  fontSize: 16,
  fontWeight: 'bold',
},
    footer:{
      backgroundColor: "#019875",
      height:50,

    },

  header: {
    backgroundColor: "#1e2d28",


  },

});
const logo = require("../../../assets/record.png");
const start = require("../../../assets/MasterMode/start.png");
const stop = require("../../../assets/MasterMode/stop.png");
const listen = require("../../../assets/MasterMode/hear1.png");
const listenstop= require("../../../assets/MasterMode/hear2.png");
const connected= require("../../../assets/MasterMode/wifi_connect.png");
const unconnected= require("../../../assets/MasterMode/wifi_unconnect.png");

const action = require("../../../assets/MasterMode/Action.png");
const action2 = require("../../../assets/MasterMode/Action2.jpg");
const card1 = require("../../../assets/MasterMode/card1.png");
const card2 = require("../../../assets/MasterMode/card2.png");



class Mastermode extends Component {
  constructor(props) {
      super(props);
      this.state = { iconName: logo, volumn: 0, record:start, onrecord: false,
      connection:false, connectBtn:connected,
      Track1on:false,Track2on:false,Track3on:false,
      hearT1:false,hearT2:false,hearT3:false,
      hearT1Btn:listen,hearT2Btn:listen,hearT3Btn:listen,
      isPlaying:false,
      counter:0,
      min: 0,
      sec: 0
    };
      this.audioRecorderPlayer = new AudioRecorderPlayer();
      this.onStartRecord = this.onStartRecord.bind(this);
      this.onStopRecord = this.onStopRecord.bind(this);
      this.onStartPlay=this. onStartPlay.bind(this);
      this.onPausePlay=this. onPausePlay.bind(this);
      this.timer = null;
    }


  count = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      min: Math.floor((prevState.counter + 1) / 60) % 60,
      sec: (prevState.counter + 1) % 60,
    }));
  }

    onStartRecord() {
      this.timer = setInterval(this.count, 1000);
    }

    onStopRecord() {
      clearInterval(this.timer);
    }

  // onStartPlay() {
  //    console.log('start-play');
  // }
  onStartPlay() {
      console.log('onStartPlay');
      const path = 'sdcard/Sample10.mp4';
      this.audioRecorderPlayer.setVolume(1);
      const msg = this.audioRecorderPlayer.startPlayer(path);
      console.log(msg);
      this.setState({
          isPlaying: true
      });
  }

  // onPausePlay() {
  //    console.log('pause-play');
  // }
  onPausePlay() {
    this.audioRecorderPlayer.pausePlayer();
    this.setState({
        isPlaying: false
    });

  }

  render() {
    console.log('now', this.state.volumn);
     let dimensions = Dimensions.get("window");
     let imageHeight = Math.round((dimensions.width * 9) / 16);
     let imageWidth = dimensions.width;


    return (

<Container style={styles.container}>

                   <Header style={styles.header}>
                     <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="menu" />
                        </Button>
                     </Left>
                     <Body>
                       <Title>中華郵政</Title>
                     </Body>
                     <Right>
                     </Right>
                   </Header>

 <Content>

      <ScrollView  horizontal={true} >

               <Image
                 style={{ height:  imageHeight , width: imageWidth }}
                 source={action}
               />

               <Image
                 style={{height:  imageHeight , width: imageWidth}}
                 source={action2}
               />

      </ScrollView>

      <View style={{flex:3,justifyContent: 'center',alignSelf: 'center'}}>
      <Text style={{fontWeight: 'bold', fontSize: 26, height:30, color:'#435366',alignItems:  'flex-start',margin:20,}}>公 告 與 通 知</Text>
      </View>

      <ScrollView style={{paddingRight:15,paddingLeft:15,paddingBottom:15}}>

                 <Image
                   style={{ paddingBottom:15 }}
                   source={card1}
                 />
                 <View style={{height:15}}>
                 </View>

                 <Image
                   style={{ paddingBottom:15}}
                   source={card2}
                 />

       </ScrollView>

 </Content>
      <Footer  style={styles.footer}>
      </Footer>
</Container>
    );


  }
}



export default Mastermode;
