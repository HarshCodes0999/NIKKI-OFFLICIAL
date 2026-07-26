/**
 * ==========================================================
 * NIKKI PLANNING MODULE
 * ----------------------------------------------------------
 * Responsible For:
 * - Breaking tasks into steps
 * - Managing execution order
 * - Returning an execution plan
 * ==========================================================
 */

class PlanningModule {

    constructor() {

        this.name = "Planning";
        this.version = "1.0.0";
        this.status = "Offline";

    }

    initialize() {

        this.status = "Online";

        console.log("[Planning] Initialized");

    }

    process(request) {

        return this.createPlan(request);

    }

    createPlan(request) {

        const steps = [];

        switch(request.intent){

            case "OPEN_APP":

                steps.push({
                    id:1,
                    action:"OPEN_APP",
                    target:request.target
                });

                break;

            case "PLAY_MEDIA":

                steps.push({
                    id:1,
                    action:"PLAY_MEDIA",
                    target:request.target
                });

                break;

            case "SEARCH":

                steps.push({
                    id:1,
                    action:"OPEN_BROWSER"
                });

                steps.push({
                    id:2,
                    action:"SEARCH_WEB",
                    target:request.target
                });

                break;

            default:

                steps.push({
                    id:1,
                    action:"CHAT"
                });

        }

        return {

            success:true,

            module:this.name,

            timestamp:Date.now(),

            data:{

                totalSteps:steps.length,

                completedSteps:0,

                plan:steps

            }

        };

    }

    status(){

        return{

            module:this.name,

            version:this.version,

            status:this.status

        };

    }

    shutdown(){

        this.status="Offline";

    }

}

const PLANNING = new PlanningModule();

export default PLANNING;