describe('template spec', () => {

  const baseUrl = Cypress.env('baseUrl')
  
  it('Visitar home do site e adicionar um produto no carrinho através da busca', () => {
    cy.visit(baseUrl)
    cy.get('#mobileSearch > .roboto-medium').click().type('BEATS').type('{enter}')
    cy.get(':nth-child(1) > :nth-child(4) > .productName').click()
    cy.get('.fixedBtn > .roboto-medium').click()
    cy.get('#checkOutPopUp').click()
    cy.get('.itemsCount').should('include.text', '1')
    cy.get('#userCart > #toolTipCart > :nth-child(1) > table > tbody > #product > :nth-child(2) > a > h3.ng-binding').should('include.text', 'BEATS')
  })

  it.only('Visitar home, navegar por uma categoria e adicionar um produto no carrinho', () => {
    cy.visit(baseUrl)
    cy.get('#speakersImg').click()
    cy.get(':nth-child(1) > :nth-child(4) > .productName').click()
    cy.get('.plus').click()
    cy.get('.fixedBtn > .roboto-medium').click()
    cy.get('#shoppingCartLink').click()
    cy.get(':nth-child(5) > .ng-binding').should('include.text', '2')
    cy.get('#checkOutButton').click()
    cy.get('.itemsCount').should('include.text', '2')
  })
})