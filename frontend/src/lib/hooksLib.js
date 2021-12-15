/**Custom hooks..Will have to look in more detail later
 * https://serverless-stack.com/chapters/create-a-custom-react-hook-to-handle-form-fields.html
 */

import { useState } from "react";
/**This hook auto sets all state values to what their field values are, depending on if the target id is exactly the same */
const useFormFields = (initialState) => {
    //we get the initial values of the component (in this case, the form fields)
    //  and also the default setValues func from useState
    //we use these to create that custom hook by calling setValues
    // with whatever is passed in by the  component.
    const [fields, setValues] = useState(initialState);
    //console.log(fields);
    return [
        fields,
        (event) => {
            //console.log(event.target.id)
            setValues({
                ...fields,
                //taking the string of the id of event trigger-er which directly corresponds to the field value name (email for example)
                [event.target.id]: event.target.value

            })
        }
    ]
}

export default useFormFields;