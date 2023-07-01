const homepage = () => {
    location.href = 'homepage.html';
}

const getCart = async () => {
    try {
        const token = localStorage.getItem('flipKartToken');
        let response = await axios.get('http://localhost:4000/user/cart', { headers: { 'Authorization': token } });
        console.log(response);
        document.querySelector('.userName').textContent = `${response.data.firstName} ${response.data.lastName}`;
        document.querySelector('.fa-shopping-cart').textContent = response.data.cart.length;
        if (response.data.cart.length == 0) {
            document.querySelector('body').style.backgroundColor = '#fff';
            document.querySelector('.empty').style.display = 'block';
        } else {
            let mrp = 0;
            let cost = 0;
            document.querySelector('.cart-container').style.display = 'block';
            document.querySelector('.add').textContent = `${response.data.address.address}`;
            let day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            let dt = new Date();
            dt.setDate(dt.getDate() + 5);
            console.log(day[dt.getDay()-1],month[dt.getMonth()],'|',dt.getDate());
            for (let i = 0; i < response.data.cart.length; i++){
                mrp += +response.data.cart[i].price.mrp;
                cost += +response.data.cart[i].price.cost;
                document.querySelector(".cart-item").innerHTML += `
                    <div class="cart-item-list">
                        <div class="img-qty">
                            <img src="${response.data.cart[i].url}" alt="">
                            <div class="qty">
                                <button class="minusQty" onclick="minusQty(this)" data-id="${response.data.cart[i]._id}">-</button>
                                <input type="text" name="qty" id="qty" value="${response.data.cart[i].quantity}">
                                <button onclick="plusQty(this)" data-id="${response.data.cart[i]._id}">+</button>
                            </div>
                        </div>
                        <div class="desc">
                            <p>${response.data.cart[i].title.longTitle}</p>
                            <div class="price">
                                <p>₹${response.data.cart[i].price.mrp}</p>
                                <span>₹${response.data.cart[i].price.cost} <h3>${response.data.cart[i].price.discount} off</h3> <span class="date">Delivery by ${day[dt.getDay()-1]} ${month[dt.getMonth()]} ${dt.getDate()}|₹40</span></span>
                            </div>
                            <button class="btn btn-secondary" onclick="removeCartItem(this)" data-id="${response.data.cart[i]._id}">REMOVE</button>
                        </div>
                    </div>
                    <hr>
                `;
            }
            document.querySelector(".right-container").innerHTML += `
                <p>PRICE DETAILS</p>
                <hr>
                <span class="price">Price(${
                  response.data.cart.length
                } Item) <p>₹${mrp}</p></span>
                <span class="disc">Discount <p>-₹${mrp - cost}</p></span>
                <span class="delivery">Delivery Charges <p>₹40</p></span>
                <hr>
                <span class="total">Total Amount <p>₹${cost + 40}</p></span>
                <hr>
                <p class="save">You will save ₹${mrp - cost} on this order</p>
            `;
            localStorage.setItem('flipKart_Total_Amount', cost + 40);
        }
    } catch (error) {
        console.log(error);
    }
}

getCart();

const plusQty = async (ele) => {
    try {
        if (document.getElementById('qty').value>=1) {
            document.querySelector('.minusQty').removeAttribute('disabled');
        }
        let qty = document.getElementById('qty').value;
        document.getElementById('qty').value = +qty + 1;
    } catch (error) {
        console.log(error);
    }
}

const minusQty = async (ele) => {
    try {
        if (document.getElementById('qty').value == 2) {
            ele.setAttribute('disabled', true);
        } else {
            ele.removeAttribute('disabled');
        }
        let qty = document.getElementById('qty').value;
        document.getElementById('qty').value = +qty - 1;
    } catch (error) {
        console.log(error);
    }
}

const removeCartItem = async (ele) => {
    try {
        const id = ele.getAttribute('data-id');
        const token = localStorage.getItem('flipKartToken');
        let response = await axios.delete(`http://localhost:4000/user/removeCartItem/${id}`, { headers: { 'Authorization': token } });
        console.log(response);
        this.location.reload();
    } catch (error) {
        console.log(error);
    }
}

const placeOrder = async () => {
    try {
        const token = localStorage.getItem('flipKartToken');
        const response = await axios.post('http://localhost:4000/user/placeOrder', {totalAmount:localStorage.getItem('flipKart_Total_Amount')}, { headers: { 'Authorization': token } });
        console.log(response);
        var options = {
            'key': response.data.key_id,
            'order_id': response.data.order.id,
            'handler': async (response) => {
                await axios.post('http://localhost:4000/user/updateTransactionStatus', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                }, { headers: { 'Authorization': token } });
                alert('Order SuccessFull');
                this.location.reload();
            }
        }
        const rzp = new Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', async (response) => {
            console.log(response);
            let response1 = await axios.post("http://localhost:4000/user/paymentFailed",
            {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },
            { headers: { 'Authorization': token } }
            );
            console.log(response1);
            alert('Payment Failed');
        })
    } catch (error) {
        console.log(error);
    }
}