/**
 * @fileOverview Calendar Feed Utils jQuery Plugin
 * @version 1.0.0
 * @requires jQuery
 */

/**
 * @namespace jQuery.fn
 * @function feedUtils
 * @param {Object} options - Configuration options for the feed utils.
 * @param {string} [options.title="Calendar Feeds"] - The title of the calendar feed.
 * @param {string} [options.banner="iEnglish Banner here"] - The banner text to display.
 * @param {string} [options.footer="iEnglish footers"] - The footer text to display.
 * @param {number} [options.itemsPerPage=6] - The number of items to display per page.
 * @param {string} [options.apiUrl='/api/events'] - The backend API URL for fetching events.
 * @param {string} [options.width='80%'] - The width of the feed component.
 * @param {string} [options.height='600px'] - The height of the feed component.
 * @param {function} [options.onDisplay] - Callback function to be executed when events are displayed.
 */
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

        /**
         * 元件起始點：程式的部分變數初始化
         * @constructor
         * @param {HTMLElement} element - The element to initialize the feed on.
         * @param {Object} options - The options to override default settings.
         */
        function feedUtils(element, options) {
            this.options = $.extend({}, defaultOptions, options || {});
            this.ele = $(element);
            this.currentPageToken = null;
            this.previousPageTokens = [];
            this.events = [];
            // 開始一系列邏輯
            this.init();
        }
        /**
         * Initialize the feed utils.
         */
        feedUtils.prototype.init = function() {
            // 畫出 google calendar feed 的外框：footer, header
            this.drawUI();
            // 設定元件的樣式，高度與寬度
            this.setStyle();
            // 取得後端 api 中 event 列表
            this.fetchEvents();
            // 處理上下頁按鈕的事件狀態
            this.bindControls();
        };

        /**
         * Set the style for the feed component.
         */
        feedUtils.prototype.setStyle = function() {
            this.ele.css({
                width: this.options.width,
                maxHeight: this.options.height,
                margin: '0 auto',
                overflow: 'hidden',
                position: 'relative'
            });
        };

        /**
         * Draw the user interface for the feed.
         */
        feedUtils.prototype.drawUI = function() {
            // banner 顯示
            this.banner = $('<div class="calendarBanner"></div>').text(this.options.banner);
            this.refreshItems = $('<div class="refresh-items"></div>').empty();
            // footer 顯示文字
            this.footer = $('<div class="calendarBanner"></div>').text(this.options.footer);
            this.feed = $('<div></div>').append(this.banner, this.refreshItems, this.footer);
            this.controls = $('<div class="carousel-controls"></div>');
            // 新增 Javascript 按鈕樣式，使用 arrow-button 複寫部分 css 顯示
            this.prevButton = $('<button class="carousel-control-prev arrow-button">&lt;</button>');
            this.nextButton = $('<button class="carousel-control-next arrow-button">&gt;</button>');
            this.controls.append(this.prevButton, this.nextButton);
            this.ele.append(this.feed, this.controls);
        };

        /**
         * Fetch events from the backend API.
         * @param {string|null} [pageToken=null] - The page token for pagination.
         */
        feedUtils.prototype.fetchEvents = function(pageToken = null) {
            const data = {
                page: this.previousPageTokens.length,
                size: this.options.itemsPerPage,
                pageToken: pageToken
            };
            // 依照後端 url /api/events ，取得事件 list
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

        /**
         * Display the fetched events.
         */
        feedUtils.prototype.displayEvents = function() {
            this.refreshItems.empty();
            // 顯示 google calendar events
            this.events.forEach((event, index) => {
                const eventItem = `
                    <div class="calendarItem">
                        <p>${event.summary}</p>
                        <p>${new Date(event.start.dateTime || event.start.date).toLocaleString()}</p>
                    </div>
                `;
                this.refreshItems.append(eventItem);
            });

            // 依事件取得狀態，控制 calendarItem 的左邊或右邊的縮排長度
            this.updateItemStyles();
            // 依事件取得狀態，控制上下一頁按鈕的狀態，決定是否隱藏上一頁或下一頁
            this.updateControls();
            this.options.onDisplay();
        };

        /**
         * Update the styles of the event items.
         */
        feedUtils.prototype.updateItemStyles = function() {
            const calendarItems = this.refreshItems.children('.calendarItem');
            const isFirstPage = this.previousPageTokens.length === 0;
            const isLastPage = this.nextPageToken === null;

            // Get the width of the control buttons
            const prevButtonWidth = this.prevButton.outerWidth();
            const nextButtonWidth = this.nextButton.outerWidth();

            if (isFirstPage) {
                calendarItems.css('margin-right', nextButtonWidth+'px');
            } else if (isLastPage) {
                calendarItems.css('margin-left', prevButtonWidth+'px');
            } else {
                calendarItems.css({
                    'margin-left': prevButtonWidth+'px',
                    'margin-right': nextButtonWidth+'px'
                });
            }
        };

        /**
         * Update the visibility of the control buttons.
         */
        feedUtils.prototype.updateControls = function() {
            this.prevButton.toggle(this.previousPageTokens.length > 0);
            this.nextButton.toggle(this.nextPageToken != null);
        };

        /**
         * Bind the control button events.
         */
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
