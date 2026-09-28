export interface SendEmailInput {
	to: string;
	subject: string;
	html: string;
}

export interface SendEmail {
	send(input: SendEmailInput): Promise<void>;
}
