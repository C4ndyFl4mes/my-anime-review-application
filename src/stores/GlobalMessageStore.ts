import { makeAutoObservable, runInAction } from "mobx";
import type { IGlobalMessage } from "../interfaces/IGlobalMessage";

class GlobalMessageStore {
    globalMessage: IGlobalMessage | null = null;
    isExiting: boolean = false;

    private hideTimer: ReturnType<typeof setTimeout> | null = null;
    private clearTimer: ReturnType<typeof setTimeout> | null = null;

    private readonly visibleMs = 4200;
    private readonly exitMs = 300;

    constructor() {
        makeAutoObservable(this);
    }

    // This method sets a global message with the provided message and status code. It also manages the timers for hiding and clearing the message after a certain duration.
    setMessage(message: string, statusCode: number) {
        this.clearTimers();

        this.globalMessage = {
            success: 200 <= statusCode && statusCode < 300,
            message: message
        };
        this.isExiting = false;

        this.hideTimer = setTimeout(() => {
            runInAction(() => {
                this.isExiting = true;
            });

            this.clearTimer = setTimeout(() => {
                runInAction(() => {
                    this.clearMessage();
                });
            }, this.exitMs);
        }, this.visibleMs);
    }

    // This method clears the current global message and resets the exit state.
    clearMessage() {
        this.clearTimers();
        this.isExiting = false;
        this.globalMessage = null;
    }

    private clearTimers() {
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }

        if (this.clearTimer) {
            clearTimeout(this.clearTimer);
            this.clearTimer = null;
        }
    }
}

export default new GlobalMessageStore();