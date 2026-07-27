/**
 * ==========================================
 * NIKKI AI
 * Main Engine V2
 * ==========================================
 */

class Nikki {

    constructor(){

        this.name = "NIKKI";

        this.version = "2.0.0";

        this.status = "OFFLINE";

        this.modules = [];

        this.registry = {};

    }

}

const NIKKI = new Nikki();

export default NIKKI;

/* ==========================================================
   REGISTER MODULE
========================================================== */

register(name, module){

    if(!name || !module){

        console.error("[NIKKI] Invalid Module");

        return false;

    }

    this.registry[name] = module;

    this.modules.push(module);

    console.log("Loaded :", name);

    return true;

}

/* ==========================================================
   GET MODULE
========================================================== */

get(name){

    return this.registry[name] || null;

}

/* ==========================================================
   HAS MODULE
========================================================== */

has(name){

    return this.registry.hasOwnProperty(name);

}

/* ==========================================================
   REMOVE MODULE
========================================================== */

remove(name){

    if(!this.has(name)){

        return false;

    }

    delete this.registry[name];

    this.modules = this.modules.filter(

        module => module !== this.registry[name]

    );

    return true;

}

/* ==========================================================
   TOTAL MODULES
========================================================== */

totalModules(){

    return Object.keys(this.registry).length;

}

/* ==========================================================
   BOOT ENGINE
========================================================== */

async boot(){

    console.log("");

    console.log("===================================");

    console.log("Starting NIKKI AI...");

    console.log("Version :", this.version);

    console.log("===================================");

    this.status = "BOOTING";

    try{

        for(const name in this.registry){

            const module = this.registry[name];

            if(module && typeof module.initialize === "function"){

                await module.initialize();

            }

        }

        this.status = "ONLINE";

        console.log("");

        console.log("NIKKI AI ONLINE");

        console.log("Modules :", this.totalModules());

        console.log("");

        return{

            success:true,

            status:this.status,

            totalModules:this.totalModules()

        };

    }

    catch(error){

        this.status="FAILED";

        console.error(error);

        return{

            success:false,

            error:error.message

        };

    }

}

/* ==========================================================
   SYSTEM INFORMATION
========================================================== */

info(){

    return{

        name:this.name,

        version:this.version,

        status:this.status,

        totalModules:this.totalModules()

    };

}

/* ==========================================================
   SHUTDOWN
========================================================== */

async shutdown(){

    console.log("");

    console.log("Stopping NIKKI AI...");

    for(const name in this.registry){

        const module = this.registry[name];

        if(module && typeof module.shutdown === "function"){

            await module.shutdown();

        }

    }

    this.status = "OFFLINE";

    console.log("NIKKI AI OFFLINE");

    return{

        success:true,

        status:this.status

    };

}

/* ==========================================================
   RESTART
========================================================== */

async restart(){

    await this.shutdown();

    return await this.boot();

}

/* ==========================================================
   MAIN PROCESS
========================================================== */

async process(input){

    if(this.status !== "ONLINE"){

        return{

            success:false,

            error:"NIKKI AI is Offline"

        };

    }

    try{

        console.log("");

        console.log("User :", input);

        // Brain Module
        const brain = this.get("Brain");

        if(brain && typeof brain.process === "function"){

            return await brain.process(input);

        }

        return{

            success:true,

            response:"Brain Module Not Connected"

        };

    }

    catch(error){

        console.error(error);

        return{

            success:false,

            error:error.message

        };

    }

}

/* ==========================================================
   MODULE INITIALIZER
========================================================== */

initializeModules(modules = []){

    for(const module of modules){

        if(!module) continue;

        const name = module.name || module.constructor.name;

        this.register(name, module);

    }

    console.log("");

    console.log("===================================");

    console.log("Modules Registered :", this.totalModules());

    console.log("===================================");

    console.log("");

}

/* ==========================================================
   HEALTH CHECK
========================================================== */

health(){

    return{

        ai:this.status,

        modules:this.totalModules(),

        version:this.version,

        uptime:Date.now()

    };

}
