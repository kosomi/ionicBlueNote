//Add Note
app.controller('AddNoteCtrl',['$firebaseArray', '$scope', '$state', 'noteService', function ($firebaseArray, $scope, $state, noteService) {
    $scope.saveNote = function () {
        console.log("saveNote");
        $scope.newNote = noteService.all;
        $scope.newNote.$add({
            title: $scope.title,
            body: $scope.body
        });
        $state.go('home')
    }
}]);

//List Notes
app.controller('ListNotesCtrl', ['$firebaseArray', '$scope', 'noteService', function ($firebaseArray, $scope, noteService ) {
    $scope.notes = noteService.all;
}]);


//Single Note
app.controller('SingleNoteCtrl', ['$firebaseArray', '$stateParams','$scope', 'noteService', function ($firebaseArray, $stateParams, $scope, noteService ) {
    $scope.singleNote = noteService.get($stateParams.id);
    $scope.title = $scope.singleNote.title;
    $scope.body = $scope.singleNote.body;
}]);

//Delete Note
app.controller('DeleteNoteCtrl', ['$firebaseArray', '$ionicActionSheet',  '$scope', 'noteService', function ($firebaseArray, $ionicActionSheet, $scope, noteService ) {
  $scope.notes = noteService.all;

    $scope.showDetails = function(id){
        $ionicActionSheet.show({
           destructiveText: 'Delete',
            titleText: "Are Your Sure?",
            cancelText: "Cancel",
            destructiveButtonClicked: function () {
                var rem = $scope.notes.$getRecord(id);
                $scope.notes.$remove(rem);
                return true;
            }
        });
    }
}]);

//Edit Note
app.controller('EditNoteCtrl', ['$firebaseArray',   '$scope', 'noteService', function ($firebaseArray,  $scope, noteService ) {
    $scope.notes = noteService.all;

}]);


//Update Note
app.controller('UpdateNoteCtrl',['$firebaseArray','$scope', '$stateParams', '$state', 'noteService', function ($firebaseArray, $scope, $stateParams, $state, noteService) {
    $scope.notes = noteService.all;
    $scope.singleNote = noteService.get($stateParams.id);

    $scope.title = $scope.singleNote.title;
    $scope.body = $scope.singleNote.body;
    $scope.myid = $scope.singleNote.$id;

    $scope.updateNote = function (id) {
        var ed = $scope.notes.$getRecord(id);
        ed.title = $scope.title;
        ed.body = $scope.body;
        $scope.notes.$save(ed);

        $state.go('editNote');

    }
}]);