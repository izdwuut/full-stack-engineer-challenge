import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { GET_ERROR, GET_LANDING_POD, GET_LANDING_PODS } from './types';

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

let initialState = {
    landingPods: [],
    landingPod: {},
    error: null
}

const reducers = {
    spaceData: (oldState = initialState, action) => {
        const { type } = action;
        switch (type) {
            case GET_LANDING_PODS:
                
                return {
                    ...oldState,
                    landingPods: action.payload
                }
            case GET_LANDING_POD:
                return {
                    ...oldState,
                    landingPod: action.payload
                }
            case GET_ERROR:
                return {
                    ...oldState,
                    error: action.payload
                }
            default:
                return oldState;
        }
    },
};

const slices = combineReducers({ ...reducers });
const middleware = [thunk]

const composeEnhancers = isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;


const store = createStore(
    slices,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
