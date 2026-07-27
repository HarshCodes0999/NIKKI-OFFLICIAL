/**
 * ==========================================================
 * NIKKI TASK QUEUE
 * ----------------------------------------------------------
 * Responsible For:
 * - Managing Tasks
 * - Prioritizing Tasks
 * - Scheduling Execution
 * - Tracking Progress
 * ==========================================================
 */

class TaskQueue {

    constructor() {

        this.name = "Task Queue";

        this.queue = [];

        this.currentTask = null;

        this.completedTasks = [];

        this.taskCounter = 0;

    }

    initialize() {

        console.log("[TaskQueue] Online");

    }

    process(task) {

        return this.add(task);

    }

    add(task) {

        this.taskCounter++;

        const newTask = {

            id: `TASK-${String(this.taskCounter).padStart(6, "0")}`,

            priority: task.priority || "NORMAL",

            state: "WAITING",

            createdAt: Date.now(),

            ...task

        };

        this.queue.push(newTask);

        this.sort();

        return newTask;

    }

    sort() {

        const priority = {

            CRITICAL: 4,

            HIGH: 3,

            NORMAL: 2,

            LOW: 1

        };

        this.queue.sort((a, b) => {

            return priority[b.priority] - priority[a.priority];

        });

    }

    next() {

        if(this.queue.length === 0) {

            return null;

        }

        this.currentTask = this.queue.shift();

        this.currentTask.state = "RUNNING";

        return this.currentTask;

    }

    complete(taskId) {

        if(!this.currentTask) return;

        this.currentTask.state = "COMPLETED";

        this.completedTasks.push(this.currentTask);

        this.currentTask = null;

    }

    cancel(taskId) {

        this.queue = this.queue.filter(task => task.id !== taskId);

    }

    status() {

        return {

            waiting: this.queue.length,

            running: this.currentTask,

            completed: this.completedTasks.length

        };

    }

    shutdown() {

        this.queue = [];

        this.currentTask = null;

    }

}

const TASK_QUEUE = new TaskQueue();

export default TASK_QUEUE;