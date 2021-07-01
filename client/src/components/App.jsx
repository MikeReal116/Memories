import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Navbar from './Navbar';
import Auth from './Auth';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/' exact>
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
