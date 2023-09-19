const socket = io()

document.getElementById('input_products').addEventListener('submit', (e)=> {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const name = nameInput.value;
    nameInput.value = '' ;

    const descritionInput = document.getElementById('description');
    const description = descritionInput.value;
    descritionInput.value = '' ;

    const codeInput = document.getElementById('code');
    const code = codeInput.value;
    codeInput.value = '' ;

    const priceInput = document.getElementById('price');
    const price = priceInput.value;
    priceInput.value = '' ;

    const stockInput = document.getElementById('stock');
    const stock = stockInput.value;
    stockInput.value = '' ;

    const categoryInput = document.getElementById('category');
    const category = categoryInput.value;
    categoryInput.value = '' ;


    const newProduct = {
        name: name,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category
    };
    console.log(newProduct)
    socket.emit("newProd",newProduct);
});

socket.on("success", (data) => {
  console.log("Evento 'success' activado en el cliente");
  console.log("Datos del nuevo producto recibidos:", data);
  Swal.fire({
      icon: 'success',
      title: data,
      text: 'Lista Actualizada',
      confirmButtonText: 'Aceptar',
  }).then((result) => {
      if (result.isConfirmed) {
          location.reload();
      }
  });
});
