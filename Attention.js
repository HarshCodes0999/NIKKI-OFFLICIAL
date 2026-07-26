/**
 * ==========================================================
 * NIKKI ATTENTION ENGINE
 * ----------------------------------------------------------
 * Responsible For:
 * - Focus Management
 * - Priority Handling
 * - Interrupt Control
 * - Active Context
 * ==========================================================
 */

class AttentionModule {

    constructor() {

        this.name = "Attention";

        this.version = "1.0.0";

        this.status = "Offline";

        this.focus = null;

        this.priority = "NORMAL";

        this.interrupted = false;

    }

    initialize() {

        this.status = "Online";

        console.log("[Attention] Initialized");

    }

    process(task) {

        return this.focusOn(task);

    }

    focusOn(task) {

        this.focus = task;

        this.priority = task.priority || "NORMAL";

        this.interrupted = false;

        return {

            success: true,

            module: this.name,

            timestamp: Date.now(),

            data: {

                focus: this.focus,

                priority: this.priority,

                interrupted: this.interrupted

            }

        };

    }

    interrupt(reason = "UNKNOWN") {

        this.interrupted = true;

        return {

            success: true,

            reason

        };

    }

    clear() {

        this.focus = null;

        this.priority = "NORMAL";

        this.interrupted = false;

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            focus: this.focus,

            priority: this.priority,

            interrupted: this.interrupted

        };

    }

    shutdown() {

        this.clear();

        this.status = "Offline";

    }

}

const ATTENTION = new AttentionModule();

export default ATTENTION;