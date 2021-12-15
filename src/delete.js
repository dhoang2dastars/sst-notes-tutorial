import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event)=> {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: event.pathParameters.id,
        },
    };
    console.log("running delete in lambda");

    const res = await dynamoDb.delete(params);
    console.log(res);
    return {status: true};
});