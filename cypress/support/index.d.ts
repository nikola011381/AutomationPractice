declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * @example cy.emailRegister(email)
         */
         emailRegister(email:any): Chainable<any>; 
    }

    interface Chainable<Subject = any> {
        /**
         * @example cy.infoCreateAccount(email)
         */
         infoCreateAccount(email:any): Chainable<any>;

         
    }
}