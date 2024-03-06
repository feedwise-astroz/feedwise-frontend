import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { getCattles } from '../../redux/features/cattle/cattleService';
import Select from 'react-select';


const FeedForm = ({
  feedName, animalTypes, feedQuantity, startDate, vendorName, purchaseDate, purchasePrice, txnID, handleChange1, handleDateChange, handleSubmit
}) => {


  const [animals, setAnimals] = useState([]);
  

  useEffect(() => {

    async function getCattleData() {
      const data1 = await getCattles();

      const data2 = data1.data
      console.log(data2)

      const uniqueAnimalTypes = Array.from(new Set(data2.map(cattle => cattle.type)));

      // Set the extracted animal types to the state
      setAnimals(uniqueAnimalTypes);



    }

    getCattleData();
  }, []);




  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="feedName">Feed Name:</label>
      <br />
      <input
        type="text"
        id="feedName"
        name="feedName"
        value={feedName || ''}
        onChange={handleChange1}
        required
      />
      <br />
      <label htmlFor="animalTypes">Animal Types:</label>
      <br />
      <Select
        isMulti
        name="animalTypes"
        options={animals.map(type => ({ value: type, label: type }))}
        onChange={handleChange1}
      />
      <br />
      <label htmlFor="feedQuantity">Feed Quantity:</label>
      <br />
      <input
        type="number"
        id="feedQuantity"
        name="feedQuantity"
        value={feedQuantity || ''}
        onChange={handleChange1}
        required
      />
      <br />
      <label htmlFor="dateInput">Start Date: </label>
      <DatePicker
        id="dateInput"
        selected={startDate}
        onChange={(date) => handleDateChange(date, 'startDate')}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
      />
      <label htmlFor="vendorName">Vendor Name:</label>
      <br />
      <input
        type="text"
        id="vendorName"
        name="vendorName"
        value={vendorName || ''}
        onChange={handleChange1}
        required
      />
      <br />
      <label htmlFor="purchasePrice">Purchase Price:</label><br />
      <input
        type="number"
        step="1"
        id="purchasePrice"
        name="purchasePrice"
        value={purchasePrice || ''}
        onChange={handleChange1}
        required
      /><br />
      <label htmlFor="purchaseDateInput">Purchase Date: </label>
      <DatePicker
        id="purchaseDateInput"
        selected={purchaseDate}
        onChange={(date) => handleDateChange(date, 'purchaseDate')}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
      />
      <br />
      <label htmlFor="txnID">Transaction ID:</label>
      <br />
      <input
        type="text"
        id="txnID"
        name="txnID"
        value={txnID || ''}
        onChange={handleChange1}
        required
      />
      <br />
      <button type="submit">Submit</button>
      <Link to="/inventory">Back</Link><br></br>
    </form>
  )
}

export default FeedForm