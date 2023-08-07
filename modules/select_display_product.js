

module.exports = (products_object, id) => {
    
    for (let i=0; i<products_object.length; i++) {
        if (products_object[i].id == id) {
            return products_object[i];
        } else{
            continue;
        }
    }
}