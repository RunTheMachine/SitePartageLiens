/* 
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
    var titreLien = document.createElement("a");
    titreLien.href = lien.url;
    titreLien.style.color = "#428bca";
    titreLien.style.textDecoration = "none";
    titreLien.style.marginRight = "5px";
    titreLien.appendChild(document.createTextNode(lien.titre));

    var urlLien = document.createElement("span");
    urlLien.appendChild(document.createTextNode(lien.url));

    // Cette ligne contient le titre et l'URL du lien
    var ligneTitre = document.createElement("h4");
    ligneTitre.style.margin = "0px";
    ligneTitre.appendChild(titreLien);
    ligneTitre.appendChild(urlLien);

    // Cette ligne contient l'auteur
    var ligneDetails = document.createElement("span");
    ligneDetails.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

    var divLien = document.createElement("div");
    divLien.classList.add("lien");
    divLien.appendChild(ligneTitre);
    divLien.appendChild(ligneDetails);

    return divLien;
}

var contenu = document.getElementById("contenu");
// Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
listeLiens.forEach(function (lien) {
    var elementLien = creerElementLien(lien);
    contenu.appendChild(elementLien);
});

/* 
Activité 2
*/

//Création et affichage du bouton pour ajouter un lien
var btnLien = document.createElement("button");
btnLien.style.marginBottom = "15px";
btnLien.textContent = "Ajouter un lien";
var bodyElt = document.querySelector("body");
bodyElt.insertBefore(btnLien, contenu);


// Crée et renvoie un élément DOM affichant le formulaire
var creerFormulaire = () => {
    //Crée et renvoie un élément DOM input prédefini
    var creerInput = (name, texte, largeur) => {
        var input = document.createElement("input");
        input.type = "text";
        input.setAttribute("required", "");
        input.style.marginRight ="15px";
        input.setAttribute("name", name);
        input.setAttribute("placeholder", texte);
        input.style.width = `${String(largeur)}px`;
        return input;
    } 

    //zone de texte pour l'auteur
    var auteurInput = creerInput("auteur", "Entrez votre nom", 150); 

    //zone de texte pour le titre
    var titreInput = creerInput("titre", "Entrez le titre du lien", 300);

    //zone de texte pour l' URL
    var urlInput = creerInput("url", "Entrez l'URL du lien", 300);

    var btnForm = document.createElement("input");
    btnForm.type = "submit";
    btnForm.value = "Ajouter";

    var form = document.createElement("form");
    form.style.marginBottom = "15px";
    form.appendChild(auteurInput);
    form.appendChild(titreInput);
    form.appendChild(urlInput);
    form.appendChild(btnForm);

    return form;
}

//Vérifie les données du formulaire et renvoie un objet représentant un lien
var traiterFormulaire = form => {
    //vérifie l'URL
    let urlVerifé = form.elements.url.value;
    var regex = /https?:\/\/.+\..+/;
    if (!(regex.test(urlVerifé))) {
        urlVerifé = `http://${urlVerifé}`;
    }
    
    //Création d'un objet avec les donnés du formulaire
    var nouveauLien = {
        titre: form.elements.titre.value,
        url: urlVerifé,
        auteur: form.elements.auteur.value
    };
    return nouveauLien;
}

//Crée et renvoie un élément DOM affichant un message
// Le paramètre lien est un objet JS représentant un lien
var afficherMessage = lien => {
    var messageConfirmation = document.createElement("h4");
    messageConfirmation.id = "message";
    messageConfirmation.textContent = `Le lien "${lien.titre}" a bien été ajouté.`;
    return messageConfirmation;
}

btnLien.addEventListener("click", e => {
    //Le formulaire apparaît à la place du bouton
    bodyElt.replaceChild(creerFormulaire(), e.target);
    var form = document.querySelector("form");

    form.addEventListener("submit", e => {
        //Affichage du lien grâce aux données du formulaire
        var nouveauLien = traiterFormulaire(form);
        contenu.insertBefore(creerElementLien(nouveauLien), document.querySelector(".lien"));
        //Le Formulaire disparaît
        bodyElt.removeChild(e.target);
        //confirmation de l'ajout/ réaffichage du bouton
        var messageConfirmation = afficherMessage(nouveauLien);
        bodyElt.insertBefore(messageConfirmation, contenu);
        setTimeout(() => bodyElt.removeChild(messageConfirmation), 2000);
        bodyElt.insertBefore(btnLien, contenu);
        e.preventDefault();
    });  
});

