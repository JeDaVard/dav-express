export {};

declare global {
  namespace Express {
    interface Request {
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

      token: string;
      avatar?: string;
      story?: string;
    }
  }
}
