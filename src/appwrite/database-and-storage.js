import configurations from "../config/config.js";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Services {
    client = new Client();

    constructor() {
        this.client
            .setEndpoint(configurations.appwriteUrl)
            .setProject(configurations.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    };

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: configurations.appwriteDatabaseId,
                tableId: configurations.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            });
        } catch (error) {
            console.log(`Appwrite Error :: createPost\n${error}`);
        }
    };

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: configurations.appwriteDatabaseId,
                tableId: configurations.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                },
            });
        } catch (error) {
            console.log(`Appwrite Error :: updatePost\n${error}`);
        }
    };

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: configurations.appwriteDatabaseId,
                tableId: configurations.appwriteTableId,
                rowId: slug,
            });

            return true;
        } catch (error) {
            console.log(`Appwrite Error :: deletePost\n${error}`);
            return false;
        }
    };

    async getPost(slug) {
        try {
            return await this.tablesDB.deleteRow({
                databaseId: configurations.appwriteDatabaseId,
                tableId: configurations.appwriteTableId,
                rowId: slug,
            });
        } catch (error) {
            console.log(`Appwrite Error :: getPost\n${error}`);
            return null;
        }
    };

    async getAllPosts(queries=[Query.equal("status", "active")]) {
        try {
            await this.tablesDB.listRows({
                databaseId: configurations.appwriteDatabaseId,
                tableId: configurations.appwriteTableId,
                queries: [ ...queries ],
            });
        } catch (error) {
            console.log(`Appwrite Error :: getAllPosts\n${error}`);
            return null;
        }
    };

    // file related services
    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: configurations.appwriteBucketId,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.log(`Appwrite Error :: uploadFile\n${error}`);
            return null;
        }
    };

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: configurations.appwriteBucketId,
                fileId,
            });

            return true;
        } catch (error) {
            console.log(`Appwrite Error :: deleteFile\n${error}`);
            return false;
        }
    };

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview({
                bucketId: configurations.appwriteBucketId,
                fileId,
            });
        } catch (error) {
            console.log(`Appwrite Error :: getFilePreview\n${error}`);
            return null;
        }
    };
};

const service = new Services();

export default service;
