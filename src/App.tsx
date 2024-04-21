import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Search from './components/search/Search';
import Album from './components/album/Album';
import Layout from './components/layout/Layout';
import Favorites from './components/favorites/Favorites';
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
      </Route>

      <Route path="*" element={ <h1>404 not dfound</h1> } />
    </Routes>
  );
}

export default App;
