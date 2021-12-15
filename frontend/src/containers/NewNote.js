import React, { useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
import config from "../config";
import { API } from "aws-amplify";
import { s3Upload } from "../lib/awsLib";
import "./NewNote.css"
//-------------


const NewNote = () => {
    const file = useRef(null);
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => content.length > 0;

    const handleFileChange = (event) => {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if(file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`File size is greater than ${config.MAX_ATTACHMENT_SIZE / 100000} MB.`);
            return;
        }
        setIsLoading(true);
        try {
            const attachment = file.current ? await s3Upload(file.current) : null;

            await createNote({content, attachment});
            navigate("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    const createNote = (note) => {        
        return API.post("notes", "/notes", {
            body: note,
        });
    }

    return (
        <div className="NewNote">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlid="content">
                    <Form.Control
                        value={content}
                        as="textarea"
                        onChange={(e)=> setContent(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="file">
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <LoaderButton
                    block
                    type="submit"
                    size="lg"
                    variant="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    >Create
                </LoaderButton>
            </Form>
        </div>
    )
}

export default NewNote;