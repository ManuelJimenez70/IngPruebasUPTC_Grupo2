
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


describe('Registro', () => {
    beforeEach(() => {
        cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
    })

    afterEach(() => {
        cy.window().then((win) => {
            win.close();
        });
    });

    it('Registro correcto', () => {
        cy.get('a').contains('Sign In').click("center")
        cy.get('a').contains('Register Now!').click("center")

        cy.get("[name = 'username']").type("00005");
        cy.get("[name = 'password']").clear().type("12345678");
        cy.get("[name = 'repeatedPassword']").clear().type("12345678");
        cy.get("[name='account.firstName']").type("Nombre prueba");
        cy.get("[name = 'account.lastName']").clear().type("Apellido Prueba");
        cy.get("[name='account.email']").type("prueba@prueba.com");
        cy.get("[name = 'account.phone']").clear().type("1234567890");

        cy.get("[name = 'account.address1']").clear().type("calle 1 # 2-3");
        cy.get("[name = 'account.address2']").clear().type("calle 4 # 5-6");

        cy.get("[name = 'account.city']").clear().type("Tunja");


    })


})
