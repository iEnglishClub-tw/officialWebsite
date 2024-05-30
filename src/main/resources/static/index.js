$(document).ready(function() {
    const apiKey = 'AIzaSyA0RO4O3XjYziW4D8VUrYHvmr3-HExkQDc';
    const calendarId = 'iec.noreply@gmail.com';
    $('#carousel-container').feedUtils({
            apiKey: apiKey,
            calendarId: calendarId,
            width: '70%',
            height: '500px',
            onDisplay: function() {
                console.log('Events displayed');
            }
        });
});
