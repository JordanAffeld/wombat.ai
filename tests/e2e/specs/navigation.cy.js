describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to all main pages', () => {
    // Test home page
    cy.url().should('include', '/');
    cy.get('.nav-link').should('be.visible');

    // Test about page navigation
    cy.get('a[href*="about-us"]').click();
    cy.url().should('include', '/about-us');
    
    // Test login page navigation
    cy.get('a[href*="login"]').click();
    cy.url().should('include', '/login');
    
    // Test contact page navigation
    cy.get('a[href*="contact"]').click();
    cy.url().should('include', '/contact');
  });

  it('should have working language switcher', () => {
    cy.get('.lang-switcher').should('exist')
      .select('zh')
      .should('have.value', 'zh');
  });
}); 