import Home from './Home'
import ViewAll from './pages/ViewAll';
import Watchlist from './pages/Watchlist';
import Charts from './pages/Charts';
import {
 // BrowserRouter as Router,
  Switch,
  Route,
  Redirect

} from "react-router-dom";

import { HashRouter } from 'react-router-dom';
import './css/App.css'



function App() {


  window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

  return (


    
    <div className="App">
  
            <div className="preloader">
                <div className="preloader-inner">
                    <div className="preloader-icon">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>




      <HashRouter>

        {/* home page */}
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          {/* ViewAll Page*/}

          <Route exact path='/viewall'>

            <ViewAll />
          </Route>

          {/* Watchlist Page */}

          <Route exact path='/watchlist'>
            <Watchlist />
          </Route>

          {/* tracker Page */}

          <Route exact path='/watchlist/tracker/:id'>
            <Charts/>
          </Route>


          <Redirect to='/' />

        </Switch>

      </HashRouter>
    </div>
  );
}

export default App;
