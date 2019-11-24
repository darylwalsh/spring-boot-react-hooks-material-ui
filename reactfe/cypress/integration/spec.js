// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('CRA', () => {
  it('shows learn link', function () {
    cy.visit('http://localhost:3000')
    cy.get('.App-link').should('be.visible')
      .and('have.text', 'Learn React')
  })
})
