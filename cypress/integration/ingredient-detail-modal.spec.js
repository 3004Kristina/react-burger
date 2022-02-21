describe('ingredient detail modal', function() {
  before(function() {
    cy.visit(Cypress.env('TEST_BASE_URL'));
  });
  it('should ingredient detail modal open', function() {
    cy.get('[class^=burger-ingredients_card__]').first().click();
    cy.contains('Калории,ккал');
    cy.get('[class^=modal_modal_close__]').first().click();
    cy.get('[class^=modal_modal__]').should('not.exist');
  });
});
