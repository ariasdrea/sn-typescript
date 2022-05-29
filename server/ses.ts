const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV === "production") {
    secrets = process.env;
} else {
    secrets = require("../secrets");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "us-east-1",
});

export const sendEmail = (code: string, recipient: string) => {
    return ses
        .sendEmail({
            Source: "Andrea Arias <ariasdrea@gmail.com>",
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `You have requested a reset in password. Your code is ${code}`,
                    },
                },
                Subject: {
                    Data: `Reset Password`,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err: object) => console.log("err in ses.ts", err));
};
