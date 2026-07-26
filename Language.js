/**
 * ==========================================================
 * NIKKI LANGUAGE MODULE
 * ----------------------------------------------------------
 * Responsible for:
 * - Understanding user input
 * - Detecting intent
 * - Extracting target
 * - Returning structured data
 * ==========================================================
 */

class LanguageModule {

    constructor() {

        this.name = "Language";

        this.version = "1.0.0";

        this.status = "Offline";

    }

    initialize() {

        this.status = "Online";

        console.log("[Language] Initialized");

    }

    process(input) {

        const text = input.trim();

        const lower = text.toLowerCase();

        let intent = "CHAT";
        let target = null;
        let confidence = 80;

        // -----------------------------
        // Open Commands
        // -----------------------------
        if (lower.startsWith("open ")) {

            intent = "OPEN_APP";

            target = text.substring(5).trim();

            confidence = 98;

        }

        // -----------------------------
        // Play Commands
        // -----------------------------
        else if (lower.startsWith("play ")) {

            intent = "PLAY_MEDIA";

            target = text.substring(5).trim();

            confidence = 97;

        }

        // -----------------------------
        // Search Commands
        // -----------------------------
        else if (lower.startsWith("search ")) {

            intent = "SEARCH";

            target = text.substring(7).trim();

            confidence = 96;

        }

        return {

            success: true,

            input: text,

            intent,

            target,

            confidence,

            module: this.name,

            timestamp: Date.now()

        };

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

const LANGUAGE = new LanguageModule();

export default LANGUAGE;