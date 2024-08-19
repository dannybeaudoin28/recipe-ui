import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './recipe-list.styles.scss'; 

import { Link } from 'react-router-dom'; // Import Link for routing

import Cookies from 'js-cookie';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'recipe-container:8000/';

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
    for(var i = 0; i < recipes.length; i++) {
      console.log(recipes[i])
    }
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
              <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p><strong>Time:</strong> {recipe.time_minutes} minutes</p>
                <p><strong>Price:</strong> ${recipe.price}</p>
                <p><strong>Link:</strong> <a href={recipe.link}>{recipe.link}</a></p>
                <p><strong>Tags:</strong>
                  {recipe.tags && recipe.tags.length > 0 ? (
                    <ul className="tags-list">
                      {recipe.tags.map((tag, index) => (
                        <li key={index} className="tag-item">{tag.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No tags available</span>
                  )}
                </p>
                <p><strong>Ingredients:</strong>
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    <ul className="ingredient-list">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="ingredient-item">{ingredient.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No ingredients available</span>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
