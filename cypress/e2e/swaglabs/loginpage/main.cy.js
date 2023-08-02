import { loginSwagLabs } from "../../../support/functions"

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
    loginSwagLabs()
    cy.get('#inventory_container').should('exist')
    cy.get('.shopping_cart_link').should('exist')
    cy.get('.product_sort_container').should('exist')
    cy.get('footer').should('exist')
  })
})

describe('Should verify the sidebar, main section, footer, cart and checkoung after login', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })
  /* The reason for all tests to go here is because there is a bug with the Swag Labs
   * Website which causes Cypress to timeout the tests with: 
   * Your page did not fire its `load` event within `60000ms`
   * https://stackoverflow.com/questions/71984376/your-page-did-not-fire-its-load-event-within-60000ms-only-on-github-actions
  */
  it('Verifies the sidebar, main functionality, footer, cart functionality', () => {
    loginSwagLabs()
    cy.get('.bm-burger-button').should('exist')
    cy.get('.bm-burger-button').click()
    cy.get('.bm-menu').should('exist')
    cy.get('.menu-item').should('have.length', 4)
    cy.get('.bm-cross-button').click()
    cy.get('.bm-menu').should('not.visible')
    cy.get('.bm-burger-button').should('be.visible')
    cy.get('.inventory_list').should('exist')
    cy.get('.inventory_item').should('exist')
    cy.get('.inventory_item_img').should('exist')
    cy.get('.inventory_item_name').should('exist')
    cy.get('.inventory_item_desc').should('exist')
    cy.get('.inventory_item_price').should('exist')
    cy.get('#add-to-cart-sauce-labs-backpack').should('exist')
    cy.get('footer').should('exist')
    cy.get('li.social_twitter a').should('have.attr', 'href').should('include', 'twitter')
    cy.get('li.social_facebook a').should('have.attr', 'href').should('include', 'facebook')
    cy.get('li.social_linkedin a').should('have.attr', 'href').should('include', 'linkedin')
    cy.get('.footer_copy').contains('© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    cy.get('.inventory_item_name').eq(0).click()
    cy.get('.inventory_details_img').should('exist')
    cy.get('.inventory_details_name').should('exist')
    cy.get('.inventory_details_desc').should('exist')
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
    cy.get('#remove-sauce-labs-backpack').click()
    cy.get('.shopping_cart_badge').should('not.exist')
    cy.get('#back-to-products').click()
    cy.url().should('include', 'inventory.html')
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
    cy.get('#remove-sauce-labs-backpack').click()
    cy.get('.shopping_cart_badge').should('not.exist')
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', 'cart.html')
    cy.get('#continue-shopping').should('exist')
    cy.get('#checkout').should('exist').contains('Checkout').click()
    cy.get('#cancel').should('exist')
    cy.get('#continue').click()
    cy.get('.error-message-container').should('exist')
    cy.get('.error').should('exist')
    cy.get('#first-name').click().clear().type('Firstname')
    cy.get('#last-name').click().clear().type('FamilyName')
    cy.get('#postal-code').click().clear().type('1000')
    cy.get('#continue').click()
    cy.url().should('include', 'checkout-step-two.html')
    cy.get('#cancel').should('exist')
    cy.get('#checkout_summary_container').should('exist')
    cy.get('.cart_list').should('exist')
    cy.get('.summary_info').should('exist')
    cy.get('#finish').click()
    cy.url().should('include', 'checkout-complete.html')
    cy.get('.complete-header').contains('Thank you for your order!')
    cy.get('.complete-text').contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    cy.get('.title').contains('Checkout: Complete!')
    cy.get('#back-to-products').click()
    cy.url().should('include', 'https://www.saucedemo.com/')
  })
})