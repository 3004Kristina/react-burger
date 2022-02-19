describe('drag and drop', function() {
  before(function() {
    cy.visit(Cypress.env('TEST_BASE_URL'));
  });
  it('should drag and drop ingredients', function() {
    const dataTransfer = new DataTransfer();
    cy.get('[draggable]').first().trigger('dragstart', {
      dataTransfer
    });
    cy.get('[class^=burger-constructor_constructor_wrapper__]').first().trigger('drop', {
      dataTransfer
    });
  });
});
