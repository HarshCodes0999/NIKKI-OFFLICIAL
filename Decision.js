/**
 * ==========================================================
 * NIKKI DECISION MODULE
 * ----------------------------------------------------------
 * Responsible For:
 * - Evaluating Requests
 * - Checking Risk
 * - Granting / Denying Permission
 * - Returning Final Decision
 * ==========================================================
 */

class DecisionModule {

    constructor() {

        this.name = "Decision";

        this.version = "1.0.0";

        this.status = "Offline";

    }

    initialize() {

        this.status = "Online";

        console.log("[Decision] Initialized");

    }

    process(request) {

        return this.evaluate(request);

    }

    evaluate(request) {

        let approved = true;

        let reason = "Safe Request";

        let risk = "LOW";



        // Dangerous Commands

        const dangerous = [

            "DELETE",

            "FORMAT",

            "SHUTDOWN",

            "RESTART",

            "FACTORY_RESET"

        ];



        if(dangerous.includes(request.intent)){

            approved = false;

            risk = "HIGH";

            reason = "Permission Required";

        }



        return {

            success: true,

            module: this.name,

            timestamp: Date.now(),

            data: {

                approved,

                risk,

                reason,

                nextModule: approved ? "Action" : null

            }

        };

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status

        };

    }

    shutdown() {

        this.status = "Offline";

    }

}

const DECISION = new DecisionModule();

export default DECISION;