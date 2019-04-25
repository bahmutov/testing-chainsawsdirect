// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

context('Chainsaw Direct', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has gas chainsaws', () => {
    cy.get('#style1').select('Chain Saws - Gas')
    cy.contains('.plcount', /^\d\d Products$/).should('be.visible')

    cy.get('#sort_value').select('Price: Low to High')
    cy.get('.regPrice')
      .should('have.length.gt', 0)
      .then($prices => {
        const prices = $prices
          .toArray()
          .map($el => parseFloat($el.innerText.substr(1)))
        console.log(prices)
      })
  })
})
