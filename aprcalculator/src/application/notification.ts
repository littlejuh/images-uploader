export class Notification {
    private errors: Array<string> = [];

    public addError(message: string) {
        this.errors.push(message);
    }

    public hasErrors(): boolean {
        return this.errors.length != 0;
    }

    public errorMessage(): string {
        return this.errors.join(", \n");
    }
}