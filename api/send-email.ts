// api/send-email.ts

import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    console.log('--- New email request received ---');
    if (req.method !== 'POST') {
        console.log('Request method was not POST, it was:', req.method);
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            console.log('Request body finished streaming.');
            const { senderName, senderEmail, category, message } = JSON.parse(body);
            console.log(`Parsed form data: senderEmail=${senderEmail}, category=${category}`);

            // Basic validation
            if (!senderName || !senderEmail || !message) {
                console.error('Validation failed: Missing form fields.');
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Bad Request: Missing form fields.' }));
                return;
            }

            const gmailUser = process.env.GMAIL_USER;
            const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

            if (!gmailUser || !gmailAppPassword) {
                console.error('CRITICAL: Missing GMAIL_USER or GMAIL_APP_PASSWORD env variables.');
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Server configuration error.' }));
                return;
            }
            console.log('Environment variables loaded.');

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser,
                    pass: gmailAppPassword,
                },
            });
            console.log('Nodemailer transporter created.');

            const mailOptions = {
                from: `"${senderName}" <${gmailUser}>`,
                to: gmailUser,
                replyTo: senderEmail,
                subject: `AV enquiry (${category}) from ${senderName}`,
                text: `You have a new message from:
Name: ${senderName}
Email: ${senderEmail}
Category: ${category}

Message:
${message}`,
                html: `<p>You have a new message from:</p>
<ul>
<li><strong>Name:</strong> ${senderName}</li>
<li><strong>Email:</strong> ${senderEmail}</li>
<li><strong>Category:</strong> ${category}</li>
</ul>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>`,
            };

            console.log('Attempting to send email...');
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully! Response info:', info.response);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Email sent successfully' }));

        } catch (error) {
            console.error('--- ERROR SENDING EMAIL ---');
            console.error(error); // Log the full error
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Internal Server Error.' }));
        }
    });
}
