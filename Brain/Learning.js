/**
 * ==========================================================
 * NIKKI LEARNING ENGINE
 * ----------------------------------------------------------
 * Responsible For:
 * - Learning From Experience
 * - Improving Decisions
 * - Storing Patterns
 * - Providing Suggestions
 * ==========================================================
 */

class LearningModule {

    constructor() {

        this.name = "Learning";

        this.version = "1.0.0";

        this.status = "Offline";

        this.experiences = [];

    }

    initialize() {

        this.status = "Online";

        console.log("[Learning] Initialized");

    }

    process(experience) {

        return this.learn(experience);

    }

    learn(experience) {

        const record = {

            id: this.experiences.length + 1,

            experience,

            learnedAt: Date.now()

        };

        this.experiences.push(record);

        return {

            success: true,

            module: this.name,

            timestamp: Date.now(),

            data: record

        };

    }

    suggest(intent) {

        const matches = this.experiences.filter(item =>
            item.experience.intent === intent
        );

        return {

            success: true,

            module: this.name,

            suggestions: matches

        };

    }

    history() {

        return this.experiences;

    }

    clear() {

        this.experiences = [];

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            learned: this.experiences.length

        };

    }

    shutdown() {

        this.status = "Offline";

    }

}

const LEARNING = new LearningModule();

export default LEARNING;