import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="*" element={ <h1>404 not dfound</h1> } />
    </Routes>
  );
}

export default App;
