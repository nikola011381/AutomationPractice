declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * @example cy.emailRegister(email)
         */
         emailRegister(email:any): Chainable<any>; 
    }

    interface Chainable<Subject = any> {
        /**
         * @example cy.clearFieldFocusOff()
         */
         clearFieldFocusOff(email:any): Chainable<any>;

         
    }
}