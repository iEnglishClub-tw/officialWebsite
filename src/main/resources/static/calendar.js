(function($) {
    $.fn.feedUtils = function(options) {
        var defaultOptions = {
            "title": "Calendar Feeds",
            "banner": "iEnglish Banner here",
            "footer": "iEnglish footers",
            "itemsPerPage": 6,
            "apiKey": '', // Your Google API key
            "calendarId": '', // Your Google Calendar ID
            "width": '80%',
            "height": '600px',
            "onDisplay": function() {}
        };

        function feedUtils(element, options) {
            this.options = $.extend({}, defaultOptions, options || {});
            this.ele = $(element);
            this.currentPage = 0;
            this.events = [];
            this.init();
        }

        feedUtils.prototype.init = function() {
            this.drawUI();
            this.setStyle();
            this.fetchEvents();
            this.bindControls();
        };

        feedUtils.prototype.setStyle = function() {
            this.ele.css({
                width: this.options.width,
                maxHeight: this.options.height,
                margin: '0 auto',
                overflow: 'hidden',
                position: 'relative'
            });
        };

        feedUtils.prototype.drawUI = function() {
            this.banner = $('<div class="calendarBanner"></div>').text(this.options.banner);
            this.refreshItems = $('<div class="refresh-items"></div>').empty();
            this.footer = $('<div class="calendarBanner"></div>').text(this.options.footer);
            this.feed = $('<div></div>').append(this.banner, this.refreshItems, this.footer);
            this.controls = $('<div class="carousel-controls"></div>');
            this.prevButton = $('<button class="carousel-control-prev">&lt;</button>');
            this.nextButton = $('<button class="carousel-control-next">&gt;</button>');
            this.controls.append(this.prevButton, this.nextButton);
            this.ele.append(this.feed, this.controls);
        };

        feedUtils.prototype.fetchEvents = function() {
            const currentYear = new Date().getFullYear();
            const timeMin = `${currentYear}-01-01T00:00:00Z`;
            const timeMax = `${currentYear}-12-31T23:59:59Z`;

            $.ajax({
                url: `https://www.googleapis.com/calendar/v3/calendars/${this.options.calendarId}/events`,
                data: {
                    key: this.options.apiKey,
                    timeMin: timeMin,
                    timeMax: timeMax,
                    singleEvents: true,
                    orderBy: 'startTime'
                },
                method: 'GET',
                success: (response) => {
                    this.events = response.items;
                    this.displayEvents();
                },
                error: (response) => {
                    console.error('Error fetching events:', response);
                }
            });
        };

        feedUtils.prototype.displayEvents = function() {
            const start = this.currentPage * this.options.itemsPerPage;
            const end = Math.min(start + this.options.itemsPerPage, this.events.length);
            const eventsToShow = this.events.slice(start, end);

            this.refreshItems.empty();

            eventsToShow.forEach(event => {
                const eventItem = `
                    <div class="calendarItem">
                        <p>${event.summary}</p>
                        <p>${new Date(event.start.dateTime || event.start.date).toLocaleString()}</p>
                    </div>
                `;
                this.refreshItems.append(eventItem);
            });

            this.updateControls();
//            this.options.onDisplay();
//            this.options.onDisplay();
        };

        feedUtils.prototype.updateControls = function() {
            const totalPages = Math.ceil(this.events.length / this.options.itemsPerPage);
            this.prevButton.toggle(this.currentPage > 0);
            this.nextButton.toggle(this.currentPage < totalPages - 1);
        };

        feedUtils.prototype.bindControls = function() {
            this.prevButton.off('click').on('click', () => {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.displayEvents();
                }
            });

            this.nextButton.off('click').on('click', () => {
                const totalPages = Math.ceil(this.events.length / this.options.itemsPerPage);
                if (this.currentPage < totalPages - 1) {
                    this.currentPage++;
                    this.displayEvents();
                }
            });
        };

        return this.each(function() {
            new feedUtils(this, options);
        });
    };
})(jQuery);
