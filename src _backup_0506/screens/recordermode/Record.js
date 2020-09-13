import React from 'react';
import PropTypes from 'prop-types';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    PermissionsAndroid,
    Platform,
    AsyncStorage
} from 'react-native';
import {
  Thumbnail,
  Container,
  Text,
  Button,
  Item,
  Input
} from "native-base";

const startButton = require("./assets/RecorderMode/start_cute.png");
const stopButton = require("./assets/RecorderMode/stop.png");
const deleteButton = require("./assets/RecorderMode/delete.png");
const pauseButton = require("./assets/RecorderMode/pause.png");

export default class Record extends React.Component {

    static propTypes = {
        addNewFile: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            recordSecs: 0,
            recordTime: '00:00:00',
            filename: 'Recording #',
            title: 'Recording #',
            nameCount: 1,
            isRecording: false,
            recordBtn:startButton,
            deleteBtn:deleteButton,
            stopBtn:stopButton,

        };

        this.audioRecorderPlayer = new AudioRecorderPlayer();
    }

    componentDidMount() {
        AsyncStorage.getItem('nameCount').then(value => {
            if(JSON.parse(value)) {
                this.setState({
                    nameCount: JSON.parse(value),
                    filename: 'Recording #' + JSON.parse(value),
                    title: 'Recording #' + JSON.parse(value)
                });
            }
            else{
                this.setState({
                    nameCount: 1,
                    filename: 'Recording #1',
                    title: 'Recording #1'
                });
            }
        });
    }

    componentWillUnmount() {
        AsyncStorage.setItem('nameCount', JSON.stringify(this.state.nameCount));
    }

    componentWillReceiveProps(newProps) {
        if(this.props.screenProps != newProps.screenProps) {
            if(newProps.screenProps) this.onStartRecord();
            else this.onStopRecord();
        }
    }

    onStartRecord = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('WRITE_EXTERNAL_STORAGE_Granted');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
              console.warn(err);
              return;
            }
        }

        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('RECORD_AUDIO_Granted');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        console.log('ksjdjksjdksjdksjdksjdksjd');
        const path = 'sdcard/' + this.state.filename + '.mp4';
        const result = await this.audioRecorderPlayer.startRecorder(path);
        this.setState({
            isRecording: true,
            recordBtn: pauseButton
        });
        this.audioRecorderPlayer.addRecordBackListener((e) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
            });
            return;
        });
        console.log(result);
    }



    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
            isRecording: false,
            recordBtn: startButton,
        });
        this.props.addNewFile(this.state.filename);
        this.setState((prevState, props) => ({
            nameCount: prevState.nameCount + 1,
            filename: 'Recording #' + (prevState.nameCount + 1),
            title: 'Recording #' + (prevState.nameCount + 1)
        }));
        console.log(result);

    }

    deleteRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
            isRecording: false,
            recordBtn:startButton
        });
        console.log(result);
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.time}>
                      <Text style ={{fontSize:50, color:'#ffff',height:60}}>{ this.state.recordTime }</Text>
                </View>

                <View style={styles.text}>
                      <Item style={styles.name}>
                         <Input placeholder={ this.state.title }
                                onChangeText={val => this.setState({ filename: val })}
                                style={styles.input}/>

                      </Item>
                      <Text style ={{fontSize:16,color:'#ffff',justifyContent:'center',alignItems: 'center'}}>ready to start</Text>
                </View>

                <View style={styles.buttomRow}>
                    <Button style={styles.delete}
                        transparent
                        onPress={this.deleteRecord}>
                        <Thumbnail square small source={this.state.deleteBtn} style={{marginBottom: 10}} />
                    </Button>
                    <Button style={styles.record}
                        transparent
                        onPress={this.onStartRecord}>
                        <Thumbnail square source={this.state.recordBtn} style={{marginBottom: 10}} />
                    </Button>
                    <Button  style={styles.stop}
                        transparent
                        onPress={this.onStopRecord}>
                        <Thumbnail square small source={this.state.stopBtn} style={{marginBottom: 10}} />
                    </Button>
                </View>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#484848'
    },
    time:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,

    },
     text: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttomRow: {
        flex:3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    name:{
      width: 180,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 6,
    },
    input:{
      marginBottom:-10,
      fontSize:20,
      color:'#ffff',
      height:42,
      justifyContent:'center',
      alignSelf:'center'
    },

    record: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    stop: {
        flex:2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    delete: {
        flex:2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});
