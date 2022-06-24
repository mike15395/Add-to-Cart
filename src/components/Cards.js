import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cardsdata from './CardData';
import { useDispatch } from 'react-redux';
import { Add } from '../redux/actions/action';

export default function Cards() {
    const [data, setData] = useState(Cardsdata);
    console.log(data);

    const dispatch = useDispatch();
    const send = (e) => {
        dispatch(Add(e));
    }

    return (



        <div>
            <h1 className='mt-2'>Add to Cart Page</h1>
            <div className='d-flex justify-content-center flex-wrap align-items-center'>

                {
                    data.map((item, index) => (
                        <Card style={{ width: '24rem' }} key={index} className='m-3'>
                            <Card.Img variant="top" src={item.imgdata} style={{ height: '16rem' }} />
                            <Card.Body>
                                <Card.Title>{item.rname}</Card.Title>
                                <Card.Text>
                                    <p>₹{item.price}</p>
                                </Card.Text>
                                <Button variant="primary" onClick={() => send(item)}>Add to Cart</Button>
                            </Card.Body>
                        </Card>

                    ))}

            </div>
        </div>);
}