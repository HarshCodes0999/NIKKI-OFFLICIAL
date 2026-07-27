/**
 * ==========================================================
 * NIKKI API MANAGER
 * ----------------------------------------------------------
 * Responsible For:
 * - API Registration
 * - API Requests
 * - API Key Management
 * - Response Handling
 * ==========================================================
 */

class ApiManager {

    constructor() {

        this.name = "API Manager";

        this.version = "1.0.0";

        this.status = "Offline";

        this.apis = {};

    }

    initialize() {

        this.status = "Online";

        console.log("[ApiManager] Initialized");

    }

    register(name, config) {

        this.apis[name] = config;

        return true;

    }

    get(name) {

        return this.apis[name] || null;

    }

    async request(name, endpoint, options = {}) {

        const api = this.get(name);

        if (!api) {

            return {

                success: false,

                message: "API Not Registered"

            };

        }

        try {

            const response = await fetch(api.baseUrl + endpoint, {

                method: options.method || "GET",

                headers: {

                    "Content-Type": "application/json",

                    ...(api.headers || {}),

                    ...(options.headers || {})

                },

                body: options.body
                    ? JSON.stringify(options.body)
                    : undefined

            });

            const data = await response.json();

            return {

                success: true,

                module: this.name,

                status: response.status,

                data

            };

        } catch (error) {

            return {

                success: false,

                module: this.name,

                error: error.message

            };

        }

    }

    unregister(name) {

        delete this.apis[name];

    }

    list() {

        return Object.keys(this.apis);

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            registeredApis: this.list().length

        };

    }

    shutdown() {

        this.apis = {};

        this.status = "Offline";

    }

}

const API_MANAGER = new ApiManager();

export default API_MANAGER;