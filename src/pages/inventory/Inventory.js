import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getFeeds } from "../../redux/features/inventory/inventorySlice";
import FeedList from "../../components/feedlist/FeedList";
import Heading from "../../components/heading/Heading";
import Button3 from "../../components/button3/Button3";
import { FaPlus } from "react-icons/fa";

const Inventory = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { feeds, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getFeeds());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <div>
        <Heading heading="heading custom-class">Inventory</Heading>
        <div>
          <Button3 className="submitbtn3-inventory">
            <Link
              to="/addfeed"
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <FaPlus className="plus-icon" />
              <span className="button-text ml-2">Add New Feed Item</span>
            </Link>
          </Button3>
        </div>
        <FeedList feeds={feeds} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Inventory;
