import React, {Component} from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getUserTags } from '../../reducers/tagReducer';
import './GeneratePlaylistByTags.scss';

class GeneratePlaylistByTags extends Component{
    constructor(props){
        super(props);

        this.state = {
            includeList: [],
            excludeList: [],
            userTagsLocal: [],
            includePanal: 'open',
            excludePanal: 'open',
            filterTextIncludes: '',
            filterTextExcludes: ''
        }

        this.props.getUserTags()
    }

    componentWillUpdate(){
        
    }

    renderTags = (type) => {
        return(
            this.props.userTags.filter(item => {
                return item.tag_description.includes(type === 'includes' ? this.state.filterTextIncludes : this.state.filterTextExcludes);
            }).map(item => {
                return (
                <div className='tag-selector-item' 
                    key={item.tag_id}
                >
                    <input className='select-checkbox' type='checkbox' onClick={() => {
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
                    }
                    } />
                    <div>
                        <p>
                            #{item.tag_description}
                        </p>
                        <p>
                            {item.songs_tagged}
                        </p>
                    </div>
                </div>)
            })
        )
    }
    
    render(){
        return (
            <div className='generate-playlist-by-tags'>
                <div className='generate-playlist-panal '>
                    <h3
                        // onClick={() => this.setState({includePanal: (this.state.includePanal === 'open') ? 'close' : 'open'})}
                    >Include Tags 
                    
                        <input 
                            type='text' 
                            className='filter-input' 
                            placeholder='Search Tags'
                            onClick={e => e.stopPropagation} 
                            onChange={e => this.setState({filterTextIncludes: e.target.value})}/>
                    </h3>
                    <div className={'tag-selector '  + this.state.includePanal}>
                        <div>
                            {this.renderTags('includes')}
                            
                        </div>
                    </div>
                </div>
                
                <div className={'generate-playlist-panal '}>
                    <h3
                       // onClick={() => this.setState({excludePanal: this.state.excludePanal === 'open'  ? 'close' : 'open'})}
                    >Exclude Tags 
                        <input 
                            type='text' 
                            className='filter-input' 
                            placeholder='Search Tags'
                            onClick={e => e.stopPropagation} 
                            onChange={e => this.setState({filterTextExcludes: e.target.value})}/>
                    </h3>
                    
                    <div className={'tag-selector '  + this.state.excludePanal}> 
                        <div>
                            {this.renderTags('excludes')}
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        disabled={this.props.playlistId ? false : true}
                        className={`${this.props.playlistId ? 'create-button' : 'disabled-button'}`} 
                        onClick={() => {
                        axios.post(`/api/add_songs_by_id/${this.props.playlistId}`, {
                            includeList: this.state.includeList,
                            excludeList: this.state.excludeList
                        }).then(res => {
                            
                        });

                    }}>
                        Add Songs by Tag
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

export default connect(mapStateToProps, { getUserTags })(withRouter(GeneratePlaylistByTags));