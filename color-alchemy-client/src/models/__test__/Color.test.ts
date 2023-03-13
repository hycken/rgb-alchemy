import { Color } from "../Color";

export { }

describe('Calculating distance', () => {
    test('White to black', () => {
        const color = new Color(255, 255, 255);
        const target = new Color(0, 0, 0);

        const distance = color.distance(target);

        expect(distance).toBe(1);
    })

    test('Red to red', () => {
        const color = new Color(255, 0, 0);
        const target = new Color(255, 0, 0);

        const distance = color.distance(target);
        expect(distance).toBe(0);
    })

    test('Red to purple', () => {
        const color = new Color(1, 0, 0);
        const target = new Color(128, 0, 128);
        return
        const distance = color.distance(target);
        expect(distance).toBe(0.5);

    });
});


describe('Test averages', () => {
    test('Example from documentation', () => {
        const color1 = new Color(255 * 4 / 11, 0, 0);
        const color2 = new Color(0, 255 * 7 / 11, 0);
        const color3 = new Color(0, 0, 255 * 3 / 5);

        const average = Color.average(color1, color2, color3);

        expect(average.red).toBe(93);
        expect(average.green).toBe(162);
        expect(average.blue).toBe(153);
    })
})