# Group 6 - Project Idea & Description

# Group Members

<table>
    <thead>
        <th>Names</th>
        <th>Github</th>
        <th>Email</th>
        <th>Skype</th>
    </thead>
    <tbody>
        <tr>
            <td><b>Andre</b></td>
            <td>abhaseen</td>
            <td>abhaseen@myseneca.ca</td>
            <td>andre_bhaseen@hotmail.com</td>
        </tr>
        <tr>
            <td><b>Jianpeng Zhang</b></td>
            <td>tuidamon</td>
            <td>jzhang296@myseneca.ca</td>
            <td>tuidamon@gmail.com</td>
        </tr>
    </tbody>
</table>

# Project Idea

## Project Description

Our idea is to create a template website for e-commerce. This is useful for small businesses (or even larger ones) to use as a setup for their websites.

This website serves as a basis which will support the expected features and functionalities of a shop site.

The primary functionality will be being able to shop on the website. One can browse the catalogue. After being able to find the product they are looking to purchase, they can add it to their cart. This allows for users to purchase multiple products simultaneously.

Much like an actual store or storefront for a website, users will be greeted to a showcase of products based on a number of factors such as: newest products, highest rated products, deals/discounts and top sellers. As well as a tailored Recommended section based on most purchased products or similar products to previous purchase history.

Additionally, this web app will allow for users to leave reviews/feedback in the form of a 5 star rating scale. Users can also edit their reviews at any time.

Lastly, the store employees can add new products and edit existing old ones. The ratings will not be modifiable by the employees.

## APIs

These are all tentative APIs since some of them are either liscenced or require your app to be verified for this process.

- [Paypal](https://developer.paypal.com/docs/api/overview/)
- [Visa](https://developer.visa.com/)
- [Interac](https://developer.interac.ca/)
- [Shopify](https://shopify.dev/docs/admin-api/rest/reference)
- [Apple Pay](https://developer.apple.com/apple-pay/)
- [Exchange Rates](https://exchangeratesapi.io/): In reality, most companies set regional pricing, but for the sake of simplicity we will just use the exchange rate.

---

## Server Commands

The server is built in Node.js and uses the Express.js framework.

### Server Environment Config

_Important: the database connection string must be specified in a Node.js environment variable._

Locally: use a `.env` file in the `server` directory.

Deployment: Will depend on the hosting service, but will follow the same pattern of `process.env.VARIABLE_NAME`

The script will search for the following:

```js
const db = process.env.MONGODB_URI || process.env.DEV_DB;
```

As an example, the environment variable should be defined as such:

```
DEV_DB="mongodb://localhost/some-db-name"
```

### Create A Mock Database (Development Only)

A utility script has been included to build a mock database from the file `MOCK_DATA.json`. This will only work if the database exists and is empty, otherwise will throw an error.

```
npm run popdb
```

### Start Development Build

This mode uses `nodemon` to automatically restart when changes are detected.

```
npm run dev
```

### Start Production Build

This command may need to be specified if using a hosting service that can run Node.js applications natively.

```
npm run start
```

## Client Commands

The client was bootstraped with `create-react-app`. See [the documentation](https://create-react-app.dev/docs/getting-started/) for more details.

### Start Development Server

```
npm start
```

### Output Production Build

If run locally, the resulting package will be put in a directory called `build` in the root.

This command may need to be specified if using a hosting service that can run Node.js applications natively.

```
npm run build
```
