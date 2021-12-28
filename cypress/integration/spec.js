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

it('shows alert when the user cancels', () => {
  cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(win, 'alert').as('alert')

      cy.stub(win, 'showOpenFilePicker').rejects(new Error('User cancelled'))
    },
  })
  cy.get('button').click()
  cy.get('@alert').should('be.calledWith', 'Error: User cancelled')
})
