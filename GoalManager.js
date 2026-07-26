/**
 * ==========================================================
 * NIKKI GOAL MANAGER
 * ----------------------------------------------------------
 * Responsible For:
 * - Creating Goals
 * - Tracking Progress
 * - Completing Goals
 * - Managing Active Objectives
 * ==========================================================
 */

class GoalManager {

    constructor() {

        this.name = "Goal Manager";

        this.version = "1.0.0";

        this.status = "Offline";

        this.goals = [];

        this.counter = 0;

    }

    initialize() {

        this.status = "Online";

        console.log("[GoalManager] Initialized");

    }

    create(title, priority = "NORMAL") {

        this.counter++;

        const goal = {

            id: `GOAL-${String(this.counter).padStart(5,"0")}`,

            title,

            priority,

            progress: 0,

            state: "ACTIVE",

            createdAt: Date.now()

        };

        this.goals.push(goal);

        return goal;

    }

    update(id, progress) {

        const goal = this.goals.find(g => g.id === id);

        if(!goal) return null;

        goal.progress = progress;

        if(progress >= 100){

            goal.state = "COMPLETED";

        }

        return goal;

    }

    complete(id){

        return this.update(id,100);

    }

    active(){

        return this.goals.filter(g=>g.state==="ACTIVE");

    }

    completed(){

        return this.goals.filter(g=>g.state==="COMPLETED");

    }

    status(){

        return{

            module:this.name,

            version:this.version,

            status:this.status,

            active:this.active().length,

            completed:this.completed().length

        };

    }

    shutdown(){

        this.status="Offline";

    }

}

const GOALS = new GoalManager();

export default GOALS;