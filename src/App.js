import { Routes, Route } from 'react-router-dom';
import './App.scss';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Signup from './routes/signup/signup.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='/sign-up' element={<Signup /> } />
      </Route>
    </Routes>
  );
}

export default App;
