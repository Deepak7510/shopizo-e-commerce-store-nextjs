import nodemailer, { Transporter } from "nodemailer";

interface SendMailResponse {
    success: boolean;
    message?: string;
}

export const sendMail = async (
    subject: string,
    receiver: string,
    body: string
): Promise<SendMailResponse> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: Number(process.env.NODEMAILER_PORT),
        secure: Number(process.env.NODEMAILER_PORT) === 465, // smart secure config
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
        text: "Please view this email in HTML format.",
    };

    try {
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
