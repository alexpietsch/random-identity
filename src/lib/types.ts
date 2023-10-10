export type EmailMessage = {
    body: string
    date: number
    from: string
    html: string
    ip: string
    subject: string
    to: string
}

export type PasswordOptionsType = {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
    length: number;
}
