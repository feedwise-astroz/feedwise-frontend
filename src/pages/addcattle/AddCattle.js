import React, { useState } from 'react'
import CattleForm from '../../components/cattleForm/CattleForm';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import {
    createNewCattle
  } from "../../redux/features/cattle/cattleSlice";

const initialState = [
    {
      type: 'cow',
      number: 1,
      averageDailyFeed: 0,
    },
  ];

const AddCattle = () => {

    const [cattleDetails, setCattleDetails] = useState(initialState);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    
    const handleAddCattle = () => {
        const newCattleDetails = [
          ...cattleDetails,
          initialState
        ];
        setCattleDetails(newCattleDetails);
      };
    
      const handleTypeChange = (index, value) => {
        const updatedCattleDetails = cattleDetails.map((cattle, i) =>
          i === index ? { ...cattle, type: value } : cattle
        );
        setCattleDetails(updatedCattleDetails);
      };
    
      const handleNumberChange = (index, value) => {
        const updatedCattleDetails = cattleDetails.map((cattle, i) =>
          i === index ? { ...cattle, number: value } : cattle
        );
        setCattleDetails(updatedCattleDetails);
      };
    
      const handleAverageDailyFeedChange = (index, value) => {
        const updatedCattleDetails = cattleDetails.map((cattle, i) =>
          i === index ? { ...cattle, averageDailyFeed: value } : cattle
        );
        setCattleDetails(updatedCattleDetails);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your logic to handle the form submission here
        
            console.log(cattleDetails)
            await dispatch(createNewCattle(cattleDetails));
            navigate("/dashboard");
          
      };

   



    return (

        <div>
            <CattleForm 
            cattleDetails={cattleDetails}
            handleAddCattle={handleAddCattle}
            handleTypeChange={handleTypeChange}
            handleNumberChange={handleNumberChange}
            handleAverageDailyFeedChange={handleAverageDailyFeedChange}
            handleSubmit={handleSubmit}/>
        </div>
    )
}

export default AddCattle


