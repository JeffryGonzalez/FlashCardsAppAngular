(function ($) {

    $.fn.calculator = function () {
        var domain = Progressive.utils.math;

        var addButton = $(this).find('#add');
        var subtractButton = $(this).find('#subtract');
        var num1 = $(this).find('#num1');
        var num2 = $(this).find('#num2');
        var answer = $(this).find('#answer');

        function doOp(op) {
            var a = parseFloat(num1.val());
            var b = parseFloat(num2.val());
            var result = domain[op](a, b);
            answer.text(result);
        }

        addButton.click(function () {
            doOp("add");
        });

        subtractButton.click(function () {
            doOp("subtract");
        });

        return this; // boilerplate jquery plugin stuff. you just doit.
    };

})(jQuery);