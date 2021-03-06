import React, { Component } from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { TouchableOpacity, StyleSheet,Text, Platform, Image,View, Dimensions, ScrollView,ImageBackground, FlatList} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
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


const { width, height } = Dimensions.get('window');

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
const banner = require("../../../assets/MasterMode/banner.png");



class Mastermode extends Component<props> {
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
      sec: 0,
	  date:'',date1:'',date2:'',date3:'',date4:'',
	  workdate:'',
      wday: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',],
	  day:'',day1:'',day2:'',day3:'',day4:'',
	  userid:'',
      workData: [], workData1: [],	  
      ST_time: '', ST_time1: '',ST_time2: '',ST_time3: '',ST_time4: '',
      END_time: '',END_time1: '',END_time2: '',END_time3: '',END_time4: '',
      worktype:'',worktype1:'',worktype2:'',worktype3:'',worktype4:'',
	  swiperShow: false,
  
	  boolGet: 1, //是否拿過workdata
	  
	  
      		
    };
    
      this.onStartRecord = this.onStartRecord.bind(this);
      this.onStopRecord = this.onStopRecord.bind(this);
      this.onStartPlay=this. onStartPlay.bind(this);
      this.onPausePlay=this. onPausePlay.bind(this);	  
      this.timer = null;
	  this.props.screenProps.get_userdata = this.props.screenProps.get_userdata.bind(this);
	  this.callfunc = this.callfunc.bind(this);
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
  
  
	getDay(num, str) {
    var today = new Date();
    var nowTime = today.getTime();
    var ms = 24*3600*1000*num;
    today.setTime(parseInt(nowTime + ms));
    var oYear = today.getFullYear();
    var oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    var oDay = ((today.getDate()<10 ? '0' : '')+ today.getDate()).toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
}

	
  
  componentDidMount() {
    var that = this;
	var Today = new Date();
    var date = (Today.getDate()<10 ? '0' : '')+ Today.getDate(); //Current Date
    var month = Today.getMonth() + 1; //Current Month
    var year = Today.getFullYear(); //Current Year
    var hours = Today.getHours(); //Current Hours
    var min = Today.getMinutes(); //Current Minutes
    var sec = Today.getSeconds(); //Current Seconds
	var dayindex = Today.getDay();
	
	var date1= Today.setDate(Today.getDate() + 1);
	//var date1 = (Today.setDate(Today.getDate() + 1)<10 ? '0' : '')+ Today.setDate(Today.getDate() + 1);
    //var date2 = (date1 <10 ? '0' : '')+date1;
	var today1 = this.getDay(1,'-');
	var today2 = this.getDay(2,'-');
	var today3 = this.getDay(3,'-');
	var today4 = this.getDay(4,'-');
	
	that.setState({
      //Setting the value of the date time
        date:
        year + '-' + month + '-'+ (date),	    	
		date1: today1,
		date2: today2,
		date3: today3,
		date4: today4,
		day: this.state.wday[dayindex],
		day1: this.state.wday[(dayindex+1)%7],
		day2: this.state.wday[(dayindex+2)%7],
		day3: this.state.wday[(dayindex+3)%7],
		day4: this.state.wday[(dayindex+4)%7],
		
				
		
    });
	
  }
  
  
  
    Getworkdata =(e) => {
		if(this.state.boolGet)
		{
		fetch('http://140.114.54.22:8080/workdata.php/', {
		method: 'post',
		header: {
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			name: e ,
		})
		}).then((response) => response.json())
		  .then((jsonData) => {
			  
		if (jsonData != "") {
	
		//this.props.screenProps.set_workdata(jsonData);
		this.setState({ workData: jsonData, boolGet : 0});
		//alert("workdata get!!")	;
		//this.props.navigation.navigate("Mastermode");
		}
		else { //alert("WorkData Loadwrong") ;  
		}
		
		}).catch((error)=>{
		  console.error(error);
			});		
//		return <Text style={{ color: '#FFFFFF', fontSize: 14 }}>call work func！</Text>
		}
	}
	
	    Getworkdata1 =(e) => {
		if(this.state.boolGet)
		{
		fetch('http://140.114.54.22:8080/workdata1.php/', {
		method: 'post',
		header: {
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			EmployeeID: e ,
		})
		}).then((response) => response.json())
		  .then((jsonData) => {
			  
		if (jsonData != "") {
	
		//this.props.screenProps.set_workdata(jsonData);
		this.setState({ workData1: jsonData, boolGet : 0});
		//alert("workdata get!!")	;
		//this.props.navigation.navigate("Mastermode");
		}
		else { //alert("WorkData Loadwrong") ;  
		}
		
		}).catch((error)=>{
		  console.error(error);
			});		
//		return <Text style={{ color: '#FFFFFF', fontSize: 14 }}>call work func！</Text>
		}
	}
	
	
	

	callfunc = (e) => {
		if(!this.state.workData)
		{
		this.Getworkdata(e);
		}
		return 1;
	}
	
/* 
	workinfo =(date) => {
	  var results = [];
      var searchField = "date";
      var searchVal = date;
      for (var i = 0; i < work.length; i++) {
		      check = String(work[i][searchField])
          if ((check) == searchVal) {
              results.push(work[i]);         
          }
      }

      const start = Object.values(results).map(item => item.ST_time); 
      const end = Object.values(work).map(item => item.END_time); //still object  
      const type= Object.values(results).map(item => item.work); 
      var ST = String(start).substring(0, 5);
      var END = String(end).substring(0,5); 
      var type = String(type); 
	  this.setState({ ST_time:ST, END_time : END, worktype:type});
	  
 
	} */
 

		

  render() {
    console.log('now', this.state.volumn);
     let dimensions = Dimensions.get("window");
     let imageHeight = Math.round((dimensions.width * 9) / 16);
     let imageWidth = dimensions.width;
	 
	 
	const data =  this.props.screenProps.get_userdata();
	let dataDisplay = data.map( function(jsonData) {
	return (
		<View key={jsonData.name}>
			<View style={{ flexDirection: 'row' }}>			
				<Text style={{ color: '#FFFFFF', fontSize: 14 }}>Hello, {jsonData.name} ！</Text>			
			</View>
		</View>
	)
});


const username = Object.values(data).map(item => item.name); //still object
this.state.userid= String(username); 


	const work = this.state.workData;
	let workdataDisplay = work.map( function(jsonData) {

	return (
	   <View key={jsonData.id}>
		<View style={{flexDirection: 'row'}}>
		  <Text style={{color: '#000',width: 50}}>{jsonData.work}</Text>
		  <Text style={{color: '#00f',width: 180}}>{jsonData.ST_time} ~ {jsonData.END_time}</Text>

		</View>
	   </View>
	)
    });


	const work1 = this.state.workData1;
	let workdataDisplay1 = work1.map( function(jsonData) {

	return (
	   <View key={jsonData.EmployeeID}>
		<View style={{flexDirection: 'row'}}>
		  <Text style={{color: '#000',width: 50}}>{jsonData.TaskCode}</Text>
		  <Text style={{color: '#00f',width: 180}}>{jsonData.StartTime} ~ {jsonData.EndTime}</Text>

		</View>
	   </View>
	)
    });





// 依date找當日的working date--------------------------------------------------
// date   
	  var results = [];
      var searchField = "date";
      var searchVal = this.state.date;
      for (var i = 0; i < work.length; i++) {
		      check = String(work[i][searchField])
          if ((check) == searchVal) {
              results.push(work[i]);         
          }
      }
      var start = Object.values(results).map(item => item.ST_time); 
      var end = Object.values(results).map(item => item.END_time); //still object  
      var type= Object.values(results).map(item => item.work); 
      this.state.ST_time = String(start).substring(0, 5);
      this.state.END_time = String(end).substring(0,5); 
      this.state.worktype = String(type);
// date1   
	  var results = [];
      var searchField = "date";
      var searchVal = this.state.date1;
      for (var i = 0; i < work.length; i++) {
		      check = String(work[i][searchField])
          if ((check) == searchVal) {
              results.push(work[i]);         
          }
      }
       start = Object.values(results).map(item => item.ST_time); 
       end = Object.values(results).map(item => item.END_time); //still object  
       type= Object.values(results).map(item => item.work); 
      this.state.ST_time1 = String(start).substring(0, 5);
      this.state.END_time1 = String(end).substring(0,5); 
      this.state.worktype1 = String(type);
// date2   
	  var results = [];
      var searchField = "date";
      var searchVal = this.state.date2;
      for (var i = 0; i < work.length; i++) {
		      check = String(work[i][searchField])
          if ((check) == searchVal) {
              results.push(work[i]);         
          }
      }
      start = Object.values(results).map(item => item.ST_time); 
      end = Object.values(results).map(item => item.END_time); //still object  
      type= Object.values(results).map(item => item.work); 
      this.state.ST_time2 = String(start).substring(0, 5);
      this.state.END_time2 = String(end).substring(0,5); 
      this.state.worktype2 = String(type);	  
// date3   
	  var results = [];
      var searchField = "date";
      var searchVal = this.state.date3;
      for (var i = 0; i < work.length; i++) {
		      check = String(work[i][searchField])
          if ((check) == searchVal) {
              results.push(work[i]);         
          }
      }
       start = Object.values(results).map(item => item.ST_time); 
       end = Object.values(results).map(item => item.END_time); //still object  
       type= Object.values(results).map(item => item.work); 
      this.state.ST_time3 = String(start).substring(0, 5);
      this.state.END_time3 = String(end).substring(0,5); 
      this.state.worktype3 = String(type);	  
// date4   
	  var results = [];
      var searchField = "date";
      var searchVal = this.state.date4;
      for (var i = 0; i < work.length; i++) {
		      check = String(work[i][searchField])
          if ((check) == searchVal) {
              results.push(work[i]);         
          }
      }
       start = Object.values(results).map(item => item.ST_time); 
       end = Object.values(results).map(item => item.END_time); //still object  
       type= Object.values(results).map(item => item.work); 
      this.state.ST_time4 = String(start).substring(0, 5);
      this.state.END_time4 = String(end).substring(0,5); 
      this.state.worktype4 = String(type);
	  
	  
	  
      var call = this.Getworkdata(this.state.userid);
	  var call_1 = this.Getworkdata1(900821);
	  
	  //var call = this.callfunc(this.state.userid);

// calender

const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};





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
	
	  
	  <View style={{flex:2}}>

               <ImageBackground
                 style={{ height:  imageHeight , width: imageWidth }}
                 source={banner}
               > 
				<View style={styles.Top}>
                            {dataDisplay}
                        </View>
						
	    <SwiperFlatList
          autoplay={false}
          autoplayDelay={2}
          autoplayLoop          
          showPagination={true}
        >		
						<View style={{ height:  imageHeight , width: imageWidth }}>
                        <View style={styles.swipe}><Text style={styles.date}>{this.state.date} {this.state.day}</Text>
                        <Text style={styles.worktype}>{this.state.worktype} </Text>
                        <View style={styles.bannerTextArea}>                       
                        <Text style={styles.bannerText}>{this.state.ST_time} - {this.state.END_time}</Text></View></View></View>
						
												
                        <View style={{ height:  imageHeight , width: imageWidth }}>
                        <View style={styles.swipe}><Text style={styles.date}>{this.state.date1} {this.state.day1}</Text>
                        <Text style={styles.worktype}>{this.state.worktype1} </Text>
                        <View style={styles.bannerTextArea}>                       
                        <Text style={styles.bannerText}>{this.state.ST_time1} - {this.state.END_time1}</Text></View></View></View>
						
						<View style={{ height:  imageHeight , width: imageWidth }}>
                        <View style={styles.swipe}><Text style={styles.date}>{this.state.date2} {this.state.day2}</Text>
                        <Text style={styles.worktype}>{this.state.worktype2} </Text>
                        <View style={styles.bannerTextArea}>                       
                        <Text style={styles.bannerText}>{this.state.ST_time2} - {this.state.END_time2}</Text></View></View></View>
						
						<View style={{ height:  imageHeight , width: imageWidth }}>
                        <View style={styles.swipe}><Text style={styles.date}>{this.state.date3} {this.state.day3}</Text>
                        <Text style={styles.worktype}>{this.state.worktype3} </Text>
                        <View style={styles.bannerTextArea}>                       
                        <Text style={styles.bannerText}>{this.state.ST_time3} - {this.state.END_time3}</Text></View></View></View>
						
						<View style={{ height:  imageHeight , width: imageWidth }}>
                        <View style={styles.swipe}><Text style={styles.date}>{this.state.date4} {this.state.day4}</Text>
                        <Text style={styles.worktype}>{this.state.worktype4} </Text>
                        <View style={styles.bannerTextArea}>                       
                        <Text style={styles.bannerText}>{this.state.ST_time4} - {this.state.END_time4}</Text></View></View></View>
                        
                      
       </SwiperFlatList>
      </ImageBackground>
     	  
	<Text style={{fontWeight: 'bold', fontSize: 26, height:34, color:'#435366',alignSelf:'center' ,margin:15,}}>公 告 與 通 知</Text>
	  
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

const styles=StyleSheet.create({
  container: {
    backgroundColor: "#f5f9f8",
    flex:1,
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
                                                
    swipe:{
		
        marginTop: width / 8,
        marginHorizontal: 30,
        alignSelf: 'stretch',
        //backgroundColor: 'rgba(0,0,255,0.32)',
        flexDirection: "column" 
                },

    date: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
    },


    worktype: {

        marginTop: 15,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
		

    },

    bannerTextArea: {
        //position: 'absolute',
        //top: 80, left: 45, right: 0, bottom: 0,
        marginTop: 8,
        height: 60,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255,255,255,0.32)',
        borderRadius: 8,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        
    },

    bannerText: {

        fontWeight: 'bold',
        fontSize: 35,
        color: '#ffffff',
        alignSelf: 'center',

    },
	
  
  Top:{
	position: 'absolute', 
	top: 22, 
	left: 34, 
	right: 0, 
	bottom: 0
	
  }, 

});

export default Mastermode;
