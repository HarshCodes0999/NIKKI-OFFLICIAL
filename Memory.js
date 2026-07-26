/**
 * ==========================================================
 * NIKKI MEMORY MODULE
 * ----------------------------------------------------------
 * Responsible For:
 * - Remembering Information
 * - Recalling Information
 * - Forgetting Information
 * - Managing Memory
 * ==========================================================
 */

class MemoryModule {

    constructor() {

        this.name = "Memory";

        this.version = "1.0.0";

        this.status = "Offline";

        this.memories = [];

    }

    initialize() {

        this.status = "Online";

        console.log("[Memory] Initialized");

    }

    process(data) {

        return this.remember(data);

    }

    remember(data) {

        const memory = {

            id: this.memories.length + 1,

            data,

            createdAt: Date.now()

        };

        this.memories.push(memory);

        return {

            success: true,

            module: this.name,

            timestamp: Date.now(),

            data: memory

        };

    }

    recall(id) {

        return this.memories.find(memory => memory.id === id);

    }

    recallAll() {

        return this.memories;

    }

    forget(id) {

        this.memories = this.memories.filter(memory => memory.id !== id);

    }

    clear() {

        this.memories = [];

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            totalMemories: this.memories.length

        };

    }

    shutdown() {

        this.status = "Offline";

    }

}

const MEMORY = new MemoryModule();

export default MEMORY;