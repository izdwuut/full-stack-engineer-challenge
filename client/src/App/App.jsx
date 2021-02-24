import { hot } from 'react-hot-loader/root';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import GlobalStyle from '../theme';
import { Application } from './styles';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { getLandingPods } from '../redux/actions';

const App = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getLandingPods())
        console.log(state.landingPods)
    }, [])
    
    return (
        <>
            <Application >
                <Rocket />
                <span>"Space isn't remote at all. It's only an hour's drive away, if your car could go straight upwards."</span>
            </Application>
            <GlobalStyle />
        </>
    )
};

export default hot(App);