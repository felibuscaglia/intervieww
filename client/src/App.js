import * as React from 'react';
import { Route } from 'react-router-dom';
import Homepage from './screens/homepage/homepage';
import SignupPage from './screens/signup/signup';
import LoginPage from './screens/login/login';
import TopicPage from './screens/topicPage/topicPage';
import PurchaseSuccess from './screens/purchase-success/purchase-success';
import UserProfile from './screens/userProfile/userProfile';
import PathPage from './screens/pathPage/pathPage';
import FinishTopic from './screens/finishTopic/finishTopic';
import AdminPanel from './screens/adminPanel/adminPanel';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={ Homepage } /> 
      <Route exact path='/signup' component={ SignupPage }  /> 
      <Route exact path='/login' component={ LoginPage } />
      <Route path='/topic/:topicId/questions' render={({ match }) => <TopicPage topicId={match.params.topicId} />} /> 
      <Route path='/welcome' component={ PurchaseSuccess } />
      <Route path='/profile' component={ UserProfile } />
      <Route path='/path/:pathId' render={({ match }) => <PathPage pathId={match.params.pathId} />} />
      <Route exact path='/finish' render={({ location }) => <FinishTopic location={location} />} /> 
      <Route exact path='/admin' component={ AdminPanel } />
    </React.Fragment>
  );
}

export default App;
