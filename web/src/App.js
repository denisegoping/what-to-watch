import './App.css';
import { Provider } from 'react-redux'

var LandingPage = require('./components/Pages/landingPage/index.tsx').LandingPage;
const storeInstance = require('./configureStore.js').storeInstance;

function App() {
  return (
    <Provider store={storeInstance}>
      <LandingPage/>
    </Provider>
  );
}

export default App;
