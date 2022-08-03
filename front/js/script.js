window.addEventListener('DOMContentLoaded', async (event) => {

    let data;
    // get products by requesting the API
    try {
        const APICallRes = await fetch("http://localhost:3000/api/products");
        data = await APICallRes.json();
        if (APICallRes.status == 404) {
            throw "API endpoint not found";
        }
    } catch (error) {
        console.error(error);
    }
    // display products from the response obtained from the API
    const productsWrapper = document.getElementById("items");

    for ( i=0 ; i < data.length; i++ ) {
        // console.log(data[i]);

        let newLinkKanap = document.createElement('a');
            newLinkKanap.href = "./product.html?id=" + data[i]._id;

        let newArticle = document.createElement('article');
        
        let newImageKanap = document.createElement('img');
            newImageKanap.src = data[i].imageUrl;
            newImageKanap.alt = data[i].altTxt;
        
        let newNameKanap = document.createElement('h3');
            newNameKanap.classList.add('productName');
            newNameKanap.innerText = data[i].name;

        let newDescriptionKanap = document.createElement('p');    
            newDescriptionKanap.classList.add('productDescription');
            newDescriptionKanap.innerText = data[i].description;

        newArticle.append(newDescriptionKanap, newImageKanap, newNameKanap);
        newLinkKanap.append(newArticle);
        productsWrapper.appendChild(newLinkKanap);
    }
});
