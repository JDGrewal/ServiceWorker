$(document).ready(function () {
    if (navigator.onLine) {
        $("#liOffline").hide();
        $("#liOnline").show();
    }
    else {
        $("#liOnline").hide();
        $("#liOffline").show();
    }

    var autoSyncTask = $.jStorage.get("MyLocalStorage");
    $("#txtInput").val(autoSyncTask);

});