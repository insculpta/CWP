import React ,{Component} from 'react';
import {View,Text,TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
import Animation from 'lottie-react-native';
import LottieView from 'lottie-react-native';

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
      width:'40%',
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
  componentDidMount() {
        this.initAnimation();
    }
    initAnimation(){
      if (!this.animation){
        setTimeout(() => {
          this.initAnimation();
        }, 100);
      } else {
          this.animation.play();
      }
    }

  render(){
    return(

        <View style={styles.background_view}>

                <View style={{flex:1}}></View>
                <View style={{flex:2,justifyContent:'flex-end',alignItems: 'center'}}>
                    <Text style={{fontSize:28,fontWeight: 'bold', color:styles.text.color}}>Create Successfully!</Text>
                </View>

                <View style={{flex:4,alignItems:'center'}}>

                  <Animation
                ref={animation => { this.animation = animation; }}
                loop={true}
                style={{
                  width: 200,
                  height: 200,
                  marginButton:60,
                  flexDirection: 'row'
                }}
                source={require('./images/success.json')}
              />
                  <Text style={{fontSize:fontSize1,color:special_text_color}}>{this.props.room}</Text>
                </View>



                <View style={{backgroundColor:'',flex:3,flexDirection:'column',alignSelf:'center',alignItems:'center'}}>

                    <Text style={{fontSize:20, fontWeight: 'bold',color:styles.text.color,textAlign:'center'}}>Now let recorders enter the number
                    </Text>
                    <Text style={{fontSize:20, fontWeight: 'bold',color:styles.text.color,textAlign:'center'}}>to conneect with you!!</Text>
                </View>
                <View style={{flex:3}}>
                    <Button type='solid' title="OK" buttonStyle={styles.button} onPress={()=>{
                      //this.props.ch_page(3)
                    //  console.log("press");
                      this.props.navigation.navigate("Master_main_page");
                    }}/>

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
