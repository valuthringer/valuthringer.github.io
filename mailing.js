document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire

    // Récupération des valeurs
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Vérification basique
    if (name === "" || surname === "" || email === "" || message === "") {
        displayResponseMessage("Tous les champs doivent être remplis.", false);
        return;
    }

    // Création de l'objet FormData pour envoyer les données
    var formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('message', message);

    // Envoi des données à Formspree
    fetch('https://formspree.io/f/mjkbdjyz', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Message de succès si la requête est réussie
            displayResponseMessage("Merci, " + surname + ". Votre message a été envoyé avec succès.", true);
            document.getElementById('contactForm').reset(); // Réinitialise le formulaire après soumission réussie
        } else {
            // Message d'erreur en cas de problème
            displayResponseMessage("Erreur lors de l'envoi du message. Veuillez réessayer plus tard.", false);
        }
    })
    .catch(error => {
        // Message d'erreur en cas d'échec de la requête
        displayResponseMessage("Une erreur s'est produite. Veuillez réessayer plus tard.", false);
    });
});

function displayResponseMessage(message, isSuccess) {
    var responseMessage = document.getElementById('responseMessage');
    responseMessage.style.color = isSuccess ? '#009ad6' : '#d9534f'; // Bleu pour succès, rouge pour erreur
    responseMessage.textContent = message;
}
