Component REST API Explorer - EXAMPLE COMPONENT
===============================================

## Intro
This component, lovingly titled "testing-project" 🤔 behind the scenes, should allow you to do rudimentary REST API exploration from within UI Builder...but its **true purpose is to demystify some of the idiosyncrasies of building components in UI Builder!**

This README will describe our **file structure, tips and tricks, and the high-level "how-tos" and "whys" behind how we've built the component** 🙌

**Each file is commented in-line** to explain what each component is doing, why, and if there are any considerations!

---

- [Intro](#intro)
- [How to use this Component](#how-to-use-this-component)
- [File structure](#file-structure)
- [Components](#components)
    - [Rest API Explorer](#rest-api-explorer)
    - [Choice Input](#choice-input)
    - [Post Fields](#post-fields)
    - [Request Details](#request-details)
    - [Response Table](#response-table)
    - [Record](#record)
    - [Text Input](#text-input)
    - [TypeAheadReference](#type-ahead-reference)
    - [User Greeting](#user-greeting)
- [Helpers and ActionHandlers](#helpers-and-actionhandlers)
- [Properties](#properties)
- [Considerations](#considerations)

---

## How to use this component

1) Ensure your sn-cli is configured/installed correctly 
    -> You can review our [Mac OS](https://creator-dna.com/blog/macos-setup) & [Windows OS](https://creator-dna.com/blog/1hj866nlrwslzlesekt0c14grhh8u1) instillation guides
1) Clone this repository `git clone <url here plz>` (to the folder you want to work out of locally)
2) Run `npm install`

**To run/use this component locally**

3) Run `snc ui-component develop`

    *You can also use* `npm run dev` *as we've created a run dev script in package.json!*

4) Navigate to [http://localhost:8081/](http://localhost:8081/)

    *Any updates/changes you make to your files locally will be reflected in real-time here!* 🙌

**To deploy this component for use in your ServiceNow instance**

3) Run `snc ui-component deploy`
4) Navigate to *UI Builder* in your *ServiceNow Instance* (Now Experience Framework > UI Builder)
5) Click on the experience you'd like to add the component to OR create an experience with the Portal App Shell
6) Create a new UI Builder Page (or open an existing page to add the component to)
7) Search for `<update with component name>` in the Components List, Drag and Drop it onto the page, and click save!

**Voilà, your component is deployed to your ServiceNow instance!**

*(If you make changes to your component down the road, you'll have to redeploy. In our experience this always requires you force deploy your changes.)*


**Assumptions**

    - now-cli config is setup / configured
    - You have an instance to leverage (developer, demo, or organizational sandbox)
    - You know (at a high level) how to read "react-ish" code and how to think "react-ively"
    - You have some experience with UI Builder config
    - Your now-cli profile is pointed at your desired instance for testing this component out!

---

## File structure
    - src                            ➜ Source code for our custom component!
        - x-853443-testing-project    ➜ Our Component (all custom code should be in here)
            - tests                  ➜ Component tests 
            - components             ➜ Folder that holds all sub-components
                - ChoiceInput        ➜ Folder containing all ChoiceInput component files
                - LoadingIcon        ➜ Folder containing all LoadingIcon component files
                - Post Fields        ➜ Folder containing all PostFields component files
                - RequestDetails     ➜ Folder containing all REquestDetails component files
                - ResponseTable      ➜ Folder containing all ResponseTable component files
                - TextInput          ➜ Folder containing all TextInput component files
                - TypeAheadReference ➜ Folder containing all TypeAheadReference component files
                - User Greeting      ➜ Folder containing all UserGreeting component files
            - actionHandlers.js      ➜ Our actionHandlers handle dispatches and REST calls!
            - helper.js              ➜ Our helper handles function calls in click, change, etc.
            - index.js               ➜ This is our "core component"
            - styles.scss            ➜ This is our core style sheet
        - index.js                   ➜ Wrapper for your custom component (don't touch 😊)
    - now-ui.json                    ➜ Add properties to configure the Component in UI Builder here
    - package.json                   ➜ Can add dependencies & scripts to make dev easier here

*For a project of this size and complexity we recommend defining a "Components" folder to contain any subcomponents to use in your "core" component, a helpers.js file, and an actionHandlers.js file. The helper file will contain helper functions to be used in your core and sub-components whereas the actionHandler will be used to manage dispatch requests and send REST messages.*

*There are other files in a default component file structure (such as now-cli.json, package-lock.json, etc.) but you'll generally not need to touch those.*

The Styles.scss file is your main SCSS file *any sub-component SCSS file should be included in this file & core component SCSS can be defined here

---

## Components
The "Testing Project" Component (ie. the REST API Explorer component) and the sub-components it's comprised of are detailed in this section. 

## Rest API Explorer
This is the "parent" component! It's what is selectable in UI Builder, it leverages all of the sub-components below, and it sets up the key information like initial state, properties, etc. This is comprised of the index.js and styles.scss files in the src directory. 

## Choice Input
The choice input component renders a select / choice box. It is comprised of an index.js & style.css file. The REST API component uses this component to handle the Method: GET / POST selection. To properly leverage this component, it should be nested within a `<form>` tag.

Inputs:
    
    - state
    - updateState
    - label         > String - field display value 
    - name          > String - field name
    - options       > Array  - Select Options / Choices
    - defaultOption > String - Default choice from the list of options 

## Post Fields
The post fields component renders a field/value REST body builder for the post request. This will dynamically build your rest body, will allow you to add any number of field + value pairs, and will allow you to remove a row with the trash can (after you have more than 1 row). This component can be seen at the bottom of the form when POST is the selected method. To properly leverage this component, it should be nested within a `<form>` tag.
*This component leverages the Text Input component to create the post fields*

Inputs: 

    - state
    - updateState

## Loading Icon
The loading icon component renders a loading spinner and is displayed used while the component itself is loading and when records are being fetched. It's comprised of the LoadingIcon.js and LoadingIcon.scss files. To properly leverage this component you'll have to set up a loading state in your component with logic to display the loading icon when the loading state is true and the component when the loading state is false. 

Inputs:

  - style > String - used to set the background color, scale, etc. of the loading spinner

## Request Details
The Request Details component renders the URL that is dynamically built based on user inputs. It also checks what REST method is being used, if POST is chosen, then component will render a POST body that displays all the field and value pairs being sent in the request.

Inputs:

    - state

## Response Table
The Response Table component will take care of the response from the GET request. The state variable "results" holds the response array recieved after a successful GET request. This component can deal with multiple records and display each one by iterating through "results" array with array.map() function. Each record will return the record component that takes in key, state, updateState, and record as a prop. 
*This component leverages the Record component to display a record on the DOM*

Inputs:

    - state
    - updateState

## Record
the Record component is used to display a single record that is passed down as a prop. Each record it takes in will use the "displayField" that the user inputs to display a header. When clicked, it will also render a JSON object that contains the record that was passed to the component.

Inputs:

    - key    > Integer - unique number assigned to each record
    - state
    - updateState
    - record > Object - holds details used to display 

## Text Input
The text input component renders an input field to be used in a form. This is used in the REST API explorer component to capture the path, display field, query, and all of the post fields in the PostFields component. It's comprised of an index.js and style.scss. To properly leverage this component, it should be nested within a `<form>` tag.

Inputs:

    - state       
    - updateState 
    - label       > String - field display value
    - name        > String - field name
    - placeholder > String - placeholder value in the input field
    - value       > String - (optional with a default of '') value of the input field

## Type Ahead Reference
The type ahead reference component renders a lookup select/reference field. This is used in the REST API explorer component to capture the user table selection. It's comprised of  Index.js and style.scss. This component leverages the helper to fetch records from your ServiceNow instance. The function call is wrapped in a debounce function to reduce the calls to the server. To add/leverage this component an "options" array (similar to tables in our state) would need to be created and a function (similar to selectTable in our helpers file) would need to be created to set the value on select. To properly leverage this component, it should be nested within a `<form>` tag.

Inputs: 

    - updateState
    - state
    - dispatch
    - label    > String - field display value
    - name     > String - field name
    - table    > String - the name of the table to fetch the values from for the lookup

## User Greeting
The user greeting component renders `Hello, <User first and last name>` and can be seen under the heading text. This component fetches the user details on Bootstrap and is largely included to show you how to fetch details on Bootstrap! 

Inputs:

    - state

---

## Helpers and ActionHandlers


## helpers.js
**dropDownClicked**

    Will either add the clicked records index to showJson or remove it from showJson. Called from the 
    Record component which is a subcomponent of the Response Table component. This handles the 
    opening/closing of the json details of the response.

**setApiValue**

    Sets values for the POST or GET request. It handles setting the form values, post field values, 
    and methods. It's called from the Choice Input & Text Input components. 


**fetchValues**

    Calls the ProcessFetch function to fetch table values, it also leverages the debounce function to
    limit the calls it makes to the server. If the value is an empty string it will reset the state of 
    the lookup field. This is leveraged by the Type Ahead Reference component.


**sendRest**

    Handles the POST and GET requests and sends the dispatch requests to make REST API requests to your 
    ServiceNow instance. It also handles (simple) form validation and will enforce mandatory fields. 
    This also leverages the debounce function to limit the calls it makes to the server. If the mandatory 
    fields check passes the processREST function will be called. 

**updateRowFields**

    Adds / Removes rows for the Post Fields component. It dynamically adds fields by incrementing the 
    index number and also handles updating the state object that the fields are stored in. This is 
    called each time the plus or trash can buttons are clicked on the  Post Fields component. 

**processFetch**

    Called by the fetchValues function. It sends the dispatch "FETCH_VALUES" to the actionHandlers 
    with the required inputs. 

**processREST**

    Determines if it is a GET or POST request and sends the appropriate dispatch "REST_GET" or "REST_POST" 
    to the actionHandlers with the required inputs. This function is called by the sendRest function.

**selectValue**

    Called by the Type Ahead Reference component and will call the function to update the state for the 
    specific type ahead in question. In this case, there is only one function to call (selectTable).

**selectTable**

    Called by selectValue function. Updates the state to select a specific table.

**debounce**

    Leveraged by the fetchValues and sendRest functions to limit the calls each function makes to the server. 
    For the fetchValues function it limits the number of lookups as it would continually look up with each 
    keypress and for the sendRest it limits multiple lookups if a user spam clicks the send button. 



## actionHandlers.js
**COMPONENT_BOOTSTRAPPED**

    Calls the GET_USER action when the component is Bootstrapped

**REST_GET**

    Send a REST GET Message leveraging the table api to your ServiceNow instance with the provided arguments. 
    On success, it calls the GET_RESPONSE_VALUE function and on failure, it calls the LOG_ERROR function. 
    Called by the ProcessRest function in helpers. 

**REST_POST**

    Send a REST POST Message leveraging the table API to your ServiceNow instance with the provided arguments 
    and request body. On success, call the POST_RESPONSE_VALUE function. On failure, call the LOG_ERROR function. 
    Called by the ProcessRest function in helpers.  
 
**FETCH_VALUES**

    Send a REST GET Message to your ServiceNow instance with the provided arguments. On success, call the 
    SET_TABLES_VALUE function. On failure, call the LOG_ERROR function. Called by the ProcessFetch function in helpers. 

**GET_USER**

    Send a REST GET Message leveraging the table API to your ServiceNow with the provided arguments to fetch 
    the currently logged-in user. On success, call the SET_USER_ID function. On failure call the LOG_ERROR function. 
    Called by the COMPONENT_BOOTSTRAPPED action.

**SET_TABLES_VALUE**

    Sets the value of "tables" in state from the REST response value sent in the FETCH_VALUES action.

**GET_RESPONSE_VALE**

    Sets the value of "results" from the REST response value sent in the REST_GET action and sets "loading" 
    to false in state.

**POST_RESPONSE_VALUE**

    Sets the value of "post_response" from the REST response value sent in the REST_POST action and sets 
    "loading" to false in state.

**SET_USER_ID**

    Sets the value of "user" from the REST response value sent in the GET_USER action and sets "loading" to false 
    in state. 

**LOG_ERROR**

    Console logs errors for any actions that encounter issues in processing. Prints the error message and data from 
    the payload. 
    
---

### Properties
Properties can be added to your component to allow for In Platform configuration! In this component, we have a title, background color, body text color, heading text color, hero image url override, table, and query. These values can be configured in UI Builder to change the styling, header text, and default values for the fields.

Properties can be a string, boolean, choice, JSON, or even table/reference select value. Here are a few examples from the ServiceNow Button component and this component for how properties can be set in the now-ui.json file.

*Choice*
```
  {
    "defaultValue": "navigation",
    "description": "Sets the button style",
    "fieldType": "choice",
    "label": "Variant",
    "name": "variant",
    "readOnly": false,
    "required": false,
    "selectable": false,
    "typeMetadata": {
      "choices": [
        {
          "label": "Primary",
          "value": "primary"
        },
        {
          "label": "Navigation",
          "value": "navigation"
        },
        {
          "label": "Add Record",
          "value": "add-record"
        }
      ],
      "schema": {
        "type": "string",
        "enum": ["primary", "navigation", "add-record"]
      }
    }
  }
```

*String*
```
  {
    "defaultValue": "Button",
    "description": "Text displayed inside the button",
    "fieldType": "string",
    "label": "Label",
    "name": "label",
    "readOnly": false,
    "required": true,
    "selectable": false,
    "typeMetadata": {
      "translatable": true,
      "schema": {
        "type": "string"
      }
    }
  }
```

*Boolean*
```
  {
    "defaultValue": false,
    "description": "When true, disables user click interactions",
    "fieldType": "boolean",
    "label": "Disabled",
    "name": "disabled",
    "readOnly": false,
    "required": false,
    "selectable": false,
    "typeMetadata": {
      "schema": {
        "type": "boolean"
      }
    }
  }
```

*Table Lookup*
```
  {
    "name": "table",
    "label": "Table",
    "fieldType": "table_name",
    "readOnly": false,
    "defaultValue": "",
    "description": "Select the table data to display in the list.",
    "selectable": false,
    "valueType": "string",
    "mandatory": true
  }
```
*JSON*
```
  {
    "defaultValue": "{}",
    "description": "Configures ARIA properties",
    "fieldType": "json",
    "label": "ARIA properties",
    "name": "configAria",
    "readOnly": false,
    "required": false,
    "selectable": false,
    "typeMetadata": {
      "schema": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "button": {
                "type": "object",
                "properties": {
                  "aria-braillelabel": {
                    "type": "string",
                    "translatable": true
                  },
                  "aria-brailleroledescription": {
                    "type": "string",
                    "translatable": true
                  },
                  "aria-colindextext": {
                    "type": "string",
                    "translatable": true
                  },
                  "aria-description": {
                    "type": "string",
                    "translatable": true
                  },
                  "aria-label": {
                    "type": "string",
                    "translatable": true
                  },
                  "aria-placeholder": {
                    "type": "string",
                    "translatable": true
                  },
                  "aria-roledescription": {
                    "type": "string",
                    "translatable": true
                  },
                  "aria-rowindextext": {
                    "type": "string",
                    "translatable": true
                  },
                  "aria-valuetext": {
                    "type": "string",
                    "translatable": true
                  }
                },
                "patternProperties": {
                  "^aria-": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              }
            },
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "aria-braillelabel": {
                "type": "string",
                "translatable": true
              },
              "aria-brailleroledescription": {
                "type": "string",
                "translatable": true
              },
              "aria-colindextext": {
                "type": "string",
                "translatable": true
              },
              "aria-description": {
                "type": "string",
                "translatable": true
              },
              "aria-label": {
                "type": "string",
                "translatable": true
              },
              "aria-placeholder": {
                "type": "string",
                "translatable": true
              },
              "aria-roledescription": {
                "type": "string",
                "translatable": true
              },
              "aria-rowindextext": {
                "type": "string",
                "translatable": true
              },
              "aria-valuetext": {
                "type": "string",
                "translatable": true
              }
            },
            "patternProperties": {
              "^aria-": {
                "type": "string"
              }
            },
            "additionalProperties": false
          }
        ]
      }
    }
  }
```


---

## Considerations

*Other folders that may be included in more complex projects:*

**Why did you do that like that?**

    As the goal of this component is split between showing how to do various things in a custom 
    component AND a neat little component to use in your UI builder environment...some things may 
    not be optimal (or may seem completely unnecessary). We've tried to illustrate why we're doing 
    things the way we are inline in each component file. While there may be more optimal / "react-ish" 
    ways to write some of the code, we determined they could be harder to read through and understand 
    for someone new to Custom SN Components / React / Snabdom!


**Ok but if I wanted to make it better how could I?**

    You could break out the form, results, etc. into their own sub-components. You could create a Views 
    folder to contain different views for GET & POST. You could add additional methods PUT, DELETE, 
    & PATCH (this would require updating the actionHandlers too! How fun 😃). You could make the 
    post fields lookup values from the table you are sending the POST to (this would require updating 
    the post fields component to leverage the TypeAheadReference component and would require some 
    actionHandlers work as well). The world is your oyster. 


**Views**

    This folder could be defined with various views within to display a different view dependent on the
    state. Views can be an invaluable tool to de-clutter / simplify your core component as it grows in 
    scope or complexity


**Styles**

    This folder could be defined with various style sheets to include in your main style sheet >> This 
    could be a folder where your view styles (and potentially sub-component styles) could be 
    defined >> This could make working with style sheets easier as they're all in one spot!

---