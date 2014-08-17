$(document).ready(function() {

  // $("#space-index-filter-form").find(":input").each(function(){
  //   $(this).change(function(){
  //     $("#space-index-filter-form").submit();
  //   });
  // });

  $('#space-index-filter-form').bind('submit', function(event) {

     return false;
  });

	$("#space-index-sidebar-filter-button").bind("click", function(){
		$("#space-index-filter-form").submit();
	});

  $("#space-index-filter-form").on("ajax:success", function(event, data){
    $("#space-list-wrapper").html(data);
    initializeMap();
  });

});