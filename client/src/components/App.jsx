import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import Navbar from './Navbar';
import Auth from './Auth';
import PageDetail from './PageDetail';

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
        <Route path='/memories/:id' exact>
          <PageDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
