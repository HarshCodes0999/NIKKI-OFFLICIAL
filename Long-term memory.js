/**
 * ==========================================================
 * NIKKI LONG TERM MEMORY
 * ----------------------------------------------------------
 * Responsible For:
 * - Permanent Memory
 * - Persistent Storage
 * - User Information
 * - Learned Knowledge
 * ==========================================================
 */

class LongTermMemory {

    constructor() {

        this.name = "Long Term Memory";

        this.version = "1.0.0";

        this.status = "Offline";

        this.database = {};

    }

    initialize() {

        this.status = "Online";

        console.log("[LongTermMemory] Initialized");

    }

    process(data) {

        return this.store(data.key, data.value);

    }

    store(key, value) {

        this.database[key] = {

            value,

            createdAt: Date.now(),

            updatedAt: Date.now()

        };

        return {

            success: true,

            module: this.name,

            key,

            value

        };

    }

    recall(key) {

        return this.database[key] || null;

    }

    update(key, value) {

        if(!this.database[key]){

            return this.store(key, value);

        }

        this.database[key].value = value;

        this.database[key].updatedAt = Date.now();

        return this.database[key];

    }

    remove(key) {

        delete this.database[key];

    }

    exists(key) {

        return key in this.database;

    }

    list() {

        return this.database;

    }

    clear() {

        this.database = {};

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            memories: Object.keys(this.database).length

        };

    }

    shutdown() {

        this.status = "Offline";

    }

}

const LONG_MEMORY = new LongTermMemory();

export default LONG_MEMORY;