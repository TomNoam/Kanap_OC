//--------------TOTAL QUANTITY-------------//
function callTotalQuantity(cart) { 
    let totalQuantity = 0;
    if(cart) {
        cart.forEach((product) => {
            totalQuantity += parseInt(product.quantity);
        });
    } 
    let spanTotalQuantity = document.getElementById('totalQuantity');
    // TODO do not use eval https://stackoverflow.com/questions/86513/why-is-using-the-javascript-eval-function-a-bad-idea
    // TODO https://dev.to/spukas/everything-wrong-with-javascript-eval-35on
    spanTotalQuantity.textContent = totalQuantity;  
}; 

window.addEventListener('DOMContentLoaded', async (event) => {

    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
        
    const articleWrapper = document.getElementById('cart__items');

    for ( i=0 ; i < cart.length; i++ ) {
        
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
            pPriceKanap.innerText = cart[i].price + "€";

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


        //------------ QUANTITY CHANGE------------//
        inputSettingsQuantity.addEventListener("change", function() {
            
            pSettingsQuantity.innerText = inputSettingsQuantity.value;

            let valueHasTochange = inputSettingsQuantity.value;

            const sameProductExists = cart.find(product => product.color == articleKanap.dataset.color && product.id == articleKanap.dataset.id);
            
            if (sameProductExists.quantity != valueHasTochange){
                sameProductExists.quantity = valueHasTochange;  
            }
            localStorage.setItem("cart", JSON.stringify(cart));

            callTotalQuantity(cart);
        });
        //--------------TOTAL TUNASSE-------------//
        
                
    }
          
    callTotalQuantity(cart); 
    
});