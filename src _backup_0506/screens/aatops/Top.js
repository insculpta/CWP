import React ,{Component} from 'react';
import {View,Text,Button,TextInput} from 'react-native';
import Selection from './Selection';
import Master1 from './Master1';
import Master2 from './Master2';
import Connection from './Connection';
import Master_main_page from './Master_main_page';
//import { StackNavigator, NavigationActions} from 'react-navigation';
const init_state={
  mode:0, //0為未選擇 1為recoder 2為master
  page:0,
  room:-1,//-1為未選擇
  name:"user",
  connected_device_cnt:0,
  disconnected_device_cnt:0,
  connected_device:[
    {
      user_name:'1',
      track:1
    },
    {
      user_name:'2',
      track:2
    },
    {
      user_name:'3',
      track:3
    }
  ],
  disconnected_device:[]
}
export default class Top extends Component<Props>{
  constructor(){
      super();
      this.state=init_state;
      this.connect=new Connection;

      this. ch_page=this. ch_page.bind(this);
      this.set_room_number=this.set_room_number.bind(this);
      this.ch_mode=this.ch_mode.bind(this);

  }

  componentDidMount(){

  }
  render(){
      let page;


      if(this.state.page==0) page= <Selection ch_page={this.ch_page} />
      else if(this.state.page==1)page=<Master1 ch_page={this.ch_page} send={this.connect.send} set_room_number={this.set_room_number}
        ch_mode={this.ch_mode}/>
      else if(this.state.page==2)page=<Master2 ch_page={this.ch_page} room={this.state.room}/>
      else if(this.state.page==3)page=<Master_main_page room={this.state.room} connected_device_cnt={this.state.connected_device_cnt} connected_device={this.state.connected_device}
      disconnected_device_cnt={this.state.disconnected_device_cnt} disconnected_device={this.state.disconnected_device}/>;
      else page =<Text> you are {this.state.mode}</Text>

      return page;
  }

   ch_page(p){
      this.setState({page:p});
      console.log("press");
  }
  ch_mode(m){
      this.setState({mode:m});
      console.log("ch_mode")
  }
  set_room_number(n){
    this.setState({room:n});
  }
}
