document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); //empêche envoi formulaire

    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (name === "" || surname === "" || email === "" || message === "") {
        displayResponseMessage("Tous les champs doivent être remplis.", false);
        return;
    }

    var formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('message', message);

    //envoi à formspree
    fetch('https://formspree.io/f/mjkbdjyz', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            displayResponseMessage("Merci, " + surname + ". Votre message a été envoyé avec succès.", true);
            document.getElementById('contactForm').reset();
        } else {
            displayResponseMessage("Erreur lors de l'envoi du message. Veuillez réessayer plus tard.", false);
        }
    })
    .catch(error => {
        displayResponseMessage("Une erreur s'est produite. Veuillez réessayer plus tard.", false);
    });
});

function displayResponseMessage(message, isSuccess) {
    var responseMessage = document.getElementById('responseMessage');
    responseMessage.style.color = isSuccess ? '#009ad6' : '#d9534f'; //couleurs succès/erreur
    responseMessage.textContent = message;
}
