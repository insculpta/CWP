import React, { Component } from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { TouchableOpacity, StyleSheet,Text, Platform, Image,View, Dimensions, ScrollView,ImageBackground, FlatList,ListView} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import DayPickerInput from 'react-day-picker/DayPickerInput';


import {
  Thumbnail,
  DatePicker,
  Container,
  CardItem,
  Card,
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

const banner = require("../../../assets/MasterMode/banner.png");



export default class PlayMode extends React.Component {

  
	constructor(props) {
        super(props);
		this.state = { 			
		chosenstartDate: new Date(),
		chosenendDate: new Date() ,		
		
		workData1: [],
		boolGet: 1, //是否拿過workdata
		
		
		StartTime:'', EndTime:'',TaskCode:'',
		start:'',end:'', //查詢的時間起始結束
		date_all:[],  // 查詢期間所有天數
		day_all:[], //查詢期間天數的星期幾
		
		
		};
		this.setstartDate = this.setstartDate.bind(this);
		this.setendDate = this.setendDate.bind(this);
		this.getDate = this.getDate.bind(this);
		this.betweendate = this.betweendate.bind(this);
		
        

    }

	
	setstartDate(newDate) {
	
	this.setState({ chosenstartDate: newDate,});
	var year = this.state.chosenstartDate.toString().substr(11, 4);
	var monthdic = {'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12',};
	var monstr = this.state.chosenstartDate.toString().substr(4, 3);
	var month = monthdic[monstr];
	var day = this.state.chosenstartDate.toString().substr(8, 2);
	this.setState({start:year + '-' + month + '-'+ day,});
	
	
  }
  	setendDate(newDate) {
    this.setState({ chosenendDate: newDate, });
	var year = this.state.chosenendDate.toString().substr(11, 4);
	var monthdic = {'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12',};
	var monstr = this.state.chosenendDate.toString().substr(4, 3);
	var month = monthdic[monstr];
	var day = this.state.chosenendDate.toString().substr(8, 2);
	this.setState({end:year + '-' + month + '-'+ day,});
  }
  
  
//被betweendate所用的時間格式轉換  
    getDate(datestr){
      var temp = datestr.split("-");
      var date = new Date(temp[0],temp[1]-1,temp[2]);
      console.log(date);
      return date;
    }

//計算查詢期間所有日期並存在date_all	
	betweendate(){
	var i=0;
	var date_all=[]; //間隔日期
	var day_all=[]; //間隔日期之對應星期幾
	var wday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',];
	var start = this.state.start;
    var end = this.state.end;
    var startTime = this.getDate(start);
    var endTime = this.getDate(end);
    while((endTime.getTime()-startTime.getTime())>=0){
	  var year = startTime.getFullYear();
      var month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():(startTime.getMonth()+1).toString();
      var date = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
	  var day = startTime.getDay()
      date_all[i] = year + "-" + month + "-" + date;
	  day_all[i]= wday[day];
      startTime.setDate(startTime.getDate()+1);
      i+=1;
	  
    }	
	this.setState({date_all:date_all, day_all:day_all,})
	
				
	}
	
	
	
	 
  
	Getworkdata1 =(e) => {
	if(this.state.boolGet)
	{
	//fetch('http://140.114.54.22:8080/workdata1.php/', {
	fetch('http://192.168.1.170:8080/workdata1.php/', {
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
	

    render() {
	let dimensions = Dimensions.get("window");       
	let imageHeight = Math.round((dimensions.width * 9) / 16);
	let imageWidth = dimensions.width;
	
	var call_1 = this.Getworkdata1(900821);	
	
	const work1 = this.state.workData1;
	let workdataDisplay1 = work1.map(function(jsonData) {

	return (
	   <View key={jsonData.EmployeeID}>
		<View style={{flexDirection: 'row'}}>
		  <Text style={{color: '#000',width: 50}}>{jsonData.TaskCode}</Text>
		  <Text style={{color: '#00f',width: 180}}>{jsonData.StartTime} ~ {jsonData.EndTime}</Text>

		</View>
	   </View>
	)
    });
	
	
			
// 依date找出   
	  var results = [];
	  var searchField = "Date";
	  //var searchVal = "2019-11-07";
	  for (var i = 0; i < work1.length; i++) {
		  check = String(work1[i][searchField]) //每筆在work資料表中的資料拿Date出來
		  for (var j = 0; j < this.state.date_all.length; j++){  //跟期間的資料比對
			  if ((check) == this.state.date_all[j]) {
				  //work1[i].push("Day",temp[i]);
				  var work = work1[i];  // work 為JsonObject
				  work["Day"] = this.state.day_all[j]; //新增jsonobject的key為Day,對應資料為day_all內容
				  results.push(work);

				  
				  
			  }
		  }
	  }
	  var start = Object.values(results).map(item => item.StartTime); 
	  var end = Object.values(results).map(item => item.EndTime); //still object  
	  var type= Object.values(results).map(item => item.TaskCode); 
	  this.state.StartTime = String(start);
	  this.state.EndTime = String(end).substring(11,16); 
	  this.state.TaskCode = String(type);	

	var i = 0;
	let workdataDisplay2 = results.map(function(jsonData) {	
	return (
	   <View key={jsonData.EmployeeID}>
		<View style={styles.list}>
		  <View style={{flexDirection: 'row'}}>
		  <Text style={{flex:1, fontSize: 18,  color:'#435366' ,margin:10, textAlign:'right' }}>{jsonData.Date}</Text>
		  <Text style={{flex:1, fontSize: 18,  color:'#435366' ,margin:10,}}>{jsonData.Day}</Text>
		  </View>
		  <View style={{flexDirection: 'row',}}>
		  <Text style={{ flex:1, fontSize: 16,  color:'#435366' ,margin:10, textAlign:'right' }}>{(jsonData.StartTime).substring(11,16)} ~ {(jsonData.EndTime).substring(11,16)}</Text>
		  <Text style={{ flex:1, fontSize: 16,  color:'#435366' ,margin:10, textAlign:'left'}}>{jsonData.TaskCode}</Text></View>
		
				
		</View></View>
		

	   
	)
	i = i+1;
    });



        return (
            <Container>
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
                    <Title style={styles.title}>中華郵政</Title>
                    </Body>

                </Header>

                <Content>
				
			<Text style={{fontWeight: 'bold', fontSize: 26, height:34, color:'#435366',alignSelf:'center' ,margin:10,}}>班 表 查 詢 系 統</Text>
 
		  <View style={styles.date} ><Text style={{ fontSize: 18,  color:'#435366',alignSelf:'center' ,margin:10,}}>起始日期：</Text>
          <DatePicker 
            defaultDate={new Date()}
            minimumDate={new Date(2019, 1, 1)}
            //maximumDate={new Date(2019, 11, 22)}
            locale={"en"}       
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select Here"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setstartDate}
			
          /></View>
		   
		   <View style={styles.date}><Text style={{ fontSize: 18,  height: 30, color:'#435366',alignSelf:'center' ,margin:10,}}>結束日期：</Text>
		   <DatePicker 
            defaultDate={new Date()}
            minimumDate={new Date(2019, 1, 1)}
            //maximumDate={new Date(2019, 11, 22)}
            locale={"en"}       
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select Here"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" , }}
            onDateChange={(date) => {this.setendDate(date);this.betweendate()}}
          /></View>
		  
		  
		  
		  
          <Text style={{ flexDirection:'column', fontSize: 12,  height: 30, color:'#435366',alignSelf:'center' ,margin:10,	flexDirection: 'row', justifyContent: 'center',}}>
            Date: {this.state.chosenstartDate.toString().substr(4, 12)}
			Date: {this.state.chosenendDate.toString().substr(4, 12)}			
          </Text>
		  		  
		  
	  {workdataDisplay2}	

                </Content>
		<Footer  style={styles.footer}>
		</Footer>
                
            </Container>
        );
    }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#f5f9f8",
    flex:1,
  },
  header: {
    backgroundColor: "#1e2d28",
  },
  content:{
    flex:1
  },

    button:{

        alignSelf:'center',

      },

  footer:{
    backgroundColor: "#019875",
    height:50,

  },


    block: {
        flex: 12,
        backgroundColor: '#484848'
    },
    category: {
        fontSize: 20,
        color: 'white',
        marginLeft: 16,
        marginVertical: 8
    },
    showList: {
    },
    playFunc: {
        flex: 2,
        backgroundColor: '#484848'
    },
	
	date:{
	
	flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
	},
	
	
swipe:{
	
	marginTop: width / 8,
	marginHorizontal: 30,
	alignSelf: 'stretch',
	//backgroundColor: 'rgba(0,0,255,0.32)',
	flexDirection: "column" 
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

list: {

	//fontWeight: 'bold',
	fontSize: 35,
	color:'#435366',
	alignItems:'center',
	flexDirection: 'column',
	margin:10,

},
	
	
});
