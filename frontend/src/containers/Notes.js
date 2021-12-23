import React, {useRef, useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {API, Storage} from 'aws-amplify';
import { onError } from '../lib/errorLib';
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";
import { s3Upload } from '../lib/awsLib';


const Notes = () => {
    const file = useRef(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect( () => {
            const loadNote = () => (API.get("notes",`/notes/${id}`))
            const onLoad = async()=> {
                try {
                    const note = await loadNote();
                    const {content, attachment} = note;
                    if(attachment) {
                        note.attachmentURL = await Storage.vault.get(attachment)
                    }
                    setContent(content);
                    setNote(note);
                } catch (e) {
                    onError(e);
                }
            }
            onLoad();  
        }, [id]
    )

    const validateForm = () => {
        return content.length > 0;
    }
    const formatFileName =(str) => {
        return str.replace(/^\w+-/, "");
    }
    const handleFileChange= (event) => {
        file.current = event.target.files[0];
    }
    const saveNote = (note) =>  {
        return API.put("notes", `/notes/${id}`, {body: note});
    }
    //D'oh, make sure you double check your slashes!
    const deleteNote = ()=> {
        const res = API.del("notes", `/notes/${id}`)
        console.log(res);
        return res;
    }

    //TODO: delete old attachment
    const handleSubmit = async (event) => {
        let attachment;
        event.preventDefault();

        if(file.current && file.current.size > config.MAX_ATTACHMENT_SIZE){
            alert(`File size exceeds the maximum of ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
            return;
        }
        setIsLoading(true);

        try {
            console.log('attemping to save note on frontend')
            if(file.current) {
                attachment =  await s3Upload(file.current);

            }
            await saveNote({
                content, 
                attachment: attachment ||note.attachment
            });
            navigate('/');
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const confirmed = window.confirm("Are you sure you don't not want to not negative delete this note'nt?");
        if(!confirmed) {
            return;
        }
        setIsDeleting(true);
        try {
            console.log("attempting to delete on frontend")
            await deleteNote();
            navigate("/");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }

    return(
        <div className='Notes'>
        {/*render if there is a note*/}
        {note && (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='contenr'>
                    <Form.Control
                        as="textarea"
                        value={content}
                        onChange={(e)=> setContent(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='file'>
                    <Form.Label>Attachment</Form.Label>
                {note.attachment && (
                    <p>
                        <a target="-blank"
                        rel="noopener noreferrer"
                        href={note.attachmentURL}>
                            {formatFileName(note.attachment)}
                        </a>
                    </p>
                )}
                    <Form.Control onChange={handleFileChange} type="file"/>
                </Form.Group>
                <LoaderButton
                    block
                    size="lg"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Save
                </LoaderButton>
                <LoaderButton
                    block
                    size="lg"
                    variant="danger"
                    onClick={handleDelete}
                    isLoading={isDeleting}
                >
                    Delete
                    </LoaderButton>
            </Form>
        )}
        </div>
    )
}

export default Notes;