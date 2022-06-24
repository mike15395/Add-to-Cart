import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Badge from '@material-ui/core/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Delete } from '../redux/actions/action'

export default function Header() {

    const [price, setPrice] = useState(0);
    console.log(price);

    const getData = useSelector((state) => state.cartReducer.carts);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

    const deleteFromCart = (id) => {
        dispatch(Delete(id));
    }


    const total = () => {
        let totalPrice = 0;
        getData.map((element) => {
            totalPrice = totalPrice + (element.price * element.qnty);
        });
        setPrice(totalPrice);

    }
    useEffect(() => {
        total();
    }, [total]);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Food Store</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to='/' className='text-decoration-none text-light me-4'>Home</NavLink>
                        <NavLink to='/cart' className='text-decoration-none text-light me-4'>Add to Cart</NavLink>

                    </Nav>
                    <Badge badgeContent={getData.length}
                        color="primary"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: '25px', cursor: 'pointer' }}></i>
                    </Badge>

                </Container>



                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >


                    {getData.length ? (<div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Restaurant</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getData.map((item, index) => {
                                    return (
                                        <tr key={index}>

                                            <td>
                                                <NavLink to={`/cart/${item.id}`} onClick={handleClose} >
                                                    <img src={item.imgdata} alt='image' style={{ width: '5rem', height: '5rem' }} />
                                                </NavLink>
                                            </td>
                                            <td>

                                                <p>{item.rname}</p>
                                                <p>Price : ₹{item.price}</p>
                                                <p>Quantity: {item.qnty}</p>
                                                <p>Total Price:  ₹{item.qnty * item.price}</p>
                                                {/* <p><i className='fas fa-trash smalltrash'
                                                    style={{ color: 'red', fontSize: 20, cursor: 'pointer' }}></i></p> */}
                                            </td>
                                            <td>
                                                <i className='fas fa-trash largetrash'
                                                    style={{ color: 'red', fontSize: 20, cursor: 'pointer' }}
                                                    onClick={() => deleteFromCart(item.id)}
                                                ></i>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <p><strong>Grand Total: ₹ {price}</strong></p>
                        </Table>
                    </div>) : (
                        <div className='cart-details d-flex justify-content-center align-items-center'
                            style={{ width: '24rem' }}
                        >
                            <i className='fa fa-close smallclose'
                                style={{ position: 'absolute', top: 2, right: 20, fontSize: 23, cursor: 'pointer' }}
                                onClick={handleClose}
                            >


                            </i>
                            <p style={{ fontSize: 22 }}>Your Cart is empty</p>
                            <img src='./cart.gif' alt='cart_image' style={{ width: '5rem', padding: 10 }} />
                        </div>)
                    }

                </Menu >



            </Navbar >

        </div >
    );
}