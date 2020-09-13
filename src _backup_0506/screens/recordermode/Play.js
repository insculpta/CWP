import React from 'react';
import PropTypes from 'prop-types';

import {
    ListView
} from 'react-native';

import FileItem from './FileItem';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

export default class Play extends React.Component {

    static propTypes = {
        fileList: PropTypes.array.isRequired,
        fileItemDelete: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        
        if(this.props.fileList){
            this.state = {
                currentList: this.props.fileList,
                dataSource: ds.cloneWithRows(this.props.fileList)
            };
        }
        else{
            this.state = {
                currentList: [],
                dataSource: ds.cloneWithRows([])
            };
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(filename) {
        var items = this.state.currentList.filter(function(element) {
            return element !== filename;
        });
        this.setState({
            currentList: items,
            dataSource: ds.cloneWithRows(items)
        });
        this.props.fileItemDelete(filename);
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
                    return <FileItem filename={rowData} deleteFile={this.handleDelete} />;
                }}
            />
        );
    }
}