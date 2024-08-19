import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './recipe-detail.styles.scss'; // Import SCSS for styling
import Cookies from 'js-cookie';

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'http://dannybeaudoin613.com:8000/';

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/recipe/recipes/${id}/`, {
          headers: {
            'Authorization': `Token ${Cookies.get('token')}`,
          }
        });
        setRecipe(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch recipe details.');
        console.error('Error fetching recipe details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return <p>Loading recipe details...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!recipe) {
    return <p>No recipe found.</p>;
  }

  return (
    <div className="recipe-detail-container">
      <h1>{recipe.title}</h1>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      )}
      <p>{recipe.description}</p>
      <p><strong>Time:</strong> {recipe.time_minutes} minutes</p>
      <p><strong>Price:</strong> ${recipe.price}</p>
      <p><strong>Link:</strong> <a href={recipe.link} target="_blank" rel="noopener noreferrer">{recipe.link}</a></p>
      <div className="tags-section">
        <h2>Tags:</h2>
        {recipe.tags && recipe.tags.length > 0 ? (
          <ul className="tags-list">
            {recipe.tags.map((tag, index) => (
              <li key={index} className="tag-item">{tag.name}</li>
            ))}
          </ul>
        ) : (
          <p>No tags available</p>
        )}
      </div>
      <div className="ingredients-section">
        <h2>Ingredients:</h2>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">{ingredient.name}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients available</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
