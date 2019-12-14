import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/login';
import Devs from './pages/devs';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Devs,
    })
);
