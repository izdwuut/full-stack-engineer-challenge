import axios from 'axios'
import { apiBaseUrl } from '../config'
import { GET_ERROR, GET_LANDING_PODS } from './types'

export const getLandingPods = () => async dispatch => {
    axios.get(apiBaseUrl + '/').then(res => {
        console.log('dispatch')
        dispatch({
            type: GET_LANDING_PODS,
            payload: res.data
        })
    }).catch(e => {
        dispatch({
            type: GET_ERROR,
            payload: console.log(e),
        })
    })

}