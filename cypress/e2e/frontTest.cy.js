describe('template spec', () => {

  const baseUrl = Cypress.env('baseUrl')
  
  it('Visitar home do site', () => {
    cy.visit(baseUrl)
    cy.get('#mobileSearch > .roboto-medium').click().type('BEATS').type('{enter}')
    cy.get(':nth-child(1) > :nth-child(4) > .productName').click()
    cy.get('.fixedBtn > .roboto-medium').click()
    cy.get('#checkOutPopUp').click()
    
  })
})