//--------------TOTAL QUANTITY-------------//
function callTotalQuantity(cart) { 
    let totalQuantity = 0;
    if(cart) {
        cart.forEach((product) => {
            totalQuantity += parseInt(product.quantity);
        });
    } 
    let spanTotalQuantity = document.getElementById('totalQuantity');
    spanTotalQuantity.textContent = totalQuantity;  
}; 

async function callTotalPrice(cart) { 
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        let priceSecurity = async function () {
            let products = fetch("http://localhost:3000/api/products/" + cart[i].id).then(resp => resp.json());
            let [resultApi] = await Promise.all([products]);
            priceSecurity = resultApi.price;
        }();
        await priceSecurity;
        document.getElementById(`pricetag_${cart[i].id}_${cart[i].color}`).innerText = priceSecurity;
        totalPrice += parseInt(priceSecurity) * parseInt(cart[i].quantity);
    }
    let spanTotalPrice = document.getElementById('totalPrice');
    spanTotalPrice.textContent = totalPrice;  
}; 

window.addEventListener('DOMContentLoaded', async (event) => { 

    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);

    const articleWrapper = document.getElementById('cart__items');

    for ( i = 0 ; i < cart.length; i++ ) { 

        let articleKanap = document.createElement('article');
            articleKanap.classList.add('cart__item');
            articleKanap.dataset.id = cart[i].id;
            articleKanap.dataset.color = cart[i].color;

        let divImgKanap = document.createElement('div');
            divImgKanap.classList.add('cart__item__img');    

        let imageKanap = document.createElement('img');
            imageKanap.src = cart[i].URL;
            imageKanap.alt = cart[i].altTxt;

        let divContentKanap = document.createElement('div');
            divContentKanap.classList.add('cart__item__content');
            
        let divContentDescriptionKanap = document.createElement('div');
            divContentDescriptionKanap.classList.add('cart__item__content__description');
    
        let h2NameKanap = document.createElement('h2');
            h2NameKanap.innerText = cart[i].name;

        let pColorKanap = document.createElement('p');
            pColorKanap.innerText = cart[i].color;    

        let pPriceKanap = document.createElement('p');
        pPriceKanap.id = `pricetag_${cart[i].id}_${cart[i].color}`;
            pPriceKanap.innerText = "0 €";

        let divContentSettingsKanap = document.createElement('div');
            divContentSettingsKanap.classList.add('cart__item__content__settings');

        let divSettingsQuantity = document.createElement('div');
            divSettingsQuantity.classList.add('cart__item__content__settings__quantity');

        let pSettingsQuantity = document.createElement('p');
            pSettingsQuantity.innerText = cart[i].quantity; 
            
        let inputSettingsQuantity = document.createElement('input');
            inputSettingsQuantity.classList.add('itemQuantity');
            inputSettingsQuantity.type = "number";
            inputSettingsQuantity.name = "itemQuantity"; 
            inputSettingsQuantity.min = 1;
            inputSettingsQuantity.max = 100;
            inputSettingsQuantity.value = cart[i].quantity;

        let divDeleteSettings = document.createElement('div');
            divDeleteSettings.classList.add('cart__item__content__settings__delete');

        let pDeleteSettings = document.createElement('p');
            pDeleteSettings.classList.add('deleteItem');
            pDeleteSettings.innerText = "Supprimer";    

        divImgKanap.append(imageKanap);
        divSettingsQuantity.append(pSettingsQuantity, inputSettingsQuantity);
        divDeleteSettings.append(pDeleteSettings);
        divContentSettingsKanap.append(divSettingsQuantity, divDeleteSettings);
        divContentDescriptionKanap.append(h2NameKanap, pColorKanap, pPriceKanap);      
        divContentKanap.append(divContentDescriptionKanap, divContentSettingsKanap);
        articleKanap.append(divImgKanap, divContentKanap);
        articleWrapper.appendChild(articleKanap); 
        //----------------------- QUANTITY CHANGE---------------------------//
        inputSettingsQuantity.addEventListener("change", () => {

            pSettingsQuantity.innerText = inputSettingsQuantity.value;

            let valueHasTochange = inputSettingsQuantity.value;

            const sameProductExists = cart.find(product => product.color == articleKanap.dataset.color && product.id == articleKanap.dataset.id);
            
            if (sameProductExists.quantity != valueHasTochange){
                sameProductExists.quantity = valueHasTochange;  
            }
            localStorage.setItem("cart", JSON.stringify(cart));

            callTotalPrice(cart);
            callTotalQuantity(cart);
        });
        //---------------------------DELETE FUNCTION---------------------------//
        divDeleteSettings.addEventListener('click', () => {
            let deleteTargetedProduct = divDeleteSettings.closest('article');

            deleteTargetedProduct.remove();
            
            itemWillRemove = cart.find(product => product.color == deleteTargetedProduct.dataset.color && product.id == deleteTargetedProduct.dataset.id);

            cart = cart.filter(product => product != itemWillRemove );
            
            localStorage.setItem("cart", JSON.stringify(cart));

            callTotalPrice(cart);
            callTotalQuantity(cart); 
        });
    }  
    callTotalQuantity(cart); 
    callTotalPrice(cart);
    //---------------------------FORM-----------------------------------//
    let form = document.getElementsByClassName('cart__order__form');
    //FIRSTNAME//
    firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    const validFirstName = function(inputFirstName) {
        let firstNameRegExp = new RegExp(
            /^[ a-zA-ZÀ-úœ'\-\’]{2,25}$/, 'g'
        );
    
        let testFirstName = firstNameRegExp.test(inputFirstName.value);        
        let errorFirstName = document.querySelector('#firstNameErrorMsg');

        if (testFirstName) {
            errorFirstName.innerText = "";          
        }else{
            errorFirstName.innerText = "Invalide";
        }
    };
    //LASTNAME//
    lastName.addEventListener('change', function() {
        validLastName(this);
    });

    const validLastName = function(inputLastName) {
        let LastNameRegExp = new RegExp(
            /^[ a-zA-ZÀ-úœ'\-\’]{2,25}$/, 'g'
        );
    
        let testLastName = LastNameRegExp.test(inputLastName.value);        
        let errorLastName = document.querySelector('#lastNameErrorMsg');

        if (testLastName) {
            errorLastName.innerText = "";          
        }else{
            errorLastName.innerText = "Invalide";
        }
    };    
    //ADDRESS//
    address.addEventListener('change', function() {
        validAddress(this);
    });

    const validAddress = function(inputAddress) {
        let addressRegExp = new RegExp(
            /^[ a-zA-ZÀ-úœ0-9999'\-\’]{5,40}$/, 'g'
        );
    
        let testAddress = addressRegExp.test(inputAddress.value);        
        let errorAddress = document.querySelector('#addressErrorMsg');

        if (testAddress) {
            errorAddress.innerText = "";          
        }else{
            errorAddress.innerText = "Invalide";
        }
    };
    //CITY//
    city.addEventListener('change', function() {
        validCity(this);
    });

    const validCity = function(inputCity) {
        let cityRegExp = new RegExp(
            /^[ a-zA-ZÀ-úœ'\-\’]{2,25}$/, 'g'
        );
    
        let testCity = cityRegExp.test(inputCity.value);        
        let errorCity = document.querySelector('#cityErrorMsg');

        if (testCity) {
            errorCity.innerText = "";          
        }else{
            errorCity.innerText = "Invalide";
        }
    };
    //EMAIL//
    email.addEventListener('change', function() {
        validEmail(this);
    });

    const validEmail = function(inputEmail) {
        let emailRegExp = new RegExp(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'g'
        );
    
        let testEmail = emailRegExp.test(inputEmail.value);        
        let errorEmail = document.querySelector('#emailErrorMsg');

        if (testEmail) {
            errorEmail.innerText = "";          
        }else{
            errorEmail.innerText = "Invalide";
        }
    };
    //-----------------ORDER------------------//
    order.addEventListener('click', async function(e) {
        
        e.preventDefault();
        
        let firstNameInput = document.getElementById("firstName");
        let lastNameInput = document.getElementById("lastName"); 
        let addressInput = document.getElementById("address");
        let cityInput = document.getElementById("city");
        let emailInput = document.getElementById("email");      

        let contact = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            address: addressInput.value,
            city: cityInput.value,
            email: emailInput.value
        };
        
        let products = cart.map(element => {
            return element.id
        });        
        // ------------API POST-------------//
        try {
            let orderFormAPICall = await fetch("http://localhost:3000/api/products/order", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact,
                    products
                })              
            });  
            const orderFormResponse = await orderFormAPICall.json();            
            console.log(orderFormResponse.orderId);
            
            if (orderFormAPICall.status == 201){
            return window.location.href = "./confirmation.html" + "?id=" + orderFormResponse.orderId;
            }
        } catch (error) {    
            alert("Il s'est produit un problème, merci de réessayer. Si le problème persiste, merci de réessayer plus tard.")
        }
    });
});