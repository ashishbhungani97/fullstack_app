import './App.css';
import Index from './components/Index';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Insert from './components/Insert';
import Edit from './components/Edit';

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/insert">
            <Insert />
          </Route>
          <Route exact path="/edit/:slug" component={ Edit } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
