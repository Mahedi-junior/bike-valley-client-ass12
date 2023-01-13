import React from 'react';
import useTitle from '../../../hooks/useTitle';
import Slider from '../../Slider/Slider';
import AdvertisedItems from '../AdvertisedItems/AdvertisedItems';
import Categories from '../Categories/Categories';
import MobileSection from '../MobileSection/MobileSection';

const Home = () => {
    useTitle('Home');
    return (
        <div>
            <Slider />
            <AdvertisedItems />
            <Categories />
            <MobileSection />
        </div>
    );
};

export default Home;