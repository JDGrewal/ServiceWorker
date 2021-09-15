$(document).ready(function () {

    if (navigator.onLine) {
        $("#liOffline").hide();
        $("#liOnline").show();
    }
    else {
        $("#liOnline").hide();
        $("#liOffline").show();
    }
   

    $("#btnSave").on("click", function () {
        var txtInput = $("#txtInput").val();
        $.jStorage.set("MyLocalStorage", txtInput);
    });
});