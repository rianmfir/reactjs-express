import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navigation } from './components';
import { Detail, Edit, Home, Tambah } from './pages';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact children={() => <Home />} />
          <Route path="/detail/:id" children={() => <Detail />} />
          <Route path="/edit/:id" children={() => <Edit />} />
          <Route path="/tambah" children={() => <Tambah />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;