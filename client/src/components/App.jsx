import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import Navbar from './Navbar';
import Auth from './Auth';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/' exact component={() => <Redirect to='/memories' />} />
        <Route path='/memories' exact>
          <Home />
        </Route>
        <Route path='/memories/search' exact>
          <Home />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
