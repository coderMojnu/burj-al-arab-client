import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [booking, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:6288/booking?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBooking(data))
    }, [loggedInUser.email])

    return (
        <div>
            <h3>You have {booking.length} order</h3>
            {
                booking.map(book => <div style={{ margin: '10px', border: '1px solid red', background: 'black', color: 'white' }}>
                    <p>{book.email}</p>
                    <p>Start Date: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} End Date: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</p>
                </div>)
            }
        </div>
    );
};

export default Booking;