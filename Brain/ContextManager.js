/**
 * ==========================================================
 * NIKKI CONTEXT MANAGER
 * ----------------------------------------------------------
 * Responsible For:
 * - Managing Conversation Context
 * - Tracking Current Session
 * - Storing Recent Messages
 * - Providing Active Context
 * ==========================================================
 */

class ContextManager {

    constructor() {

        this.name = "Context Manager";

        this.version = "1.0.0";

        this.status = "Offline";

        this.session = [];

        this.maxContext = 20;

    }

    initialize() {

        this.status = "Online";

        console.log("[ContextManager] Initialized");

    }

    process(message) {

        return this.add(message);

    }

    add(message) {

        this.session.push({

            timestamp: Date.now(),

            ...message

        });

        if(this.session.length > this.maxContext){

            this.session.shift();

        }

        return {

            success: true,

            module: this.name,

            data: this.session

        };

    }

    latest() {

        if(this.session.length === 0){

            return null;

        }

        return this.session[this.session.length - 1];

    }

    history() {

        return this.session;

    }

    clear() {

        this.session = [];

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            messages: this.session.length

        };

    }

    shutdown() {

        this.clear();

        this.status = "Offline";

    }

}

const CONTEXT = new ContextManager();

export default CONTEXT;