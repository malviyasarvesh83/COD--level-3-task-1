const topProducts = async () => {
    try {
        const token = localStorage.getItem('flipKartToken');
        let response = await axios.get('http://localhost:4000/product/topProduct', { headers: { 'Authorization': token } });
        console.log(response);
        document.querySelector('.userName').textContent = `${response.data.firstName} ${response.data.lastName}`;
        document.querySelector('.fa-shopping-cart').textContent = response.data.cart;
        for (let i = 0; i < response.data.topProduct.length; i++){
            document.querySelector(".topProducts").innerHTML += `
                <a href="${response.data.topProduct[i].link}">
                    <img
                      src="${response.data.topProduct[i].image}" alt="${response.data.topProduct[i].name}" />
                    <p>${response.data.topProduct[i].name}</p>
                </a>
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

topProducts();

const Products = async () => {
    try {
        let response = await axios.get('http://localhost:4000/product/Product');
        console.log(response);
        for (let i = 0; i < response.data.length-8; i++){
            document.querySelector(".product-list").innerHTML += `
                <a href="productDetails.html" onclick="productId(this)" data-id="${response.data[i].id}">
                    <img src="${response.data[i].url}" alt="${response.data[i].id}" title="₹${response.data[i].price.mrp}">
                    <p class="shortTitle">${response.data[i].title.shortTitle}</p>
                    <p class="price">₹${response.data[i].price.mrp}</p>
                    <p class="longTitle">${response.data[i].title.longTitle.slice(0,30)+'...'}</p>
                </a>
            `;
        }

        for (let i = 4; i < response.data.length-4; i++){
            document.querySelector(".product-list1").innerHTML += `
                <a href="productDetails.html" onclick="productId(this)" data-id="${response.data[i].id}">
                    <img src="${response.data[i].url}" alt="${response.data[i].id}" title="₹${response.data[i].price.mrp}">
                    <p class="shortTitle">${response.data[i].title.shortTitle}</p>
                    <p class="price">₹${response.data[i].price.mrp}</p>
                    <p class="longTitle">${response.data[i].title.longTitle.slice(0,30)+'...'}</p>
                </a>
            `;
        }

        for (let i = 8; i < response.data.length; i++){
            document.querySelector(".product-list2").innerHTML += `
                <a href="productDetails.html" onclick="productId(this)" data-id="${response.data[i].id}">
                    <img src="${response.data[i].url}" alt="${response.data[i].id}" title="₹${response.data[i].price.mrp}">
                    <p class="shortTitle">${response.data[i].title.shortTitle}</p>
                    <p class="price">₹${response.data[i].price.mrp}</p>
                    <p class="longTitle">${response.data[i].title.longTitle.slice(0,30)+'...'}</p>
                </a>
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

Products();

const productId = (ele) => {
    try {
        const id = ele.getAttribute('data-id');
        localStorage.setItem('FlipKartProductId', id);
    } catch (error) {
        console.log(error);
    }
}

const cart = () => {
    location.href = 'cart.html';
}