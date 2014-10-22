describe("calculator plugin", function () {
    var plugin,
        domain;

    beforeEach(function () {
        plugin = $('#calculator').calculator();
        domain = Progressive.utils.math;
    });

    describe("happy path", function () {
        describe("addition", function () {
            // given
            // - I have a calculator plugin
            // when
            // - the user enters 5 into num1 and 3 into num 2
            // - and clicks the add button
            beforeEach(function () {
                spyOn(domain, 'add').and.returnValue('420');
                setNum1(5);
                setNum2(3);
                clickAdd();
            });
            // then
            // - the plugin should read the numbers and give them to the domain's add method
            it("read the numbers and gave them to the domain", function () {
                expect(domain.add).toHaveBeenCalledWith(5, 3);
            });
            // - and it should display the result in the answer 
            it("displayed the result in the answer", function () {
                expect(getAnswer()).toBe('420');
            });
        });
        describe("subtraction", function () {
            beforeEach(function () {
                spyOn(domain, 'subtract').and.returnValue('1969');
                setNum1(100);
                setNum2(30);
                clickSubtract();
            });
            describe("ui stuff", function () {
                it('should read the values and pass them to the domain', function () {
                    expect(domain.subtract).toHaveBeenCalledWith(100, 30);
                });
                it('should take the answer and put it in the right spot', function () {
                    expect(getAnswer()).toBe('1969');
                });

            });
        });


        afterEach(function () {
            setNum1('');
            setNum2('');
            plugin.find('#answer').text('');
            console.log("after each");
        });
    });
    // *** Helpers *** 
    function getAnswer() {
        return plugin.find('#answer').text();
    }
    function setNum1(value) {
        plugin.find('#num1').val(value);
    }
    function setNum2(value) {
        plugin.find('#num2').val(value);
    }
    function clickSubtract() {
        plugin.find('#subtract').click();
    }
    function clickAdd() {
        plugin.find('#add').click();
    }

});
