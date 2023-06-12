Component REST API Explorer - EXAMPLE COMPONENT
===============================================

## Intro
This component, lovingly titled "testing-project" 🤔 behind the scenes, should allow you to do rudimentary REST API exploration from within UI Builder...but its **true purpose is to demystify some of the idiosyncrasies of building components in UI Builder!**

This README will describe our **file structure, tips and tricks, and the high-level "how-tos" and "whys" behind how we've built the component** 🙌

**each file is commented in-line** to explain what each component is doing, why, and if there are any considerations!

---

- [Intro](#intro)
- [How to use this Component](#how-to-use-this-component)
- [File structure](#file-structure)
- [Components](#components)
    - [Rest API Explorer](#rest-api-explorer)
    - [Choice Input](#choice-input)
    - [Post Fields](#post-fields)
    - [Response Table](#response-table)
    - [Text Input](#text-input)
    - [TypeAheadReference](#type-ahead-reference)
    - [User Greeting](#user-greeting)
- [Properties](#properties)
- [Considerations](#considerations)

---

## How to use this component
Just use it dog

---

## File structure
    - src                                 ➜ Source code for our custom component!
        - x-71146-testing-project         ➜ Our Component (all custom code should be in here)
            - tests                       ➜ Component tests 
            - components                  ➜ Folder that holds all sub-components
                - ChoiceInput             ➜ Folder containing all ChoiceInput component files
                - Post Fields             ➜ Folder containing all PostFields component files
                - ResponseTable           ➜ Folder containing all ResponseTable component files
                - TextInput               ➜ Folder containing all TextInput component files
                - TypeAheadReference      ➜ Folder containing all TypeAheadReference component files
                - User Greeting           ➜ Folder containing all UserGreeting component files
            - actionHandlers.js           ➜ Our actionHandlers handle dispatches and REST calls!
            - helper.js                   ➜ Our helper handles function calls in click, change, etc.
            - index.js                    ➜ This is our "core component"
            - styles.scss                 ➜ This is our core style sheet
        - index.js                        ➜ Wrapper for your custom component (don't touch 😊)

*For a project of this size and complexity we recommend defining a "Components" folder to contain any subcomponents to use in your "core" component, a helpers.js file, and an actionHandlers.js file. The helper file will contain helper functions to be used in your core and sub-components whereas the actionHandler will be used to manage dispatch requests and send REST messages.*

The Styles.scss file is your main SCSS file *any sub-component SCSS file should be included in this file & core component SCSS can be defined here

---

## Components
The "Testing Project" Component (ie. the REST API Explorer component) and the sub-components it's comprised of are detailed in this section. 

### Rest API Explorer
text

## Choice Input
text

### Post Fields
text

### Response Table
text

### Text Input
text

### Type Ahead Reference
text 

### User Greeting
text

---

### Properties
test

---

## Considerations

*Other folders that may be included in more complex projects:*

**Why did you do that like that?**

As the goal of this component is split between showing how to do various things in a custom component AND a neat little component to use in your UI builder environment...some things may not be optimal (or may seem completely unnecessary). We've tried to illustrate why we're doing things the way we are inline in each component file. While there may be more optimal / "react-ish" ways to write some of the code, we determined they could be harder to read through and understand for someone new to Custom SN Components / React / Snabdom!

**Ok but if I wanted to make it better how could I?**

You could break out the form, results, etc. into their own sub-component. You could create a Views folder to contain different views for GET & POST. You could add additonal methods PUT, DELETE, & PATCH (this would require updating the actionHandlers too! How fun 😃).

**Views**

This folder could be defined with various views within to display a different view dependent on the state. Views can be an invaluable tool to de-clutter / simplify your core component as it grows in scope or complexity

**Styles**

This folder could be defined with various style sheets to include in your main style sheet >> This could be a folder where your view styles (and potentially sub-component styles) could be defined >> This could make working with style sheets easier as they're all in one spot!

---