/**
 * ==========================================================
 * NIKKI AUTOMATION ENGINE
 * ----------------------------------------------------------
 * Responsible For:
 * - Automation Rules
 * - Trigger Detection
 * - Condition Checking
 * - Workflow Triggering
 * ==========================================================
 */

class Automation {

    constructor() {

        this.name = "Automation Engine";

        this.version = "1.0.0";

        this.status = "Offline";

        this.rules = [];

        this.counter = 0;

    }

    initialize() {

        this.status = "Online";

        console.log("[Automation] Initialized");

    }

    create(rule) {

        this.counter++;

        const automation = {

            id: `AUTO-${String(this.counter).padStart(5, "0")}`,

            name: rule.name,

            trigger: rule.trigger,

            action: rule.action,

            enabled: true,

            createdAt: Date.now()

        };

        this.rules.push(automation);

        return automation;

    }

    check(trigger) {

        return this.rules.filter(rule =>

            rule.enabled && rule.trigger === trigger

        );

    }

    enable(id) {

        const rule = this.find(id);

        if (rule) rule.enabled = true;

        return rule;

    }

    disable(id) {

        const rule = this.find(id);

        if (rule) rule.enabled = false;

        return rule;

    }

    find(id) {

        return this.rules.find(r => r.id === id);

    }

    remove(id) {

        this.rules = this.rules.filter(r => r.id !== id);

    }

    list() {

        return this.rules;

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            automations: this.rules.length

        };

    }

    shutdown() {

        this.rules = [];

        this.status = "Offline";

    }

}

const AUTOMATION = new Automation();

export default AUTOMATION;