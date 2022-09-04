/// <reference types="Cypress" />

import { filter } from '../../fixtures/const-sign-in'

const ConsEmailUser1 = Cypress.env("envUser1")
const ConsHomePage = Cypress.env("envLinkovi")


describe('Register user', function() {
    
    const expected = [
        'You must register at least one phone number.',
        'lastname is required.',
        'firstname is required.',
        'passwd is required.',
        'address1 is required.',
        'city is required.',
        `The Zip/Postal code you've entered is invalid. It must follow this format: 00000`,
        'This country requires you to choose a State.'
    ]
    const expected2 = [  
        'You must register at least one phone number.',
        'lastname is required.',
        'firstname is required.',
        'email is required.',
        'passwd is required.',
        'id_country is required.',
        'address1 is required.',
        'city is required.',
        'Country cannot be loaded with address->id_country',
        'Country is invalid'
    ]

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


    it ('TEST CASE 4 Navigate to CREATE AN ACCOUNT page', function() {
        cy.emailRegister(ConsEmailUser1.envEmailUser1); 
        cy.get('h1').should('have.text','Create an account')  
        cy.get('[data-validate="isEmail"]').should('have.value',ConsEmailUser1.envEmailUser1)

    });
    
    it.only('TEST CASE 5 CREATE AN ACCOUNT  Click on Sing-up while all fields are not populated', function() {
        cy.emailRegister(ConsEmailUser1.envEmailUser1); 

        cy.get('#submitAccount').click() 
        cy.get('[class="alert alert-danger"]').should('be.visible')
        cy.get('[class="alert alert-danger"]').children('ol').children('li').then((item)     => {
            for(let i = 0; i < item.length; i++){
                cy.get('[class="alert alert-danger"]').children('ol').children('li').eq(i) 
                .should('have.text', expected[i])
            }

        const text=("There are "+item.length+" errors")    
        cy.get('[class="alert alert-danger"]').children('p').should('have.text',text )    
        cy.get('h1').should('have.text','Create an account')  

        },
    )
    });

    it('Check error if field is empty in mandatory fields',function()  {
        cy.clearFieldFocusOff("#customer_firstname")
        cy.get('[class="required form-group form-error"]').children( "#customer_firstname").should('be.visible')
        cy.clearFieldFocusOff("#customer_lastname")
        cy.get('[class="required form-group form-error"]').children("#customer_lastname").should('be.visible')
        cy.clearFieldFocusOff("#email")
        cy.get('[class="required form-group form-error"]').children( "#email").should('be.visible')
        cy.clearFieldFocusOff("#passwd") 
        cy.get('[class="required password form-group form-error"]').children( "#passwd").should('be.visible')

        

        
    });

    
}); 