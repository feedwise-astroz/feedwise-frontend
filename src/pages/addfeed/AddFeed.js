import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { createNewFeed } from '../../redux/features/inventory/inventorySlice';
import FeedForm from '../../components/feedform/FeedForm';
//import { allcattles } from '../../redux/features/cattle/cattleSlice';
import PopUp from '../../components/popUp/PopUp';
import Heading from '../../components/heading/Heading';
import './AddFeed.scss'
import Button1 from '../../components/button1/Button1';
import Button2 from '../../components/button2/Button2';

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
  const [showPopUp, setShowPopUp] = useState(false);
  
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

  const handleSubmit =  (e) => {
    e.preventDefault();
   setShowPopUp(true)
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const userData = { ...feedDetails };
    console.log(userData);
    
    await dispatch(createNewFeed(userData));
    
    setFeedDetails(initialState);
    setShowPopUp(false);
  };



  return (
    <>
    <Heading heading="heading custom-class">Inventory</Heading>
    
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
      

       {
       
        showPopUp && ( 
        
        <PopUp
          open={showPopUp}>
            <div className="save-feed" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
            <p>Are you Sure you want to Save</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' ,marginTop: "10px"}}>
          <Button2 onClick={() => setShowPopUp(false)} className="btn2">Cancel</Button2>
          <Button1 onClick={handleSave} className="submitbtn">Save</Button1>
          </div>
          </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default AddFeed;
