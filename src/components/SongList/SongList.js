import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';



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
        });
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
                        song={this.props.list[index]}
                        click={this.props.changeCurrentSong}
                    />
            </CellMeasurer>
        )
    }

    renderList(){

    }



    render(){
        return(
            <div className="song-list" style={this.props.passedStyle}>
                <AutoSizer>
                    {
                        ({width, height}) =>
                        {
                            return (
                                this.props.list ? 
                                <List
                                    width={width}
                                    height={height}
                                    rowHeight={this.cache.rowHeight}
                                    rowRenderer={this.renderRow}
                                    rowCount={this.props.list.length} 
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


export default SongList