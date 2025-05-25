describe('ReactNWVite sovellus, customers', function () {

  beforeEach(function () {
    cy.visit('http://localhost:5173')
    cy.get('input[placeholder="Username"]').type('tomi')
    cy.get('input[placeholder="Password"]').type('testaaja')
    cy.get('input[type="submit"][value="Login"]').click()
    // Tarkistetaan onnistuiko kirjautuminen
    cy.contains('Logged in as: tomi').should('be.visible')
  })

  it('Testataan toimiiko customers listaus', function () {
    cy.visit('http://localhost:5173/customers')
    cy.contains('nobr', 'Customers').click()
    cy.wait(3000)
    cy.get('.customerDiv h4').should('include.text', 'Alfreds Nami nami')
    cy.get('.customerDiv h4').should('include.text', 'Ernst Handel , Austria')
    cy.get('.customerDiv h4').should('include.text', 'Tradição Hipermercados , Brazil')
  })

  it('Testataan toimiiko customer lisäys', function () {
    cy.visit('http://localhost:5173/customers')
    cy.contains('button', 'Add new').click()
    cy.get('input[placeholder="ID with 5 capital letters"]').type('TESTI')
    cy.get('input[placeholder="Company Name"]').type('TESTI OY')
    cy.get('input[placeholder="Contact Name"]').type('Testi Testinen')
    cy.get('input[placeholder="Contact Title"]').type('Boss')
    cy.get('input[placeholder="Address"]').type('Testitie 1')
    cy.get('input[placeholder="City"]').type('Porvoo')
    cy.get('input[placeholder="Postal Code"]').type('12345')
    cy.get('input[placeholder="Country"]').type('Finland')
    cy.get('input[placeholder="Phone"]').type('0501234567')
    cy.get('input[placeholder="Fax"]').type('123456789')
    cy.get('input[type="submit"][value="Save"]').click()
    cy.get('.pos').should('contain.text', 'Added new Customer: TESTI OY')
  })

  it('Testataan toimiiko customer poisto', function() {
    cy.visit('http://localhost:5173/customers')
    cy.contains('nobr', 'Customers').click()
    cy.wait(3000)
    cy.contains('.customerDiv h4', 'TESTI OY').click()
    cy.contains('div.customerDetails', 'TESTI OY').within(() => {
      cy.contains('button', 'Delete').click()
    })
    cy.get('.pos').should('contain.text', 'Successfully removed customer TESTI OY')
  })
})