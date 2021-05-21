import * as React from 'react';
import { Editor } from '@tinymce/tinymce-react';
const { REACT_APP_TINY_MCE_API_KEY } = process.env;

function TextEditor({ setInput, input }) {

    function handleInputChange(e) {
        setInput({
            ...input,
            answer: e.target.innerHTML
        })
    }

    return (
        <Editor
            apiKey={REACT_APP_TINY_MCE_API_KEY}
            onKeyDown={(e) => handleInputChange(e)}
            init={{
                selector: 'textarea',
                branding: false,
                menubar: false,
                placeholder: 'Answer',
                width: 500,
                toolbar:
                    'undo redo | bold italic | \
                            alignleft aligncenter alignright | \
                            bullist numlist outdent indent'
            }}
        />
    )
}

export default TextEditor;