describe('Registro de sesion', () => {
    beforeEach(() => {
      cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
    })
  
    afterEach(() => {
      cy.window().then((win) => {
        win.close();
      });
    });

    it('Registro de sesion correctamente', () => {
       cy.click("")
    })

  })