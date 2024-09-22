// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  // Dropdown options
  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  // Handle JSON input change
  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
    setError('');
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data) {
        throw new Error('Invalid JSON structure, missing "data" field.');
      }

      // Call the API with parsed JSON
      const response = await axios.post('http://127.0.0.1:8080/docs#/default/process_data_bfhl_post', parsedData);
      setApiResponse(response.data);
    } catch (error) {
      setError(error.message || 'Invalid JSON format.');
      setApiResponse(null);
    }
  };

  // Handle dropdown selection
  const handleSelectionChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  // Render filtered response based on selected options
  const renderFilteredResponse = () => {
    if (!apiResponse) return null;

    const filteredResponse = selectedOptions.map((option) => {
      const value = apiResponse[option.value];
      return (
        <div key={option.value}>
          <strong>{option.label}:</strong> {Array.isArray(value) ? value.join(', ') : value}
        </div>
      );
    });

    return <div>{filteredResponse}</div>;
  };

  return (
    <div className="App">
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <textarea
        placeholder='Enter JSON input here...'
        value={jsonInput}
        onChange={handleInputChange}
        rows="5"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="error">{error}</div>}

      {apiResponse && (
        <>
          <Select
            isMulti
            options={options}
            onChange={handleSelectionChange}
            placeholder="Select Filters..."
          />
          <div className="response">
            <h2>Filtered Response</h2>
            {renderFilteredResponse()}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
