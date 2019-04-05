import React from 'react';
import { render }from 'react-dom';
import './styles/main.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import explore from './components/Pages/explore.jsx';
import about from './components/Pages/about';
import login from './components/Pages/login';
import register from './components/Pages/register';
import mapContainer from './components/Pages/mapContainer.jsx';
import solution from './components/Pages/solution.jsx';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import Browse from './components/Pages/Browse';
import DataTest from './components/Pages/DataTest';
import addSolution from './components/Pages/addSolution';
import dashboard from './components/Pages/dashboard';
//import registerServiceWorker from './registerServiceWorker';

render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path='/browse' component={Browse} />
        <Route path='/about' component={about} />
				<Route path='/login' component={login} />
				<Route path='/register' component={register} />
        <Route exact path='/' component={explore}/>
        <Route path='/map' component={mapContainer} />
        <Route path='/solution/add' component={addSolution} />
        <Route path='/solution/:id' component={solution} />
        <Route path='/test' component={DataTest}/>
        <Route exact path="/dashboard" component={dashboard} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
//registerServiceWorker();
