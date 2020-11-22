export {};

declare global {
    namespace Express {
        interface Request {
            // [key: string]: any
            userData: {
                id: number;
                username: string;
                birthday: Date;
                email: string;
                fullName: string;
                phoneNumberObject: string;
                userPicture: string;
                authenticatedProviders: string[];
                accessToken: string;
            };
            user: any;

            token: string;
            avatar?: string;
            story?: string;
        }
    }
}
