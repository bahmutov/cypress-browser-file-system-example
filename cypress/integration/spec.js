/// <reference types="cypress" />

it('shows file contents', () => {
  cy.visit('/', {
    onBeforeLoad(win) {
      const file = {
        text: cy.stub().resolves('Hello, world!').as('text'),
      }
      const fileHandle = {
        getFile: cy.stub().resolves(file).as('file'),
      }
      cy.stub(win, 'showOpenFilePicker')
        .resolves([fileHandle])
        .as('showOpenFilePicker')
    },
  })
  cy.get('button').click()
  cy.get('#output').should('have.text', 'Hello, world!')
  cy.get('@text').should('be.called')
})
