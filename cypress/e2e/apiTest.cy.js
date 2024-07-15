import { parseString } from 'xml2js';

describe('template spec', () => {
  
  const baseUrl = Cypress.env('baseUrl')
  let productName = 'Beats'
  let userId = 551548040
  let token 
  let productId = 30
  
  before(() => {
    cy.api({
      method: 'POST',
      url: `${baseUrl}/accountservice/ws/AccountLoginRequest`,
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'serviceOrder',
      },
      body: `<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><AccountLoginRequest xmlns="com.advantage.online.store.accountservice"><email></email><loginPassword>Teste@1</loginPassword><loginUser>hugogoncalves</loginUser></AccountLoginRequest></soap:Body></soap:Envelope>`,
    }).then((response) => {
      parseString(response.body, { explicitArray: false }, (err, result) => {
        if (err) {
          throw new Error('Failed to parse XML');
        }
        
        token = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:AccountLoginResponse']['ns2:StatusMessage']['ns2:token'];
        
        expect(token).to.exist;
        cy.log(`Token: ${token}`);
      });
    }) 
  })
  
  it('Visitar home do site e adicionar um produto no carrinho através da busca', () => {
    cy.visit(baseUrl)
    cy.api('GET',`${baseUrl}/catalog/api/v1/products/search?name=${productName}`).then(function (response) {
      cy.log(response)
      expect(response.status).to.eq(200)   
      expect(response.body[0].products[0].productName).to.includes(productName)
    }) 
  })
  
  it('Atualizar imagem de produto', () => {
    cy.fixture('testImage.jpg', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(blob => {
        const formData = new FormData();
        formData.append('file', blob, 'testImage.jpg');

        const options = {
          method: 'POST',
          url: `${baseUrl}/catalog/api/v1/product/image/${userId}/test/blue?product_id=${productId}`,
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
            'Content-Type': 'multipart/form-data'
          },
          body: formData,
          failOnStatusCode: false
        };

        cy.api(options).then(function (response) {
          cy.log(response);
          expect(response.status).to.eq(200);
          const bodyString = Cypress.Blob.arrayBufferToBinaryString(response.body);
          const body = JSON.parse(bodyString);
          expect(body.id).to.eq(30);
          expect(body.success).to.eq(true)
        });
      });
  })
  
})