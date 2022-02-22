describe('ingredient detail modal', function () {
  before(function () {
    cy.login(Cypress.env('TEST_USER_LOGIN'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit(Cypress.env('TEST_BASE_URL'));
  });

  it('should ingredient detail modal open', function () {
    const dataTransfer = new DataTransfer();
    cy.get('[draggable]').first().trigger('dragstart', {
      dataTransfer
    });
    cy.get('[class^=burger-constructor_constructor_wrapper__]').first().trigger('drop', {
      dataTransfer
    });
    cy.get('button').contains('Оформить заказ').click();

    cy.wait(17000);
    cy.get('[class^=modal_modal__]').first().as('modal');
    cy.get('@modal').contains('Ваш заказ начали готовить');
    cy.get('[class^=modal_modal_close__]').first().click();
    cy.get('[class^=modal_modal__]').should('not.exist');
  });
});
