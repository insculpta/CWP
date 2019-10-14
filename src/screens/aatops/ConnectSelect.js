import React ,{Component} from 'react';
import {View,Text, ActivityIndicator,StyleSheet  } from 'react-native';
import {Image } from 'react-native-elements';
import {
  Thumbnail,
  Container,
  Header,
  Title,
  Content,
  Icon,
  Badge,
  Button,
  Left,
  Right,
  Body,
  Footer,
  Item,
  Input
} from "native-base";

const fontSize1=30;
const fontSize2=20;
const styles=StyleSheet.create({
    container:{
      backgroundColor:'#484848',
      flex:1
    },
    button:{
      backgroundColor:'#7b7b7b',
      width:'80%',
      height:'60%',
      alignSelf:'center'

    },
    text:{
      color:"#ffffff"
    },

    header: {
      backgroundColor: "#212121",
    },
    content:{
      flex:1,


    },
    footer:{
      backgroundColor: "#484848",
      height:24
    },
    modetext:{
      fontSize:10
    },
    underline:{
      textDecorationLine: 'underline',
      fontWeight: 'bold',fontSize:15, color:'#666666',

    },
});
export default class Connection extends Component{
    constructor(props){
      super(props);
    }

    render(){
      return(

        <Container style={styles.container}>
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
                  <Right />
                </Header>

            <View padder style={styles.content}>

                <View style={{flex:3,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 36, color:'white'}}>Connection</Text>
                    <Text style={{fontWeight: 'bold',fontSize:18, color:'white',height:20}}>Use a set of numbers to</Text>
                    <Text style={{fontWeight: 'bold',fontSize:18, color:'white'}}>
                                    connect Mater with Recorders!!</Text>
                </View>
                <View style={{flex:1,alignItems :'center',justifyContent: 'center'}}>
                    <Text style={{fontSize:30 ,color:styles.text.color,justifyContent: 'center'}}>You are</Text>
                </View>

            <View style={{flex:3,flexDirection: 'row',alignItems: 'center'}} >

              <View style={{flex: 1 ,alignItems: 'center',justifyContent: 'flex-end',flexDirection: 'column'}}>

                <View>
                    <Button transparent onPress={()=>{
                      this.props.navigation.navigate("Master1");
                      this.props.screenProps.ch_mode(1);
                    }}><Image
                      source={require('./images/control2.png')}
                      style={{ width: 80, height:80}}/>
                      </Button>
                  </View>

                  <View>
                      <Text style={{fontWeight: 'bold',fontSize: 20, color:'#01B4BC',marginTop: 30}}>Master</Text>
                  </View>


              </View>

              <View style={{flex: 1,alignItems: 'center',justifyContent: 'flex-start',flexDirection: 'column'}}>

              <View>
                  <Button transparent onPress={()=>{
                  this.props.navigation.navigate("Client_connect1");
                  this.props.screenProps.ch_mode(2);
                }}><Image
                  source={require('./images/recorder2.png')}
                  style={{ width: 80, height: 80}} />
            </Button>
              </View>

              <View>
                  <Text style={{ fontWeight: 'bold',fontSize: 20, color:'#01B4BC',marginTop: 30}}>Recorder</Text>
              </View>

              </View>
          </View>


          <View style={{flex:2, alignSelf:'center',justifyContent: 'flex-start'} }>

              <View style={{alignSelf: 'center',justifyContent: 'center'}}>
              <Button transparent onPress={()=>{
                this.props.navigation.navigate("Mastermode");
                }}>
              <Text style={styles.underline}></Text>
              </Button>
              </View>

          </View>

      </View>
      <Footer  style={styles.footer}>
      <Image source={require('../../../assets/trademark.png')} style={{alignItems: 'center'}} />
      </Footer>

      </Container>
      );
    }
}
