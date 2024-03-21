import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { getCattles } from '../../redux/features/cattle/cattleService';
import Select from 'react-select';
import "./FeedForm.scss";
import Card from '../card/Card';
import Button2 from '../button2/Button2';
import Button1 from '../button1/Button1';


const FeedForm = ({
  feedName, animalTypes, feedQuantity, startDate, vendorName, purchaseDate, purchasePrice, txnID, handleChange1, handleDateChange, handleSubmit
}) => {


  const [animals, setAnimals] = useState([]);


  useEffect(() => {

    async function getCattleData() {
      const data1 = await getCattles();

      const data2 = data1.data

      const uniqueAnimalTypes = Array.from(new Set(data2.map(cattle => cattle.type)));

      // Set the extracted animal types to the state
      setAnimals(uniqueAnimalTypes);



    }

    getCattleData();
  }, []);






  return (
    <form onSubmit={handleSubmit}>

      <div className='buttons'>
      <Button2 className="btn2"><Link to="/inventory" className='backbtn'>Back</Link></Button2>
      <Button1 type="submit" className='submitbtn'>Submit Form</Button1>
      </div>

      <Card cardClass='card addfeed'>
        <div className='card-container'>
          <div className='left-column'>
            <label htmlFor="feedName">Feed Name:</label>
            <br></br>
            <input
              type="text"
              id="feedName"
              name="feedName"
              value={feedName || ''}
              onChange={handleChange1}
              required
            />
            <br></br>
            <label htmlFor="animalTypes">Animal Types:</label>
            <br></br>
            <Select
              isMulti
              name="animalTypes"
              options={animals.map(type => ({ value: type, label: type }))}
              onChange={(selectedOptions) => {
                const selectedAnimalTypes = selectedOptions.map(option => option.value);
                handleChange1({ target: { name: 'animalTypes', value: selectedAnimalTypes } });
              }}
            />
            <br></br>
            <label htmlFor="feedQuantity">Feed Quantity:</label>
            <br></br>
            <input
              type="number"
              id="feedQuantity"
              name="feedQuantity"
              value={feedQuantity || ''}
              onChange={handleChange1}
              required
            />
            <br></br>

            <label htmlFor="dateInput">Start Date: </label>
            <br></br>
            <DatePicker
              id="dateInput"
              selected={startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              dateFormat="MM/dd/yyyy"
              placeholderText="mm/dd/yyyy"
            />
          </div>
          <br></br>
          <div className='right-column'>
            <label htmlFor="vendorName">Vendor Name:</label>
            <br></br>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              value={vendorName || ''}
              onChange={handleChange1}
              required
            />
            <br></br>
            <label htmlFor="purchasePrice">Purchase Price:</label>
            <br></br>
            <input
              type="number"
              step="1"
              id="purchasePrice"
              name="purchasePrice"
              value={purchasePrice || ''}
              onChange={handleChange1}
              required
            />
            <br></br>
            <label htmlFor="purchaseDateInput">Purchase Date: </label>
            <br></br>
            <DatePicker
              id="purchaseDateInput"
              selected={purchaseDate}
              onChange={(date) => handleDateChange(date, 'purchaseDate')}
              dateFormat="MM/dd/yyyy"
              placeholderText="mm/dd/yyyy"
            />
            <br></br>
            <label htmlFor="txnID">Transaction ID:</label>
            <br></br>
            <input
              type="text"
              id="txnID"
              name="txnID"
              value={txnID || ''}
              onChange={handleChange1}
              required
            />
          </div>
        </div>
      </Card>

    </form>

  )
}

export default FeedForm