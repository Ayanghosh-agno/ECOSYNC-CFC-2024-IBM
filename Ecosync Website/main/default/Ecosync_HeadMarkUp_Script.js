<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Welcome to EcoSync</title>

<!--Ecosync Favicon display-->
<link rel="icon" href="/CFC2024/resource/1722525898000/SensorIcon/Sensor-Icons/Ecosync.png" type="image/icon type">

<script> 
    // When the user scrolls down 110px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 110 || document.documentElement.scrollTop > 110) {
    const event = new CustomEvent('enableTopButton', {
            detail: 'true',
            bubbles: true, // Allows the event to bubble up through the DOM
            composed: true // Allows the event to cross the shadow DOM boundary
        });
        this.dispatchEvent(event);
    } else {
    const event = new CustomEvent('enableTopButton', {
            detail: 'false',
            bubbles: true, // Allows the event to bubble up through the DOM
            composed: true // Allows the event to cross the shadow DOM boundary
        });
        this.dispatchEvent(event);
    }
}
    
function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// When the user clicks on the button, scroll to the top of the document
document.addEventListener('goToTopButton', function(e) {
    goToTop()
});
</script>
