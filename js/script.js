// Afficher tous les contacts sur la page d'accueil
function showContacts() {
  // Récupérer les contacts
  let contacts = localStorage.getItem('contacts');
  if(contacts == null) {
    contacts = [];
  } else {
    // Convertir la chaîne de caractères en tableau
    contacts = JSON.parse(contacts);
  }
  let html = '';
  // Afficher les contacts
  contacts.forEach(function (contact, index) {
    html += '<li>';
    html += '<a class="contact" contactId="'+ index +'">'+ contact.prenom + ' ' + contact.nom.toUpperCase()+ '</a>';
    html += '</li>';
  });
  $('#listPeople').html(html);
}

// Afficher les détails d'un contact en particulier
// PARAM id : int : l'index du contact dans le tableau
function showContact(id) {
  // Affiche les détails du contact
  $('#showingContact').removeClass('hidden');

  // Récupérer le contact
  let contacts = localStorage.getItem('contacts');
  if(contacts == null) {
    contacts = [];
  } else {
    // Convertir la chaîne de caractères en tableau
    contacts = JSON.parse(contacts);
  }
  let contact = contacts[id];
  // Afficher le contact
  let html = '';
  html += '<hr/>';
  html += '<p> Nom : ' + contact.nom.toUpperCase() + '</p>';
  html += '<p> Prénom : ' + contact.prenom + '</p>';
  html += '<p> Numéro : ' + contact.numero + '</p>';
  html += '<br/><button class="deleteContact" contactId="' + id + '">Supprimer</button><br/><br/>';
  html += '<button id="editContact" contactId="' + id + '">Modifier</button>';
  $('#showingContact').html(html);

  $('.deleteContact').on('click', function () {
    deleteContact($(this).attr('contactId'));
  });

  $('#editContact').on('click', function () {
    editContact($(this).attr('contactId'));
  });
} 

// Créer un contact
function createContact() {
  if ($('#submit').attr('mode') == 'edit') {
    // Récupérer les valeurs des champs
    let nom = $('#name').val();
    let prenom = $('#firstname').val();
    let numero = $('#phone').val();
    let id = $('#submit').attr('contactId');

    if (nom == '' || prenom == '' || numero == '') {
      alert('Merci de remplir tous les champs');
    } else {
      // Créer un objet contact
      let contact = { nom: nom, prenom: prenom, numero: numero };
      // Récupérer les contacts
      let contacts = localStorage.getItem('contacts');
      if (contacts == null) {
        contacts = [];
      } else {
        contacts = JSON.parse(contacts);
      }
      // Modifier le contact dans le tableau
      contacts[id] = contact;
      // Convertir le tableau en chaîne de caractères
      localStorage.setItem('contacts', JSON.stringify(contacts));
      // Recharger la page
      location.reload();
    }
  } else {
    // Récupérer les valeurs des champs
    let nom = $('#name').val();
    let prenom = $('#firstname').val();
    let numero = $('#phone').val();

    if (nom == '' || prenom == '' || numero == '') {
      alert('Merci de remplir tous les champs');
    } else {
      // Créer un objet contact
      let contact = { nom: nom, prenom: prenom, numero: numero };
      // Récupérer les contacts
      let contacts = localStorage.getItem('contacts');
      if (contacts == null) {
        contacts = [];
      } else {
        contacts = JSON.parse(contacts);
      }
      // Ajouter le contact au tableau
      contacts.push(contact);
      // Convertir le tableau en chaîne de caractères
      localStorage.setItem('contacts', JSON.stringify(contacts));
      // Recharger la page
      location.reload();
    }
  }
}

// Supprimer un contact
//  PARAM id : int : l'index du contact dans le tableau
function deleteContact(id) {
  // Récupérer les contacts
  let contacts = localStorage.getItem('contacts');
  if (contacts == null) {
    contacts = [];
  } else {
    // Convertir la chaîne de caractères en tableau
    contacts = JSON.parse(contacts);
  }
  // Supprimer le contact du tableau
  contacts.splice(id, 1);
  // Convertir le tableau en chaîne de caractères
  localStorage.setItem('contacts', JSON.stringify(contacts));
  location.reload();
}

// Modifier un contact
// PARAM id : int : l'index du contact dans le tableau
function editContact(id) {
  $('#submit').attr('mode', 'edit');
  $('#submit').attr('contactId', id);
  $('#submit').html('Modifier');

  // Récupérer les valeurs du contact ID
  let contacts = localStorage.getItem('contacts');
  if (contacts == null) {
    contacts = [];
  } else {
    // Convertir la chaîne de caractères en tableau
    contacts = JSON.parse(contacts);
  }
  let contact = contacts[id];

  // Afficher les valeurs dans les champs
  $('#name').val(contact.nom);
  $('#firstname').val(contact.prenom);
  $('#phone').val(contact.numero);

  // Afficher le formulaire
  $('.formDiv').slideDown();

}

// Lorsque le DOM est chargé
// Lance les détéction d'évènements
$(document).ready(function () {
  showContacts();
  $('#addContact').on('click', function () {
    if($('#submit').attr('mode') == 'edit') {
      $('.formDiv').slideDown();
    } else {
      $('.formDiv').slideToggle();
    }
    $('#submit').attr('mode', 'create');
    $('#submit').removeAttr('contactId');
    $('#submit').html('Ajouter');
    $('#name').val('');
    $('#firstname').val('');
    $('#phone').val('');
  });

  $('#submit').on('click', function () {
    createContact();
  });

  $('.contact').on('click', function () {
    showContact($(this).attr('contactId'));
  });
});