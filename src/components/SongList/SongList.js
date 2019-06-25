import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import { getRecentlyPlayed, changeCurrentSong } from '../../reducers/recentlyPlayedReducer';


import SongItem from '../SongItem/SongItem'

import './SongList.scss'

class SongList extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
        
        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 100
          })
    }
    componentWillMount(){
        this.props.getRecentlyPlayed()
    }

    renderRow = ({index, key, style, parent}) => {
        //console.log('index is:', index)
        return(
            
            <CellMeasurer 
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                    <SongItem
                        passedStyle={style}
                        song={this.props.recentlyPlayed[index]}
                        click={this.props.changeCurrentSong}
                    />
            </CellMeasurer>
        )
    }

    renderList(){

    }



    render(){
        console.log(this.props)
        return(
            <div className="song-list">
                <AutoSizer>
                    {
                        ({width, height}) =>
                        {
                            console.log(width, height)
                            return (
                                this.props.recentlyPlayed ? 
                                <List
                                    width={width}
                                    height={height}
                                    rowHeight={this.cache.rowHeight}
                                    rowRenderer={this.renderRow}
                                    rowCount={this.props.recentlyPlayed.length} 
                                    overscanRowCount={100}
                                /> : null
                                
                            )
                        }
                    }

                </AutoSizer>
           </div>
        )
    }
}

function mapStateToProps(state){
    return {
        recentlyPlayed: state.recentlyPlayed.recentlyPlayed
    }
    
}

export default connect(mapStateToProps, { getRecentlyPlayed, changeCurrentSong })(SongList)