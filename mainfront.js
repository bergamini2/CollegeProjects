// progress-bar is from the css bootstrap, when i click button, loads and lasts 8 seconds




var loadingTime = 200;
var recycle;

//***************************************************************/
//NEW!!! Added 1/22 7:03 AM
$("#scanBtn").click(function(){
    $(".hideImg").show(1000);
});
//***************************************************************/

function processImage(){
    //Changes text on the button
    $("#scanBtn").text('Loading...');
    
    setInterval(function(){ $("#scanBtn").text('Finished!'); ; }, loadingTime + 100);


    //Animates the progress bar
    $(".progress-bar").animate({
        width: "100%"
    }, loadingTime);

    
    $.ajax({
    url: 'http://localhost:3000',
    success: function (data) {
    	if(data == "Not Recycleable"){
    		$("#heading").text('Trash it!');
    		$("#heading").css('color','#1A5276');
    	}
    	else{
    		$("#heading").text('Recycle it!');
    		$("#heading").css('color', 'green');
    	}
       
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
        $('#lblResponse').html('Error connecting to the server.');
    }
});
} //end function




function refreshPage(){
    location.reload();
} //end function 
