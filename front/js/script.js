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
    console.log(data);

});
