
describe('Inicio de sesion', () => {
    beforeEach(() => {
        cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
    })

    afterEach(() => {
        cy.window().then((win) => {
            win.close();
        });
    });

    it('Inicio de sesion correctamente', () => {
        cy.get('a').contains('Sign In').click("center")
        cy.get("[name = 'username']").type("11111");
        cy.get("[name = 'password']").clear().type("prueba123*");
        cy.get("[name = 'signon']").click("center")
        cy.get('a').contains('Sign Out').should("be.visible")
    })

    it('Inicio de sesion - contraseña incorrecta', () => {
        cy.get('a').contains('Sign In').click("center")
        cy.get("[name = 'username']").type("11111");
        cy.get("[name = 'password']").clear().type("prueba123");
        cy.get("[name = 'signon']").click("center")
        cy.get('li').contains('Signon failed.').should("be.visible")
    })

    it('Inicio de sesion - usuario inexistente', () => {
        cy.get('a').contains('Sign In').click("center")
        cy.get("[name = 'username']").type("11111123321312");
        cy.get("[name = 'password']").clear().type("prueba123");
        cy.get("[name = 'signon']").click("center")
        cy.get('li').contains('Signon failed.').should("be.visible")
    })

})