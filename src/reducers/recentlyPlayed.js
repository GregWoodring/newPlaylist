const initialState = {
    recentlyPlayed: {}
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        default:
            return state;
    }
}