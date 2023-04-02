export class AuthUser {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Token: string;
    RefreshToken?: string;
    tokenExpirary?: any;
}