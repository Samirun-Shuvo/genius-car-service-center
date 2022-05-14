import React from 'react';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer className='text-center mt-5 fixed-bottom bg-primary h-10 mt-5 pt-2'>
            <p><small className='text-light'>Copyright © Samirun-Shuvo: {year}</small></p>
        </footer>
    );
};

export default Footer;