import React, { useEffect, useState } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../service/authService';
import { SET_USER, selectName } from '../../redux/features/auth/authSlice';
import { getCattles } from '../../redux/features/cattle/cattleService';
import { updateCattle } from '../../redux/features/cattle/cattleSlice';
import Heading from '../../components/heading/Heading';
import Card from '../../components/card/Card';
import './Profile.scss'
import Button1 from '../../components/button1/Button1';


const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const name = useSelector(selectName);

  const [profile, setProfile] = useState(null);
  const [cattles, setCattles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newCattle, setNewCattle] = useState({ type: '', number: '', averageDailyFeed: '' });

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

  const handleSaveCattleDetails = async (e) => {
    e.preventDefault();
    setEditMode(false);
    await dispatch(updateCattle(cattles));
  };

  const handleAddCattle = () => {
    setCattles([...cattles, newCattle]);
    setNewCattle({ type: '', number: '', averageDailyFeed: '' });
  };

  return (
    <div>
      <Heading heading="heading account">Account Setting</Heading>
      <div className="profile-Details">
        <div className='user'>
          <h2>Profile</h2>

          <Card>
            <div>
              <p>
                <b>Name : </b> {name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
            </div>
          </Card>
        </div>
        <div className='profile-cattle'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button1 onClick={handleEditCattleDetails} className="submitbtn edit">
              {editMode ? 'Cancel' : 'Edit Cattle Details'}
            </Button1>
            {editMode && (
               <>
                 <Button1 onClick={handleAddCattle} className="submitbtn edit">Add Cattle</Button1>
                 <Button1 onClick={handleSaveCattleDetails} className="submitbtn edit">Save Cattle Details</Button1>
               </>
            )}
          </div>
          <Card className="editCattle">
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
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
                  <tr key={index}>
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
