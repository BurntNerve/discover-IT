var HTML_CARD_TEMPLATE = (
    '<div class="col-sm-11 col-md-3">' +
    '<div class="panel panel-default glow pop">' +
    '<div class="panel-heading">' +
    '<h3 class="panel-title"><a class="subreddit-link" href="#" target="_blank"></a></h3>' +
    '</div>' +
    '<a id="content-link" href="#" target="_blank"><div class="panel-body">' +
    '<img id="thumbnail-post" height="140px" width="140px" src="">' +
    '<h4></h4>' +
    '</div></a>' +
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

var subReddits = ['coolguides', 'usefulvids', 'YouShouldKnow', 'TodayILearned', 'Knowyourshit', 'Productivity', 'Frugal', 'FoodForThought', 'DepthHub', 'LifeProTips', 'fascinating', 'ZenHabits', 'DecidingToBeBetter', 'SelfImprovement', 'GetDisciplined', 'Psychology', 'Economics', 'History', 'AskHistorians', 'AskScience', 'Documentaries'];

function handleInterestED() {




    console.log("handleInterestED ran");

    var loopCount;
    




    function renderPanels(data) {
            console.log("renderPanels ran function 3");
            var prefix = data[0].data.children[0].data;
            console.log(data[0].data.children[0].data);


            var template = $(HTML_CARD_TEMPLATE);
            
            template.find(".subreddit-link").text("From " + prefix.subreddit_name_prefixed);
            
            if(prefix.post_hint === "link" || prefix.post_hint === undefined || prefix.post_hint === "self") {
                template.find("#thumbnail-post").remove();
        
            } else {
                template.find("#thumbnail-post").attr("src", prefix.thumbnail);
                template.find("#thumbnail-post").attr("height", prefix.thumbnail_height);
                template.find("#thumbnail-post").attr("width", prefix.thumbnail_width);
            }

            template.find("h4").text(prefix.title);
            template.find("#content-link").attr("href", prefix.url);
            
            $("#content-holder").append(template);
                
    }


    function getRedditData() {
        console.log("getRedditData ran function 2");
            
            for(var i = 0; i < 4; i++) {
                loopCount = i;
                console.log(loopCount);
                var subReddit = subReddits[Math.floor(Math.random() * 20)];
                console.log(subReddit);
                reddit.random(subReddit).fetch(renderPanels);
               
            }
    
    }


    function retrieveContent() {
        console.log('retrieveContent ran function 1');
        getRedditData();
    }


    retrieveContent();


}


$(function() {
    handleInterestED();
});
