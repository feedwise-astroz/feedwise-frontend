import React, { useState } from 'react'

const Addcattle = () => {

    const [type, setType] = useState('cow');
  const [number, setNumber] = useState(1);
  const [averageDailyFeed, setAverageDialyFeed] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission here
    console.log('Animal:', type);
    console.log('Number of Cattle:', number);
    console.log('Average Feed per Cattle:', averageDailyFeed);
  };



    return (

        <div>
            <h2>Animal Feed Information</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="animalSelect">Select Animal:</label>
                <select id="animalSelect" name="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="cow">Cow</option>
                    <option value="sheep">Sheep</option>
                    <option value="goat">Goat</option>
                    {/* Add more options as needed */}
                </select>

                <br />

                <label htmlFor="cattleNumber">Number of Cattle:</label>
                <input
                    type="number"
                    id="cattleNumber"
                    name="number"
                    min="1"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />

                <br />

                <label htmlFor="avgFeed">Average Feed per Cattle (in kg):</label>
                <input
                    type="number"
                    id="avgFeed"
                    name="averageDialyFeed"
                    step="1"
                    min="1"
                    value={averageDailyFeed}
                    onChange={(e) => setAverageDialyFeed(e.target.value)}
                    required
                />

                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Addcattle
