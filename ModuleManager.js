/**
 * ==========================================================
 * NIKKI MODULE MANAGER
 * ----------------------------------------------------------
 * Responsible For:
 * - Registering Modules
 * - Initializing Modules
 * - Managing Module Status
 * - Providing Module Access
 * ==========================================================
 */

class ModuleManager {

    constructor() {

        this.name = "Module Manager";

        this.modules = {};

    }

    initialize() {

        console.log("[Module Manager] Online");

    }

    register(module) {

        this.modules[module.name] = module;

    }

    get(name) {

        return this.modules[name];

    }

    initializeAll() {

        for (const module of Object.values(this.modules)) {

            module.initialize();

        }

    }

    shutdownAll() {

        for (const module of Object.values(this.modules)) {

            module.shutdown();

        }

    }

    status() {

        const report = {};

        for (const module of Object.values(this.modules)) {

            report[module.name] = module.status();

        }

        return report;

    }

}

const MODULES = new ModuleManager();

export default MODULES;