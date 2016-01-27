$(document).ready(function(){
	$('.fa-bars').on('click',function(){
		$('.navbar').css("transform","translateX(0%)");
	});
	$('.close').on('click',function(){
		$('.navbar').css("transform","translateX(+100%)");
	});
});	