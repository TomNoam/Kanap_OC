window.addEventListener('DOMContentLoaded', async (event) => {
   
    // -------------get the ID-----"idKanap"----------------
    const productID = window.location.search;
    const urlParams = new URLSearchParams(productID);
    const idKanap = urlParams.get('id');
    // ------------then request API with the correct ID--------------
    let data;
    try {
        const APICallRes = await fetch("http://localhost:3000/api/products/"+ idKanap);
        data = await APICallRes.json();
        if (APICallRes.status == 404) {
            throw "API endpoint not found";
        }
    } catch (error) {
        console.error(error);
    }
    //----------------------- MODIF ----------------
    let articleIMG = document.querySelector('#ID_img');

    let imageKanap = document.createElement('img');
    imageKanap.src = data.imageUrl;
    imageKanap.alt = data.altTxt;

    articleIMG.appendChild(imageKanap); 
        
    let titleKanap = document.querySelector('#title');
    titleKanap.innerText = data.name;

    let priceKanap = document.querySelector('#price');
    priceKanap.innerText = data.price;

    let descriptionKanap = document.querySelector('#description');
    descriptionKanap.innerText = data.description;

    const colorsSelectInput = document.querySelector('#colors');
    let tabColors = data.colors;

    for ( i=0 ; i < tabColors.length ; i++ ) {
        let opt = document.createElement('option');
        opt.value = tabColors[i];
        opt.innerText = tabColors[i];
        colorsSelectInput.appendChild(opt);
    }  
    //--------------CART   
    const addButton = document.querySelector('#addToCart');
        
    addButton.addEventListener("click", (event)=>{
            
        const valueColor= colorsSelectInput.value;

        let quantityTake = document.querySelector('#quantity');
        const quantitySelected = quantityTake.value;

        let choiceKanap = {
            id: data._id,
            name: data.name,
            price: data.price,
            color: valueColor,
            quantity: quantitySelected,
            URL: data.imageUrl,
            altTxt: data.altTxt
        }
        let cart = [];
        let cartNeedsPushing = true;
        if (null != localStorage.getItem("cart")) {  // we verify that local storage already includes a cart
            cart = JSON.parse(localStorage.getItem("cart"));
            const sameProductExists = cart.find(product => product.color == choiceKanap.color && product.id == choiceKanap.id);
            if (sameProductExists != undefined) {
                const sameProductExistsIdx = cart.findIndex(product => product.color == choiceKanap.color && product.id == choiceKanap.id);
                sameProductExists.quantity = parseInt(sameProductExists.quantity) + parseInt(choiceKanap.quantity);
                cart[sameProductExistsIdx] = sameProductExists;
                cartNeedsPushing = false;
            } 
        } 
        if (cartNeedsPushing) {
            cart.push(choiceKanap);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    });
});


