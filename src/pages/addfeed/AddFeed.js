import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { createNewFeed } from '../../redux/features/inventory/inventorySlice';
import FeedForm from '../../components/feedform/FeedForm';
import { allcattles } from '../../redux/features/cattle/cattleSlice';


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
    const { name, value, type, options } = e.target || {};
    let formattedValue = value;

   
    if (name === 'feedQuantity' || name === 'purchasePrice') {
      formattedValue = parseFloat(value);
    }


    

    setFeedDetails((prevData) => ({
      ...prevData,
      [name]:
        type === "select-multiple"
          ? Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value)
          : formattedValue,
    }));


  };

  
  const handleDateChange = (date, name) => {
    setFeedDetails((prevData) => ({
      ...prevData,
      [name]: date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { ...feedDetails };
    console.log(userData);
    
    await dispatch(createNewFeed(userData));
    console.log(feedDetails);
    console.log(allcattles)
    setFeedDetails(initialState);
  };

  return (
    <FeedForm feedName={feedDetails.feedName}
      animalTypes={feedDetails.animalTypes}
      feedQuantity={feedDetails.feedQuantity}
      startDate={feedDetails.startDate}
      vendorName={feedDetails.vendorName}
      purchasePrice={feedDetails.purchasePrice}
      purchaseDate={feedDetails.purchaseDate}
      txnID={feedDetails.txnID}
      handleSubmit={handleSubmit}
      handleChange1={handleChange1}
      handleDateChange={handleDateChange}
       />
  );
};

export default AddFeed;
