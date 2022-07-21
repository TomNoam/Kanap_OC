window.addEventListener('DOMContentLoaded', async (event) => {
   
// -------------get the ID-----"idKanap"----------------
    const productID = window.location.search;
    const urlParams = new URLSearchParams(productID);
    const idKanap = urlParams.get('id');

    console.log(idKanap);

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
    // console.log(data);

//----------------------- MODIF ----------------

    let articleIMG = document.querySelector('#ID_img');

        let imageKanap = document.createElement('img');
            imageKanap.src = data.imageUrl;
            imageKanap.alt = data.altTxt;

    articleIMG.appendChild(imageKanap); 

    console.log(articleIMG);
    console.log(imageKanap);
        
    

    let titleKanap = document.querySelector('#title');

        titleKanap.innerHTML = data.name;

    let priceKanap = document.querySelector('#price');

        priceKanap.innerHTML = data.price;

    let descriptionKanap = document.querySelector('#description');

        descriptionKanap.innerHTML = data.description;

    const optionColors = document.querySelector('#colors');
    let tabColors = data.colors;

        for ( i=0 ; i < tabColors.length ; i++ ) {
            let opt = document.createElement('option');
            opt.value = tabColors[i];
            opt.innerHTML = tabColors[i];

            optionColors.appendChild(opt);
        }

    // console.log(tabColors[1]);   
});
