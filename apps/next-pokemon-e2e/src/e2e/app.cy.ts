describe('next-pokemon-e2e', () => {
  beforeEach(() => cy.visit('http://localhost:3000/'));

  it('should display search input', () => {
    cy.get('input').first().type('bulb');
    cy.get('li').first().contains('Bulbasaur');
    cy.get('body').screenshot();
  });
});
