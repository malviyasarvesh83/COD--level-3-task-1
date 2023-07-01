const productDetails = async () => {
    try {
        const token = localStorage.getItem('flipKartToken');
        const id = localStorage.getItem('FlipKartProductId');
        let response = await axios.get(`http://localhost:4000/product/getProductById/${id}`, { headers: { 'Authorization': token } });
        console.log(response);
        document.querySelector('.userName').textContent = `${response.data.firstName} ${response.data.lastName}`;
        document.querySelector('.fa-shopping-cart').textContent = response.data.cart;
        document.querySelector(".left-container").innerHTML = `
            <div class="img">
                <img src="${response.data.product[0].url}" alt="${response.data.product[0].title.shortTitle}" />
            </div>
            <div class="productBtn">
                <button class="btn cart-btn" onclick="addToCart(this)" data-id="${response.data.product[0].id}"> <i class="fas fa-shopping-cart mr-2"></i>ADD TO CART</button>
                <button class="btn buy" onclick="buyNow(this)" data-id="${response.data.product[0].price.cost}"> <i class="fas fa-bolt mr-2"></i>BUY NOW</button>
            </div>
        `;
        document.querySelector(".title").innerHTML = `
            <p class="longTitle">${response.data.product[0].title.longTitle}</p>
        `;
        document.querySelector(".price").innerHTML = `
            <span class="cost">₹${response.data.product[0].price.cost}</span>
            <span class="mrp">₹${response.data.product[0].price.mrp}</span>
            <span class="discount">${response.data.product[0].price.discount} off</span>
        `;
        document.querySelector('.product-desc').innerHTML = `
            <p>${response.data.product[0].description}</p>
        `
    } catch (error) {
        console.log(error);
    }
}

productDetails();

const homepage = () => {
    location.href = 'homepage.html';
}

const cart = () => {
    location.href = 'cart.html';
}

const addToCart = async (ele) => {
    try {
        const token = localStorage.getItem('flipKartToken');
        const id = ele.getAttribute('data-id');
        let response = await axios.post('http://localhost:4000/product/addToCart', { id: id }, { headers: { 'Authorization': token } });
        console.log(response);
        location.href = 'cart.html';
    } catch (error) {
        console.log(error);
    }
}

const buyNow = async (ele) => {
    try {
        const totalAmount = +ele.getAttribute('data-id') + 40;
        const token = localStorage.getItem('flipKartToken');
        const response = await axios.post('http://localhost:4000/user/placeOrder', { totalAmount: totalAmount }, { headers: { 'Authorization': token } });
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