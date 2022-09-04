/// <reference types="Cypress" />

// import { filter } from '../../fixtures/const-sign-in'
 
const ConsEmailUser1 = Cypress.env("envUser1")
const ConsHomePage = Cypress.env("envLinkovi")


describe('Register user', function() {
    
  

    beforeEach('Visit our application.', function () {
        cy.visit(ConsHomePage.envHomePage);    
      

    });


    it('TEST CASE 1 Click on Sign In, in navigation bar, home page', function() {
        cy.clickOnSignInHomePage()
    });

    it('TEST CASE 2 AUTHENTICATION Page, click on Create an account, email field, default status, empty', function() {
        cy.clickOnSignInHomePage()
        cy.get('#SubmitCreate').click();
        cy.get('#create_account_error').should('be.visible') 
        cy.get('#create_account_error').should('have.text','Invalid email address.') 
    });
    it('TEST CASE 3 AUTHENTICATION Page, test input email field', function() {
         cy.clickOnSignInHomePage()

        //Input format which is not email format and after click out of field, and Click on Create an account  AUTHENTICATION
        cy.get('#email_create').type("this is not email format");
        cy.get('#email_create').focus().blur()
        cy.get('[class="form-group form-error"]').children( "#email_create").should('be.visible')
        cy.get('#SubmitCreate').click();
        cy.get('[class="form-group form-error"]').children( "#email_create").should('be.visible')
        cy.get('#create_account_error').should('have.text','Invalid email address.')

        // Clear field and click submit AUTHENTICATION
        cy.clearFieldFocusOff("#email_create") 
        cy.get('#create_account_error').should('have.text','Invalid email address.')
        cy.get('[class="form-group form-error"]').children( "#email_create").should('be.visible')
        cy.get('#SubmitCreate').click();
        cy.get('#create_account_error').should('have.text','Invalid email address.')
        cy.get('[class="form-group form-error"]').children( "#email_create").should('be.visible')

 
        //Input email format fiel statust must changes to green AUTHENTICATION
        cy.get('#email_create').type(ConsEmailUser1.envEmailUser1);
        cy.get('#email_create').focus().blur()
        cy.get('#create_account_error').should('have.text','Invalid email address.')
        cy.get('[class="form-group form-ok"]').children( "#email_create").should('be.visible')
        cy.get('#SubmitCreate').click();
        cy.get('h1').should('have.text','Create an account')
 
    });


   
    
     
}); 