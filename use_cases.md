# Making a Purchase While Not Logged In (Done by Andre)

## Actor (Un-registered User)

A "guest" user who is browsing the site and service intending to make a purchase.

## Pre-conditions

None - must be on webpage.

## Main Flow

1. The user is on the homepage which allows you to browse the catalogue. They choose where to go from here.
2. The system loads it's main page which will allow the user to see what they want to purchase
3. The user clicks on a product.
4. System displays info about the product including, price, rating and other information. There will also be an option to add to cart.
5. User adds item to cart
- **Steps 3-5 will be repeated til user has all the items they were looking to purchase**
6. User goes to cart
7. System displays all items in user's cart
8. User clicks *Checkout* which will prompt them to a payment page *Note that the user cannot save payment information on website - will be done through a 3rd party service.
9. System acknowledges successful payment

## Alternate Flows
- If user logs in before payment, their main flow will be different and more accurate to the one below.
    - After step 7, the user will also be prompted to login if they already have an account or will be given the option to continue without an account.
- If user decides to cancel payment or errors in payment
    - During step 8, if the user decides to cancel the payment, a canceled payment message will be sent back. Same for any errors during payment.

## Post Conditions

After a user has successfully made a payment they will be given a success message. However, since they are not registered, the purchase will not be saved to any account, nor can it be added after they create one.

# Registered User Making a Purchase (Done by Andre)

## Actor (Registered User)

A user who is logged in and registerd on the website and intending to make a purchase

## Preconditions

User is logged in.

## Main Flow

1. User is greeted to the main page where the *Recomended For You* section is tailored specifically to the users past purchases (similar products) - or if the user has no previous purchases it will display the top selling products by default. They choose where to go from here.
2. System renders main page which will show user what they want to purchase.
3. User clicks on item in catalogue.
4. System displays information about the product in the catalogue as well as an option to add the product to cart.
5. The registered user has the option to leave a review on the item if they have previously purchased it. The user clicks on the *Add To Cart* button.
- **Steps 3-5 can be repeated as many times as the user needs to satisfy their shopping requirements**
6. User goes to cart
7. System displays all the items in the cart as well as an option to checkout.
8. User clicks on *Checkout* option. This will redirect them to the third party payment.
9. User is given a successful payment message.
10. User is given an option to leave review based on purchased product. The recommended products will also compare against the newly purchased item as well.

## Alternate Flows

- The user can log in at anytime before Step 8.
    - If this is the case, the item will be saved to their account upon checkout.
- The user decides to cancel payment or there are payment errors
    - During step 8, if the user decides to cancel the payment, a canceled payment message will be sent back. Same for any errors during payment.

## Post Conditions

After a user has successfully made a payment, the item will be added to the list of purchases the user has made. The user can then go on to make reviews for the item they purchased. Additionally, their recommended list will be tailored accordingly based on their new purchase.

# User that leaves a review (Done by Damon)

## Actor (Registered User)

A member who wants to leave a comment.

## Pre-conditions

User must be logged in

## Main Flow

1. The user is on the homepage.
2. The user searches the product he/she want to comment.
3. The system returns the list of related products.
4. The user clicks on one of the product.
5. The user is on the detail page of the product which allows you to browse the pictures, overview, recommendation, rating, etc.
6. The user clicks on the "Write a review" button.
7. System redirects the page to the review section or pop up a dialog.
8. User fills up the information for rating, title, review detail, etc.
9. User clicks on the submit button.
10. The review is added into the review list of the product.

## Alternate Flows
- If user logs in before comment, their nickname will be passed to the review page.
    

## Post Conditions

After a user has successfully submit a review they will be given a notification of success. If the user is logged in, the review will be stored in their history, or it will just return to the home page.


# Employee that restocks item (Done by Damon)
## Actor (Employee)

An employee who manages the inventory

## Preconditions

The employee must be logged in.

## Main Flow

1. User is on the home page.
2. User clicks on the "Inventory" button to check the inventory.
3. The system returns a list of all inventories.
4. The user checks the inventory list to see which items are running low.
5. The user selects the product to be stocked.
6. The user places an order with the merchant.
- **The order arrived a few days later**
7. The user tells the system that the products have been replenished by setting the number of inventoory.
8. The system returns a notification of success or failure.

## Alternate Flows

- Parts of the order may be assigned to other employees.
- Receiving products may also be shared among other employees

## Post Conditions

The inventory/stock value of the product is updated. If the button was disabled because it was out of stock, it will now be updated. 
