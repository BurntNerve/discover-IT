 
 var HTML_CARD_TEMPLATE = (
                '<div class="col-sm-11 col-md-4">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-heading">' +
                            '<h3 class="panel-title"><a class="content-link" href="#"></a></h3>' +
                        '</div>' +
                        '<div class="panel-body">' +
                            '<img src="">' +
                            '<h2></h2>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            	);

function handleInterestED() {
  	console.log("handleInterestED ran");

  	var subReddits = ['coolguides', 'usefulvids', 'YouShouldKnow', 'TodayILearned', 'Knowyourshit'];

	function renderPanels() {
		for (var i = 0; i < 6; i++) {

			var template = $(HTML_CARD_TEMPLATE);

			template.find("div").addClass("thing" + i);
			$("#content-holder").append(template);
			
		}
	}

	function retrieveContent() {

	}

	renderPanels();
}


$(function() {
	handleInterestED();
});