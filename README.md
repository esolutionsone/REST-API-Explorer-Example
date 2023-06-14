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
- [Helpers & ActionHandlers](#helpers-&-action-handlers)
- [Properties](#properties)
- [Considerations](#considerations)

---

## How to use this component

1) Ensure your sn-cli is configured / installed correctly 
    -> You can review our [Mac OS](https://creator-dna.com/blog/macos-setup) & [Windows OS](https://creator-dna.com/blog/1hj866nlrwslzlesekt0c14grhh8u1) instillation guides
1) Clone this repository `git clone <url here plz>` (to the folder you want to work out of locally)
2) Run `npm install`

**To run / use this component locally**

3) Run `snc ui-component develop`

    *You can also use* `npm run dev` *as we've created a run dev script in package.json!*

4) Navigate to [http://localhost:8081/](http://localhost:8081/)

    *Any updates / changes you make to your files locally will be reflected in real time here!* 🙌

**To deploy this component for use in your ServiceNow instance**

3) Run `snc ui-component deploy`
4) Navigate to *UI Builder* in your *ServiceNow Instance* (Now Experience Framework > UI Builder)
5) Click on the experience you'd like to add the component to OR create an experience with the Portal App Shell
6) Create a new UI Builder Page (or open an existing page you'd like to add the component to)
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
        - x-71146-testing-project    ➜ Our Component (all custom code should be in here)
            - tests                  ➜ Component tests 
            - components             ➜ Folder that holds all sub-components
                - ChoiceInput        ➜ Folder containing all ChoiceInput component files
                - LoadingIcon        ➜ Folder containing all LoadingIcon component files
                - Post Fields        ➜ Folder containing all PostFields component files
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

### Rest API Explorer
text

## Choice Input
The choice input component renders a select / choice box. It is comprised of an index.js & style.css file. The REST API component uses this component handle the Method: GET / POST selection. 

Inputs:
    
    - state
    - updateState
    - label         > String - field display value 
    - name          > String - field name
    - options       > Array  - Select Options / Choices
    - defaultOption > String - Default choice from list of options 

### Post Fields


### Loading Icon

### Response Table
text

### Text Input
textq

### Type Ahead Reference
text 

### User Greeting
text

---

### Helpers & ActionHandlers

**helpers.js**

**actionHandlers.js**

---

### Properties
Properties can be added to your component to allow for In Platform configuration! In this component we have a title, background color, body text color, heading text color, hero image url override, table, and query. These values can be configured in UI Builder to change the styling, header text, and default values for the fields.

Properties can be a string, boolean, choice, JSON, or even table / reference select value. Here are a few examples from the ServiceNow Button component for how properties can be set in the now-ui.json file.

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

    As the goal of this component is split between showing how to do various things in a custom component AND a neat little component to use in your UI builder environment...some things may not be optimal (or may seem completely unnecessary). We've tried to illustrate why we're doing things the way we are inline in each component file. While there may be more optimal / "react-ish" ways to write some of the code, we determined they could be harder to read through and understand for someone new to Custom SN Components / React / Snabdom!


**Ok but if I wanted to make it better how could I?**

    You could break out the form, results, etc. into their own sub-component. You could create a Views folder to contain different views for GET & POST. You could add additonal methods PUT, DELETE, & PATCH (this would require updating the actionHandlers too! How fun 😃). You could make the post fields look up values from the table you are sending the POST to (this would require updating the post fields component to leverage the TypeAheadReference component and would require some actionHandlers work as well). Basically, the world is your oyster. 


**Views**

    This folder could be defined with various views within to display a different view dependent on the state. Views can be an invaluable tool to de-clutter / simplify your core component as it grows in scope or complexity


**Styles**

    This folder could be defined with various style sheets to include in your main style sheet >> This could be a folder where your view styles (and potentially sub-component styles) could be defined >> This could make working with style sheets easier as they're all in one spot!

---