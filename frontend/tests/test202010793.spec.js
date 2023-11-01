import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto("http://localhost:3000/alquimovil");
});

test.describe("test_alquilar_vehiculo_202010793", () => {
    test("Debería mostrar la info del vehiculo", async ({
        page,
    }) => {
        // click a alguilar un vehiculo
        await page.click("#alquilar-0");
        // buscar infor del vehiculo
        const text = await page.$eval("#tituloInfo", (element) => element.textContent);
        // mostrar info del vehiculo
        expect(text).toBe('Toyota Corolla')
    })

    test("Al presionar el boton atras debería regresar al inventario", async ({
        page,
    }) => {
        // click a alguilar un vehiculo
        await page.click("#alquilar-0");
        // click en el voton de atras
        await page.click("#btnAtras");
        // leer el titulo de la pestaña
        await expect(page).toHaveTitle("Inventario");
    })

    test("Al presionar el boton alquilar debería regresar al inventario", async ({
        page,
    }) => {
        await page.click("#alquilar-0");

        await page.click("#btnAlquilar");

        await expect(page).toHaveTitle("Inventario");
    })
    /*
    test("Al modificar debería regresar al inventario", async ({
        page,
    }) => {
        await page.click("#gestionar-0");
        //await page.click("#btnModificar");
        const text = await page.$eval("#tituloInfo", (element) => element.textContent);

        expect(text).toBe('')
    })
    */
})


