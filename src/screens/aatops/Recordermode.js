import React, { Component } from "react";
import { StyleSheet, Slider} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Badge,
  Text,
  Left,
  Right,
  Body,
  Item,
  Input
} from "native-base";

import Animation from 'lottie-react-native';
import LottieView from 'lottie-react-native';
//import styles from "./styles";
const styles=StyleSheet.create({
  container: {
    backgroundColor: "#484848"  // 背景色
  },
  header: {
    backgroundColor: "#000000"  // 背景色
  },

  mb: {
    marginBottom: 10
  }
});


class Recordermode extends Component {

  constructor() {
      super();
      this.state = { hvolumn: 0, user:'user1' };
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

  render() {
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
            <Title>Recoder</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Badge primary style={styles.mb}>
            <Icon
              name="people"
              style={{ fontSize: 15, color: "#fff", lineHeight: 20 }}
            />
          </Badge>
          <Badge
            style={{ backgroundColor: "black" }}
            textStyle={{ color: "white" }}
          >
            <Text>1866</Text>
          </Badge>

          <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={4}
              minimumTrackTintColor="#33d9e1"
              maximumTrackTintColor="#000000"
              thumbTintColor="#33d9e1"
              onValueChange={(value) => {
                console.log('CHANGE', value);

                this.setState({hvolumn: value });
              }}
            />
            <Badge
              style={{ backgroundColor: "black" }}
              textStyle={{ color: "white" }}
            >
              <Text>{Number((this.state.hvolumn).toFixed(1))}</Text>
            </Badge>


            <Animation
               ref={animation => { this.animation = animation; }}
               loop={true}
               style={{
                 width: 60,
                 height: 60,
               }}
               source={require('../../../assets/animation/logo.json')}
             />


        </Content>
      </Container>
    );
  }
}

export default Recordermode;
