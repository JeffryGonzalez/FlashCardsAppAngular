describe("functions", function () {

    describe("overriding", function () {

        it("setting the stage", function () {

            var formatName = function (firstName, lastName) {
                return lastName + ", " + firstName;
            };

            var formatName = function (firstName, lastName, mi) { // replaces
                return lastName + ", " + firstName + " " + mi + ".";
            }

            expect(formatName("Han", "Solo")).not.toBe("Solo, Han");
            expect(formatName("Han", "Solo", "D")).toBe("Solo, Han D.");

        });
        it("compromise 1 - optional arguments", function () {

            var formatName = function (firstName, lastName, _mi) {
                var fullName = lastName + ", " + firstName;
                if (_mi) {
                    fullName += " " + _mi + ".";
                }
                return fullName;
            }

            expect(formatName("Han", "Solo")).toBe("Solo, Han");
            expect(formatName("Han", "Solo", "D")).toBe("Solo, Han D.");

        });

        it("compromise 2 - just check the arguments", function () {
            var formatName = function (firstName, lastName) {
                var fullName = lastName + ", " + firstName;
                if (arguments[2]) {
                    _mi = arguments[2];
                    fullName += " " + _mi + ".";
                }
                return fullName;
            }

            expect(formatName("Han", "Solo")).toBe("Solo, Han");
            expect(formatName("Han", "Solo", "D")).toBe("Solo, Han D.");

        });
        it("synthesis", function () {
            // named arguments are required.


            var formatName = function (firstName, lastName, options) {
                var fullName = lastName + ", " + firstName;
                options = options || {};
                if (options.mi) {
                    fullName += " " + options.mi + ".";
                }
                if (options.makeUpper) {
                    fullName = fullName.toUpperCase();
                }

                return fullName;
            }

            expect(formatName("Han", "Solo")).toBe("Solo, Han");
            expect(formatName("Han", "Solo", { mi: "D" })).toBe("Solo, Han D.");
            expect(formatName("Han", "Solo", { mi: "D", makeUpper: true })).toBe("SOLO, HAN D.");
        });
        it("overload based on type of parameters", function () {

            var doIt = function p(a) {
                if (typeof a == "number") {
                    return a * 2;
                }
                if (typeof a == "string") {
                    return a + a;
                }
                if (typeof a == "function") {
                    return p(a());
                }
            }

            expect(doIt(5)).toBe(10);
            expect(doIt("dog")).toBe("dogdog");
            expect(doIt(function () { return 42; })).toBe(84);
            expect(doIt(function () { return "cat" })).toBe("catcat");


        });


        it("using arguments", function () {

            var addThem = function addThem() {
               // arguments.reduce = Array.prototype.reduce;

                //return arguments.reduce(function (a, b) { return a + b; });
                return Array.prototype.reduce.apply(arguments, [function (a, b) { return a + b; }]);
               // return Array.prototype.reduce.call(arguments, function (a, b) { return a + b; });
                //var total = 0;
                //for (var t = 0; t < arguments.length; t++) {
                //    total += arguments[t];
                //}
                ////for (var t in arguments) {
                ////    total += arguments[t];
                ////}
                //return total;
            }

            expect(addThem(1, 2)).toBe(3);
            expect(addThem(1, 2, 3)).toBe(6);
            expect(addThem(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);

        });
    });

});

describe("ways of creating functions", function () {

    it("var vs. function keyword", function () {
        
      
        expect(f1).toBeUndefined();
        
        expect(f2()).toBe("f2");

        var f1 = function () {
            return "f1";
        }

        expect(f1()).toBe("f1");

        function f2() {
            return "f2";
        }
    });

    it("lifting variables", function () {
        // variable declaration, but not intializtion is lifted to the top of the scope they are defined in.
        
        expect(dog).toBeUndefined();
        var dog = 12;
        expect(dog).toBe(12);
    });
});

describe("higher-order function", function () {
    describe("partial application", function () {
        it("lame-o full application", function () {

            function tagMaker(tag, text) {
                return "<" + tag + ">" + text + "</" + tag + ">";
            }

            expect(tagMaker("h1", "Hello World!")).toBe("<h1>Hello World!</h1>");
            expect(tagMaker("h1", "Testing2")).toBe("<h1>Testing2</h1>");
            expect(tagMaker("p", "This is another")).toBe("<p>This is another</p>");
            expect(tagMaker("p", "and yet another")).toBe("<p>and yet another</p>");
        });

        it("higher order function a", function () {

            function tagMaker(tag) {
                tag = tag.toLowerCase();
                return function (content) {
                    return "<" + tag + ">" + content + "</" + tag + ">";
                }
            }

            var h1 = tagMaker("h1");
            var p = tagMaker("p");
            var h2 = tagMaker("H2");

            expect(h1("Hello World!")).toBe("<h1>Hello World!</h1>");
            expect(h1("Testing2")).toBe("<h1>Testing2</h1>");
            expect(p("This is another")).toBe("<p>This is another</p>");
            expect(p("and yet another")).toBe("<p>and yet another</p>");
            expect(h2("did this work?")).toBe("<h2>did this work?</h2>");
        });

        it("memoization", function () {

            var cache = {};
            var getWeather = function (zip) {
                
                if (cache[zip]) {
                    return cache[zip];
                } else {
                    console.log("Getting the weather from the server..");
                    if (zip == "44236") {
                        cache[zip] = "cloudy";
                    } else if (zip == "80923") {
                        cache[zip] = "sunny";
                    }
                }
                
                return cache[zip]
            }

            expect(getWeather("44236")).toBe("cloudy");
            expect(getWeather("80923")).toBe("sunny");
            expect(getWeather("44236")).toBe("cloudy");
            expect(getWeather("80923")).toBe("sunny");
        });

        it("encapsulating a variable", function () {

            var setAge, getAge;

            (function x() {

                var age = 0;
                getAge = function () {
                    return age;
                };
                setAge = function (newAge) {
                    if (newAge >= 0 && newAge <= 130) {
                        age = newAge;
                    } else {
                        // throw or something...
                    }
                }
            })(); // IEFE (immediately executing function expression) "li-pinging" a function.
            // IIFE (immediately invoked function expression.)

            

            setAge(45);
            expect(getAge()).toBe(45);
            setAge(145); // nope!
            expect(getAge()).toBe(45);
           //expect(age).toBeUndefined();



        });
    })
   
});