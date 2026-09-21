export interface EmailDTO {
    to : string
    subject: string,
    html: string
}

export interface SendEmail{
    send(data:EmailDTO): Promise<void>;
}