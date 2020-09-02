import {IncomingMessage} from "http";

export async function readIncomingMessageData(incomingMessage: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        incomingMessage.setEncoding("utf-8");
        let result = "";
        let chunk: string | null;

        // Handle errors
        incomingMessage.on('error', error => {
            reject(error);
        });

        // Read chunks and return
        incomingMessage.on('readable', () => {
            while (null !== (chunk = incomingMessage.read())) {
                result += chunk;
            }
        });
        incomingMessage.on('end', () => {
            resolve(result);
        });

        // If request already was completed, return all available data immediately
        if (incomingMessage.complete) {
            while (null !== (chunk = incomingMessage.read())) result += chunk;
            resolve(result);
        }

    });
}

export async function readIncomingMessageDataJson(incomingMessage: IncomingMessage): Promise<{} | false> {
    const data: string = await readIncomingMessageData(incomingMessage);
    try {
        return JSON.parse(data);
    } catch (e) {
        return false;
    }
}
