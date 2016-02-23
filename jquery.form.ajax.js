$.fn.formAjax = function (functionSuccess, functionError, functionAlways) {
    var thisElement = this;
    $(this).submit(function (e) {
        e.preventDefault();
        var defaultLoadingContent = "Loading...";

        var autoLock = $(this).attr('data-lock') == 'auto' ? true : false;

        var currentStateSubmitting = $(this).data("stateSubmitting");


        var $toShowLoading = $(this).find('[data-show-loading="true"]');
        var mainContent = [];
        if (currentStateSubmitting != true) {
            $toShowLoading.each(function (index) {
                mainContent.push({
                    element: $(this),
                    content: $(this).html()
                });
                var loadingContent = $(this).data("loading-text");
                if (loadingContent == undefined) {
                    loadingContent = defaultLoadingContent;
                }
                $(this).html(loadingContent);
            });            
        }
        
        if(currentStateSubmitting==true &&autoLock==true){
            return;
        }

        $(this).data("stateSubmitting", true);

        var data = {};

        var method = $(this).attr('method');
        if (method == undefined) {
            method = "get";
        }

        var action = $(this).attr('action');
        console.log(action);
        if (action == undefined) {
            return;
        }

        var contentType = null;
        if ($(this).attr('enctype') === "multipart/form-data") {
            data = new FormData($(this)[0]);
            contentType = false;
        } else {
            data = $(this).serialize();
            contentType = "application/x-www-form-urlencoded; charset=UTF-8";
        }

        var autoReset = $(this).attr('data-reset') == 'auto' ? true : false;


        $.ajax({
            url: action,
            type: method,
            data: data,
            async: true,
            cache: false,
            contentType: contentType,
            processData: false,
            success: function (data, textStatus, jqXHR) {

                if ($.isFunction(functionSuccess)) {
                    try {
                        functionSuccess.call(thisElement, data, textStatus, jqXHR);
                    } catch (e) {
                        console.error(e);
                    }
                }
                if (autoReset) {
                    $(thisElement)[0].reset();
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if ($.isFunction(functionError)) {
                try {
                    functionError.call(thisElement, jqXHR, textStatus);
                } catch (e) {
                    console.error(e);
                }
            }
        }).always(function () {

            $.each(mainContent, function (key, value) {
                var $element = value.element;
                var content = value.content;
                $element.html(content);
            });
            $(thisElement).data("stateSubmitting", false);
            if ($.isFunction(functionAlways)) {
                try {
                    functionAlways.call(thisElement);
                } catch (e) {
                    console.error(e);
                }
            }
        });
    });
};