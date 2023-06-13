export const RequestDetails = ({ state }) => {
    const { method, path, table, selected_table, query, request_fields } = state;

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