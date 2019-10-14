import React ,{Component} from 'react';
import App from './App';
import Connection from './Connection';
import {View,Text,Button,TextInput} from 'react-native';
//import { StackNavigator, NavigationActions} from 'react-navigation';

export default class Top extends Component<Props>{


  constructor(props){
      super(props);



      //this. ch_page=this. ch_page.bind(this);
      this.set_room_number=this.set_room_number.bind(this);
      this.ch_mode=this.ch_mode.bind(this);
      this.get_room=this.get_room.bind(this);
      this.get_connected_device=this.get_connected_device.bind(this);
      this.get_disconnected_device=this.get_disconnected_device.bind(this);
      this.get_connected_device_cnt=this.get_connected_device_cnt.bind(this);
      this.get_disconnected_device_cnt=this.get_disconnected_device_cnt.bind(this);
      this.send=this.send.bind(this);
      this.device_join=this.device_join.bind(this);
      this.ws_fire_event=this.ws_fire_event.bind(this);
      this.ch_name=this.ch_name.bind(this);
      this.ch_recorder_name=this.ch_recorder_name.bind(this);
      this.all_device_start_record=this.all_device_start_record.bind(this);
      this.all_device_stop_record=this.all_device_stop_record.bind(this);
      this.recorder_start=this.recorder_start.bind(this);
      this.recorder_stop=this.recorder_stop.bind(this);
      this.download=this.download.bind(this);
      this.upload=this.upload.bind(this);
      this.all_close=this.all_close.bind(this);
      this.close=this.close.bind(this);
      this.connect=new Connection(this.ws_fire_event);

       this.init_state={
        mode:0, //0為未選擇 1為recoder 2為master
        room:-1,//-1為未選擇
        name:"user",
        connected_device_cnt:0,
        disconnected_device_cnt:0,
        connected_device:[
          // {
          //   user_name:'1',
          //   track:1,
          //    uid:...
          // },
          // {
          //   user_name:'2',
          //   track:2
          // },
          // {
          //   user_name:'3',
          //   track:3
          // }
        ],
        disconnected_device:[],
        ch_mode:this.ch_mode,
        set_room_number:this.set_room_number,
        get_room:this.get_room,
        ws_fire_event:this.ws_fire_event,
        send:this.send,
        ch_name:this.ch_name,

        //master用這些條function來控制錄音開始/停止
        all_start:this.all_device_start_record,//this.props.screenProps.all_start()
        all_stop:this.all_device_stop_record, //this.props.screenProps.all_stop()
        single_stop:this.single_stop,
        single_start:this.single_start,
        //下載檔案
        download:this.download,
        upload:this.upload,
        record_state:0,
        all_close:this.all_close,
        close:this.close
      };


      this.state=this.init_state;

  }

  componentDidMount(){

  }
  render(){
      return(
        <App props={this.state}/>
      );
  }

  //  ch_page(p){
  //     this.setState({page:p});
  //     console.log("press");
  // }
  close(){
    let msg={};
    msg.event="close";
    this.connect.send(msg);
    this.setState(this.init_state);

  }
  all_close(){
    let msg={};
    msg.event="all_close";
    msg.room=this.state.room;
    this.setState(this.init_state);
    this.connect.send(msg);
  }
  upload(file_name){
    this.connect.upload(file_name);
  }
  download(file_name){
    this.connect.download(file_name);
  }
  recorder_start(uid){
    if(this.state.room!=-1){
      let msg={};
      msg.event="single_start";
      msg.data="start";
      msg.room=this.state.room;
      msg.uid=uid;
      this.connect.send(msg);
    }else alert("you must connect first");
  }

  recorder_stop(uid){
    if(this.state.room!=-1){
      let msg={};
      msg.event="single_stop";
      msg.data="stop";
      msg.room=this.state.room;
      msg.uid=uid;
      this.connect.send(msg);
    }else alert("you must connect first");
  }

  all_device_start_record(){

    if(this.state.room!=-1){
      console.log("all start");
      let msg={};
      msg.event="all_start";
      msg.data="start";
      msg.room=this.state.room;
      this.connect.send(msg);
      this.setState({record_state:1});
    }else alert("you must connect first");

  }

  all_device_stop_record(){

    if(this.state.room!=-1){
        console.log("all stop");
      let msg={};
      msg.event="all_stop";
      msg.data="stop";
      msg.room=this.state.room;
      this.connect.send(msg);
      this.setState({record_state:1});
    }else alert("you must connect first");

  }
  ch_name(n){
    this.setState({name:n});
  }
  ws_fire_event(e){
      console.log("fire");
      let msg=JSON.parse(e);
      //console.log(msg.data);
      switch (msg.event) {
        case 'device_join':
              this.device_join(msg.data)
        break;

        case 'ch_name':
              this.ch_recorder_name(msg.uid,msg.new_name);
        break;

        case 'start':
            //開始錄音
            console.log("start record");
            //alert("3");
            this.setState({record_state:1});
        break;

        case 'stop':
            //停止錄音
            console.log("stop record");
              this.setState({record_state:0});
        break;

        case 'all_close':
          this.setState(this.init_state);
        break;

        case 'device_leave':
          //alert(msg.uid+" leave");
            let index=-1;
            let i=0;
            // this.state.connected_device.forEach(d=>{
            //     if(d.uid==msg.uid)index=i;
            //     else i++;
            // })
            // if(index>=0)this.setState({connected_device:this.state.connected_device.slice(index,1),connected_device_cnt:this.state.connected_device_cnt-1})

            let remain=[];
            let off=[];
            this.state.connected_device.forEach(d=>{
                if(d.uid==msg.uid)off.push(d);
                else remain.push(d);
            })
          this.setState({connected_device:remain, connected_device_cnt:this.state.connected_device_cnt-1, disconnected_device:off, disconnected_device_cnt:this.state.disconnected_device_cnt+1})
        break;

        default:
          console.log("default");
      }
      //this.device_join();
      //console.log(this.state);
  }
  ch_recorder_name(uid,new_name){
    this.setState((prevState)=>{
          let tmp=prevState.connected_device;
          tmp.forEach(d=>{
              if(d.uid==uid){
                d.user_name=new_name;
                return false;
              }
          });
          this.setState({connected_device:tmp});
    })
  }
  device_join(d){
      console.log("device join");
      //console.log(d);
      let n=[];
      let cnt=0;
      this.state.disconnected_device.forEach(dd=>{
          if(dd.uid!=d.uid)n.push(dd);
          else cnt++;
      })
      this.setState({connected_device:[...this.state.connected_device,d],connected_device_cnt:this.state.connected_device_cnt+1, disconnected_device:n, disconnected_device_cnt:this.state.disconnected_device_cnt-cnt});
      //else this.setState({connected_device:[d],connected_device_cnt:this.state.connected_device_cnt+1});

  }

  send(msg){
    this.connect.send(msg);
  }
  get_connected_device(){
    return this.state.connected_device;
  }
  get_disconnected_device(){
    return this.state.disconnected_device;
  }
  get_connected_device_cnt(){
    return this.state.connected_device_cnt;
  }

  get_disconnected_device_cnt(){
    return this.state.disconnected_device_cnt;
  }

  ch_mode(m){
      this.setState({mode:m});
      console.log("ch_mode ",m);
  }
  set_room_number(n){
    this.setState({room:n});
  }
  get_room(){
    return this.state.room;
    //console.log(this.state.room);
  }
}
