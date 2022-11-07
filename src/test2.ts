const { Product, getASINByText } = require('amazonproductscraper');
(async () => {
    const producto = await new Product(
        'https://www.amazon.com/-/es/dp/' +
            (await getASINByText('nvidia 2060 rtx'))
    ).init();
    console.log(producto.get());
})();
