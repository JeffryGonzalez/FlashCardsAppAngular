var teacher = "Jeff";
describe("learning jasmine", function () {

    it("is awesome", function () {


    });

    describe("an example of addition", function () {
        var a = 2, b = 2, answer;

        beforeEach(function () {
            answer = a + b;
        });


        it("produces a sum", function () {
            expect(answer).toBe(4); // matcher.
        });

        it("does not modify the operands", function () {
            expect(a).toBe(2);
            expect(b).toBe(2);
        });

    });

});

describe("variables", function () {
    describe("decaring them", function () {
        it("has a couple of ways", function () {
            var z;
            expect(z).toBeUndefined(); // === undefined
            //expect(dog).toBeUndefined();
        });
        it("do not need to be declared", function () {
            cat = "fluffy";
            expect(cat).toBe("fluffy");
            expect("cat" in window).toBeTruthy(); // created a global variable.
            expect("dog" in window).toBeFalsy();
            dog = "Rover";
            expect("dog" in window).toBeTruthy();
        });
        it("using strict", function () {
            "use strict";
            //hamster = "bossy"; // no implicit global
            window.hamster = "bossy"; // explicit global
            expect(hamster).toBe("bossy"); // can access it implicitly
        });
    });

    describe("some data types", function () {
        it("has some types", function () {
            var a = 10;
            expect(typeof a).toBe("number");
            a = 3.1415;
            expect(typeof a).toBe("number");
            a = "cat";
            expect(typeof a).toBe("string");
            a = 'cat';
            expect(typeof a).toBe("string");
            a = {};
            expect(typeof a).toBe("object");
            a = true;
            expect(typeof a).toBe("boolean");
            a = function () { };
            expect(typeof a).toBe("function");
            // other literals
            a = []; // an array
            expect(typeof a).toBe("object");
            a = new Array(); // you look like a dork if you use this form.
            expect(typeof a).toBe("object");
            a = /w+/i;
            expect(typeof a).toBe("object");

            a = 0xff; // hex
            expect(a).toBe(255);
            a = 0315; // octal
            expect(a).toBe(205);
        });
    });

    describe("truthy and falsy values", function () {
        it("has some truthy values", function () {
            expect(true).toBeTruthy();
            expect("some string with stuff in it").toBeTruthy();
            expect(window.alert).toBeTruthy(); // in other words, defined values
            expect(1).toBeTruthy(); // non-zero numbers
            expect("0").toBeTruthy();
        });
        it("has some falsy values", function () {
            expect(false).toBeFalsy();
            expect("").toBeFalsy();
            expect(0).toBeFalsy();
            expect(undefined).toBeFalsy();
            expect(window.howl).toBeFalsy();
            expect(null).toBeFalsy();
            expect(NaN).toBeFalsy();

        });

    });
});

describe("operators", function () {
   
    it("has a lot of them. most of them you know", function () {
        var a = 1;
        a++;
        expect(a).toBe(2);
        expect(a++).toBe(2);
        expect(a).toBe(3);

        expect(++a).toBe(4);
        expect(a--).toBe(4);
        expect(a).toBe(3);

        a += 12; // a = a + 12;
        expect(a).toBe(15);

        var addThem = function (a, b) { return a + b; };

        expect(typeof addThem).toBe("function");
        expect(typeof addThem(2, 2)).toBe("number");
    });

});

describe("arrays", function () {
    it("has a literal notation", function () {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(numbers.length).toBe(9);
        expect(numbers[0]).toBe(1);


    });

    var colors;
    beforeEach(function () {
        colors = ['red', 'green', 'blue'];
    });

    it("works like a stack sort of ", function () {
        colors.push('orange');
        console.log(colors);
        var removedColor = colors.pop();
        console.log("just took", removedColor, "from", colors);
        colors.pop();
        colors.pop();
        colors.pop();
        expect(colors.pop()).toBeUndefined();

        //if (colors.pop() === undefined) {
        if(!colors.pop()) {
            console.log("Got it. I'll quit popping you now.");
        }

        colors.push("magenta");
        colors[867] = "pink";
       
        colors[123] = "Red";
        console.log(colors);
        expect(colors[866]).toBeUndefined();
    });
    it("has a concat", function () {
        var a = [1, 2, 3];
        var b = [4, 5, 6];
        expect(a.concat(b)).toEqual([1, 2, 3, 4, 5, 6]);
        expect(a).toEqual([1, 2, 3]);
    });
    it("has a join method", function () {
        var animals = ["dog", "cat", "mouse"];
        expect(animals.join()).toBe("dog,cat,mouse");
        expect(animals.join('-*-')).toBe("dog-*-cat-*-mouse");
    });
    it("slices", function () {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var middle = numbers.slice(2, 4);
        expect(middle).toEqual([3, 4]);
        expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
    });

    it("splices", function () {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var extracted = numbers.splice(2, 2);
        expect(extracted).toEqual([3, 4]);

        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        numbers.splice(4, 2, 'dog', 'cat', ['pizza', 'saag']);
        expect(numbers).toEqual([1, 2, 3, 4, 'dog', 'cat', ['pizza', 'saag'], 7, 8, 9]);
    });

});