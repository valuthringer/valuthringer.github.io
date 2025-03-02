// Lecture de l'année actuelle sur toutes les pages
function lectureAnneeSite() {
    const options = { timeZone: 'Europe/Paris', year: 'numeric' };
    const annee = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
    document.getElementById('annee').textContent = annee;
}


document.addEventListener('DOMContentLoaded', function() {
    lectureAnneeSite();
});


// Fonction d'agrandissement des images
function agrandirImage(element) {
    var modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "imageview";

    var img = document.createElement("img");
    img.src = element.src;
    img.id = "original";
    modal.appendChild(img);

    var close = document.createElement("span");
    close.className = "close";
    close.innerHTML = "&times;";
    close.onclick = function () {
        modal.style.display = "none";
    };
    modal.appendChild(close);

    document.body.appendChild(modal);

    var zoomScale = 1;
    var scaleFactor = 1.2;
    var translateX = 0;
    var translateY = 0;
    var isDragging = false;
    var startX, startY;

    modal.onwheel = function (event) {
        event.preventDefault();
        if (event.deltaY < 0) {
            zoomScale *= scaleFactor;
        } else {
            zoomScale /= scaleFactor;
        }
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
    };

    img.onmousedown = function (event) {
        event.preventDefault(); // Empêcher le comportement de glisser-déposer par défaut
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
    };

    img.onmousemove = function (event) {
        if (isDragging) {
            translateX += event.clientX - startX;
            translateY += event.clientY - startY;
            img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
            startX = event.clientX;
            startY = event.clientY;
        }
    };

    document.onmouseup = function () {
        isDragging = false;
    };

    modal.style.display = "flex";
}