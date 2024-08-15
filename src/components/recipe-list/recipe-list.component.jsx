import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './recipe-list.styles.scss'; // Import SCSS for styling

import Cookies from 'js-cookie';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'http://dannybeaudoin613.com:8000/';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(baseUrl + 'api/recipe/recipes/', {
          headers: {
            'Authorization': `Token ${Cookies.get('token')}`,
          }
        });
        setError(null);
        setRecipes(response.data);
      } catch (error) {
        setError('Failed to fetch recipes.');
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list-container">
      <h1>Recipes</h1>
      {isLoading && <p>Loading recipes...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <ul className="recipe-list">
          {recipes.map(recipe => (
            <li key={recipe.id} className="recipe-item">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <p><strong>Time:</strong> {recipe.time_minutes} minutes</p>
              <p><strong>Price:</strong> ${recipe.price}</p>
              <p><strong>Link:</strong> <a href={recipe.link}>{recipe.link}</a></p>
              {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-image" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
