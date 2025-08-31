import nodemailer, { Transporter } from "nodemailer";
import dns from 'dns'

const hasValidDomain = async (email: string): Promise<boolean> => {
    const domain = email.split("@")[1];
    return new Promise((resolve) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

interface SendMailResponse {
    success: boolean;
    message?: string;
}

export const sendMail = async (
    subject: string,
    receiver: string,
    body: string
): Promise<SendMailResponse> => {
    try {

        const domainValid = await hasValidDomain(receiver);

        if (!domainValid) {
            return { success: false, message: "Email domain is not valid." };
        }
        const transporter: Transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: Number(process.env.NODEMAILER_PORT),
            secure: Number(process.env.NODEMAILER_PORT) === 465,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: true,
                minVersion: "TLSv1.2",
            },
        });

        const mailOptions = {
            from: `"Deepak Kumar Yadav" <${process.env.NODEMAILER_EMAIL}>`,
            to: receiver,
            subject,
            html: body,
        };

        await transporter.sendMail(mailOptions);

        return { success: true, message: "Email sent successfully." };
    } catch (error: any) {
        console.error("Email send failed:", error);
        return {
            success: false,
            message: error.message || "Unknown error occurred",
        };
    }
};
