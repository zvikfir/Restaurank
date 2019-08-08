import initialState from '../../initialState';

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
