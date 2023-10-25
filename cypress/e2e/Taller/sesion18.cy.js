describe('Registro', () => {

    beforeEach(() => {
        cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
    })

    it('Registro correcto', () => {
        cy.get('a').contains('Sign In').click("center");
        cy.get('a').contains('Register Now!').click("center");
        cy.get("[name = 'username']").clear().type("544623994194");
        cy.get("[name = 'password']").clear().type(generateRandomNumberString());
        cy.get("[name = 'repeatedPassword']").clear().type("12345678");
        cy.get("[name='account.firstName']").type("Nombre prueba");
        cy.get("[name = 'account.lastName']").clear().type("Apellido Prueba");
        cy.get("[name='account.email']").type("prueba@prueba.com");
        cy.get("[name = 'account.phone']").clear().type("1234567890");
        cy.get("[name = 'account.address1']").clear().type("calle 1 # 2-3");
        cy.get("[name = 'account.address2']").clear().type("calle 4 # 5-6");
        cy.get("[name = 'account.city']").clear().type("Tunja");
        cy.get("[name = 'account.state']").clear().type("Boyaca");
        cy.get("[name = 'account.zip']").clear().type("a");
        cy.get("[name = 'account.country']").clear().type("Col");
        cy.get("[name = 'newAccount']").click("center");
    })
    const generateRandomNumberString = () => {
        const randomNumber = Math.floor(Math.random() * 1000000000000);
        return randomNumber.toString();
    };

    it('Registro con usuario existente', () => {
        cy.get('a').contains('Sign In').click("center")
        cy.get('a').contains('Register Now!').click("center")
        cy.get("[name = 'username']").type("11111");
        cy.get("[name = 'password']").clear().type("12345678");
        cy.get("[name = 'repeatedPassword']").clear().type("12345678");
        cy.get("[name='account.firstName']").type("Nombre prueba");
        cy.get("[name = 'account.lastName']").clear().type("Apellido Prueba");
        cy.get("[name='account.email']").type("prueba@prueba.com");
        cy.get("[name = 'account.phone']").clear().type("1234567890");
        cy.get("[name = 'account.address1']").clear().type("calle 1 # 2-3");
        cy.get("[name = 'account.address2']").clear().type("calle 4 # 5-6");
        cy.get("[name = 'account.city']").clear().type("Tunja");
        cy.get("[name = 'account.state']").clear().type("Boyaca");
        cy.get("[name = 'account.zip']").clear().type("a");
        cy.get("[name = 'account.country']").clear().type("Col");
        cy.get("[name = 'newAccount']").click("center");
        cy.get('h1').contains("Error").should("be.visible");
    })

    it('Registro - confirmación de contraseñas negativo', () => {
        cy.get('a').contains('Sign In').click("center")
        cy.get('a').contains('Register Now!').click("center")
        cy.get("[name = 'username']").type(generateRandomNumberString());
        cy.get("[name = 'password']").clear().type("12345678");
        cy.get("[name = 'repeatedPassword']").clear().type("12345679");
        cy.get("[name='account.firstName']").type("Nombre prueba");
        cy.get("[name = 'account.lastName']").clear().type("Apellido Prueba");
        cy.get("[name='account.email']").type("prueba@prueba.com");
        cy.get("[name = 'account.phone']").clear().type("1234567890");
        cy.get("[name = 'account.address1']").clear().type("calle 1 # 2-3");
        cy.get("[name = 'account.address2']").clear().type("calle 4 # 5-6");
        cy.get("[name = 'account.city']").clear().type("Tunja");
        cy.get("[name = 'account.state']").clear().type("Boyaca");
        cy.get("[name = 'account.zip']").clear().type("a");
        cy.get("[name = 'account.country']").clear().type("Col");
        cy.get("[name = 'newAccount']").click("center");
        cy.get('a').contains('Sign In').should("be.visible");
    })
}
)

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
        cy.get("[name = 'signon']").click("center");
        cy.get('a').contains('Sign Out').should("be.visible");
    })

    it('Inicio de sesion negativos', () => {
        cy.fixture('user.json').then((userFixture) => {
            let couter = 1;
            userFixture.forEach(element => {
                cy.get('a').contains('Sign In').click("center");
                cy.get("[name='username']").type(element.username);
                cy.get("[name='password']").clear().type(element.password);
                cy.get("[name='signon']").click("center");
                cy.screenshot("inicio de sesion" + couter, { capture: 'fullPage' , blackout: ["[name='password']"] });
                cy.get('li').contains('Signon failed.').should("be.visible");
                couter++;
            });
        });
    });
})

describe('Compra de Producto', () => {
    beforeEach(() => {
        cy.visit('https://petstore.octoperf.com/actions/Catalog.action');
        // Agregar Producto al carrito
        cy.get('a').contains('Sign In').click("center")
        cy.get("[name = 'username']").type("11111");
        cy.get("[name = 'password']").clear().type("prueba123*");
        cy.get("[name = 'signon']").click("center");
        cy.get('a[href*="/actions/Catalog.action?viewCategory=&categoryId=FISH"]').first().click()  ;  
        cy.get('a').contains('FI-SW-01').click("center");
        cy.get('a').contains('Add to Cart').click("center");
        cy.get("[id = 'LogoContent']").click("center");
    })

    afterEach(() => {
        cy.window().then((win) => {
            win.close();
        });
    });

    it('Compra Exitosa', () => {
        cy.get("img[name = 'img_cart']").click("center");
        cy.get('a').contains('Proceed to Checkout').click("center");
        cy.get("[name = 'newOrder']").click("center");
        cy.get('a').contains('Confirm').click("center");
        cy.get('li').contains('Thank you, your order has been submitted.').should("be.visible");
    })

    it('Compra con existencias maximas', () => {
        cy.get("img[name = 'img_cart']").click("center");
        cy.get("input[name = 'EST-1']").clear().type("1000000000000000000000000{enter}");
        cy.get('a').contains('Proceed to Checkout').click("center");
        cy.get("[name = 'newOrder']").click("center");
        cy.get('a').contains('Confirm').click("center");
        cy.get('li').contains('Thank you, your order has been submitted.').should("be.visible");
    })
})