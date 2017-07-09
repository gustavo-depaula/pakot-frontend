import React from 'react';
import ReactDOM from 'react-dom';
import Index from './App/Containers/Index';
import App from './App/App';
import MyComponent from './App/Components/MyComponent';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';

class Routes extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
          <Route path="/some-path" component={MyComponent}/>
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(
  <Routes />, document.getElementById('root'));