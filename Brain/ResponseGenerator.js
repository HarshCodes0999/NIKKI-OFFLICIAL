/**
 * ==========================================================
 * NIKKI RESPONSE GENERATOR
 * ----------------------------------------------------------
 * Responsible For:
 * - Generating Natural Responses
 * - Formatting Output
 * - Choosing Tone
 * - Returning Final Response
 * ==========================================================
 */

class ResponseGenerator {

    constructor() {

        this.name = "Response Generator";

        this.version = "1.0.0";

        this.status = "Offline";

        this.tone = "FRIENDLY";

    }

    initialize() {

        this.status = "Online";

        console.log("[ResponseGenerator] Initialized");

    }

    process(result) {

        return this.generate(result);

    }

    generate(result) {

        let message = "";

        switch(result.intent){

            case "OPEN_APP":

                message = `${result.target} has been opened.`;

                break;

            case "SEARCH":

                message = `Searching for "${result.target}".`;

                break;

            case "PLAY_MEDIA":

                message = `Playing ${result.target}.`;

                break;

            case "CHAT":

                message = "I'm ready to help.";

                break;

            default:

                message = "Task completed.";

        }

        return {

            success: true,

            module: this.name,

            timestamp: Date.now(),

            data: {

                text: message,

                tone: this.tone,

                voice: true,

                display: true

            }

        };

    }

    setTone(tone){

        this.tone = tone;

    }

    status(){

        return{

            module:this.name,

            version:this.version,

            status:this.status,

            tone:this.tone

        };

    }

    shutdown(){

        this.status="Offline";

    }

}

const RESPONSE = new ResponseGenerator();

export default RESPONSE;