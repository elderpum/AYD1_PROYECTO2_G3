import { expect, test } from "@playwright/test";

// beforeEach
test.beforeEach(async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/alquimovil");
});

test.describe("test_pag_inventario_202000166", () => {
  test("Debería ir a la página donde se pueda alquilar un auto.", async ({
    page,
  }) => {
    // Click text=Alquilar
    await page.click("#alquilar-0");
    // obtener el texto del h1 mediante su clase
    const text = await page.$eval(
      'h2[class="heads"]',
      (element) => element.textContent
    );
    // verificar que el texto sea el esperado
    expect(text).toBe(" Alquilar Vehiculo ");
  });

  test("Debería ir a la página de gestion del costo para un auto.", async ({
    page,
  }) => {
    // Click en gestionar cuota
    await page.click("#gestionar-0");
    // obtener el texto del h2 mediante su clase
    const text = await page.$eval("h2", (element) => element.textContent);
    // verificar que el texto sea el esperado
    expect(text).toBe(" Gestionar Cuota ");
  });

  test("Debería filtrar autos por categoría y modelos.", async ({ page }) => {
    // fill "Sedan" in the Autocomplete input
    await page.fill('input[id="categorias-carros"]', "Sedan");
    // Wait for the options to appear
    await page.waitForSelector(".MuiAutocomplete-option");
    // Click on the first option
    await page.click(".MuiAutocomplete-option:first-child");
    // Check if the input has the expected value
    const selectedValue = await page.$eval(
      'input[id="categorias-carros"]',
      (input) => input.value
    );
    expect(selectedValue).toBe("Sedan");

    // fill "Toyota" in the Autocomplete input
    await page.fill('input[id="marcas-carros"]', "Toyota");
    // Wait for the options to appear
    await page.waitForSelector(".MuiAutocomplete-option");
    // Click on the first option
    await page.click(".MuiAutocomplete-option:first-child");
    // Check if the input has the expected value
    const selectedValue2 = await page.$eval(
      'input[id="marcas-carros"]',
      (input) => input.value
    );
    expect(selectedValue2).toBe("Toyota");

    // click the search button
    await page.click('button[id="boton-filtrar"]');
  });
});

test.describe("test_pag_crud_clientes_202000166", () => {
  test("Debería crear un nuevo  cliente.", async ({ page }) => {
    // Click en el navbar para ir a la pagina de CRUDClientes
    await page.click("#crud-clientes");
    // Click en el boton de crear nuevo cliente
    await page.click("#crear-cliente");
    // llenar el formulario
    await page.fill('input[id="nombre"]', "Gerson");
    await page.fill('input[id="apellido"]', "Quiroa");
    await page.fill('input[id="licencia"]', "1111111111111");
    await page.fill('input[id="direccion"]', "Mixco, Guatemala, Guatemala");
    await page.fill('input[id="correo"]', "gerson10@gmail.com");
    await page.fill('input[id="telefono"]', "12345678");
    await page.fill('input[id="nombre"]', "Gerson");
    await page.fill('input[id="usuario"]', "gerson10");
    await page.fill('input[id="password"]', "gerson10");
    // Establecer la fecha
    await page.click('button[aria-label="Choose date"]');
    await page.click('.MuiPickersDay-root[aria-colindex="4"]:not([aria-selected="true"])');
  });
});
