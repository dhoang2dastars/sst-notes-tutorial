//We use S3 to store user's attachments
import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    console.log("upload service running")
    const filename = `${Date.now()}-${file.name}`;
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type,
      });
    console.log(stored)
    return stored.key;
}
