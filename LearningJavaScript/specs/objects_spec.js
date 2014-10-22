describe("objects", function () {

    describe("object creation patterns", function () {
        describe("constructor functions", function () {
            function Movie(title, director, yearReleased) {
                var age = 0;
                function doSomething() {

                };
                this.title = title;
                this.director = director;
                this.yearReleased = yearReleased;
                this.getInfo = function () {
                    return this.title + " by " + this.director + " in " + this.yearReleased;
                }
            }

            it("allows you to create objects!", function () {
                

                //var ep3 = Movie("Revenge of the Jedi", "Lucas", 2007);

                var ep4 = new Movie("A New Hope", "Lucas", 1977);
                var ep5 = new Movie("The Empire Strikes Back", "Kershner", 1980);

                expect(ep4.title).toBe("A New Hope");
                expect(ep5.title).toBe("The Empire Strikes Back");
                expect(ep4.getInfo()).toBe("A New Hope by Lucas in 1977");
            })

            it("allows you to extend instances", function () {
                var gotg = new Movie("Guardians of the Galaxy", "Jones", 2014);

                gotg.cast = [{ name: "Zoe Saldana" }];
                expect(gotg.cast[0].name).toBe("Zoe Saldana");

                gotg.getInfo = function () { return "Awesome!"; };

                var master = new Movie("The Master", "Anderson", 2012);
                expect(master.cast).toBeUndefined();

            });
            it("extending all instances", function () {

                var rocky = new Movie("Rocky", "Stallone", 1975);
                var shadows = new Movie("Shadows", "Cassavetes", 1958);

                Movie.prototype.play = function () {
                    return "Playing " + this.title;
                };


                expect(rocky.play()).toBe("Playing Rocky");
                expect(shadows.play()).toBe("Playing Shadows");
            });

        });

        describe("anonymous objects", function () {
            it("has a literal syntax", function () {
                var episodeIV = {
                    title: "A New Hope",
                    director: "Lucas",
                    yearReleased: 1977
                };

                expect(episodeIV.title).toBe("A New Hope");

                episodeIV.cast = [];
                episodeIV.cast.push({ role: "Luke Skywalker", actor: "Mark Hamill" });
                episodeIV.cast.push({ role: "Princess Leia", actor: "Carrie Fisher" });

                expect(episodeIV.cast.length).toBe(2);
                expect(episodeIV.cast[0].actor).toBe("Mark Hamill");

                episodeIV.getInfo = function () {
                    return this.title + " by " + this.director + " in " + this.yearReleased;
                }


                expect(episodeIV.getInfo()).toBe("A New Hope by Lucas in 1977");

            });

            it("how about private stuff?", function () {

                var person;
                (function () {
                    var age = 0;
                    function normalizeName(name) {
                        return name.toLowerCase();
                    }
                    person = {
                        formatName: function (first, last) {

                            return normalizeName(first) + " " + normalizeName(last);
                        },
                        getAge: function () {
                            return age;
                        },
                        setAge: function (newAge) {
                            age = newAge;
                        }
                    }
                })();
                
                person.setAge(45);
                expect(person.getAge()).toBe(45);
                // just try to get to age! I dare you!

                var x = {
                    __counter: 0,
                    increment: function () {
                        __counter++;
                    }
                }

                expect()
            });
        });
    });
    describe("duck typing", function () {
        it("works", function () {
            function fixString(theString) {
                return theString.toUpperCase();
            }

            expect(fixString("dog")).toBe("DOG");

            var thingy = {};
            thingy.toUpperCase = function () { return "Hi Mom!"; };

            expect(fixString(thingy)).toBe("Hi Mom!");
        });
    });
    describe("this", function () {
        it("is to the window on an inline function", function () {
            ("use strict");
            var x = function () { return this.message; }; // this == window
            expect(x()).toBeUndefined();
            window.message = "Hello, World!";
            expect(x()).toBe("Hello, World!");
        });
        it("it refers to the object if it is attached to an object", function () {
            var x = function () { return this.message; };
            var someObject = { doIt: x, message: "I'm an object!" }; // this == someObject
            expect(someObject.doIt()).toBe("I'm an object!");

        });
        it("changing this to something else", function () {
            var objectA = {
                name: "Joe",
                sayHi: function () {
                    return this.name + " says hello!";
                }
            };
            expect(objectA.sayHi()).toBe("Joe says hello!");

            var objectB = {
                name: "roast beef",
                weight: "12oz",
                cooking: "well done"
            }

            //objectB.sayHi = objectA.sayHi;
            //expect(objectB.sayHi()).toBe("roast beef says hello!");
            //for (var prop in objectB) {
            //    console.log(prop);
            //}

            expect(objectA.sayHi.apply(objectB)).toBe("roast beef says hello!");
            for (var prop in objectB) {
                console.log(prop);
            }

        });
    });
});