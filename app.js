class Product{
    constructor(name,price,year)  {
        this.name = name
        this.price = price
        this.year = year
    }

}

class UI {
    addProduct(prod) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product:</strong> ${prod.name}
                    <strong>Price:</strong> ${prod.price}
                    <strong>Year:</strong> ${prod.year}
                    <div class="float-right">
                        <a href="#" class="btn btn-danger delete">Delete</a>
                    </div>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('form-product').reset()
    }

    deleteProduct(element) {
        // console.log(element.className)
        if (element.className === 'btn btn-danger delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product deleted', 'danger')
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className= `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        },2000);
    }
}



// DOM events
document.getElementById('form-product').addEventListener('submit', function (e) {
    e.preventDefault();
    const ui = new UI();

    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const year = document.querySelector('#year').value;

    if (name === '' || price === '' || year === '') {
       return  ui.showMessage('Faltan datos', 'warning');
    }

    const prod = new Product(name,price,year);
    ui.addProduct(prod);
    ui.resetForm();
    ui.showMessage('Product added', 'success')
});

document.getElementById('product-list').addEventListener('click', (e)=>{
    const ui = new UI();
    ui.deleteProduct(e.target);
})