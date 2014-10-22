app.controller("QuizController", function ($rootScope, $scope, $stateParams, currentStack, $state) {
    $rootScope.showingSummary = false;
    $rootScope.stats = $rootScope.stats || {
        rightAnswers: 0,
        wrongAnswers: 0
    };
    var currentCardPos = $stateParams.id - 1;
    if (currentCardPos === 0) {
        $scope.stats.rightAnswers = 0;
        $scope.stats.wrongAnswers = 0;
    }
    $scope.data.currentQuestion = currentStack.cards[currentCardPos];
    $scope.data.nextCard = currentCardPos + 2;
    $scope.data.slug = currentStack.slug;
    $scope.cardType = "question";
    console.info("beginning with question", $scope.data.currentQuestion);

    $scope.flip = function () {
        console.info("flipping");
        $scope.cardType = "answer";
    };


    $scope.nextCard = function (wasRight) {
        if (wasRight) {
            $scope.stats.rightAnswers++;
        } else {
            $scope.stats.wrongAnswers++;
        }
        if (currentStack.cards[$scope.data.nextCard - 1]) {
            $state.go('stacks.quiz.begin', { id: $scope.data.nextCard, slug: $scope.data.slug });
        } else {
            $rootScope.showingSummary = true; // HACKY!
            $state.go('stacks.quiz.summary', { slug: $scope.data.slug });

        }
    };
});