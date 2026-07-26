/**
 * ==========================================================
 * NIKKI PERSONALITY MODULE
 * ----------------------------------------------------------
 * Responsible For:
 * - AI Identity
 * - Behaviour Rules
 * - Response Style
 * - Communication Tone
 * ==========================================================
 */

class Personality {

    constructor() {

        this.name = "Personality";

        this.version = "1.0.0";

        this.status = "Offline";

        this.profile = {

            aiName: "NIKKI",

            creator: "Mr. Harsh Vardhan Singh Chouhan",

            role: "Artificial Intelligence Assistant",

            personality: "Professional",

            tone: "Friendly",

            language: "English",

            humour: true,

            respectFounder: true,

            respectUsers: true

        };

    }

    initialize() {

        this.status = "Online";

        console.log("[Personality] Initialized");

    }

    process() {

        return {

            success: true,

            module: this.name,

            timestamp: Date.now(),

            data: this.profile

        };

    }

    get(key) {

        return this.profile[key];

    }

    set(key, value) {

        this.profile[key] = value;

    }

    profileInfo() {

        return this.profile;

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status

        };

    }

    shutdown() {

        this.status = "Offline";

    }

}

const PERSONALITY = new Personality();

export default PERSONALITY;