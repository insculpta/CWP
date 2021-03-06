import React, { Component } from "react";
import { Image, ImageBackground } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Thumbnail,
  View
} from "native-base";
import styles from "./style";

const drawerImage = require("../../../assets/account.jpg");


class SideBar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };

    this.datas = [
      {
        name: "公告與通知",
        route: "Mastermode",  //要連到的mod

      },
      {
        name: "班表查詢",
        route: "PlayMode",

      },
      {
        name: "差假申請",
        route: "LeaveApplication",

      },
      {
        name: "差假申請核准",
        route: this.props.screenProps.room==-1?"ConnectSelect":"Master_main_page",

      },

      {},


        {
          name: "登出",
          route: this.props.screenProps.room==-1?"ConnectSelect":"Master_main_page",

        },


    ];
  };
  componentWillReceiveProps(nextProps){
  if(nextProps.screenProps.room!=this.props.screenProps.room){

    this.datas[3].route=nextProps.screenProps.room==-1?"ConnectSelect":"Master_main_page";
  }
}
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#1e2d28" , top: -1 ,}}>




          <View style={{height: 200,justifyContent: 'center',alignItems:'center',backgroundColor: '#1e2d28'}}>
          </View>

          <List contentContainerStyle={{backgroundColor: "#1e2d28"  }}
            dataArray={this.datas}
            renderRow={data =>
              <ListItem
                //divider
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)} style={{backgroundColor: "#1e2d28"}}
              >
                <Left>


                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />

        </Content>
      </Container>
    );
  }
}

export default SideBar;
