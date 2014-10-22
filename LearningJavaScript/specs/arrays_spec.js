describe("ecma script 5 array methods", function () {
    var numbers;
    beforeEach(function () {
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    });

    it("summing some numbers (bad example, but good to show you the syntax)", function () {
        var total = 0;
        numbers.forEach(function (number) {
            total += number;
        });
        expect(total).toBe(45);

        total = numbers.reduce(function (a, b) {
            console.log(a, b);
            return a + b;
        });

        expect(total).toBe(45);

    });

    it("has some methods for creating new arrays", function () {
        var evens = numbers.filter(function (a) {
            return a % 2 === 0;
        });
        expect(evens).toEqual([2, 4, 6, 8]);

        var doubledNumbers = numbers.map(function (a) {
            return a * 2;
        });

        expect(doubledNumbers).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

    });
    it("has some predicate methods", function () {
        var hasSomeEvens = numbers.some(function (a) { return a % 2 === 0; });
        expect(hasSomeEvens).toBeTruthy();

        var allEvens = numbers.every(function (a) { return a % 2 === 0; });
        expect(allEvens).toBeFalsy();
    });

});

describe("an application of this crap", function () {
    var vehicles;
    beforeEach(function () {
        vehicles = [
            { make: "Ford",         mileage: 180000,    year: 2012, baseRate: 180 },
            { make: "Chevy",        mileage: 18000,     year: 2012, baseRate: 130 },
            { make: "Ranger Rover", mileage: 320000,    year: 1982, baseRate: 190 },
            { make: "Chrysler",     mileage: 12000,     year: 2004, baseRate: 320 },
        ];
        

    });
    it("a possible solution", function () {
        var newRates = vehicles.map(function (vehicle) {

            var additions = [];

            if (vehicle.mileage > 15000) {
                additions.push(vehicle.baseRate * .2);
            }
            if (vehicle.year < 2000) {
                additions.push(vehicle.baseRate * .14);
            }
            return {
                make: vehicle.make, totalRate: vehicle.baseRate + additions.reduce(function (a, b) {
                    return a + b;
                }, 0)
            };
        }).map(function (a) {
            return a.totalRate;
        }).reduce(function (a, b) {
            return a + b;
        }, 0);
        console.log(newRates);
    });

});


describe("looping old skool", function () {
    it("has a for loop like every other programming language", function () {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        var total = 0;
        for (var t = 0; t < numbers.length; t++) {
            total += numbers[t];
        }

        expect(total).toBe(45);

        var total2 = 0;
        for (var i in numbers) {
            total2 += numbers[i];
        }

        console.log(total2);

        var grades = { a: 4, b: 3, c: 2, d: 1, f: 0 };
        for (var grade in grades) {
            console.log(grade, grades[grade]);
        }
    });
    

});