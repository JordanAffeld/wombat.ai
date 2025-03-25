describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login.html');
  });

  it('should show validation messages', () => {
    cy.get('form.auth-form').within(() => {
      // Try to submit empty form
      cy.get('button[type="submit"]').click();
      
      // Check for validation messages
      cy.get('#email:invalid').should('exist');
      cy.get('#password:invalid').should('exist');
    });
  });

  it('should allow input in form fields', () => {
    cy.get('#email')
      .type('test@example.com')
      .should('have.value', 'test@example.com');

    cy.get('#password')
      .type('password123')
      .should('have.value', 'password123');
  });
}); 