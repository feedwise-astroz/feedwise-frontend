import React from 'react'

const CattleForm = ({cattleDetails,handleAddCattle,handleTypeChange,handleNumberChange,handleAverageDailyFeedChange,handleSubmit}) => {


  return (
    <div>
    
    <h2>Animal Feed Information</h2>
      <form onSubmit={handleSubmit}>
        {cattleDetails.map((cattle, index) => (
          <div key={index}>
            <label htmlFor={`type${index}`}>Animal Type {index + 1}</label>
            <select
              id={`type${index}`}
              name={`type${index}`}
              value={cattle.type}
              onChange={(e) => handleTypeChange(index, e.target.value)}
            >
              <option value="cow">Cows</option>
              <option value="sheep">Sheeps</option>
              <option value="Goats">Goats</option>
              <option value="Pigs">Pigs</option>
              <option value="Horses">Horses</option>
              <option value="Diary Buffalo">Diary Buffalo</option>
              <option value="Turkeys">Turkeys</option>
              <option value="chickens">chickens</option>
            </select>

            <br />

            <label htmlFor={`number${index}`}>Number:</label>
            <input
              type="number"
              id={`number${index}`}
              name={`number${index}`}
              min="1"
              value={cattle.number}
              onChange={(e) => handleNumberChange(index, e.target.value)}
              required
            />

            <br />

            <label htmlFor={`averageDailyFeed${index}`}>Average Daily Feed (in kg):</label>
            <input
              type="number"
              id={`averageDailyFeed${index}`}
              name={`averageDailyFeed${index}`}
              step="1"
              min="1"
              value={cattle.averageDailyFeed}
              onChange={(e) => handleAverageDailyFeedChange(index, e.target.value)}
              required
            />

            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddCattle}>
          Add Cattle Details
        </button>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default CattleForm
