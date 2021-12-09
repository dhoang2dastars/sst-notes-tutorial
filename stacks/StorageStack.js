import * as sst from "@serverless-stack/resources";


export default class StorageStack extends sst.Stack {
    //Public reference to the table
    bucket;
    table;
    constructor(scope, id, props) {
        super(scope, id, props);
        //prepare for CORS in uploads
        //this.bucket = new sst.Bucket(this, "Uploads")
        this.bucket = new sst.Bucket(this, "Uploads", {
            s3Bucket: {
                cors: [
                    {
                        maxAge: 3000,
                        allowedOrigins: ["8"],
                        allowedHeaders: ["*"],
                        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                    },
                ],
            },
        });
        this.table = new sst.Table(this, "Notes", {
            fields: {
                userId: sst.TableFieldType.STRING,
                noteId: sst.TableFieldType.STRING,
            },
            primaryIndex: {partitionKey: "userId", sortKey:"noteId"}
        });
    }
}