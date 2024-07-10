/// <reference types="cypress" />

const mockData = {
  users: [
    {
      id: 1,
      name: "Alice",
      username: "alice123",
      age: 25,
      nationality: "USA",
      gender: "FEMALE",
      friends: [
        { id: 2, name: "Bob", username: "bob456", age: 28, nationality: "USA", gender: "MALE" },
        { id: 3, name: "Eve", username: "eve789", age: 22, nationality: "CANADA", gender: "FEMALE" },
      ]
    },
    {
      id: 2,
      name: "Bob",
      username: "bob456",
      age: 28,
      nationality: "USA",
      gender: "MALE",
    },
  ]
};

describe('UserList Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.query.includes('users')) {
        req.reply({
          data: mockData,
        });
      }
    }).as('getUsers');
  });

  it('should display a loading state initially', () => {
    cy.visit('/');
    cy.contains('Loading...').should('be.visible');
    cy.wait('@getUsers');
  });

  it('should handle errors gracefully', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.query.includes('users')) {
        req.reply({
          statusCode: 500,
          body: {
            errors: [{ message: 'Internal Server Error' }],
          },
        });
      }
    }).as('getUsersWithError');

    cy.visit('/');
    cy.wait('@getUsersWithError');
    cy.contains('Error: Response not successful: Received status code 500').should('be.visible');
  });

  it('should display a list of users', () => {
    cy.visit('/');
    cy.contains('List of users').should('be.visible');
  
    cy.get('div').contains('Name: Alice').should('be.visible');
    cy.get('div').contains('Username: alice123').should('be.visible');
    cy.get('div').contains('Age: 25').should('be.visible');
    cy.get('div').contains('Nationality: USA').should('be.visible');
    cy.get('div').contains('Gender: FEMALE').should('be.visible');
    cy.get('div').contains('Friends: Bob, Eve').should('be.visible');
  
    cy.get('div').contains('Name: Bob').should('be.visible');
    cy.get('div').contains('Username: bob456').should('be.visible');
    cy.get('div').contains('Age: 28').should('be.visible');
    cy.get('div').contains('Nationality: USA').should('be.visible');
    cy.get('div').contains('Gender: MALE').should('be.visible');
  });
});

describe("MovieSearch Component", () => {
  it("should search for a movie and display results", () => {
    cy.visit("/movies");

    cy.get('input[type="text"]').type("Interstellar");
    cy.get("button").contains("Search Movie").click();

    cy.wait(200);
    cy.contains("Loading...").should("not.exist");

    cy.get("h3").should(($el) => {
      expect($el.text()).to.include("Name: Interstellar");
    });

    cy.contains("Name: Interstellar").should("be.visible");
    cy.contains("Year of Publication: 2007").should("be.visible");
    cy.contains("In Theaters: Yes").should("be.visible");
  });
});

