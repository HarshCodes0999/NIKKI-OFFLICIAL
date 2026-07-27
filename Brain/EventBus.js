/**
 * ==========================================================
 * NIKKI EVENT BUS
 * ----------------------------------------------------------
 * Responsible For:
 * - Communication Between Modules
 * - Event Registration
 * - Event Dispatching
 * - Event Listening
 * ==========================================================
 */

class EventBus {

    constructor() {

        this.name = "Event Bus";

        this.events = {};

    }

    initialize() {

        console.log("[EventBus] Online");

    }

    on(eventName, callback) {

        if(!this.events[eventName]){

            this.events[eventName] = [];

        }

        this.events[eventName].push(callback);

    }

    emit(eventName, data = {}) {

        if(!this.events[eventName]) return;

        this.events[eventName].forEach(listener => {

            listener(data);

        });

    }

    remove(eventName) {

        delete this.events[eventName];

    }

    clear() {

        this.events = {};

    }

    status() {

        return {

            module: this.name,

            totalEvents: Object.keys(this.events).length

        };

    }

}

const EVENT_BUS = new EventBus();

export default EVENT_BUS;