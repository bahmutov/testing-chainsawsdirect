/// <reference types="Cypress" />
it('has gas chainsaws', () => {
  cy.visit('/')
  cy.get('#style1').select('Chain Saws - Gas')
  cy.contains('.plcount', /^\d\d Products$/).should('be.visible')
})
