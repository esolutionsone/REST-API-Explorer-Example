/* This component is used to display the details of the request that is being
created for POSTs and GETs */

/* In order to access the props("state") that we passed down from the parent component(view)
we need to destructure them. */
export const RequestDetails = ({ state }) => {
    /* Next, we destrucure all the variables needed from state */
    const { method, path, table, selectedTable, query, requestFields } = state;

    /* by using template literals, we can create the request url that is displayed below "Request Details:" */
    let requestUrl = `
        ${ method } - ${ path }${ table != '' ? selectedTable : "<table>" }
                               ${ query != '' ? '?sysparm_query=' + query : '' }
    `;
    return (
        <div>
            {/* displaying the request url using variable we created above */}
            <div className='request-url' >{ requestUrl } </div>
            {/* this will dynamically generate the JSON object that will be sent as the post body.
            Using "requestFields", the array that stores each "field" and its "value", we can map
            through it and display each "field" and "value" pair */}
            { /* below we are using what I can only describe as a shorthanded switch statement for jsx.
                it looks at "method" and will render the one that matches.*/
                {
                    "GET":  '',
                    "POST": <textarea 
                                className ="post-body" 
                                value     =''
                                readonly >
                                    {`{`}
                                    {
                                        requestFields.map (item => {
                                            return (
                                                `\n   "${item['field']}" : "${item['value']}"`
                                            )
                                        })
                                    }
                                    {`\n}`}
                            </textarea>
                }[method]
            }
        </div>
    )
}