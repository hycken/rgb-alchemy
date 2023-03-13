

export class Color {
    red: number
    green: number
    blue: number

    constructor(red: number, green: number, blue: number) {
        this.red = Math.round(red);
        this.green = Math.round(green);
        this.blue = Math.round(blue);
    }

    get rgb(): string {
        return `rgb(${this.red},${this.green},${this.blue})`;
    }

    get isBlack(): boolean {
        return this.red === 0 && this.green === 0 && this.blue === 0;
    }

    // Gets a normalized eucledian distances between two colors.
    distance(target: Color): number {
        if (this.red === 0 && this.green === 0 && this.blue === 0) {
            return 1;
        }

        const redSquare = Math.pow(target.red - this.red, 2);
        const greenSquare = Math.pow(target.green - this.green, 2);
        const blueSquare = Math.pow(target.blue - this.blue, 2);
        const distance = Math.sqrt(redSquare + greenSquare + blueSquare);
        return 1 / 255 / Math.sqrt(3) * distance;
    }

    // Fades color index + 1 steps.
    faded(index: number, length: number): Color {
        // Index starts at 0, but we want 1 for fist box.
        const distance = index + 1;
        const fade = (length + 1 - distance) / (length + 1);
        return new Color(this.red * fade, this.green * fade, this.blue * fade);
    }

    static initial = new Color(0, 0, 0)

    // Gets a normalized average of the colors' components.
    static average(...colors: Color[]): Color {
        const red = colors.reduce((prev, color) => prev + color.red, 0);
        const green = colors.reduce((prev, color) => prev + color.green, 0);
        const blue = colors.reduce((prev, color) => prev + color.blue, 0);
        const factor = 255 / Math.max(...[red, green, blue, 255]);

        return new Color(red * factor, green * factor, blue * factor);
    }
}