it("Should successfully login", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it("Should not login with empty login", () => {
  cy.visit("/booksNode");
  cy.login("", "test");
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#mail")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле");
});

it("Should not login with empty password", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "");
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#pass")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле");
});

it("Should Add a book", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Books list").click();
  cy.addBook("Title1", "Description1", "Author1");
  cy.get(".card-title").last().should("contain.text","Title1");
  cy.contains("button", "Add to favorite").last().should("be.visible");
});

it("Should Add to favorite", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Books list").click();
  cy.addBook("Title2", "Description2", "Author2");
  cy.get("button").eq(-2).click();
  cy.get("button").eq(-2).should("contain.text","Delete from favorite");
});

it("Shouldn't Add a favorite book to another user", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Books list").click();
  cy.addFavoriteBook("Title3", "Description3", "Author3");
  cy.contains("button", "Log out").click();
  cy.login("bropet@mail.ru", "123");
  cy.contains("button", "Delete from favorite").should("not.be.visible");
});