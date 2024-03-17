import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeed, getFeeds, selectFeed, updateFeed } from '../../redux/features/inventory/inventorySlice';
import FeedForm from '../../components/feedform/FeedForm';
//import { selectIsLoading } from '../../redux/features/cattle/cattleSlice';

const EditFeed = () => {
    const { feedId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const isLoading = useSelector(selectIsLoading);

    const feedEdit = useSelector(selectFeed);

    const [feed, setFeed] = useState(feedEdit || {
        feedName: '',
        animalTypes: [],
        feedQuantity: '',
        startDate: null,
        vendorName: '',
        purchasePrice: '',
        purchaseDate: null,
        txnID: '',
    });





    useEffect(() => {
        dispatch(getFeed(feedId));
    }, [dispatch, feedId]);

    useEffect(() => {
        if (feedEdit) {
            setFeed(feedEdit.data);
        }
    }, [feedEdit]);

    const handleChange1 = (e) => {
        const { name, value, type, options } = e.target || {};
        let formattedValue = value;
        if (name === 'feedQuantity' || name === 'purchasePrice') {
            formattedValue = parseFloat(value);
        }





        setFeed((prevData) => ({
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
        setFeed((prevData) => ({
            ...prevData,
            [name]: date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        }));
    };

    const handleDateChange1 = (dateString) => {

        const dateObject = new Date(dateString);

        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const year = dateObject.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate
    }


    const saveFeed = async (e) => {
        e.preventDefault();

        const formatStartDate = handleDateChange1(feed.startDate)
        const formatPurchaseDate = handleDateChange1(feed.purchaseDate)
        const requestBody = {
            feedName: feed.feedName,
            animalTypes: feed.animalTypes,
            feedQuantity: feed.feedQuantity,
            startDate: formatStartDate,
            vendorName: feed.vendorName,
            purchasePrice: feed.purchasePrice,
            purchaseDate: formatPurchaseDate,
            txnID: feed.txnID,
        };

        
        await dispatch(updateFeed({ id: feedId, formData: requestBody }));
        await dispatch(getFeeds());
        navigate("/inventory");
    };

    return (
        <div>

            <FeedForm
                feedName={feed.feedName}
                animalTypes={feed.animalTypes}
                feedQuantity={feed.feedQuantity}
                startDate={feed.startDate}
                vendorName={feed.vendorName}
                purchasePrice={feed.purchasePrice}
                purchaseDate={feed.purchaseDate}
                txnID={feed.txnID}
                handleSubmit={saveFeed}
                handleChange1={handleChange1}
                handleDateChange={handleDateChange}
            />
        </div>
    );
};

export default EditFeed