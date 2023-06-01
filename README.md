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
    - [Text Input](#text-input)
    - [Choice Input](#choice-input)
    - [TypeAheadReference](#type-ahead-reference)
    - [ResponseTable](#response-table)
- [Considerations](#considerations)

---

## How to use this component
Just use it dog

---

## File structure
The Custom Content for this component is defined in the "src/x-71146-testing-project" folder.

*For a project of this size and complexity we recommend defining a "Components" folder to contain any subcomponents to use in your "core" component, a helpers.js file, and an actionHandlers.js file. The helper file will contain helper functions to be used in your core and sub-components whereas the actionHandler will be used to manage dispatch requests and send REST messages.*

    - src                                 ➜ the source code for our custom component!
        - x-71146-testing-project         ➜ the component (all your custom code should be in here)
            - tests                       ➜ this default component contains the tests, there is a placeholder by default but you could add your tests here!
            - components                  ➜ Create a custom components folder that holds all sub-components
                - ChoiceInput             ➜ 
                - ResponseTable           ➜
                - TextInput               ➜
                - TypeAheadReference      ➜
            - actionHandlers.js           ➜
            - helper.js                   ➜
            - index.js                    ➜
            - styles.scss                 ➜
        - index.js                        ➜



    - src >> 
        - x-71146-testing-project >> the folder where all of our custom component code should be created
            - tests
    index.js file is the "core" component that will be deployed to your ServiceNow instance
    - The Styles.scss file is your main SCSS file *any sub-component SCSS file should be included 
        in this file & core component SCSS can be defined here*
    - The helpers.js file contains functions that the core and sub-components call to handle 
        updates and state changes
    - The actionHandlers.js file contains different action types that are either called within 
        the helpers.js function or from another action type in the action handler

---

## Components
The "Testing Project" Component (ie. the REST API Explorer component) and the sub-components it's comprised of are detailed in this section. 

### Rest API Explorer
text

### Text Input
text

## Choice Input
text

### Type Ahead Reference
text 

### Response Table
text

---

## Considerations

*Other folders that may be included in more complex projects:*

**Views**

This folder could be defined with various views within to display a different view dependent on the state. Views can be an invaluable tool to de-clutter / simplify your core component as it grows in scope or complexity

**Styles**

This folder could be defined with various style sheets to include in your main style sheet >> This could be a folder where your view styles (and potentially sub-component styles) could be defined >> This could make working with style sheets easier as they're all in one spot!

---