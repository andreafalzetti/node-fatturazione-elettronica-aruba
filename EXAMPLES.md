# How to use fatturazione-elettronica-aruba

Fatturazione Elettronica Aruba in Node.js

## Install and import

```bash
npm install fatturazione-elettronica-aruba
```

In your JavaScript file, require or import the module:

```js
const ArubaClient = require('fatturazione-elettronica-aruba');
```

## Authentication

To upload or search for an invoice you must authenticate your account using the `username` and `password` that Aruba has provided you. Using this module, you don't need to worry about the `JWT` (JSON Web Token) authentication because it's already been taken care of internally in the module.

Please note that Aruba allows your client to be signed-in for a maximum of 30 minutes since the token has been generated. If you need to call the API after that, you can use the refreshToken API which will simply request for a new token and replace the expired one internally.

## How to use

```js
const arubaClient = new ArubaClient();

await arubaClient.signIn({
  username: 'YOUR_ARUBA_USERNAME',
  password: 'YOUR_ARUBA_PASSWORD'
});
```

Now you are ready to perform operations such as `search`, `notifications` or `upload`.

## Upload an invoice

```js
await arubaClient.uploadInvoice({ dataFile: 'BASE64_ENCODED_XML' });
```

## Upload a signed invoice

```js
await arubaClient.uploadInvoice({
  dataFile: 'SIGNED_BASE64_ENCODED_XML',
  signed: true
});
```

## Search for received invoices

```js
  const invoices = await arubaClient.searchInvoice({
    type: 'received',
    findBy: 'username',
    username: 'YOUR_ARUBA_USERNAME',
    size: 20
  });
```

## Search for sent invoices

```js
  const invoices = await arubaClient.searchInvoice({
    type: 'sent',
    findBy: 'username',
    username: 'YOUR_ARUBA_USERNAME',
    size: 20
  });
```

## Find a specific invoice by ID

```js
  const invoice = await arubaClient.searchInvoice({
    type: 'sent',
    findBy: 'id',
    id: 'THE_INVOICE_ID'
  });
```

## Complete example

In this example you can see that we are using the `demo` environment provided by Aruba. If you initialize a client without any argument, it will assume it's the production environment, but since we are testing here, we can also point to their demo environment which you should have access to as a customer.

The environment can be selected with the parameter `{ env: demo }` when you initialize a new `ArubaClient`.

```javascript
const ArubaClient = require('fatturazione-elettronica-aruba');

const username = process.env.ARUBA_USERNAME;
const password = process.env.ARUBA_PASSWORD;

(async () => {
  const arubaClient = new ArubaClient({ env: 'demo' });

  const auth = await arubaClient.signIn({ username, password });

  if (auth && auth.error) {
    console.log('Cannot sign in', auth);
  }

  // You are signed in now

  await arubaClient.refreshToken(); // because why not

  // Search for all the invoices sent by my user
  const find = await arubaClient.searchInvoice({
    type: 'sent',
    findBy: 'username',
    username,
    size: 20 // page size
  });

  console.log(find.data.content); // array of invoices
})();
```
