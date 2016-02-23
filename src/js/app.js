$(document).ready(function () {
    $("#the-form").formAjax(
            function (output,status) {
                //This function will be called on success
                $(".show-result").html(JSON.stringify(output));
            },
            function (jqXHR, textStatus) {
                //This function will be called if an error is raised
                alert("An error has been occured.");
            },
            function () {
                //This function will be called always after response
                $("#count").html(Number($("#count").html())+1);
            }
    );

});