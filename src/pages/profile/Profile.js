import React, { useEffect, useState } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../service/authService';
import { SET_USER, selectName } from '../../redux/features/auth/authSlice';
import { getCattles } from '../../redux/features/cattle/cattleService';
import { updateCattle } from '../../redux/features/cattle/cattleSlice';

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const name = useSelector(selectName);

  const [profile, setProfile] = useState(null);
  const [cattles, setCattles] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function getUserData() {
      const data = await getUser();
      setProfile(data);
      await dispatch(SET_USER(data));
    }

    async function getCattleData() {
      const data1 = await getCattles();
      setCattles(data1.data);
    }

    getUserData();
    getCattleData();
  }, [dispatch]);

  const handleEditCattleDetails = () => {
    setEditMode(!editMode);
  };
  
  const handleCattleChange = (index, field, value) => {
    const updatedCattles = [...cattles];
    updatedCattles[index][field] = value;
    setCattles(updatedCattles);
  };

  const handleSaveCattleDetails = async(e) => {
    e.preventDefault();
   
    setEditMode(false); 
    console.log(cattles)
    await dispatch(updateCattle(cattles));
    
  }

  return (
    <div>
    <div className='profile'>
      <p>
        <b>Name : </b> {name}
      </p>
      <p>
        <b>Email : </b> {profile?.email}
      </p>
    </div>
    <div className='profile-cattle'>
      <button onClick={handleEditCattleDetails}>
        {editMode ? 'Cancel Edit' : 'Edit Cattle Details'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Cattle Added</th>
            <th>Number of Cattle</th>
            <th>Average Feed per Animal</th>
          </tr>
        </thead>
        <tbody>
          {cattles.map((cattle, index) => (
            <tr key={cattle._id}>
              <td>{editMode ? (
                <select
                  value={cattle.type}
                  onChange={(e) => handleCattleChange(index, 'type', e.target.value)}
                >
                  <option value="Cow">Cow</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Goats">Goats</option>
                  <option value="Pigs">Pigs</option>
                  <option value="Horses">Horses</option>
                  <option value="Diary Buffalo">Diary Buffalo</option>
                  <option value="Turkeys">Turkeys</option>
                  <option value="chickens">chickens</option>
                  {/* Add more options as needed */}
                </select>
              ) : cattle.type}</td>
              <td>{editMode ? (
                <input
                  type="number"
                  value={cattle.number}
                  onChange={(e) => handleCattleChange(index, 'number', e.target.value)}
                />
              ) : cattle.number}</td>
              <td>{editMode ? (
                <input
                  type="number"
                  value={cattle.averageDailyFeed}
                  onChange={(e) => handleCattleChange(index, 'averageDailyFeed', e.target.value)}
                />
              ) : cattle.averageDailyFeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {editMode && (
        <button onClick={handleSaveCattleDetails}>Save Cattle Details</button>
      )}
    </div>
  </div>
  );
};

export default Profile;