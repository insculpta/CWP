import React from 'react';
import PropTypes from 'prop-types';
import DialogInput from 'react-native-dialog-input';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';

import {
  Picker,
  Icon,
  Left,
  Right,
  Body,
  ListItem,
  Button,
  Thumbnail
} from "native-base";
const Item = Picker.Item;

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const onplayBtn = require("./assets/Play/play.png");
const offplayBtn = require("./assets/Play/pause.png");

export default class FileItem extends React.Component {

    static propTypes = {
        filename: PropTypes.string.isRequired,
        deleteFile: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            isPlaying: false
        };

        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.handleDelete = this.handleDelete.bind(this);
    }

    onStartPlay = async () => {
        console.log('onStartPlay');
        const path = 'sdcard/' + this.props.filename + '.mp4';
        const msg = await this.audioRecorderPlayer.startPlayer(path);
        console.log(msg);
        this.setState({
            isPlaying: true
        });
        this.audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                console.log('finished');
                this.onStopPlay();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            return;
        });
    }

    onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
        this.setState({
            isPlaying: false
        });
    }

    onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
        this.setState({
            isPlaying: false
        });
    }

    handleDelete() {
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
        this.props.deleteFile(this.props.filename);
    }

    render() {
        return (
          <View style={styles.root }>
            <Left style={{flex:1, alignItems: 'center', marginTop:5, marginBottom:5,marginRight:10 }}>
                <TouchableHighlight underlayColor='#666666' onPress={ this.state.isPlaying ? this.onPausePlay : this.onStartPlay }>
                    <Image style={{width:40, height:40}}  source={this.state.isPlaying ? offplayBtn:onplayBtn}/>
                </TouchableHighlight>

              </Left>
              <Body style={{flex:4, alignItems: 'flex-start'}}>
                <Text style={styles.fileInfo}>{ this.props.filename }</Text>
                <Text numberOfLines={1} note>06/10   {this.state.playTime}</Text>
              </Body>


             <Right  style={{flex:4}}>
                <View style={{flexDirection: 'row'}} >
                   <Button transparent  style={{marginHorizontal:10}}>
                      <Image style={{width:20, height:20}}  source={require("./assets/Play/rename.png")}/>

                    </Button >

                  <Button transparent style={{smarginHorizontal:10,marginRight:10,marginLeft:10}}  onPress={this.handleDelete}>
                      <Image style={{width:20, height:20}}  source={require("./assets/Play/delete.png")}/>

                  </Button >
                </View>
              </Right>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#666666',
        flexDirection: 'row',
        padding:7,
        marginBottom:1
    },
    rooticon: {
        flexDirection: 'row',
        marginTop:30
    },

    playButton: {

    },
    fileInfo: {
        color: '#ffff',
        fontSize: 20
    },
    textinfo: {
        color: '#212121',
        fontSize: 13
    }
});
