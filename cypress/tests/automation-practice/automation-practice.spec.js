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
        cy.emailRegister(ConsEmailUser1.envEmailUser1); 
    });

    it('Navigate to Sing Up page', function() {
        cy.get('h1').should('have.text','Create an account')  
        cy.get('[data-validate="isEmail"]').should('have.value',ConsEmailUser1.envEmailUser1)

    });
    
    it('Click on Sing-up while all fields are not populated', function() {
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

    it.only('Check error if field is empty in mandatory fields',function()  {
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