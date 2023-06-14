/* This component is used to display the details of the request that is being
created for POSTs and GETs */

/* In order to access the props that we passed down from the parent component(main index.js)
we need to destructure them. First, destructure state from props */
export const RequestDetails = ({ state }) => {
    /* Next, we destrucure all the variables needed from state */
    const { method, path, table, selected_table, query, request_fields } = state;

    /* Creating a new array using the field and values stored on "request_fields" */
    let displayRequest = request_fields.map ( request => {
        return (
            {
                field: request['field'],
                value: request['value']
            }
        )
    })

    return (
        <div>
            <div className='request-url' >{ method } - { path }{ table != '' ? 
                                            selected_table 
                                            : 
                                            "<table>"
                                        }{ query != '' ?
                                            '?sysparm_query=' + query 
                                            : 
                                            ''
                                        } </div>
            {
                {
                    "GET":  '',
                    "POST": <textarea 
                                className ="post-body" 
                                value     =''
                                readonly >
                                    {`{`}
                                    {
                                        displayRequest.map (item => {
                                            return (
                                                `\n   "${item.field}" : "${item.value}"`
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