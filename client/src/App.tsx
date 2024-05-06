import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './router/router';
import { store } from './store/store';
import './App.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
