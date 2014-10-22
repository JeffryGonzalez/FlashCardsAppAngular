app.controller("FlashCardController", function ($rootScope, $scope, flashCardPersistence) {
    $rootScope.$on('$viewContentLoaded',
        function (event) {
            // TODO: Turn this into a directive. You are a bad person and you should feel bad about yourself.
            console.log(event);
            if ($rootScope.showingSummary) {
                var theChart = document.getElementById('the-chart').getContext('2d');
                var data = [
                    {
                        value: $scope.stats.wrongAnswers,
                        color: "#F7464A",
                        highlight: "#FF5A5E",
                        label: "Wrong Answers"
                    },
                    {
                        value: $scope.stats.rightAnswers,
                        color: "#46BFBD",
                        highlight: "#5AD3D1",
                        label: "Right Answers"
                    }
                ];

                new Chart(theChart).Doughnut(data);;
            }
        });

    $rootScope.isOnline = function() {
        return navigator.onLine;
    };
    $scope.data = {};
    flashCardPersistence.open().then(function () {
        flashCardPersistence.getAll().then(function (data) {
            $scope.data.stacks = data;
        });
    }, function (error) {
        console.error(error);
    });

});
