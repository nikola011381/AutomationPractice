/// <reference types="Cypress" />

import { filter } from '../../fixtures/constSignIn'

const ConsEmailUser1 = Cypress.env("envUser1")

describe('Main Page suite', function() {
    
    beforeEach('Visit our application.', function () {
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account');
    });

    it('Register user', function() {
        cy.emailRegister(ConsEmailUser1.envEmailUser1); 
    });
    
});