import * as iam from '@aws-cdk/aws-iam';
import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack{
    //public reference
    auth;
    constructor(scope, id, props) {
        super (scope, id, props);
        const {api, bucket} = props;
        //create a cognito user pool and identity pool
        this.auth= new sst.Auth(this, "Auth", {
            cognito: {
                userPool: {
                    //what we want our users to sign in as identity with
                    signInAliases: {email: true},
                },
            },
        });
        //specifies permissions for what auth users have access to
        this.auth.attachPermissionsForAuthUsers([
            //allow access to the API
            api,
            //policy graning access to a specific folder in bucket
            new iam.PolicyStatement({
                actions:["s3:*"],
                effect: iam.Effect.ALLOW,
                //this represents their ID, so it's basically getting their data
                resources: [bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",]
            }),
        ]);

        //show auth resources in output
        this.addOutputs({
            Region: scope.region,
            UserPoolId: this.auth.cognitoUserPool.userPoolId,
            IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
            UserPoolClientId: this.auth.cognitoUserPoolClient.userPoolClientId,
        });
    }
}