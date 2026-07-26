/**
 * ==========================================================
 * NIKKI DIAGNOSTICS ENGINE
 * ----------------------------------------------------------
 * Responsible For:
 * - Health Monitoring
 * - Module Diagnostics
 * - Error Detection
 * - Performance Reports
 * ==========================================================
 */

class Diagnostics {

    constructor() {

        this.name = "Diagnostics Engine";

        this.version = "1.0.0";

        this.status = "Offline";

        this.modules = {};

        this.lastScan = null;

    }

    initialize() {

        this.status = "Online";

        console.log("[Diagnostics] Initialized");

    }

    register(name, module) {

        this.modules[name] = module;

    }

    scan() {

        const report = [];

        for (const name in this.modules) {

            const module = this.modules[name];

            let state = "UNKNOWN";

            try {

                if (typeof module.status === "function") {

                    state = module.status();

                }

            } catch (error) {

                state = {

                    error: error.message

                };

            }

            report.push({

                module: name,

                state

            });

        }

        this.lastScan = {

            timestamp: Date.now(),

            modules: report.length,

            report

        };

        return this.lastScan;

    }

    health() {

        if (!this.lastScan) {

            return {

                health: "UNKNOWN",

                message: "No diagnostics scan performed."

            };

        }

        const failed = this.lastScan.report.filter(

            item => item.state.error

        );

        return {

            overallHealth:

                failed.length === 0 ? "HEALTHY" : "WARNING",

            totalModules: this.lastScan.modules,

            failedModules: failed.length

        };

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            registeredModules: Object.keys(this.modules).length,

            lastScan: this.lastScan

                ? this.lastScan.timestamp

                : null

        };

    }

    shutdown() {

        this.modules = {};

        this.status = "Offline";

    }

}

const DIAGNOSTICS = new Diagnostics();

export default DIAGNOSTICS;