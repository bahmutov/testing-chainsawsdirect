// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

context('Chainsaw Direct', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has reasonably priced gas chainsaws', () => {
    cy.get('#style1').select('Chain Saws - Gas')
    cy.contains('.plcount', /^\d\d Products$/).should('be.visible')

    cy.get('#sort_value').select('Price: Low to High')
    cy.get('.regPrice')
      .should('have.length.gt', 0)
      .then($prices => {
        // remove "$" from prices and convert to strings
        const prices = $prices
          .toArray()
          .map($el => parseFloat($el.innerText.substr(1)))
        // assertion comes from chai-sorted
        expect(prices).to.be.sorted()
      })
  })

  it('finds Cypress among the saws', () => {
    // stub API calls to the search endpoint
    cy.server()
    cy.route('/sayt.php?q=Cypr*', {
      suggestions: [
        {
          value: 'Cypress Test Runner',
          data: 1,
          exactMatch: 1
        }
      ]
    })

    // by stubbing search XHRs we can return a single
    // result when typing "Cypress" into the search box
    cy.get('#searchText').type('Cypress', { delay: 100 })
    cy.get('.autocomplete-suggestion')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Cypress Test Runner')
  })

  it('goes to Cypress search result', () => {
    // stub API calls to the search endpoint
    cy.server()
    cy.route('/sayt.php?q=Cypr*', {
      suggestions: [
        {
          value: 'Cypress Test Runner',
          data: 1,
          exactMatch: 1
        }
      ]
    })

    // by stubbing search XHRs we can return a single
    // result when typing "Cypress" into the search box
    cy.get('#searchText').type('Cypress', { delay: 100 })
    cy.get('.autocomplete-suggestion')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Cypress Test Runner')
      .click()

    // after selecting the synthetic search result
    // the returned page shows that search in the input search box
    cy.url().should('match', /\/search-results.php/)
    cy.get('input#searchText')
      .should('have.value', 'Cypress Test Runner')
      .and('be.visible')
  })
})
