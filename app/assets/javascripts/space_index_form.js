// JavaScript Document

$(document).ready(function() {

  $("#space-index-filter-form").find(":input").each(function(){
    $(this).change(function(){
      $("#space-index-filter-form").submit(function() {  
      var valuesToSubmit = $(this).serialize();
        $.ajax({
          type: "POST",
          url: "/spaces", //sumbits it to the given url of the form
          data: valuesToSubmit,
          dataType: "JSON" // you want a difference between normal and ajax-calls, and json is standard
        }).success(function(event, data){
          $("#space-list-wrapper").html(data);
            initializeMap();
          });
          return false; // prevents normal behaviour
          });
    });
  });

 //  $('#space-index-filter-form').bind('submit', function(event) {
 //     return false;
 //  });

  // $("#space-index-sidebar-filter-button").bind("click", function(){
  //  $("#space-index-filter-form").submit();
  // });

  // $("#space-index-filter-form").on("ajax:success", function(event, data){
  //   $("#space-list-wrapper").html(data);
  //   initializeMap();
  // });

});