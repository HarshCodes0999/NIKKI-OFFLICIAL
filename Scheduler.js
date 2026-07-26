/**
 * ==========================================================
 * NIKKI SCHEDULER
 * ----------------------------------------------------------
 * Responsible For:
 * - Scheduling Tasks
 * - Delayed Execution
 * - Repeating Tasks
 * - Managing Timers
 * ==========================================================
 */

class Scheduler {

    constructor() {

        this.name = "Scheduler";

        this.version = "1.0.0";

        this.status = "Offline";

        this.tasks = [];

        this.counter = 0;

    }

    initialize() {

        this.status = "Online";

        console.log("[Scheduler] Initialized");

    }

    create(task) {

        this.counter++;

        const schedule = {

            id: `SCH-${String(this.counter).padStart(5, "0")}`,

            task,

            executeAt: task.executeAt || Date.now(),

            repeat: task.repeat || false,

            interval: task.interval || 0,

            state: "SCHEDULED"

        };

        this.tasks.push(schedule);

        return schedule;

    }

    run(id) {

        const schedule = this.tasks.find(t => t.id === id);

        if (!schedule) {

            return null;

        }

        schedule.state = "RUNNING";

        return schedule;

    }

    complete(id) {

        const schedule = this.tasks.find(t => t.id === id);

        if (!schedule) {

            return null;

        }

        schedule.state = "COMPLETED";

        return schedule;

    }

    cancel(id) {

        this.tasks = this.tasks.filter(t => t.id !== id);

    }

    list() {

        return this.tasks;

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            scheduledTasks: this.tasks.length

        };

    }

    shutdown() {

        this.tasks = [];

        this.status = "Offline";

    }

}

const SCHEDULER = new Scheduler();

export default SCHEDULER;