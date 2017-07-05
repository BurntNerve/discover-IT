const HTML_RESULTS_TEMPLATE = (
    '<div class="row">' +
        '<div class="col-md-12">' +
            '<a id="section-title-link" href="#" target="_blank"><h2 id="section-title" class="fancy-title"></h2></a>' +
        '</div>' +
    '</div>' +
    '<div class="row">' +
        '<div class="col-sm-11 col-md-3">' +
            '<div class="panel panel-default glow pop">' +
                '<div class="panel-heading">' +
                    '<h4 class="panel-title1"><a class="subreddit-link1" href="#" target="_blank"></a></h4>' +
                '</div>' +
                '<a id="content-link1" href="#" target="_blank">' +
                    '<div class="panel-body">' +
                        '<img id="thumbnail-post1" height="140px" width="140px" src="">' +
                        '<h4 id="content-title1"></h4>' +
                    '</div>' +
                '</a>' +
            '</div>' +
        '</div>' +
        '<div class="col-sm-11 col-md-3">' +
            '<div class="panel panel-default glow pop">' +
                '<div class="panel-heading">' +
                    '<h4 class="panel-title2"><a class="subreddit-link2" href="#" target="_blank"></a></h4>' +
                '</div>' +
                '<a id="content-link2" href="#" target="_blank">' +
                    '<div class="panel-body">' +
                        '<img id="thumbnail-post2" height="140px" width="140px" src="">' +
                        '<h4 id="content-title2"></h4>' +
                    '</div>' +
                '</a>' +
            '</div>' +
        '</div>' +
        '<div class="col-sm-11 col-md-3">' +
            '<div class="panel panel-default glow pop">' +
                '<div class="panel-heading">' +
                    '<h4 class="panel-title3"><a class="subreddit-link3" href="#" target="_blank"></a></h4>' +
                '</div>' +
                '<a id="content-link3" href="#" target="_blank">' +
                    '<div class="panel-body">' +
                        '<img id="thumbnail-post3" height="140px" width="140px" src="">' +
                        '<h4 id="content-title3"></h4>' +
                    '</div>' +
                '</a>' +
            '</div>' +
        '</div>' +
        '<div class="col-sm-11 col-md-3">' +
            '<div class="panel panel-default glow pop">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title4"><a class="subreddit-link4" href="#" target="_blank"></a></h4>' +
            '</div>' +
            '<a id="content-link4" href="#" target="_blank">' +
                '<div class="panel-body">' +
                    '<img id="thumbnail-post4" height="140px" width="140px" src="">' +
                    '<h4 id="content-title4"></h4>' +
                '</div>' +
            '</a>' +
        '</div>' +
    '</div>'
);

const HTML_BUTTON_TEMPLATE = (
    '<div class="row">' +
    '<div class="row">' +
    '<input class="btn btn-default" type="submit" value="Submit">' +
    '</div>' +
    '</div>'
);


const CONTENT_BOX = ".submit-box";
const CONTENT_SEARCH_SUBMIT = "#submit-submit";
const CONTENT_SEARCH_CONTENT = "#submit-text";

function handleInterestED() {
    //handleInterestED is the primary function of this program
    //that runs all the subsequent functions

    function handleContentSubmit() {
        //handleContentSubmit has an event listener that listens for the submission of the
        //type of content the user wants to see and then calls the requisite functions
        //in this case, getRedditData.

        $(CONTENT_SEARCH_SUBMIT).click(function(event) {
            event.preventDefault();
            var search_item = $(CONTENT_SEARCH_CONTENT).val();
            if (search_item === "") {
                console.log("Buttin");
                $(CONTENT_SEARCH_CONTENT).attr("placeholder", "You forgot to type something.");
                handleContentSubmit();
                $("#submit-text").focus();
            } else {
                $(CONTENT_SEARCH_CONTENT).val("");
                getRedditData(search_item);
            }
        });
    }

    function renderPanels(data) {
        //renderPanels takes the information from getRedditData and, using the HTML_RESULTS_TEMPLATE,
        //displays all the relevant Reddit api info on the page.

        var prefix = data.data;
        var subreddit_title = data.data.children[0].data.subreddit_name_prefixed;
        var template = $(HTML_RESULTS_TEMPLATE);
        template.find("#section-title").text(subreddit_title);

        for (var j = 1; j < 5; j++) {
            //This for loop is here so that it can do all the necessary changes to the posts which
            //each have id names that are the same except for the the number that ends them
            //hence the (".subreddit" + j) syntax.
            
            template.find(".subreddit-link" + j).text("By u/" + prefix.children[j - 1].data.author);
            template.find(".subreddit-link" + j).attr("href", "https://reddit.com/user/" + prefix.children[j - 1].data.author);
            template.find(".subreddit-link" + j).attr("rel", "noreferrer noopener");


            if (prefix.children[j - 1].data.post_hint === "link" || prefix.children[j - 1].data.post_hint === undefined || prefix.children[j - 1].data.post_hint === "self" || prefix.children[j - 1].data.thumbnail === "nsfw" ) {
                template.find("#thumbnail-post" + j).remove();

            } else {
                template.find("#thumbnail-post" + j).attr("src", prefix.children[j - 1].data.thumbnail);
                template.find("#thumbnail-post" + j).attr("height", prefix.children[j - 1].data.thumbnail_height);
                template.find("#thumbnail-post" + j).attr("width", prefix.children[j - 1].data.thumbnail_width);
            }

            template.find("#content-title" + j).text(prefix.children[j - 1].data.title);
            template.find("#content-link" + j).attr("href", prefix.children[j - 1].data.url);


        }

        template.find("#section-title").text(subreddit_title);
        if(subreddit_title.length > 1) {
            template.find("#section-title-link").attr("href", "https://reddit.com/" + subreddit_title);
            template.find("#section-title-link").attr("rel", "noreferrer noopener");
        }
        $("#content-holder").append(template);
    }

    function getRedditData(item) {
        //getRedditData calls the information from the API. This is the asynchronous 
        //part of the app.

        reddit.subredditsByTopic(item).fetch(function(res) {
            for (var i = 0; i < res.length; i++) {
                reddit.hot(res[i].name).limit(4).fetch(renderPanels);
            }
        });
    }
    handleContentSubmit();
}

$(function() {
    handleInterestED();
    $("#submit-text").focus();
});
