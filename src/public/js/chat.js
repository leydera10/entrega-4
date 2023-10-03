document.getElementById('username-form').addEventListener('submit', async (e)=> {
    e.preventDefault();

    const userInputElement = document.getElementById('username');
    const messageInputElement = document.getElementById('message');

    const user = userInputElement.value;
    const message = messageInputElement.value;

    try{
        const response = await fetch('/api/msg', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({user, message}),
        });

        if (response.ok) {
            const responseData = await response.json();
            const successMessage = responseData.message;

            Swal.fire({
                icon: 'success',
                title: successMessage,
                text: `Mensaje Enviado OK `,
                confirmButtonText: 'Aceptar' ,
            }).then((result)=> {
                if(result.isConfirmed) {
                    location.reload();
                }

            });

            userInputElement.value = '';
            messageInputElement.value = '';

        } else{
            console.error('error al enviar el msj');
        }
    } catch (error) {
        console.error('error en red : ', error)
    }

});

