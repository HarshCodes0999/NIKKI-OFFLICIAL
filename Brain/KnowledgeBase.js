/**
 * ==========================================================
 * NIKKI KNOWLEDGE BASE
 * ----------------------------------------------------------
 * Responsible For:
 * - Knowledge Storage
 * - Knowledge Search
 * - Categories
 * - Facts & Rules
 * ==========================================================
 */

class KnowledgeBase {

    constructor() {

        this.name = "Knowledge Base";

        this.version = "1.0.0";

        this.status = "Offline";

        this.knowledge = {};

    }

    initialize() {

        this.status = "Online";

        console.log("[KnowledgeBase] Initialized");

    }

    process(data) {

        return this.add(data);

    }

    add(data) {

        this.knowledge[data.key] = {

            value: data.value,

            category: data.category || "General",

            createdAt: Date.now()

        };

        return {

            success: true,

            module: this.name,

            data: this.knowledge[data.key]

        };

    }

    get(key) {

        return this.knowledge[key] || null;

    }

    update(key, value) {

        if (!this.knowledge[key]) return null;

        this.knowledge[key].value = value;

        this.knowledge[key].updatedAt = Date.now();

        return this.knowledge[key];

    }

    remove(key) {

        delete this.knowledge[key];

    }

    exists(key) {

        return key in this.knowledge;

    }

    search(keyword) {

        const results = [];

        for (const key in this.knowledge) {

            if (
                key.toLowerCase().includes(keyword.toLowerCase()) ||
                this.knowledge[key].value
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
            ) {

                results.push({

                    key,

                    ...this.knowledge[key]

                });

            }

        }

        return results;

    }

    categories() {

        return [...new Set(

            Object.values(this.knowledge)

                .map(item => item.category)

        )];

    }

    list() {

        return this.knowledge;

    }

    clear() {

        this.knowledge = {};

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            totalKnowledge: Object.keys(this.knowledge).length

        };

    }

    shutdown() {

        this.clear();

        this.status = "Offline";

    }

}

const KNOWLEDGE_BASE = new KnowledgeBase();

export default KNOWLEDGE_BASE;