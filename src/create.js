import handler from "./util/handler";
import * as uuid from "uuid";
import AWS from "aws-sdk";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        // The attributes of the item to be created
        userId: "123", // The id of the author
        noteId: uuid.v1(), // A unique uuid
        content: data.content, // Parsed from request body
        attachment: data.attachment, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
      },
    };
  
    await dynamoDb.put(params);
  
    return params.Item;
  });

// export async function main(event) {
//     const data = JSON.parse(event.body);
//     const params = {
//         TableName: process.env.TABLE_NAME,
//         Item: {
//             //attributes of item being created
//             userId: "123",
//             noteId: uuid.v1(),
//             content: data.content,
//             attachment: data.attachment,
//             createdAt: Date.now()
//         },
//     };
//     try {
//         await dynamoDb.put(params).promise();
//         return {
//             statusCode: 200,
//             body: JSON.stringify(params.Item)
//         };
//     } catch (e) {
//         return {
//             statsCode: 500,
//             body: JSON.stringify({error: e.message}),
//         };
//     }
// }