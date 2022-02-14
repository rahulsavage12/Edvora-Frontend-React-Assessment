# Edvora-Frontend-React-Assessment
In this assessment, I have created a one-page application that retrieves and shows product details from an API. In addition, I have implemented filters that filter the data based on the product name, state, and city.

**Deployed URL:**
https://edvora-frontend.netlify.app/

![image](https://user-images.githubusercontent.com/45164745/153889420-1db9b443-52b7-4941-972f-441d3b1ff591.png)
 
**_Home.js_**
 
I began with a Parent component Home.js, within which I used react-bootstrap to construct a layout similar to Figma. Filter and Product are child components of the Home component. I created a filter state hook inside Home and passed the set function to the Filter component and the actual state to the Product Component. Data from the API will be fetched using the use effect hook at the start of the render and sent as props to the child components.
 
**_Filter.js_**

The Filter component parses the list of objects returned by the API and extracts unique product names, states, and cities from the json. Using the Map function, the unique values are now rendered into the dropdown list. When a user selects a value from the dropdown, the filter is set using the set function of state hook.

**_Product.js_**

The Product Component takes in the list of product objects and renders it out inside a Carousel component. I have used a highly customizable npm package 'react-elastic-carousel' for building the Carousel. I have also added an event listener that changes the pagination for carousel responsively based on the width of the device.

