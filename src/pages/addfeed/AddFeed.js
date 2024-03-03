import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import createNewFeed from '../../redux/features/inventory/inventorySlice';

const initialState = {
  'feedName': '',
  'animalTypes': [],
  'feedQuantity': 0,
  'startDate': '',
  'vendorName': '',
  'purchasePrice': 0,
  'purchaseDate': '',
  'txnID': '',
};

const AddFeed = () => {
  const [feedDetails, setFeedDetails] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange1 = (e) => {
    const { name, value, type, options } = e.target;
    let formattedValue = value;

    setFeedDetails((prevData) => ({
      ...prevData,
      [name]: type === 'select-multiple' ? Array.from(options).filter((option) => option.selected).map((option) => option.value) : formattedValue,
    }));
  };

  const handleDateChange = (selectedDate) => {
    setFeedDetails((prevData) => ({
      ...prevData,
      startDate: selectedDate,
    }));
  };

  const handlePurchaseDateChange = (selectedDate) => {
    setFeedDetails((prevData) => ({
      ...prevData,
      purchaseDate: selectedDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { ...feedDetails };
    console.log(userData);
    
    await dispatch(createNewFeed(userData));
    
    console.log(feedDetails);
    setFeedDetails(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="feedName">Feed Name:</label><br />
      <input type="text" id="feedName" name="feedName" value={feedDetails.feedName} onChange={handleChange1} required /><br />

      <label htmlFor="animalTypes">Animal Types:</label><br />
      <select id="animalTypes" name="animalTypes" multiple value={feedDetails.animalTypes || []} onChange={handleChange1} required>
        <option value="Cows">Cows</option>
        <option value="Sheep">Sheep</option>
        <option value="Horse">Horse</option>
      </select><br />

      <label htmlFor="feedQuantity">Feed Quantity:</label><br />
      <input type="number" id="feedQuantity" name="feedQuantity" value={feedDetails.feedQuantity} onChange={handleChange1} required /><br />

      <label htmlFor="dateInput">Start Date: </label>
      <DatePicker
        id="dateInput"
        selected={feedDetails.startDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
      />

      <label htmlFor="vendorName">Vendor Name:</label><br />
      <input type="text" id="vendorName" name="vendorName" value={feedDetails.vendorName} onChange={handleChange1} required /><br />

      <label htmlFor="purchasePrice">Purchase Price:</label><br />
      <input type="number" step="1" id="purchasePrice" name="purchasePrice" value={feedDetails.purchasePrice} onChange={handleChange1} required /><br />

      <label htmlFor="dateInput">Purchase Date: </label>
      <DatePicker
        id="dateInput"
        selected={feedDetails.purchaseDate}
        onChange={handlePurchaseDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
      />

      <label htmlFor="txnID">Transaction ID:</label><br />
      <input type="text" id="txnID" name="txnID" value={feedDetails.txnID} onChange={handleChange1} required /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddFeed;
