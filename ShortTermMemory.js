/**
 * ==========================================================
 * NIKKI SHORT TERM MEMORY
 * ----------------------------------------------------------
 * Responsible For:
 * - Temporary Memory
 * - Current Session
 * - Active Context
 * - Fast Recall
 * ==========================================================
 */

class ShortTermMemory {

    constructor() {

        this.name = "Short Term Memory";

        this.version = "1.0.0";

        this.status = "Offline";

        this.memory = {};

    }

    initialize() {

        this.status = "Online";

        console.log("[ShortTermMemory] Initialized");

    }

    store(key, value) {

        this.memory[key] = {

            value,

            timestamp: Date.now()

        };

        return this.memory[key];

    }

    recall(key) {

        return this.memory[key] || null;

    }

    exists(key) {

        return key in this.memory;

    }

    remove(key) {

        delete this.memory[key];

    }

    clear() {

        this.memory = {};

    }

    list() {

        return this.memory;

    }

    process(data) {

        return this.store(data.key, data.value);

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            storedItems: Object.keys(this.memory).length

        };

    }

    shutdown() {

        this.clear();

        this.status = "Offline";

    }

}

const SHORT_MEMORY = new ShortTermMemory();

export default SHORT_MEMORY;