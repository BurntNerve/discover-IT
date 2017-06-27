const HTML_RESULTS_TEMPLATE = (
    '<div class="row">' +
    '<div class="col-md-12">' +
    '<h2 id="section-title" class="fancy-title">Self Improvement</h2>' +
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
    '</div>' +
    '</div>'
);




var HTML_BUTTON_TEMPLATE = (
    '<div class="row">' +
    '<div class="row">' +
    '<input class="btn btn-default" type="submit" value="Submit">' +
    '</div>' +
    '</div>'
);
const CONTENT_BOX = ".submit-box";
const CONTENT_SEARCH_SUBMIT = "#submit-submit";
const CONTENT_SEARCH_CONTENT = "#submit-text";

var subReddits = ['coolguides', 'usefulvids', 'YouShouldKnow', 'TodayILearned', 'Knowyourshit', 'Productivity', 'Frugal', 'FoodForThought', 'DepthHub', 'LifeProTips', 'fascinating', 'ZenHabits', 'DecidingToBeBetter', 'SelfImprovement', 'GetDisciplined', 'Psychology', 'Economics', 'History', 'AskHistorians', 'AskScience', 'Documentaries'];

function handleInterestED() {


    var loopCount;

    console.log("handleInterestED ran");


    function handleContentSubmit() {
        $(CONTENT_SEARCH_SUBMIT).click(function() {
            var search_item = $(CONTENT_SEARCH_CONTENT).val();
            console.log(search_item);
            $(CONTENT_BOX).fadeOut(800);
            $(CONTENT_BOX).remove();
            getRedditData(search_item);

        });
    }





    function renderPanels(data) {
        console.log("renderPanels ran function 3");

        var prefix = data.data;
        console.log(data.data.children[0].data);
        var subreddit_title = data.data.children[0].data.subreddit_name_prefixed;
        var template = $(HTML_RESULTS_TEMPLATE);
        template.find("#section-title").text(subreddit_title);

        for (var j = 1; j < 5; j++) {


            //template = $(HTML_RESULTS_TEMPLATE);

            template.find(".subreddit-link" + j).text("By u/" + prefix.children[j - 1].data.author);

            if (prefix.children[j - 1].data.post_hint === "link" || prefix.children[j - 1].data.post_hint === undefined || prefix.children[j - 1].data.post_hint === "self") {
                template.find("#thumbnail-post" + j).remove();

            } else {
                template.find("#thumbnail-post" + j).attr("src", prefix.children[j -1].data.thumbnail);
                template.find("#thumbnail-post" + j).attr("height", prefix.children[j -1].data.thumbnail_height);
                template.find("#thumbnail-post" + j).attr("width", prefix.children[j - 1].data.thumbnail_width);
            }

            template.find("#content-title" + j).text(prefix.children[j - 1].data.title);
            template.find("#content-link" + j).attr("href", prefix.children[j - 1].data.url);

            
        }

        template.find("#section-title").text(subreddit_title);
        $("#content-holder").append(template);
    }



    function getRedditData(item) {
        console.log("getRedditData ran function 2");


        reddit.subredditsByTopic(item).fetch(function(res) {
            for (var i = 0; i < res.length; i++) {
                reddit.hot(res[i].name).limit(4).fetch(renderPanels);
                // res contains JSON parsed response from Reddit       
            }
        });


    }




    /*retrieveContent();*/
    handleContentSubmit();



}


$(function() {
    handleInterestED();
    $("#submit-text").focus();
});
