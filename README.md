# About Apps
Forkify is a recipe web application that allows users to search, view, modify, tag, and add recipes as needed. The application is built using MVC architecture and uses data from the Forkify API. In addition to accessing recipes online, this application also provides information about the number of ingredients needed to make a particular dish according to the number of servings to be made. The application provides the user with:
- Search for any recipe found in the API, where it will throw out all possible recipes for that dish
- If there are more than ten recipes, the recipes will be dynamically transferred to each subsequent page, until there are less than ten on that page
- Click on the desired recipe to view its ingredients
- Calculates the desired number of portions that the user chooses
- If the user likes the recipe, he will be able to save it, where the recipe will be saved in the storage, he will be able to see it every time he visits the application
- There is a possibility to upload a recipe, where the user will have to enter all the necessary ingredients

# Built With
- HTML
- CSS
- SASS
- JavaScript
- Parcel
- Babel
- Forkify API
- Libraries fractional

# Flowchart
![forkify-flowchart-part-3](https://github.com/user-attachments/assets/36e9bece-5c2e-4eab-a926-acf834549d5f)

# Architecture
![forkify-architecture-recipe-loading](https://github.com/user-attachments/assets/3041db00-9010-480b-8526-94cf07f58ab3)

# Documentation
Search Feature
![screencapture-forkifyapps-v2-netlify-app-2025-04-08-12_29_51](https://github.com/user-attachments/assets/efb7ef40-2d4f-4035-85ce-4f260c87e4dc)

Add custom recipe
![screencapture-forkifyapps-v2-netlify-app-2025-04-08-12_34_40](https://github.com/user-attachments/assets/7daf4be9-2016-452b-9259-182dc24e3657)

Recipe Detail View, Pagination System, Servings Adjustment, and Bookmark Recipe
![screencapture-forkifyapps-v2-netlify-app-2025-04-08-12_30_43](https://github.com/user-attachments/assets/fe420fd8-947b-4a32-bedd-afe049166eae)

# References
You can see the documentation for the api here, where you can find all the recipes you can search: Forkify API v2 Documentation.

API References: 
- This function calls the recipes entered by the user
`export const loadSearchResults = async function (query) {...};`
- This function calls a recipe by its ID
`export const loadRecipe = async function (id) {...};`
- Through this function, we transfer the new recipe entered by the user to the server. It checks whether the data entered by the user is correct, if so, it uploads the data to the server
`export const uploadRecipe = async function (newRecipe){...};`
- Every contact with the server takes place through this function, whether you submitted the recipe on the server or requested its access from the server
`export const AJAX = async function (url, uploadData = undefined){...};`

# Getting Started
This project require some prequesites and dependenscies to be installed, you can view it online using this demo. or you can find the instructions below. To get a local copy, follow these simple steps :
1. Clone the repo `git clone https://github.com/ahmedalam98/Forkify.git`
2. Go to project folder `cd forkify`
3. install dependencies `npm install`
4. Run start script `npm start`
