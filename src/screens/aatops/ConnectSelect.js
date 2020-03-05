import React, { Component } from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Alert,TouchableOpacity, StyleSheet,Text, Platform, Image,View, Dimensions, ScrollView,ImageBackground, FlatList,ListView} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import DayPickerInput from 'react-day-picker/DayPickerInput';


import { 
  Button,  
  Badge,  
  Body,  
  Container,
  CardItem,
  Card, 
  Content,  
  DatePicker, 
  Thumbnail,
  Footer,
  Header,
  Icon,
  Item,
  Input,  
  Left,
  Right,
  Title,
} from "native-base";


const { width, height } = Dimensions.get('window');

const banner = require("../../../assets/MasterMode/banner.png");
const querybtn = require('./images/query.png');


export default class Connection extends Component {

  
	constructor(props) {
        super(props);
		this.state = { 			
		chosenstartDate: new Date(),
		chosenendDate: new Date() ,		
		
		leaveInfo: [],
		boolGet: 1, //是否拿過leavedata
		boolUpdate:1, //是否修改過
		
		
		
		//讀取請假資料用
		StartTime:'', EndTime:'',TaskCode:'',
		start:'',end:'', //查詢的時間起始結束
		date_all:[],  // 查詢期間所有天數
		day_all:[], //查詢期間天數的星期幾
		
		leaveID:'',applicationDate:'',
		startDate:'', endDate:'',
		remark:'',
		
		//核准資料用
		absentNoteID:'',
		employee:'',		
		audited:'', //  1=審核過, 0=審核未通過
		approve:'', //  1=未審,0=審過
		boolApprove:1,
		boolDisapprove:1,
		
		booltest:1,
		
		//選取日期用
		colorbool_1:1, // 起始日期選取(開始為綠，送出資料後為灰，表示須重選)
		colorbool_2:1, // 結束日期選取
		
		test:'1',
		res:[],		
		};
		this.setstartDate = this.setstartDate.bind(this);
		this.setendDate = this.setendDate.bind(this);
		this.getDate = this.getDate.bind(this);
		this.betweendate = this.betweendate.bind(this);
		this.GetleaveInfo= this.GetleaveInfo.bind(this);
			
		//this.UpdateleaveInfo = this.UpdateleaveInfo.bind(this);
	
		
		
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
	this.setState({date_all:date_all, day_all:day_all, colorbool_1:0, colorbool_2:0})
	
				
	}
	
	
	componentDidMount(){
		
	var call_1 = this.GetleaveInfo(905855);	

		
	}
	
	
	
	  
	GetleaveInfo =(e) => {
	if(this.state.boolGet)
	{
	fetch('http://140.114.54.22:8080/leaveget.php/', {
	//fetch('http://192.168.1.170:8080/leaveget.php/', {
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
	this.setState({ leaveInfo: jsonData, boolGet : 0});
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



//審核更新
/* /*  UpdateleaveInfo =(a,b,c,d) => {
      
	   this.setState({
		absentNoteID:70,
		employee:905855,		
		audited:1,
		approve:0,

	});		

  if (a == "") {
            alert("a不見了");
            //this.setState({account:'Please enter Account'})

        }

        else if (b == "") {
            alert("b不見了");
            //this.setState({account:'Please enter password'})
        }
        else {
	
            fetch('http://140.114.54.22:8080/leaveupdate.php/', {
			//fetch('http://192.168.1.170:8080/leaveupdate.php/', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

			body: JSON.stringify({
				EmployeeID: b,

			})
            }).then((response) => response.json())
              .then((jsonData) => {
                
				if (jsonData == "audit successfully") {
					alert("審核資料已更新");			
								
				}
			   	else if (jsonData == "No this ID"){
					alert("查無此筆資料");			   
				}
				else if (jsonData == "try again"){
					alert("請再試一次");			   
				}	
				else if (jsonData == "Failed to connect"){
					alert("網路連線有誤");
			   
				}	
	
		
			 
				else
				{alert("Something goes wrong here!");}
			})
			.catch((error) => {
				console.error(error);
			});
        }
		
	} */ 
	
	
//測試用 function	
 InsertApplyData = (e) => {

			alert("有在動");
            fetch('http://140.114.54.22:8080/leaveupdate.php/', {
			//fetch('http://192.168.1.170:8080/insertleave.php/', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    // we will pass our input data to server
				EmployeeID: e ,	
				LeaveID: '121',
				StartDate: '',
				EndDate: '',
				ApplicationDate: '',
				Remark:'成功了',
				Approve: '1', 				

                })

            }).then((response) => response.json())
              .then((jsonData) => {
                
				if (jsonData == "audit successfully") {
					alert("申請已遞交");		
					this.state.leavetype = "0";
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

//審核更新
  ApproveLeave =(e) => {
      
	
	if (e == "") {
            alert("尚未取得差假流水號");
            //this.setState({account:'Please enter Account'})
        
        }
        else {
	
            fetch('http://140.114.54.22:8080/updatetest.php/', {
			//fetch('http://192.168.1.170:8080/updatetest.php/', { 
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

			body: JSON.stringify({
			
				AbsentNoteID:e,
				Audited:'1',
				Approve: '0',

			})
            }).then((response) => response.json())
              .then((jsonData) => {
                
				if (jsonData == "audit successfully") {
					alert("審核資料已更新");
					this.setState({boolGet: 0});
					this.GetleaveInfo(905855);	
								
				}		   
				else if (jsonData == "try again"){
					alert("請再試一次");			   
				}	
				else if (jsonData == "Failed to connect"){
					alert("網路連線有誤");
			   
				}	
				 
				else
				{alert("Something goes wrong here!");}
			})
			.catch((error) => {
				console.error(error);
			});
        }		
	}
	

	DisapprLeave =(e) => {
		    	

	if (e == "") {
			alert("ID不見了");
			//this.setState({account:'Please enter Account'})
		
		}
		else {

			fetch('http://140.114.54.22:8080/updatetest.php/', {
			//fetch('http://192.168.1.170:8080/updatetest.php/', { 
				method: 'post',
				header: {
					'Accept': 'application/json',
					'Content-type': 'application/json',
				},

			body: JSON.stringify({
			
				AbsentNoteID:e,
				Audited:'0',
				Approve: '0',

			})
			}).then((response) => response.json())
			  .then((jsonData) => {
				
				if (jsonData == "audit successfully") {
					alert("審核資料已更新");
					this.setState({boolGet: 0});					
								
				}		   
				else if (jsonData == "try again"){
					alert("請再試一次");			   
				}	
				else if (jsonData == "Failed to connect"){
					alert("網路連線有誤");
			   
				}	
				 
				else
				{alert("Something goes wrong here!");}
			})
			.catch((error) => {
				console.error(error);
			});
		}		
	} 
	
	
	
	
	test=()=>{
		this.setState({ test: 3,});	
		alert("其實有作用");
		
	}
    


    render() {

	
	let dimensions = Dimensions.get("window");       
	let imageHeight = Math.round((dimensions.width * 9) / 16);
	let imageWidth = dimensions.width*0.9;
	

	
	const work1 = this.state.leaveInfo;
/* 	let workdataDisplay1 = work1.map(function(jsonData){

	return (
	   <View key={jsonData.EmployeeID}>
		<View style={{flexDirection: 'row'}}>
		  <Text style={{color: '#000',width: 50}}>{jsonData.Remark}</Text>
		  <Text style={{color: '#00f',width: 180}}>{jsonData.StartDate} ~ {jsonData.EndDate}</Text>

		</View>
	   </View>
	)
    });  */
	
	
			
// 依date找出   
	  var results = [];
	  var searchField = "StartDate";
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
	  


  
	  
	  var leaveID = Object.values(results).map(item => item.LeaveID); 
	  var applicationDate = Object.values(results).map(item => item.ApplicationDate); //still object  
	  var startDate = Object.values(results).map(item => item.StartDate); 	  
	  var endDate = Object.values(results).map(item => item.EndDate); 
	  var remark = Object.values(results).map(item => item.Remark); //still object 
	  var absentNoteID = Object.values(results).map(item => item.AbsentNoteID); //still object 
	  
	  
	  
	  this.state.leaveID = String(leaveID);
	  this.state.applicationDate = String(applicationDate).substring(0,5); 
	  this.state.startDate = String(startDate);
	  this.state.endDate = String(endDate); 
	  this.state.remark = String(remark);	
	  this.state.absentNoteID = String(absentNoteID);
	  this.state.res = results;	 


	//按日期排序貼文	
	results = results.sort(function (a, b) {
				
		return a.StartDate > b.StartDate ? 1 : -1;  
		
	}); 
	//再按流水號排序
		results = results.sort(function (a, b) {		
		if (a.StartDate == b.StartDate){
			return a.AbsentNoteID > b.AbsentNoteID ? 1 : -1;
		};
		
	}); 


	
	var resultsbtn = 0
	
	let workdataDisplay2 = results.map((jsonData) =>{
	
	if (jsonData.Approve == 1){
		
		return(
				
	//this.setState({absentNoteID:jsonData.AbsentNoteID,});
		<View key={jsonData.EmployeeID}>
		<View style={styles.list}>
		
		<View style={{flexDirection: 'row'}}>
		<Text style={{flex:1, fontSize: 18,  color:'#435366' ,margin:10,textAlign:'center'}}>{jsonData.StartDate}  {jsonData.Day}</Text>
		</View>	

		<View  style={{ flex: 6,flexDirection:'column',	backgroundColor:'white', borderColor:'#B3D6D0', borderRadius:3, borderWidth:1, margin: 10, width: imageWidth*0.9}}>
		  
		  <View><Text style={{ fontWeight: 'bold', flex:1, fontSize: 18,  color:'#435366' ,marginHorizontal:5,marginVertical:10, textAlign:'left'}}>{jsonData.EmployeeName}    員工編號：{jsonData.EmployeeID}</Text></View> 
		  
		  <View style={{flex: 1, flexDirection:'column'}}>
		  
		  <View style={{flex: 1, flexDirection:'row'}}>
		  <Text style={{flex:4, fontSize: 16,  color:'#435366' ,margin:5, }}>流水號：</Text>
		  <Text style={{flex:7, fontSize: 16,  color:'#435366' ,margin:5, }}>{jsonData.AbsentNoteID}</Text>
		  </View>
		  
		  <View style={{flex: 1, flexDirection:'row'}}>
		  <Text style={{flex:4, fontSize: 16,  color:'#435366' ,margin:5, }}>申請時間：</Text>
		  <Text style={{flex:7, fontSize: 16,  color:'#435366' ,margin:5, }}>{jsonData.ApplicationDate.substring(0,16)}</Text> 
		  </View>
		  
		  <View style={{flex: 1, flexDirection:'row'}}>
		  <Text style={{flex:4, fontSize: 16,  color:'#435366' ,margin:5, }}>差假起始日期：</Text>
		  <Text style={{flex:7, fontSize: 16,  color:'#435366' ,margin:5, }}>{jsonData.StartDate}</Text>
		  </View>
		  
		  <View style={{flex: 1, flexDirection:'row'}}>
		  <Text style={{flex:4, fontSize: 16,  color:'#435366' ,margin:5, }}>差假結束日期：</Text>
		  <Text style={{flex:7, fontSize: 16,  color:'#435366' ,margin:5, }}>{jsonData.EndDate}</Text>	
		  </View>
		  
		  <View style={{flex: 1, flexDirection:'row'}}>
		  <Text style={{flex:4, fontSize: 16,  color:'#435366' ,margin:5, }}>差假類別：</Text>
		  <Text style={{flex:7, fontSize: 16,  color:'#435366' ,margin:5, }}>{jsonData.LeaveID}</Text>
		  </View>
		  
		  <View style={{flex: 1, flexDirection:'row'}}>
		  <Text style={{flex:4, fontSize: 16,  color:'#435366' ,margin:5, }}>事由：</Text>		
		  <Text style={{flex:7, fontSize: 16,  color:'#435366' ,margin:5, }}>{jsonData.Remark} </Text>	
		  </View>
  		  
		  </View>  
				  
		  <View style={{flexDirection:'row',flex:1}}>
		  <View style={{flex:1, alignSelf: 'center', borderColor:'#B3D6D0', borderTopWidth:1, borderRightWidth:0.5}}>

		  <TouchableOpacity transparent full
		   onPress={()=> {this.ApproveLeave.call(this,jsonData.AbsentNoteID);this.setState({booltest: 0});}}>
			<Text style={{ fontWeight: 'bold', fontSize: 18,  color:'#435366' ,margin:10, textAlign:'center'}}>核准</Text>
			</TouchableOpacity>
		  </View>
			
		  <View style={{flex:1, alignSelf: 'center', borderColor:'#B3D6D0', borderTopWidth:1, borderLeftWidth:0.5}}>		  
		  <TouchableOpacity transparent full 
		  onPress={()=> {this.DisapprLeave.call(this,jsonData.AbsentNoteID)}}>
			<Text style={{ fontWeight: 'bold', fontSize: 18,  color:'#435366' ,margin:10, textAlign:'center'}}>待協調</Text>
		 </TouchableOpacity>
		  </View>
		  </View>  
		  
		  
		  </View>
		 
				
		</View></View>
	)}
	else{
		return(
		<View key={jsonData.EmployeeID}>	
		</View>
		
		)
	}
	
	
	});
	
	
	

        return (
		
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
                    <Title>中華郵政</Title>
                    </Body>
					<Right></Right>

                </Header>

                <Content>
			

			
			<Text style={{fontWeight: 'bold', fontSize: 26, height:34, color:'#435366',alignSelf:'center' ,margin:10,}}>差 假 核 准</Text>			
			<Text style={{fontWeight: 'bold', fontSize: 18, color:'#435366',alignSelf:'center' ,margin:5,}}>查 詢 範 圍</Text>
	
					  
			

 
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
            onDateChange={(date)=>{this.setstartDate(date);this.setState({colorbool_1:1})}}
			
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
            onDateChange={(date) => {this.setendDate(date);this.setState({colorbool_2:1});}}
          /></View>
		 
          <Text style={{ flexDirection:'column', fontSize: 12,  height: 30, color:'#435366',alignSelf:'center' ,margin:10,	flexDirection: 'row', justifyContent: 'center',}}>
            Date: {this.state.chosenstartDate.toString().substr(4, 12)}
			Date: {this.state.chosenendDate.toString().substr(4, 12)}			
          </Text>

			<View style={{flex: 1 ,alignItems: 'center',justifyContent: 'flex-end',flexDirection: 'column'}}>
				<View>
					<Button transparent onPress={() => {				
					this.GetleaveInfo(905855);
					this.betweendate();	
						
					//this.goodjob();
					//alert('login successfully!');				
					//this.props.navigation.navigate("Mastermode");				
					}}><Image style={{width:294, height:54}} source={querybtn}	/>
					  </Button>
				</View>
			</View>		  
		  
			{workdataDisplay2}
		

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
	alignItems:'center',
	flexDirection: 'column',
	margin:10,


},
	
	
});
