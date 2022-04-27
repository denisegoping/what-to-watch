import './App.css';
import { Provider } from 'react-redux'
import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
// import { storeInstance } from './configureStore';

var LandingPage = require('./components/Pages/landingPage/index.tsx').LandingPage;
const storeInstance = require('./configureStore.js').storeInstance;

function App() {
  return (
    <Provider store={storeInstance}>
    <LandingPage></LandingPage>
    </Provider>
  );
}

export default App;
