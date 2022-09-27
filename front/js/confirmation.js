window.addEventListener('DOMContentLoaded', async (event) => {

    const orderID = window.location.search;
    const urlParams = new URLSearchParams(orderID);
    const idOrder = urlParams.get('id');
    
    // console.log(idOrder);

    let thisOrder = document.getElementById('orderId');
        thisOrder.innerText = idOrder;
});