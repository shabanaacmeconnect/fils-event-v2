// $(document).on("change", ".amount-field", function(){
//   setcardframe()
// })
$('.card-frame').ready(function(){
  setTimeout(()=>{
  })
})
$(document).on("click", ".paynowbutton", function(){
  setcardframe();
})
  
function setcardframe(){
  var payButton = document.getElementById("pay-button");
  var form = document.getElementById("payment-form");
  // Frames.init("pk_test_331ff75c-6b8e-463b-96d3-12bb63872c50");
  // Frames.init("pk_test_fb29c2d0-7f3b-4d33-930b-cc4657edbbe1");
  Frames.init("pk_lr3azrgtabxwlnwld7v7risamqw")
  Frames.addEventHandler(
    Frames.Events.CARD_VALIDATION_CHANGED,
    function (event) {
      console.log("CARD_VALIDATION_CHANGED:%o", event);
      payButton.disabled =(!Frames.isCardValid() || $("#drive-amount-payment").val()=='')
    }
  );
  
    // $(document).on("change", ".amount-field", function(){
    //   payButton.disabled =(!Frames.isCardValid() || $("#drive-amount-payment").val()=='')
  
    // })
    $(document).on("submit", ".horizontal-form",function() {
      payButton.disabled =(!Frames.isCardValid() || $("#drive-amount-payment").val()=='')
  
  })
    $(document).on("click", ".amount-buttons", function(){
      payButton.disabled =(!Frames.isCardValid() || $("#drive-amount-payment").val()=='')
    })
  Frames.addEventHandler(
    Frames.Events.CARD_TOKENIZED,
    function (event) {
      var el = document.getElementById("success-payment-message")
      el.setAttribute('value', event.token);
      let drive_id= document.getElementById("drive-id-payment").getAttribute('value')
      let data = new FormData();
      data.append( 'token', event.token);
      data.append( 'offset_amount',document.getElementById("drive-amount-payment").getAttribute('value'));
      // data.append( 'offset_amount','1');
      // data.append( 'amount','0.001');
      data.append( 'event_id', drive_id);
      let token=localStorage.getItem('currentUser');
      token=JSON.parse(token).token
      $.ajax({
          // url: 'https://devlabapi.filscare.com/v1/charityDrivePayment',
          // url: 'https://testapi.filscare.com/v1/charityDrivePayment',
          url: 'https://dev.filsconnect.com/eventManager/eventOffsetPayment',
          type: 'post',
          processData: false,
          contentType: false, 
          headers:{"Authorization": "Bearer "+token},
          data: data,
      }).done(function (data){
          if(data.status==true)
          window.location.replace(location.origin+'/events/'+drive_id+'/overview/'+data.transaction_id)
          else
          window.location.replace(location.origin+'/events/'+drive_id+'/overview/'+data.transaction_id)
  
      })
        
  }
  );
  
  form.addEventListener("submit", function (event) {
   payButton.disabled = true // disables pay button once submitted
    event.preventDefault();
    Frames.submitCard();
  });
}