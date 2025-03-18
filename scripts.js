// Lecture de l'année actuelle sur toutes les pages
function lectureAnneeSite() {
    const options = { timeZone: 'Europe/Paris', year: 'numeric' };
    const annee = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
    document.getElementById('annee').textContent = annee;
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('background-blur');
    lectureAnneeSite();
    menu_gauche();
});


//Menu gauche du site
function menu_gauche(){
    const menuDroite = document.querySelector(".menu-gauche");

    const menu = document.createElement("div");
    menu.classList.add("menu-vertical");
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) || '/';
    
    const links = [
        { href: "https://github.com/valuthringer", imgSrc: "./logos/logo_git_noir.png", alt: "logo-git", title: "GitHub" },
        { href: "https://www.linkedin.com/in/valentin-luthringer/", imgSrc: "./logos/linkedin_noir.png", alt: "logo-linkedin", title: "LinkedIn" },
        { href: "https://annuaire.univ-cotedazur.fr/profile?dn=uid%3D22200932%2Cou%3Detudiant%2Cou%3Dpeople%2Cdc%3Dunice%2Cdc%3Dfr", imgSrc: "./logos/logo_univcotedazur_noir.png", alt: "logo-univcotedazur", title: "Annuaire UCA" },
        { href: "https://www.instagram.com/val.lte", imgSrc: "./logos/insta_noir.png", alt: "logo-insta", title: "Instagram" },
        { href: "https://redzingradio.com/author/valentin/", imgSrc: "./logos/logo_wp_noir.png", alt: "logo-wp", title: "Articles Wordpress" },
        { href: "https://soundcloud.com/valentin-luthringer", imgSrc: "./logos/soundcloud_noir.png", alt: "logo-soundcloud", title: "SoundCloud" },
        { href: "https://redzingradio.com/members/valentin/", imgSrc: "./logos/logo_full_black_redzing.png", alt: "logo-redzing", title: "Redzing Radio Team" },
    ];
    
    links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.href;
        a.target = "_blank";
    
        const img = document.createElement("img");
        img.src = link.imgSrc;
        img.alt = link.alt;
        img.title = link.title;
        img.style.width = "30px";
    
        a.appendChild(img);
        menu.appendChild(a);
    });
    
    menuDroite.appendChild(menu);
}


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

