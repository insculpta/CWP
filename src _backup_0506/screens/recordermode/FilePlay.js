import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ProgressBar from 'react-native-progress/Bar';

const playBtn = require("./assets/Play/play.png");
const pauseBtn = require("./assets/Play/pause.png");

export default class FileItem extends React.Component {

    static propTypes = {
        filename: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            isPlaying: false,
            progressValue: 0
        };

        this.audioRecorderPlayer = new AudioRecorderPlayer();
    }

    componentWillReceiveProps() {
        this.onStopPlay();
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
                this.audioRecorderPlayer.stopPlayer();
                this.setState({
                    isPlaying: false
                });
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
                progressValue: e.current_position / e.duration
            });
            return;
        });
    }

    onPausePlay = async () => {
        this.setState({
            isPlaying: false
        });
        await this.audioRecorderPlayer.pausePlayer();
    }

    onStopPlay = async () => {
        this.onStartPlay();
        console.log('onStopPlay');
        await this.audioRecorderPlayer.stopPlayer();
        await this.audioRecorderPlayer.removePlayBackListener();
        this.setState({
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            isPlaying: false,
            progressValue: 0
        });
    }

    render() {
        return (
            <View style={styles.root}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={ this.state.isPlaying ? this.onPausePlay : this.onStartPlay } >
                    <Image source={ this.state.isPlaying ? pauseBtn : playBtn }/>
                </TouchableOpacity>
                <View style={styles.block}>
                    <Text style={styles.fileInfo}>{ this.props.filename }</Text>
                    <View style={styles.progressUnit}>
                        <Text style={styles.timeText}>{ this.state.playTime }</Text>
                        <ProgressBar
                            style={styles.progressBar}
                            animated={false}
                            indeterminateAnimationDuration={100}
                            progress={this.state.progressValue}
                            color={'#33d9e1'}
                            unfilledColor={'black'}
                            width={null}
                            borderWidth={0}
                        />
                        <Text style={styles.timeText}>{ this.state.duration }</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#666666',
        marginVertical: 4
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    block: {
        flex: 5
    },
    fileInfo: {
        flex: 1,
        color: 'black',
        fontSize: 24,
        marginTop: 8,
        marginLeft: 8
    },
    progressUnit: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    timeText: {
        flex: 1,
        color: 'black',
        fontSize: 16,
        marginLeft: 8
    },
    progressBar: {
        flex: 3,
        marginTop: 8,
        marginBottom: 20,
        marginLeft: 6
    }
});
