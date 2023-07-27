export function loginSwagLabs() {
  cy.get('input[name="user-name"]').click().clear().type(Cypress.env('loginUsername'), { log: false })
  cy.get('#password').click().clear().type(Cypress.env('loginPassword'), { log: false })
  cy.get('#login-button').click()
  cy.url().should('include', '/inventory.html')
  cy.get('#inventory_container').should('exist')
}