describe('Should verify the unlucky path for login', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Verifies that pressing login without username / password will prompt errors. Pressing X clears the errors', () => {
    cy.get('#login-button').click()
    cy.get('#user-name').should('have.class', 'error')
    cy.get('#password').should('have.class', 'error')
    cy.get('.error').should('exist').contains('Epic sadface: Username is required')
    cy.get('.error-button', { timeout: 10000 }).should('be.visible').click()
    cy.get('.error').should('not.exist')
  })

  it('Verifies that entering only username and no password will trigger error', () => {
    cy.get('input[name="user-name"]').click().clear().type(Cypress.env('loginUsername'), { log: false })
    cy.get('#login-button').click()
    cy.get('input[name="user-name"]').should('have.class', 'error')
    cy.get('#password').should('have.class', 'error')
    cy.get('.error').should('exist').contains('Epic sadface: Password is required')
    cy.get('.error-button', { timeout: 10000 }).should('be.visible').click()
    cy.get('.error').should('not.exist')
  })

  it('Verifies that entering only password and no username will trigger error', () => {
    cy.get('#password').click().clear().type(Cypress.env('loginPassword'), { log: false })
    cy.get('#login-button').click()
    cy.get('input[name="user-name"]').should('have.class', 'error')
    cy.get('#password').should('have.class', 'error')
    cy.get('.error').should('exist').contains('Epic sadface: Username is required')
    cy.get('.error-button', { timeout: 10000 }).should('be.visible').click()
    cy.get('.error').should('not.exist')
  })
})

describe('Should verify the happy path', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Should login', () => {
    cy.get('input[name="user-name"]').click().clear().type(Cypress.env('loginUsername'), { log: false })
    cy.get('#password').click().clear().type(Cypress.env('loginPassword'), { log: false })
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('#inventory_container').should('exist')
  })
})