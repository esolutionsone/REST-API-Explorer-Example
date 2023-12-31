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
- [Troubleshooting](#troubleshooting)
    - [Connecting To The Wrong Instance](#connecting-to-the-wrong-instance)
    - [Not Seeing Your Deployed Component On UI Builder](#not-seeing-your-deployed-component-on-ui-builder)
- [SNC Command Cheat Sheet](#snc-command-cheat-sheet)
    - [Most Useful Commands](#most-useful-commands)
    - [SNC Commands](#snc-commands)
    - [UI-Component](#ui-component)
- [Considerations](#considerations)

---

## How to use this component

**Prerequisites**

- sn-cli (Installation for [MacOS](https://creator-dna.com/blog/macos-setup) and [Windows](https://creator-dna.com/blog/1hj866nlrwslzlesekt0c14grhh8u1))
- Python3 (Installation for [MacOS](https://www.python.org/downloads/macos/) and [Windows](https://www.python.org/downloads/windows/))
- Git (Installation for [MacOS](https://git-scm.com/download/mac) and [Windows](https://git-scm.com/download/win))
- VSCode (strongly recommended - Installation found [here](https://code.visualstudio.com/download))

**Getting Started**

1) Ensure all prerequisites are installed by checking their versions using your terminal 
    &rarr; sn-cli : `snc ui-component --version`
    &rarr; Python3 : `python3 --version`
    &rarr; Git : `git --version`

>**NOTE:** If any of those commands are not found, then you will likely need to install them. Follow the links provided in the Prequisites section.

2) Clone this repository `git clone https://github.com/esolutionsone/REST-API-Explorer-Example.git` (to the folder you want to work out of locally)

>**NOTE:** Double check you are in the correct folder before moving on to the next step. "REST-API-Explorer-Example" should be the folder you are in. You can check by looking at your terminal command line to verify.

3) Run `npm install` in your terminal

>**NOTE:** If the **`npm install`** only takes a few seconds, you are most likely in the wrong folder. Change directory **`cd`** into the appropriate folder and retry **`npm install`** command. If you changed into the right folder, you will be waiting a few minutes for all the modules to install.

4) Locate your company code by navigating to `sys_properties.list` in the filter navigator of your ServiceNow instance and searching for the property named `glide.appcreator.company.code`. 

>**NOTE:** For a developer instance, this will likely be a string of numbers! If you're using an organizational instance, it will most likely be a shorthand for your company (for example, ours is esg). 

If you can't find your copmany code, you can try to deploy the component and an error should show the company code. Here's an example of the error when deploying to the wrong Personal Developer Instance:
><span style="color:red"> ERROR in Component tag name "x-853443-testing-project" must start with the vendor prefix "x-71146-"</span>

In this case, 71146 would be the code you enter for scope name!

5) Once you have the company code, run `npm run rename` in your terminal and you will be prompted to enter your scope name. Enter the company code and hit `ENTER` on your keyboard. You will notice a couple files will be updated with the appropriate company code. 


**To run/use this component locally**

6) Run `snc ui-component develop`

>**NOTE:** *You can also use* **`npm run dev`** *as we've created a run dev script in package.json!*
&ensp;
7) Navigate to [http://localhost:8081/](http://localhost:8081/)

>**NOTE:** *Any updates/changes you make to your files locally will be reflected in real-time here!* 🙌

**To deploy this component for use in your ServiceNow instance**

8) Run `snc ui-component deploy`
&ensp;
9) Navigate to *UI Builder* in your *ServiceNow Instance* (Now Experience Framework > UI Builder)
&ensp;
10) Click on the experience you'd like to add the component to OR create an experience with the Portal App Shell
&ensp;
11) Create a new UI Builder Page (or open an existing page to add the component to)
&ensp;
12) Search for `REST API Explorer` in the Components List, Drag and Drop it onto the page, and click save!

**Voilà, your component is deployed to your ServiceNow instance!**

>**NOTE:** *If you make changes to your component down the road, you'll have to redeploy. In our experience this always requires you force deploy your changes.*


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

>**NOTE:** *For a project of this size and complexity we recommend defining a "Components" folder to contain any subcomponents to use in your "core" component, a helpers.js file, and an actionHandlers.js file. The helper file will contain helper functions to be used in your core and sub-components whereas the actionHandler will be used to manage dispatch requests and send REST messages.*
&ensp; 
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
```json
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
```json
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
```json
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
```json
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
```json
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
## Troubleshooting
*Common erros that may occur:*

#### Connecting to the wrong instance

When attempting to `deploy` or `develop`, the cli is trying to connect to the wrong instance. We still don't have an exact answer as to why this happens, but it has happened to us many times. It seems like there is some where that stores the instance URL and tries to use it even though it might not exist in any of your profiles you've created in the cli. Below are some steps we take if it keeps trying to connect to the wrong instance:

A quick fix, hopefully, can be done by using a simple terminal command:
```bash
killall node
```
>**NOTE:** The command **killall node** might just be for MacOS. Windows might have a different command for shutting down any node process that is currently running.

this can help most of the time, but if it doesn't, then try checking the instance assigned to the profile you are using by typing the following into your terminal to see the list of profiles. 
  ```bash
  snc configure profile list
  ```
  a list like this should appear, if you have a couple profiles set, this is how it might look:
  ```json
  {
   "default": {
      "appversion": "",
      "host": "https://<INSTANCE-NAME>.service-now.com",
      "hostversion": "",
      "loginmethod": "basic",
      "output": "json",
      "username": "user.name"
   },
   "new-instance": {
      "appversion": "",
      "host": "https://<INSTANCE-NAME-2>.service-now.com",
      "hostversion": "",
      "loginmethod": "basic",
      "output": "json",
      "username": "admin"
   }
  }
  ```
Check to make sure the instance you are trying to connect to is assigned to one of the profiles on the list. If it is not, add it with this:
```bash
snc configure profile set --profile profile-name
```
make sure to replace profile-name with whatever name you want to name the profile. After verifying that one of your profiles has the instance you are trying to use, try using the --profile command to use the appropriate profile and instance. ex:
```bash
# using the profile from the example list above
snc ui-component develop --profile new-instance
#or
snc ui-component deploy --profile new-instance
```
>**NOTE:** <span style="color:red"> Make sure to use the `killall node` command each time before trying to connect to the instance.</span>

using the `deploy` or `develop` command without the --profile attribute will result in the cli using the default profile. If the cli is still using the wrong instance name after these steps, try refreshing the connection:
```bash
# using the profile from the example list above
snc configure profile refresh --profile new-instance
```
If after refreshing your connection, the cli is still pointing to the wrong instance, there are still a couple more things to try. Next try relogging into the instance you are trying to use:
```bash
# your password should have quotes around it
snc ui-component login {instance_url} basic {username} "{password}"
```
After this, you should try `develop` or `deploy` again. Still seeing that old instance name and not the one you are trying to use? then last thing to try is to delete all of your profiles, even the default one:
```bash
# using the profiles from the example list above
snc configure profile remove --profile new-instance

snc configure profile remove --profile default
```
typing the profile list command should now display an empty list. Set up a new profile like before and then use the `killall node` command again, maybe even restart your VSCode applicaiton just in case. After all that, try the `develop` or `deploy`. With any luck, this should hopefully connect you to the right instance! If you made it this far into troubleshooting your instance connection, I am sorry. 

#### Not seeing your deployed component on UI Builder

After successfully deploying your component, you attempt to use it on UI Builder and you can't find it but someone else with access to your instance can see and use it. This issue has happened a couple times where the one who deployed the component can't seem to find and use the component. A solution that we found to work is to go to your filter navigator in your ServiceNow instance and running `cache.do` then logging out and back into your instance. This should allow you to see your component in UI Builder.

---
## SNC Command Cheat Sheet

#### Most Useful Commands

```bash
# Creates a profile with the name specified
snc configure profile set --profile [profile name]

# Creates a component
# Example
# snc ui-component project --name "REST-API-Explorer" --scope "x_853443_testing_2"
# scope name must be 18 characters or less and snake_case
# default scope name: x_customerprefix_componentname
snc ui-component project --name [name] --scope [scope] --description [description]

# Opens the component in your default browser
snc ui-component develop --open --profile [profile name]

# Deploys the component to your specified profile's instance if you have permissions to do so.
# Force argument is for redeployment
snc ui-component deploy --profile [profile name] --force
```

#### SNC Commands
**Profile**
Commands can be found here -> [Configure and Manage your ServiceNow CLI Profiles](https://docs.servicenow.com/bundle/utah-application-development/page/build/servicenow-cli/task/configure-profile.html)
```bash
# Creates a default profile if no other profile exists
snc configure profile set

# Creates a profile with the name specified
snc configure profile set --profile [profile-name]

# Displays all configured profiles
snc configure profile list

# Removes the configured profile using the name specified
snc configure profile remove --profile [profile-name]

# CLI refreshes the connection for default profile
snc configure profile refresh

# CLI refreshes the connection for named profile
snc configure profile refresh --profile [profile-name]
```

#### UI-Component
Commands can be found here -> [Set Up Project](https://docs.servicenow.com/bundle/utah-application-development/page/build/components/task/setup-component-project.html)
**Development**
```bash
# Will run component using default profile instance. 
snc ui-component develop

# Opens the component in your default browser.
snc ui-component develop --open 

# Runs component using instance associated with named profile.
snc ui-component develop --profile [profile name]

# --open argument opens the component in your default browser
# --profile argument uses instance associated with named profile.
snc ui-component develop --open --profile [profile name]
```
**Deployment**
```bash
# Deploys component to default profile instance.
snc ui-component deploy

# --profile uses named profile's instance if you have permissions to do so.
# --force argument is for redeployment
snc ui-component deploy --profile [profile name] --force
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
