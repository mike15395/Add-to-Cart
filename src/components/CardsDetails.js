import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Delete, Add, DeleteQnty } from '../redux/actions/action';
import { useDispatch } from 'react-redux';

export default function CardsDetails() {

    // hook to store filtered elements from getData and map them 
    //to render on screen.
    const [data, setData] = useState([]);

    // retrieve id of clicked element 
    const { id } = useParams();
    console.log(id);

    //selector to get complete data of clicked elements.
    const getData = useSelector((state) => state.cartReducer.carts);

    useEffect(() => {
        compare();
    }, [id]);


    //compare function to check id of selected item (from menu dropdown of cart) and
    // id retrieved from useparams. if both are equal then filter only those
    // elements from array and return them.
    const compare = () => {
        let compareData = getData.filter((item) => {
            return item.id == id;

        });
        setData(compareData);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const incrementQuantity = (e) => {
        dispatch(Add(e));
    }
    const decrementQuantity = (e) => {
        dispatch(DeleteQnty(e));
    }

    const DeleteFromCart = (id) => {
        dispatch(Delete(id));
        navigate('/');
    }

    return (
        <div className='container mt-2'>
            <h1>Cart Details Page</h1>
            <section className='container mt-4 d-flex justify-content-center'>
                {data.map((item, index) => (
                    <>
                        <div className='cart-details'>
                            <div className='cart-img'>
                                <img src={item.imgdata}
                                    style={{ height: '16rem' }}
                                    alt='image_food'
                                />
                            </div>
                        </div>
                        <div className='details'>
                            <Table>
                                <tr>
                                    <td>
                                        <p><strong>Restaurant:  </strong>  {item.rname}</p>
                                        <p><strong>Price:  </strong> ₹{item.price}</p>
                                        <p><strong>Dishes:  </strong> {item.address}</p>
                                        <p><strong>Total:  </strong>  ₹{item.price * item.qnty}</p>
                                    </td>
                                    <td>
                                        <p><strong>Rating:  </strong><span style={{ backgroundColor: 'green', color: 'white', padding: '2px 5px', borderRadius: '5px' }}>  {item.rating}★</span></p>
                                        <p><strong>Order Review:  </strong>  1175 + order placed from here recently<span></span></p>
                                        <p><strong>Remove:  </strong><span><i className='fas fa-trash'
                                            style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
                                            onClick={() => DeleteFromCart(item.id)}
                                        ></i></span></p>
                                        <div className='quantity d-flex justify-content-between align-items-center mt-5' style={{ color: 'black', width: 150, height: 30 }}>
                                            <span className='rounded-circle'
                                                style={{
                                                    fontSize: '22px', backgroundColor: 'lightgrey', color: 'black',
                                                    height: '2rem', width: '2rem', cursor: 'pointer'
                                                }}
                                                onClick={item.qnty <= 1 ? () => DeleteFromCart(item.id) : () => decrementQuantity(item)}
                                            >-</span>
                                            <span>{item.qnty}</span>
                                            <span className='rounded-circle'
                                                style={{
                                                    fontSize: '22px', backgroundColor: 'lightgrey', color: 'black',
                                                    height: '2rem', width: '2rem', cursor: 'pointer'
                                                }}
                                                onClick={() => incrementQuantity(item)}
                                            >+</span>
                                        </div>



                                    </td>

                                </tr>

                            </Table>

                        </div>

                    </>
                ))}


            </section>

        </div >);
}