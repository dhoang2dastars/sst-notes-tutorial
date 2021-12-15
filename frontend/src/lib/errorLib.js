export const onError = (error) => {
    let message = error.toString();
    //Auth errors: if error not an Error obj, and error HAS a message
    if(!(error instanceof Error) && error.message) {
        //...then set the message to that object's message
        message = error.message;
    }
    alert(message);
}
