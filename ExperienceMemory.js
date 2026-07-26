/**
 * ==========================================================
 * NIKKI EXPERIENCE MEMORY
 * ----------------------------------------------------------
 * Responsible For:
 * - Recording Experiences
 * - Tracking Results
 * - Learning History
 * - Success & Failure Analysis
 * ==========================================================
 */

class ExperienceMemory {

    constructor() {

        this.name = "Experience Memory";

        this.version = "1.0.0";

        this.status = "Offline";

        this.experiences = [];

        this.counter = 0;

    }

    initialize() {

        this.status = "Online";

        console.log("[ExperienceMemory] Initialized");

    }

    process(data) {

        return this.record(data);

    }

    record(data) {

        this.counter++;

        const experience = {

            id: `EXP-${String(this.counter).padStart(6,"0")}`,

            input: data.input || "",

            intent: data.intent || "",

            decision: data.decision || "",

            action: data.action || "",

            result: data.result || "",

            success: data.success ?? false,

            confidence: data.confidence || 0,

            timestamp: Date.now()

        };

        this.experiences.push(experience);

        return {

            success: true,

            module: this.name,

            data: experience

        };

    }

    latest() {

        if(this.experiences.length === 0){

            return null;

        }

        return this.experiences[this.experiences.length - 1];

    }

    history() {

        return this.experiences;

    }

    successful() {

        return this.experiences.filter(exp => exp.success);

    }

    failed() {

        return this.experiences.filter(exp => !exp.success);

    }

    clear() {

        this.experiences = [];

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            totalExperiences: this.experiences.length

        };

    }

    shutdown() {

        this.clear();

        this.status = "Offline";

    }

}

const EXPERIENCE_MEMORY = new ExperienceMemory();

export default EXPERIENCE_MEMORY;