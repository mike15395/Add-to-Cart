//add items into cart
export const Add = (item) => {
    return {
        type: 'AddToCart',
        payload: item

    }
}

//delete items from cart
export const Delete = (id) => {
    return {
        type: 'RemoveFromCart',
        payload: id
    }
}

//decrease the quantity by 1. 
export const DeleteQnty = (item) => {
    return {
        type: 'RemoveSingleQuantity',
        payload: item
    }
}