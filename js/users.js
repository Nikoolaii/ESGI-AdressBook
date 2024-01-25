class Users {
  #nom;
  #prenom;
  #numero;

  constructor(nom, prenom, numero, adresse) {
    this.#nom = nom;
    this.#prenom = prenom;
    this.#numero = numero;
  }

  get nom() {
    return this.#nom;
  }

  get prenom() {
    return this.#prenom;
  }

  get numero() {
    return this.#numero;
  }

  set nom(nom) {
    this.#nom = nom;
  }

  set prenom(prenom) {
    this.#prenom = prenom;
  }

  set numero(numero) {
    this.#numero = numero;
  }
}