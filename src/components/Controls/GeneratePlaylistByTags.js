import React, {Component} from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

import { getUserTags } from '../../reducers/tagReducer';
import './GeneratePlaylistByTags.scss';

class GeneratePlaylistByTags extends Component{
    constructor(props){
        super(props);

        this.state = {
            includeList: [],
            excludeList: []
        }

        this.props.getUserTags()
    }
    
    render(){
        return (
            <div className='generate-playlist-by-tags'>
                <h3>Include Tags </h3>
                <div className='tag-selector'>
                    <div>
                        {this.props.userTags.map(item => {
                            return (
                            <div className='tag-selector-item'
                                key={item.tag_id}
                            >
                                <input type='checkbox' onClick={() => {
                                    let index = this.state.includeList.findIndex(tag => {
                                        return item.tag_id === tag
                                    })
                                    if(index >= 0){
                                        let newList = [...this.state.includeList]
                                            newList.splice(index, 1);
                                        this.setState({includeList: newList});
                                    } else {
                                        this.setState({includeList: [item.tag_id, ...this.state.includeList]});
                                    }
                                    console.log(this.state.includeList);
                                }
                                } />
                                <p>
                                    {item.tag_description}
                                </p>
                                <p>
                                    {item.songs_tagged}
                                </p>
                            </div>)
                        })}
                    </div>
                </div>

                <h3>Exclude Tags </h3>
                <div className='tag-selector'>
                    
                    <div>
                        {this.props.userTags.map(item => {
                            return (
                                <div 
                                    className='tag-selector-item'
                                    key={item.tag_id}
                                >
                                    <input type='checkbox' onClick={() => {
                                        let index = this.state.excludeList.findIndex((tag, index) => {
                                            return +item.tag_id === +tag
                                        })
                                        

                                        if(index >= 0){
                                            let newList = [...this.state.excludeList]
                                            newList.splice(index, 1);
                                            this.setState({excludeList: newList})
                                        } else {
                                            this.setState({excludeList: [item.tag_id, ...this.state.excludeList]});
                                        }
                                        console.log(this.state.excludeList);
                                    }
                                    } />
                                    <p>
                                        {item.tag_description}
                                    </p>
                                    <p>
                                        {item.songs_tagged}
                                    </p>
                                </div>)
                            })}
                        </div>
                    </div>
                    
                    <button onClick={() => {
                        axios.post(`/api/add_songs_by_id/${this.props.playlistId}`, {
                            includeList: this.state.includeList,
                            excludeList: this.state.excludeList
                        })
                    }}>
                        New Playlist
                    </button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userTags: state.tags.userTags,
        fetchingUserTags: state.tags.fetchingUserTags
    }
}

export default connect(mapStateToProps, { getUserTags })(GeneratePlaylistByTags);