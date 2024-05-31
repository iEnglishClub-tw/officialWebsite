(function($) {
    $.fn.feedUtils = function(options) {
        var defaultOptions = {
            "title": "Calendar Feeds",
            "banner": "iEnglish Banner here",
            "footer": "iEnglish footers",
            "itemsPerPage": 6,
            "apiUrl": '/api/events', // Your backend API URL
            "width": '80%',
            "height": '600px',
            "onDisplay": function() {}
        };

        function feedUtils(element, options) {
            this.options = $.extend({}, defaultOptions, options || {});
            this.ele = $(element);
            this.currentPageToken = null;
            this.previousPageTokens = [];
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

        feedUtils.prototype.fetchEvents = function(pageToken = null) {
            const data = {
                page: this.previousPageTokens.length,
                size: this.options.itemsPerPage,
                pageToken: pageToken
            };

            $.ajax({
                url: this.options.apiUrl,
                data: data,
                method: 'GET',
                success: (response) => {
                    this.events = response.items;
                    this.nextPageToken = response.nextPageToken || null;
                    this.displayEvents();
                },
                error: (response) => {
                    console.error('Error fetching events:', response);
                }
            });
        };

        feedUtils.prototype.displayEvents = function() {
            this.refreshItems.empty();

            this.events.forEach(event => {
                const eventItem = `
                    <div class="calendarItem">
                        <p>${event.summary}</p>
                        <p>${new Date(event.start.dateTime || event.start.date).toLocaleString()}</p>
                    </div>
                `;
                this.refreshItems.append(eventItem);
            });

            this.updateControls();
            this.options.onDisplay();
        };

        feedUtils.prototype.updateControls = function() {
            this.prevButton.toggle(this.previousPageTokens.length > 0);
            this.nextButton.toggle(this.nextPageToken != null);
        };

        feedUtils.prototype.bindControls = function() {
            this.prevButton.off('click').on('click', () => {
                if (this.previousPageTokens.length > 0) {
                    this.currentPageToken = this.previousPageTokens.pop();
                    this.fetchEvents(this.currentPageToken);
                }
            });

            this.nextButton.off('click').on('click', () => {
                if (this.nextPageToken) {
                    this.previousPageTokens.push(this.currentPageToken);
                    this.currentPageToken = this.nextPageToken;
                    this.fetchEvents(this.currentPageToken);
                }
            });
        };

        return this.each(function() {
            new feedUtils(this, options);
        });
    };
})(jQuery);
