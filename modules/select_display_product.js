

module.exports = (products_object, product_url) => {
    
    for (let i=0; i<products_object.length; i++) {
        if (products_object[i].url == product_url) {
            return products_object[i];
        } else{
            continue;
        }
    }
}