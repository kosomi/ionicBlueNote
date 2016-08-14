app.factory('noteService', function ($firebaseArray) {
    var fbRef = new Firebase('https://noteitdev6.firebaseio.com');
    var notes = $firebaseArray(fbRef);

    var noteService = {
        all:notes,
        get:function (noteId) {
            return notes.$getRecord(noteId);
        }
    }

    return noteService;
})