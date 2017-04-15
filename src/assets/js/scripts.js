// Machine Learning%:CSE1212%:Midterm 1%:190%:yes%:yes

$(function() {
  $('input').on('change', function() {
    var input = $(this);
    if (input.val().length) {
      input.addClass('populated');
    } else {
      input.removeClass('populated');
    }
  });
  
  setTimeout(function() {
    $('#fname').trigger('focus');
  }, 500);
});


function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

$('#toggleFullscreen').click(function(){
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
});

$('#resetTimer').click(function(){

});

$('#loadBackup').click(function(){
    const data = $('#load_string').val().split("%:");
    if(data.length > 1){
      $('#course').val(data[0]);
      $('#number').val(data[1]);
      $('#title').val(data[2]);
      $('#duration').val(data[3]);
      $('#calculator').val(data[4]);
      $('#blanksheets').val(data[5]);

      $('#loadFRomBackupDiv').html(`
      <span style="color: #ffe;" >The exam has been loaded from the backup string. Make changes above as you like and then click 'Proceed'.</span>
      `);
    }

    else{
      setTimeout(function(){
          $('#invalidbackupstringalert').removeClass('hidden');
      }, 400);
    }
});