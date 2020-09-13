import React ,{Component} from 'react';
import {View,Text,Button,TextInput} from 'react-native';

export default class App2 extends Component<Props>{

  constructor(){
      super();
      this.ws=new WebSocket('ws://10.0.2.2:3000');
      this.test=this.test.bind(this);
      this.disconnect=this.disconnect.bind(this);
      this.ch_id=this.ch_id.bind(this);
      this.check=this.check.bind(this);
      this.reconnect=this.reconnect.bind(this);
      this.send=this.send.bind(this);
      this.state = {id:'new user',recieve_data:'not recieve yet'};
      this.id='';
      this.recieve_id='';
      this.send_msg='';
      //console.log(this.ws);
  }

    render(){
      return(
        <View>
          <Text>Hello {this.state.id} </Text>
          <TextInput
            style={{height: 40}}
            placeholder="Type id"
            onChangeText={id=>{this.id=id;}}
          />
          <Button
            onPress={this.ch_id}
            title="change your id"
          />
          <TextInput
            style={{height: 40}}
            placeholder="send msg to id"
            onChangeText={id=>{this.recieve_id=id;}}
          />
          <TextInput
            style={{height: 40}}
            placeholder="msg"
            onChangeText={msg=>{this.send_msg=msg;}}
          />
          <Button
            onPress={this.send}
            title="send"
            color="#841584"
          />
          <Button
            onPress={this.test}
            title="press"
            color="#841584"
          />
          <Button
            onPress={this.disconnect}
            title="disconnect"
            color="#841584"
          />
          <Button
            onPress={this.check}
            title="check connect"
            color="#841584"
          />
          <Button
            onPress={this.reconnect}
            title="reconnect"
            color="#841584"
          />
          <Text>
            {this.state.recieve_data}
          </Text>
        </View>
      );
    }
    send(){
        if(this.ws.readyState==1){
          let msg={};
          msg.event="send";
          msg.recieve_id=this.recieve_id;
          msg.data=this.send_msg;
          console.log("recieve id="+this.recieve_id);
          this.ws.send(JSON.stringify(msg));
        }else console.log("connect error");
    }
    reconnect(){
        if(this.ws.readyState==3){
          console.log("reconnect");
          this.ws=new WebSocket('ws://10.0.2.2:3000');
        }else console.log("you are alredy connect");
    }
    ch_id(){
        if(this.ws.readyState==1){
          console.log("Your id is"+this.id);
          let msg={};
          msg.event="ch_id";
          msg.data=this.id;
          this.setState({id:this.id},()=>{
            this.ws.send(JSON.stringify(msg));
          });
        }else console.log("error:connect error");

    };

    test(){
      if(this.ws.readyState==1){
         console.log("preses");
         //console.log(this.ws);
         let msg={};
         msg.event="press";
         msg.data="press";
         let sent_msg=JSON.stringify(msg);
         this.ws.send(sent_msg);
       }else console.log("error:connect error");
    }


    disconnect(){
        this.ws.close();
    }

    check(){
      console.log(this.ws);
    }

   componentDidMount() {
       //console.log(this.ws);
       this.ws.onopen=()=>{
         console.log("client connect");
       };

       this.ws.onmessage = event => {
            var data=JSON.parse(event.data);
           this.setState({recieve_data:data.data});
       }
       this.ws.onerror = (e) => {
       // an error occurred
         console.log(e.message);
       };
       this.ws.onclose=e=>{
         console.log(e.code, e.reason);
       };
  }



}
