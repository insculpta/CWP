import React ,{Component} from 'react';
import {View,Text,ViewInput} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
const styles=StyleSheet.create({
    background_view:{
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
    }
});
export default class Connection extends Component<Props>{
    constructor(){
      super();
    }

    render(){
      return(
        <View style={styles.background_view}>
            <View style={{flex:15,alignItems:'center'}}>
                <View style={{flex:1}}></View>
                <View style={{flex:6,alignItems:'center'}}>
                    <Text style={{fontSize:30 ,color:styles.text.color}} >Connection</Text>
                    <Text style={{fontSize:15 ,color:styles.text.color}}>Choose your rule</Text>

                    <Text style={{fontSize:30}}></Text>
                    <Text style={{fontSize:30 ,color:styles.text.color}}>AAA</Text>
                </View>
            </View>
            <View style={{flex:5,flexDirection:'row'}} >
              <View style={{flex:1,alignItems:'center'}}>
                <Image
                  source={require('./images/recoder.png')}
                  style={{ width: 100, height:100 }}
                />
              </View>

              <View style={{flex:1,alignItems:'center'}}>
                <Image
                  source={require('./images/control.png')}
                  style={{ width: 100, height: 100 }}
                />
              </View>


            </View>

          <View style={{flex:8, alignItems:'flex-start',flexDirection:'row'} }>
              <View style={{flex:1}}>
                  <Button type='solid' title="Recoder" buttonStyle={styles.button}/>
              </View>
              <View style={{flex:1}}>
                  <Button type='solid' title="Master" buttonStyle={styles.button}/>
              </View>


          </View>

          <View style={{flex:2}}></View>

      </View>
      );
    }
}
