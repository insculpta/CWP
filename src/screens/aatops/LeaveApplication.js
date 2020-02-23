import React, { Component } from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { TouchableOpacity, StyleSheet,Text, TextInput, Platform, Image,View, Dimensions, ScrollView,ImageBackground, FlatList,ListView} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';



import {
  Thumbnail,
  DatePicker,
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
  Input,
  Picker, Form, 
} from "native-base";


const { width, height } = Dimensions.get('window');
const banner = require("../../../assets/MasterMode/banner.png");
const applybtn = require('./images/apply.png');

export default class LeaveApplication extends Component<props> {

  
	constructor(props) {
        super(props);
		this.state = { 			
		chosenstartDate: new Date(),
		chosenendDate: new Date() ,		
		
		workData1: [],
		boolGet: 1, //是否拿過workdata
		
		employee:[],
		employeebool:1, //是否拿過employee
		restleave:'',
		
		
		StartTime:'', EndTime:'',TaskCode:'',
		start:'',end:'', //查詢的時間起始結束
		date_all:[],  // 查詢期間所有天數
		day_all:[], //查詢期間天數的星期幾
		
		applytime:'',
		leavetype: "0", //選取假別 
		remark:[], //請假事由
		datetest: " test",
		
		colorbool_1:1, // 起始日期選取(開始為綠，送出資料後為灰，表示須重選)
		colorbool_2:1, // 結束日期選取
		};
		this.setstartDate = this.setstartDate.bind(this);
		this.setendDate = this.setendDate.bind(this);
		this.getDate = this.getDate.bind(this);
		this.betweendate = this.betweendate.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.getapplytime = this.getapplytime.bind(this);
		
        
    }
	
 
	//查找並設定今天日期(申請日期)
  getapplytime() {
    var that = this;
	var Today = new Date();
    var date = (Today.getDate()<10 ? '0' : '')+ Today.getDate(); //Current Date
    var month = Today.getMonth() + 1; //Current Month
    var year = Today.getFullYear(); //Current Year
    var hours = Today.getHours(); //Current Hours
    var min = Today.getMinutes(); //Current Minutes
    var sec = Today.getSeconds(); //Current Seconds
	var dayindex = Today.getDay();	
	//var date1 = (Today.setDate(Today.getDate() + 1)<10 ? '0' : '')+ Today.setDate(Today.getDate() + 1);
    //var date2 = (date1 <10 ? '0' : '')+date1;
	
	that.setState({
      //Setting the value of the date time
        applytime: year + '-' + month + '-'+ (date)+ ' '+ hours+ ':' + min+ ':' +sec,	    	
			
    },this.log);
	
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


//拿員工剩餘休假日數用
	GetEmployee =(e) => {
	if(this.state.employeebool)
	{
	fetch('http://140.114.54.22:8080/getemployee.php/', {
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
	this.setState({ employee: jsonData, employeebool : 0});
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

  onValueChange(value: string) { //選取假別
    this.setState({
      leavetype: value
    });
  }
  
  //丟申請資料去資料庫
  InsertApplyData = (e) => {
		this.getapplytime();

        
        if (this.state.leavetype == "0") {
            alert("請選擇假別");
        }

        else if (this.state.start == "") {
            alert("請選擇差假起始日");
        }
		else if (this.state.end == "") {
            alert("請選擇差假結束日");
        }
		else if (this.state.remark == "") {
            alert("請輸入差假事由");
        }
		else if (this.state.start > this.state.end) {
			alert("請重新選擇申請日期");
		}
		
		else if (this.state.applytime == ""){
			 alert("請稍等兩秒再送出一次");
		}
        else {

            fetch('http://140.114.54.22:8080/insertleave.php/', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    // we will pass our input data to server
                    EmployeeID: e,
                    LeaveID: this.state.leavetype,
					StartDate: this.state.start,
                    EndDate: this.state.end,
					ApplicationDate: this.state.applytime,
                    Remark: this.state.remark,
					Audited:'0',
					Approve: '1', 

                })

            }).then((response) => response.json())
              .then((jsonData) => {
                
				if (jsonData == "apply successfully") {
					alert("申請已遞交");		
					this.setState({ leavetype: 0, chosenstartDate: "", chosenendDate: "", start:"", end:"", applytime:"", remark:"",});
					this.textInput.clear();	
				    this.setState({colorbool_1:0, colorbool_2:0});

					//this.state.start = null;
                    //this.state.end = null;
					//this.state.applytime= null;
                    //this.state.remark = null;	
					//this.forceUpdate()		;			
								
				}
			   
				else if (jsonData == "try again"){
					alert("請再試一次");
			   
				}	
				else if (jsonData == "Failed to connect"){
					alert("網路連線有誤");
			   
				}				
/* 				else if (jsonData != "") {
					// redirect to profile page
					this.setState({ userData: jsonData,});
					this.props.screenProps.set_userdata(jsonData);
					//this.goodjob;														
					alert('Login Successfully');					
					this.props.navigation.navigate("Mastermode");
				} */
			 
				else
				{alert("Something goes wrong here!");}
			})
			.catch((error) => {
				console.error(error);
			});
        }

    }

	
	

    render() {
	const { show, date, mode } = this.state;
		
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
       
	
	
	var call_1 = this.Getworkdata1(900821);
	var call_2 = this.GetEmployee(900821);		
	
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
	
	

	const employeeleave = this.state.employee;

	var totalleave = Object.values(employeeleave).map(item => item.LeaveDay); //still object
	var usedleave = Object.values(employeeleave).map(item => item.AlreadyLeaveDay); 	
	var restleave  = ((totalleave - usedleave)/8).toFixed(0);
	this.state.restleave = restleave;
	
 	   	
	let leaveDisplay = employeeleave.map((jsonData)=> {

	return (
	   <View key={jsonData.EmployeeID}>
	   
		<View style={{height:imageHeight , width:imageWidth, }}>
		<View style={styles.swipe}>
		<Text style={styles.bannerText}>已使用特休日數：{jsonData.AlreadyLeaveDay}</Text>
		<Text style={styles.bannerText}>剩餘特休日數：{this.state.restleave}</Text>                     
		</View></View>
	   
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
				<Title style={{alignSelf:'flex-start'}} >中華郵政</Title>
				</Body>
				<Right></Right>

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
		    {leaveDisplay}

		</SwiperFlatList>
		</ImageBackground>
		</View>
			
	  <ScrollView style={{paddingRight:15,paddingLeft:15,paddingBottom:15}}>	
	  <Text style={{fontWeight: 'bold', fontSize: 26, height:34, color:'#435366',alignSelf:'center' ,margin:10,}}>差 假 申 請</Text>

		<View style={styles.date}><Text style={{ fontSize: 18,  height: 30, color:'#435366',alignSelf:'center' ,margin:10,}}>差假類別：</Text>
		  <Form>
            <Picker
              note
              mode="dropdown"
              style={{ width: 200 }}
              selectedValue={this.state.leavetype}
              onValueChange={this.onValueChange}
            >
			  <Picker.Item label="未選擇" value="0" />
              <Picker.Item label="休假" value="P" />
              <Picker.Item label="例假" value="S" />
              <Picker.Item label="喪假" value="1" />
              <Picker.Item label="婚假" value="2" />
              <Picker.Item label="事假" value="3" />
			  <Picker.Item label="病假" value="4" />
			  <Picker.Item label="產前(檢)假" value="5" />
              <Picker.Item label="產假" value="6" />
              <Picker.Item label="特別休假" value="7" />
              <Picker.Item label="公假" value="8" />
              <Picker.Item label="陪產假" value="9" />
			  <Picker.Item label="生理假" value="10" />
              <Picker.Item label="家庭照顧假" value="11" />
              <Picker.Item label="安胎假" value="13" />
              <Picker.Item label="捐贈骨髓或器官假" value="14" />
			  <Picker.Item label="工會公假" value="15" />
            </Picker>
          </Form>
		</View>

	  
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
		textStyle={{ color: this.state.colorbool_1? "green" : "grey" }}
		placeHolderTextStyle={{ color: "#d3d3d3" }}
		onDateChange={(date) => {this.setstartDate(date);this.setState({colorbool_1:1});}}

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
		textStyle={{ color: this.state.colorbool_2? "green" : "grey" }}
		placeHolderTextStyle={{ color: "#d3d3d3" , }}
		onDateChange={(date) => {this.setendDate(date);this.betweendate();this.setState({colorbool_2:1});}}
		/></View>
				  
		<Text style={{ flexDirection:'column', fontSize: 12,  height: 30, color:'#435366',alignSelf:'center' ,margin:10,	flexDirection: 'row', justifyContent: 'center',}}>
		Date: {this.state.chosenstartDate.toString().substr(4, 12)}
		Date: {this.state.chosenendDate.toString().substr(4, 12)}			
		</Text>

		<View style={{flex:2,justifyContent: 'center'}}>
		<View style={styles.input} >
		<TextInput
			multiline={true}
			numberOfLines={10}
			placeholder="  請輸入差假事由"
			keyboardType='default'
			//underlineColorAndroid='#d6dee2'
			onChangeText={(text) => {this.state.remark = text}}
			style={styles.textArea}
			ref={input => { this.textInput = input }}
			//ref={input => { this.accountInput = input }}
		/></View>
		
		<View style={{flex:2,flexDirection: 'row',alignItems: 'center', margin:30, padding:10}} >
		  <View style={{flex: 1 ,alignItems: 'center',justifyContent: 'flex-end',flexDirection: 'column'}}>
			<View>
				<Button transparent onPress={() => {				
				this.InsertApplyData(900821);	
					
				//this.goodjob();
				//alert('login successfully!');				
				//this.props.navigation.navigate("Mastermode");				
				}}><Image style={{width:294, height:54}} source={applybtn}	/>
				  </Button>
			</View>
		  </View>
	    </View>	
		
		

		</View>		
	  	 <View></View>  

		</ScrollView>
		
			</Content>

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
	
    swipe:{
		
        marginTop: width / 5,
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.32)',
		borderRadius: 8,
        flexDirection: "column", 
		
		
                },

    date: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
		flexDirection:'row'
		
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    bannerText: {

        fontSize: 18,
        color: '#ffffff',
        alignSelf: 'center',
		marginVertical:5,
		marginLeft:20,
		marginRight:20,
    },

	
	
  
  Top:{
	position: 'absolute', 
	top: 22, 
	left: 34, 
	right: 0, 
	bottom: 0
	
  }, 

list: {

	//fontWeight: 'bold',
	fontSize: 35 ,
	color:'#435366',
	alignItems:'center',
	flexDirection: 'column',
	margin:10,

},

    input:{
      borderColor: '#d6dee2',
      borderRadius:3,
	  borderWidth: 1,
      width:width*0.8,
//      fontSize:30, color:'#d6dee2',height:45,
      margin:10,
	  padding: 5,
	  alignSelf:"center",
    },
	
	textArea: {
    height: 150,
	width:width*0.7,
	alignSelf:"flex-start",
    justifyContent: "flex-start",
	fontSize:16, 
	color:'#6A6C6E',

  }

	
});

