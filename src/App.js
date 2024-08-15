import { Routes, Route } from 'react-router-dom';
import './App.scss';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Signup from './routes/signup/signup.component';
import RecipePostForm from './components/recipe-post-form/recipe-post-form.component';
import ViewRecipes from './routes/view-recipes/view-recipes.component';
import RecipeDetail from './components/recipe-detail/recipe-detail.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='/sign-up' element={<Signup /> } />
        <Route path='/recipes-post' element={<RecipePostForm />} />
        <Route path='/recipes-view' element={<ViewRecipes />} />
        <Route path='/recipes/:id' element={<RecipeDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
