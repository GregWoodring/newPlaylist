import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePageHeader } from '../../reducers/routingReducer';
import { changeCurrentPlaylist, syncPlaylist } from '../../reducers/playlistReducer';

import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import PlaylistItem from '../ListItems/PlaylistItem';

import './PlaylistList.scss';

class PlaylistList extends Component{
    constructor(props){
        super(props);

        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 100
        });
    }

    
    openPlaylist = playlist => {
        this.props.changePageHeader(playlist.playlist_name);
        this.props.changeCurrentPlaylist(playlist);
        this.props.history.push(`/main/playlists/${playlist.playlist_id}`);
    }

    // renderRow = ({index, key, style, parent}) => {
    //     return (
    //         <CellMeasurer 
                
    //             key={key}
    //             cache={this.cache}
    //             parent={parent}
    //             columnIndex={0}
    //             rowIndex={index}>
    //                 <PlaylistItem
    //                     playlist={this.props.list[index]}
    //                     passedStyle={style}
    //                     click={this.openPlaylist}
    //                     syncing={this.props.syncing}
    //                 />
    //         </CellMeasurer>
    //     )
    // }

    renderRow = () => {
        return this.props.list.map(item => {
            return(
                <PlaylistItem
                        playlist={item}
                        //passedStyle={style}
                        click={this.openPlaylist}
                        syncing={this.props.syncing}
                    />
            )
        })
    }

    


    render(){
        return(
            
            <div className='playlist-list'>
                
                {this.renderRow()}
                {/* <AutoSizer>
                    {
                        ({width, height}) =>
                        {
                            console.log(width, height)
                            return (
                                <List
                                    width={width}
                                    height={height}
                                    rowHeight={this.cache.rowHeight}
                                    rowRenderer={this.renderRow}
                                    rowCount={this.props.list.length} 
                                    overscanRowCount={20}
                                    
                                /> 
                            )
                        }
                    }

                </AutoSizer> */}
            </div>
        )
    }
    
}



export default connect(null, { changePageHeader, changeCurrentPlaylist, syncPlaylist })(withRouter(PlaylistList));