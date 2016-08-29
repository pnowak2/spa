// Dropdown

$(document).ready(function(){
  // Tabs initialize
  new CBPFWTabs( document.getElementById( 'tabs' ) );
  // Animation top
  $(".calltoworks, .dropdown_close").click(function(){
  $("#dropdown1").slideToggle( "slow", function() {
  // Animation complete.
    });
  });
  
  $("#show").click(function(){
    $("p").show();
      });
        });


// Advanced filters
function showAdvancedSearch(Div_id) {
  if (false == $(Div_id).is(':visible')) {
    $(Div_id).show(250);

  }
  else {
    $(Div_id).hide(250);
  }
}  

$("select").multiselect().multiselectfilter();
