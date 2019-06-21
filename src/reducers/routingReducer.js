
const initialState = {
    pageHeader: '',
    showSidebar: false
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case CHANGE_PAGE_HEADER:
            return {...state, pageHeader: payload};
        case TOGGLE_SIDEBAR:
            return {...state, showSidebar: !state.showSidebar}
        default:
            return state;
    }
}

const CHANGE_PAGE_HEADER = 'CHANGE_PAGE_HEADER';
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const changePageHeader = header => {
    return {
        type: CHANGE_PAGE_HEADER,
        payload: header
    }
}

export const toggleSidebar = () => {
    return {
        type: TOGGLE_SIDEBAR
    }
}