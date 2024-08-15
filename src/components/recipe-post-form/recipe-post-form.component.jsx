import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './recipe-post-form.styles.scss'

const RecipePostForm = () => {
  // State variables for form inputs and API response
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = 'http://dannybeaudoin613.com:8000/'; // Replace with your API endpoint

  var recipeId;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(null);
  //   setSuccess(null);

  //   const requestBody = {
  //     title,
  //     description,
  //     time_minutes: timeMinutes,
  //     price,
  //     link,
  //     tags: tags.split(',').map(tag => ({ name: tag.trim() })),
  //     ingredients: ingredients.split(',').map(ingredient => ({ name: ingredient.trim() })),
  //   };

  //   // If there's an image, handle it separately
  //   if (image) {
  //     requestBody.image = image; // This will need to be handled on the server side
  //   }

  //   try {
  //     const response = await axios.post(baseUrl + 'api/recipe/recipes/', requestBody, {
  //       headers: {
  //         'Content-Type': 'application/json', // For uploading files
  //         'Authorization': `Token ${Cookies.get('token')}`, // Add your token if required
  //       },
  //     });
  //     setSuccess('Recipe posted successfully!');
  //     console.log(response);
  //   } catch (error) {
  //     setError('Failed to post recipe.');
  //     console.error('Error posting recipe:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
  
    const requestBody = {
      title,
      description,
      time_minutes: timeMinutes,
      price,
      link,
      tags: tags.split(',').map(tag => ({ name: tag.trim() })),
      ingredients: ingredients.split(',').map(ingredient => ({ name: ingredient.trim() }))
    };
  
    try {
      const response = await axios.post(baseUrl + 'api/recipe/recipes/', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${Cookies.get('token')}`,
        },
      });
  
      setSuccess('Recipe posted successfully!');
      recipeId = response.data.id;

    } catch (error) {
      setError('Failed to post recipe.');
      console.error('Error posting recipe:', error);
    } finally {
      setIsLoading(false);
    }

    if (image) {
      const imageFormData = new FormData();
      imageFormData.append('image', image);
  
      try {
        const imageResponse = await axios.post(baseUrl + 'api/recipe/recipes/' + recipeId + '/upload-image/', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${Cookies.get('token')}`,
          },
        });

        console.log(imageResponse.data)
      } catch (error) {
        setError('Failed to upload image.');
        console.error('Error uploading image:', error);
        setIsLoading(false);
        return;
      }
    }
  };
  

  return (
    <div>
      <h1>Post a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="timeMinutes">Time (minutes):</label>
          <input
            type="number"
            id="timeMinutes"
            value={timeMinutes}
            onChange={(e) => setTimeMinutes(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (comma-separated):</label>
          <textarea
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients (comma-separated):</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post Recipe'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RecipePostForm;
