/**
 * ==========================================
 * NIKKI AI
 * Core Engine V3
 * Part 1
 * ==========================================
 */

class Nikki {

    constructor(){

        /* ==========================
           AI INFORMATION
        ========================== */

        this.name = "NIKKI";

        this.version = "3.0.0";

        this.author = "NIKKI Team";

        /* ==========================
           SYSTEM STATE
        ========================== */

        this.state = "OFFLINE";

        this.bootTime = null;

        this.lastActivity = null;

        /* ==========================
           MODULE SYSTEM
        ========================== */

        this.modules = new Map();

        this.totalModules = 0;

        /* ==========================
           EVENT SYSTEM
        ========================== */

        this.events = new Map();

        /* ==========================
           DEBUG
        ========================== */

        this.debug = true;

        this.logs = [];

    }

    /* =====================================
       LOGGER
    ===================================== */

    log(type,message){

        const entry={

            type,

            message,

            time:new Date()

        };

        this.logs.push(entry);

        if(this.debug){

            console.log(

                `[${type}]`,

                message

            );

        }

    }

    /* =====================================
       REGISTER MODULE
    ===================================== */

    register(name,module){

        if(!name){

            this.log(

                "ERROR",

                "Module name missing"

            );

            return false;

        }

        if(!module){

            this.log(

                "ERROR",

                `${name} is null`

            );

            return false;

        }

        if(this.modules.has(name)){

            this.log(

                "WARNING",

                `${name} already registered`

            );

            return false;

        }

        this.modules.set(name,module);

        this.totalModules=this.modules.size;

        this.log(

            "LOAD",

            `${name} loaded`

        );

        return true;

    }

    /* =====================================
       REMOVE MODULE
    ===================================== */

    remove(name){

        if(!this.modules.has(name)){

            return false;

        }

        this.modules.delete(name);

        this.totalModules=this.modules.size;

        this.log(

            "REMOVE",

            `${name} removed`

        );

        return true;

    }

    /* =====================================
       GET MODULE
    ===================================== */

    get(name){

        return this.modules.get(name)||null;

    }

    /* =====================================
       HAS MODULE
    ===================================== */

    has(name){

        return this.modules.has(name);

    }

    /* =====================================
       REGISTER MULTIPLE MODULES
    ===================================== */

    registerModules(...modules){

        modules.forEach(module=>{

            if(!module) return;

            const name=

                module.name ||

                module.constructor.name;

            this.register(

                name,

                module

            );

        });

    }

      /* =====================================
       BOOT ENGINE
    ===================================== */

    async boot(){

        if(this.state !== "OFFLINE"){

            this.log(

                "WARNING",

                "NIKKI already running"

            );

            return false;

        }

        this.state = "BOOTING";

        this.bootTime = Date.now();

        this.log(

            "SYSTEM",

            "Boot sequence started"

        );

        for(const [name,module] of this.modules){

            if(

                module &&

                typeof module.initialize === "function"

            ){

                try{

                    await module.initialize();

                    this.log(

                        "INIT",

                        `${name} initialized`

                    );

                }

                catch(error){

                    this.log(

                        "ERROR",

                        `${name} failed`

                    );

                }

            }

        }

        this.state = "ONLINE";

        this.log(

            "SYSTEM",

            "NIKKI ONLINE"

        );

        return true;

    }

    /* =====================================
       SHUTDOWN
    ===================================== */

    async shutdown(){

        this.state = "SHUTDOWN";

        for(const [name,module] of this.modules){

            if(

                module &&

                typeof module.shutdown==="function"

            ){

                try{

                    await module.shutdown();

                }

                catch(error){

                    this.log(

                        "ERROR",

                        error.message

                    );

                }

            }

        }

        this.state = "OFFLINE";

        this.log(

            "SYSTEM",

            "NIKKI OFFLINE"

        );

    }

    /* =====================================
       RESTART
    ===================================== */

    async restart(){

        await this.shutdown();

        return await this.boot();

    }

    /* =====================================
       ASK
    ===================================== */

    async ask(input){

        if(this.state !== "ONLINE"){

            return{

                success:false,

                response:

                "NIKKI is offline."

            };

        }

        this.lastActivity = Date.now();

        return await this.process(input);

    }

    /* =====================================
       PROCESS
    ===================================== */

    async process(input){

        try{

            /* Memory */

            const memory =

                this.get("Memory");

            if(

                memory &&

                typeof memory.store==="function"

            ){

                await memory.store(input);

            }

            /* Context */

            const context =

                this.get("ContextManager");

            if(

                context &&

                typeof context.update==="function"

            ){

                await context.update(input);

            }

            /* Reasoning */

            const reasoning =

                this.get("Reasoning");

            let thought = input;

            if(

                reasoning &&

                typeof reasoning.process==="function"

            ){

                thought =

                await reasoning.process(input);

            }

            /* Emotion */

            const emotion =

                this.get("Emotion");

            if(

                emotion &&

                typeof emotion.process==="function"

            ){

                thought =

                await emotion.process(thought);

            }

            /* Response */

            const responseGenerator =

                this.get("ResponseGenerator");

            if(

                responseGenerator &&

                typeof responseGenerator.generate==="function"

            ){

                return await responseGenerator.generate(thought);

            }

            return{

                success:true,

                response:

                String(thought)

            };

        }

        catch(error){

            this.log(

                "ERROR",

                error.message

            );

            return{

                success:false,

                response:

                "Internal AI Error"

            };

        }

    }

      /* =====================================
       EVENT SYSTEM
    ===================================== */

    on(event, callback){

        if(!this.events.has(event)){

            this.events.set(event, []);

        }

        this.events.get(event).push(callback);

    }

    emit(event, data = null){

        if(!this.events.has(event)){

            return;

        }

        this.events.get(event).forEach(callback=>{

            try{

                callback(data);

            }

            catch(error){

                this.log(

                    "EVENT",

                    error.message

                );

            }

        });

    }

    off(event){

        if(this.events.has(event)){

            this.events.delete(event);

        }

    }

    /* =====================================
       SYSTEM INFO
    ===================================== */

    info(){

        return{

            name:this.name,

            version:this.version,

            author:this.author,

            state:this.state,

            modules:this.totalModules,

            bootTime:this.bootTime,

            lastActivity:this.lastActivity

        };

    }

    /* =====================================
       HEALTH CHECK
    ===================================== */

    health(){

        return{

            status:this.state,

            modules:this.totalModules,

            events:this.events.size,

            uptime:

            this.bootTime

            ?

            Date.now()-this.bootTime

            :

            0

        };

    }

    /* =====================================
       GET LOGS
    ===================================== */

    getLogs(){

        return this.logs;

    }

    clearLogs(){

        this.logs=[];

    }

    /* =====================================
       RESET ENGINE
    ===================================== */

    reset(){

        this.modules.clear();

        this.events.clear();

        this.logs=[];

        this.totalModules=0;

        this.state="OFFLINE";

        this.bootTime=null;

        this.lastActivity=null;

        this.log(

            "SYSTEM",

            "Engine Reset"

        );

    }

    /* =====================================
       VERSION
    ===================================== */

    getVersion(){

        return this.version;

    }

    /* =====================================
       DEBUG
    ===================================== */

    enableDebug(){

        this.debug=true;

    }

    disableDebug(){

        this.debug=false;

    }

}

/* ==========================================
   CREATE INSTANCE
========================================== */

const NIKKI = new Nikki();

/* ==========================================
   EXPORT
========================================== */

export default NIKKI;