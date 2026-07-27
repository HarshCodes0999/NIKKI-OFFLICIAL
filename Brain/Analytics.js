/**
 * ==========================================================
 * NIKKI ANALYTICS ENGINE
 * ----------------------------------------------------------
 * Responsible For:
 * - Performance Analytics
 * - Usage Statistics
 * - Success Rate
 * - System Metrics
 * ==========================================================
 */

class Analytics {

    constructor() {

        this.name = "Analytics Engine";

        this.version = "1.0.0";

        this.status = "Offline";

        this.metrics = {

            totalRequests: 0,

            successfulRequests: 0,

            failedRequests: 0,

            totalResponseTime: 0,

            moduleUsage: {}

        };

    }

    initialize() {

        this.status = "Online";

        console.log("[Analytics] Initialized");

    }

    process(data) {

        this.metrics.totalRequests++;

        if (data.success) {

            this.metrics.successfulRequests++;

        } else {

            this.metrics.failedRequests++;

        }

        this.metrics.totalResponseTime += data.responseTime || 0;

        if (data.module) {

            if (!this.metrics.moduleUsage[data.module]) {

                this.metrics.moduleUsage[data.module] = 0;

            }

            this.metrics.moduleUsage[data.module]++;

        }

        return {

            success: true,

            module: this.name

        };

    }

    successRate() {

        if (this.metrics.totalRequests === 0) {

            return 0;

        }

        return Number(

            (

                this.metrics.successfulRequests /

                this.metrics.totalRequests

            ) * 100

        ).toFixed(2);

    }

    averageResponseTime() {

        if (this.metrics.totalRequests === 0) {

            return 0;

        }

        return Number(

            this.metrics.totalResponseTime /

            this.metrics.totalRequests

        ).toFixed(2);

    }

    report() {

        return {

            totalRequests: this.metrics.totalRequests,

            successfulRequests: this.metrics.successfulRequests,

            failedRequests: this.metrics.failedRequests,

            successRate: this.successRate(),

            averageResponseTime: this.averageResponseTime(),

            moduleUsage: this.metrics.moduleUsage

        };

    }

    reset() {

        this.metrics = {

            totalRequests: 0,

            successfulRequests: 0,

            failedRequests: 0,

            totalResponseTime: 0,

            moduleUsage: {}

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

const ANALYTICS = new Analytics();

export default ANALYTICS;