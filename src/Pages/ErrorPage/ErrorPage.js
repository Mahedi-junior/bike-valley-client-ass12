import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import img from '../../assets/404page.jpg';

const ErrorPage = () => {
    return (
        <div className='h-[85vh]' style={{backgroundImage: `url(${img})`}}>
            <div className='text-center'>
                <Link to='/' className='text-gray-800 text-xl font-semibold flex justify-center items-center space-x-2 hover:text-indigo-800'><p>Take me break</p> <BsArrowRight /></Link>
            </div>
        </div>
    );
};

export default ErrorPage;