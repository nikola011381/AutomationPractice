declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * @example cy.emailRegister(email)
         */
         emailRegister(email:any): Chainable<any>;

         
    }
}