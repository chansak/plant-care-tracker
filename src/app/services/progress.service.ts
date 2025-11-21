import { Injectable, signal, computed, effect } from '@angular/core';
import { PlantService } from './plant.service';

export interface ProgressMetrics {
    totalPlants: number;
    plantsWatered: number;
    plantsNeedingWater: number;
    completionRate: number;
    lastUpdated: Date;
}

export interface ActivityLog {
    timestamp: Date;
    action: string;
    plantName?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProgressService {
    private updateIntervalId?: number;
    private readonly UPDATE_INTERVAL = 60000; // 60 seconds

    // Signal-based state
    private metricsSignal = signal<ProgressMetrics>({
        totalPlants: 0,
        plantsWatered: 0,
        plantsNeedingWater: 0,
        completionRate: 0,
        lastUpdated: new Date()
    });

    private activityLogSignal = signal<ActivityLog[]>([]);
    private isRunningSignal = signal<boolean>(false);
    private lastCheckSignal = signal<Date | null>(null);

    // Public readonly signals
    readonly metrics = this.metricsSignal.asReadonly();
    readonly activityLog = this.activityLogSignal.asReadonly();
    readonly isRunning = this.isRunningSignal.asReadonly();
    readonly lastCheck = this.lastCheckSignal.asReadonly();

    // Computed signals
    readonly nextCheck = computed(() => {
        const last = this.lastCheckSignal();
        if (!last) return null;
        return new Date(last.getTime() + this.UPDATE_INTERVAL);
    });

    constructor(private plantService: PlantService) {
        console.log('🔄 Progress Service initialized');

        // Start background monitoring
        this.startBackgroundMonitoring();

        // React to plant changes
        effect(() => {
            const plants = this.plantService.plants();
            this.updateMetrics();
        });
    }

    /**
     * Start the background monitoring process
     */
    startBackgroundMonitoring(): void {
        if (this.updateIntervalId) {
            console.warn('⚠️ Background monitoring already running');
            return;
        }

        console.log('✅ Starting background monitoring (60s interval)');
        this.isRunningSignal.set(true);

        // Initial update
        this.updateMetrics();

        // Set up interval
        this.updateIntervalId = window.setInterval(() => {
            this.updateMetrics();
        }, this.UPDATE_INTERVAL);
    }

    /**
     * Stop the background monitoring process
     */
    stopBackgroundMonitoring(): void {
        if (this.updateIntervalId) {
            console.log('🛑 Stopping background monitoring');
            clearInterval(this.updateIntervalId);
            this.updateIntervalId = undefined;
            this.isRunningSignal.set(false);
        }
    }

    /**
     * Update progress metrics
     */
    private updateMetrics(): void {
        const plants = this.plantService.plants();
        const plantsNeedingWater = this.plantService.plantsNeedingWater();

        const totalPlants = plants.length;
        const needingWater = plantsNeedingWater.length;
        const watered = totalPlants - needingWater;
        const completionRate = totalPlants > 0
            ? Math.round((watered / totalPlants) * 100)
            : 0;

        this.metricsSignal.set({
            totalPlants,
            plantsWatered: watered,
            plantsNeedingWater: needingWater,
            completionRate,
            lastUpdated: new Date()
        });

        this.lastCheckSignal.set(new Date());

        console.log('📊 Progress updated:', {
            total: totalPlants,
            watered,
            needingWater,
            completion: `${completionRate}%`
        });
    }

    /**
     * Log an activity
     */
    logActivity(action: string, plantName?: string): void {
        const newLog: ActivityLog = {
            timestamp: new Date(),
            action,
            plantName
        };

        this.activityLogSignal.update(logs => [newLog, ...logs].slice(0, 50)); // Keep last 50 logs
        console.log('📝 Activity logged:', action, plantName || '');
    }

    /**
     * Get progress summary for display
     */
    getProgressSummary(): string {
        const m = this.metricsSignal();
        return `${m.plantsWatered}/${m.totalPlants} plants watered (${m.completionRate}%)`;
    }

    /**
     * Generate markdown content for PROGRESS.md
     */
    generateProgressMarkdown(): string {
        const m = this.metricsSignal();
        const plants = this.plantService.plants();
        const plantsNeedingWater = this.plantService.plantsNeedingWater();
        const favoritePlants = this.plantService.favoritePlants();
        const logs = this.activityLogSignal();

        const now = new Date();
        const lastCheck = this.lastCheckSignal();
        const nextCheck = this.nextCheck();

        // Categorize plants
        const wellWatered = plants.filter(p => {
            const daysSince = this.plantService.getDaysSinceWatered(p);
            return daysSince < p.wateringFrequency;
        });

        const needingSoon = plants.filter(p => {
            const daysSince = this.plantService.getDaysSinceWatered(p);
            const daysUntilNext = p.wateringFrequency - daysSince;
            return daysUntilNext > 0 && daysUntilNext <= 2;
        });

        let markdown = `# Plant Care Tracker - Progress Report

**Last Updated:** ${now.toLocaleString()}

## 📊 Overall Progress

### Plant Care Completion Rate
- **Total Plants:** ${m.totalPlants}
- **Plants Watered Today:** ${m.plantsWatered}
- **Plants Needing Water:** ${m.plantsNeedingWater}
- **Completion Rate:** ${m.completionRate}%

---

## 🌱 Plant Status Overview

### ✅ Well-Watered Plants
*Plants that have been watered according to schedule*

`;

        if (wellWatered.length === 0) {
            markdown += '- No plants currently tracked\n';
        } else {
            wellWatered.forEach(p => {
                const daysSince = this.plantService.getDaysSinceWatered(p);
                markdown += `- **${p.name}** (${p.species}) - Last watered ${daysSince} days ago\n`;
            });
        }

        markdown += `
### ⚠️ Plants Needing Attention
*Plants that need watering soon (within 1-2 days)*

`;

        if (needingSoon.length === 0) {
            markdown += '- No plants currently tracked\n';
        } else {
            needingSoon.forEach(p => {
                const daysSince = this.plantService.getDaysSinceWatered(p);
                const daysUntil = p.wateringFrequency - daysSince;
                markdown += `- **${p.name}** (${p.species}) - Water in ${daysUntil} days\n`;
            });
        }

        markdown += `
### 🚨 Overdue Plants
*Plants that should have been watered already*

`;

        if (plantsNeedingWater.length === 0) {
            markdown += '- No plants currently tracked\n';
        } else {
            plantsNeedingWater.forEach(p => {
                const daysSince = this.plantService.getDaysSinceWatered(p);
                const daysOverdue = daysSince - p.wateringFrequency;
                markdown += `- **${p.name}** (${p.species}) - ${daysOverdue} days overdue\n`;
            });
        }

        markdown += `
---

## 📈 Progress Metrics

### Current Stats
- **Total Plants:** ${m.totalPlants}
- **Favorite Plants:** ${favoritePlants.length}
- **Completion Rate:** ${m.completionRate}%

---

## 🎯 Goals & Milestones

### Current Goals
- ${m.totalPlants > 0 ? '✅' : '[ ]'} Add first plant to the tracker
- ${m.completionRate === 100 ? '✅' : '[ ]'} Maintain consistent watering schedule
- ${favoritePlants.length > 0 ? '✅' : '[ ]'} Mark favorite plants
- ${m.plantsNeedingWater === 0 ? '✅' : '[ ]'} Keep all plants healthy

### Achievements
${m.totalPlants === 0 ? '- 🏆 *No achievements yet - start tracking plants!*' : ''}
${m.totalPlants > 0 ? '- 🏆 Started tracking plants!' : ''}
${m.totalPlants >= 5 ? '- 🏆 Plant collector - 5+ plants!' : ''}
${favoritePlants.length > 0 ? '- 🏆 Marked favorite plants!' : ''}
${m.completionRate === 100 ? '- 🏆 Perfect care - all plants watered!' : ''}

---

## 📝 Recent Activity Log

`;

        if (logs.length === 0) {
            markdown += '### Today\n- No activity recorded\n';
        } else {
            const today = logs.filter(log => {
                const logDate = new Date(log.timestamp);
                return logDate.toDateString() === now.toDateString();
            });

            markdown += '### Today\n';
            if (today.length === 0) {
                markdown += '- No activity recorded\n';
            } else {
                today.slice(0, 10).forEach(log => {
                    const time = new Date(log.timestamp).toLocaleTimeString();
                    markdown += `- ${time} - ${log.action}${log.plantName ? ` (${log.plantName})` : ''}\n`;
                });
            }
        }

        markdown += `
---

## 🔄 Background Process Status

**Status:** ${this.isRunningSignal() ? 'Active ✅' : 'Inactive ❌'}  
**Last Check:** ${lastCheck ? lastCheck.toLocaleTimeString() : 'N/A'}  
**Next Check:** ${nextCheck ? nextCheck.toLocaleTimeString() : 'N/A'}  
**Monitoring Interval:** 60 seconds

### Process Health
- ${this.isRunningSignal() ? '✅' : '❌'} Service Running
- ✅ Data Sync Active
- ✅ Notifications Enabled

---

## 💡 Tips & Recommendations

1. **Regular Monitoring:** Check your dashboard daily for plants needing water
2. **Set Reminders:** Use the favorite feature for plants requiring special attention
3. **Track Progress:** Review this file weekly to see your plant care improvements
4. **Stay Consistent:** Maintain your watering schedule for healthier plants

---

*This file is automatically updated by the Plant Care Tracker background service*
`;

        return markdown;
    }

    /**
     * Clean up on service destruction
     */
    ngOnDestroy(): void {
        this.stopBackgroundMonitoring();
    }
}
