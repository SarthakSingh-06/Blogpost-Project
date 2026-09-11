import configurations from "../config/config.js";
import { Account, Client, ID } from "appwrite";

export class AuthService {
    client = new Client();
    
    constructor() {
        this.client
            .setEndpoint(configurations.appwriteUrl)
            .setProject(configurations.appwriteProjectId);

        this.account = new Account(this.client);
    };

    async createAccount({ email, password, name }) {
        try {
            const newUser = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name,
            });
            if (newUser) {
                // login the user
                return this.login({ email, password });
            }
            else {
                return newUser;
            }
        } catch (error) {
            throw error;
        }
    };

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession({ email, password });
            return session;
        } catch (error) {
            throw error
        }
    };

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Appwrite Error :: getCurrentUser\n ${error}`)
        }
        return null;
    };

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(`Appwrite Error :: logout\n ${error}`)
        }
    }
};

const authService = new AuthService();

export default authService;
