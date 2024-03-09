import React, { useEffect, useState } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../service/authService';
import { SET_USER, selectName } from '../../redux/features/auth/authSlice';
import { getCattles } from '../../redux/features/cattle/cattleService';
//import { setAllCattles } from '../../redux/features/cattle/cattleSlice';



const Profile = () => {
  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch();



  const [profile, setProfile] = useState(null);
  const [cattles, setCattles] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
   const cattleData =cattles.data

  const name = useSelector(selectName);

  useEffect(() => {
   
    async function getUserData() {
      const data = await getUser();
      //console.log(data);

      setProfile(data);
      //   setIsLoading(false);
      await dispatch(SET_USER(data));

    }
    async function getCattleData() {
      const data1 = await getCattles();
      
  
      setCattles(data1);
      
     

    }
    getUserData();
    getCattleData();
  }, [dispatch]);

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

        <table>
          <thead>
            <tr>
              <th>Cattle Added</th>
              <th>Number of Cattle</th>
              <th>Average Feed per Animal</th>
            </tr>
          </thead>
          <tbody>

            {cattleData?.map((cattle) => (
              <tr key={cattle._id}>
                <td>{cattle.type}</td>
                <td>{cattle.number}</td>
                <td>{cattle.averageDailyFeed}</td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Profile
