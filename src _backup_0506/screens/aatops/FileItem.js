import React from 'react';
import PropTypes from 'prop-types';
import DialogInput from 'react-native-dialog-input';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    Right,
    Button,
} from "native-base";

export default class FileItem extends React.Component {

    static propTypes = {
        filename: PropTypes.string.isRequired,
        callPlay: PropTypes.func.isRequired,
        deleteSelf: PropTypes.func.isRequired,
        getNewName: PropTypes.func.isRequired,
        Playing: PropTypes.bool.isRequired,
        //truePlaying: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isDialogVisible: false,
            dialogVisible: false
        };
        this.chooseFile = this.chooseFile.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.rename = this.rename.bind(this);
        this.deleteDialog = this.deleteDialog.bind(this);
        this.sendInput = this.sendInput.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    chooseFile() {
        this.props.callPlay(this.props.filename);
    }

    handleDelete() {
        console.log("delete");
        this.setState({
            dialogVisible: false
        })
        this.props.deleteSelf(this.props.filename);
    }

    getNewName(newFileName, oldFileName) {
        this.props.getNewName(newFileName, oldFileName);
    }

    rename() {
        this.setState({
            isDialogVisible: true
        })
    }

    deleteDialog() {
        this.setState({
            isDialogVisible: false
        })
    }

    sendInput(inputText) {
        this.setState({
            isDialogVisible: false
        })
        this.props.filename = inputText;
        this.getNewName(inputText, this.props.filename);
    }

    Delete() {
        this.setState({
            dialogVisible: true
        })
    }

    render() {
        //console.log(this.props.Playing);
        return (
            <View style={styles.root}>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={this.chooseFile}>
                    <Text style={styles.fileInfo}>{ this.props.filename }</Text>
                    <Text style={styles.textInfo}>06/10</Text>
                </TouchableOpacity>
                <Right style={{flex:4}}>
                    <View style={{flexDirection: 'row'}} >
                        {this.props.Playing ? <Image style={{marginTop:9, marginRight:12}} source={require("../recordermode/assets/Play/playing.png")}></Image> : <View></View>}
                        <Button transparent  style={{marginHorizontal:10}} onPress={this.rename}>
                            <Image style={{width:20, height:20}}  source={require("../recordermode/assets/Play/rename.png")}/>
                        </Button>
                        <DialogInput isDialogVisible={this.state.isDialogVisible}
                            title={"Rename"}
                            hintInput ={"Input Here"}
                            submitInput={ (inputText) => {this.sendInput(inputText)} }
                            closeDialog={ () => {this.deleteDialog()}}
                            >
                        </DialogInput>

                        <Button transparent style={{smarginHorizontal:10,marginRight:10,marginLeft:10}}  onPress={this.Delete}>
                            <Image style={{width:20, height:20}}  source={require("../recordermode/assets/Play/delete.png")}/>
                        </Button>
                        <ConfirmDialog
                            title="Delete"
                            message="Are you sure to delete this file?"
                            visible={this.state.dialogVisible}
                            onTouchOutside={() => this.setState({dialogVisible: false})}
                            positiveButton={{
                                title: "YES",
                                onPress: () => {
                                    this.setState({
                                        dialogVisible: false
                                    })
                                    this.props.deleteSelf(this.props.filename);
                                }
                            }}
                            negativeButton={{
                                title: "NO",
                                onPress: () => this.setState({dialogVisible: false})
                            }}
                        />
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
        marginBottom: 1,
        paddingVertical: 8,
        justifyContent: 'center'

    },
    playButton: {
        flex: 4
    },
    fileInfo: {
        color: 'white',
        fontSize: 20,
        marginLeft: 16,
        justifyContent: 'center'

    },
    textInfo:{
      color: '#212121',
      fontSize: 13,
      marginLeft: 16,
      justifyContent: 'center'
    },
    optionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
