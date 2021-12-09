import handler from './util/handler';
import dynamoDb from './util/dynamodb'

export const main = handler (async (event) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        //Key defines the partition key and sort key of item to be udated
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
        //defines the attributes to be updated
        UpdateExpression: "SET content = :content, attachment = :attachment",
        //defines the values in the update expression
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },
        //specifies if and how to return the item's attributes. Here, ALL_NEW returns all attributes
        // of the item after the update.
        ReturnValues: "ALL_NEW",
    };
    await dynamoDb.update(params);
    return  {status: true};
})