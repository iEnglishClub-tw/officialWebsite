$.fn.feedUtils = function feedUtils(options){
    var defaultOptions = {
        "title":"Calendar Feeds"
        "banner": "iEnglish Banner here",
        "footer": "iEnglish footers",
        "itemsPerPage":6,
        "onDisplay": function(){

        }
    } ;

    function feedUtils(element,option){
        this.options = $.extend({}, defaultOption, options || {});
        this.ele = $(element);
        drow (this);
    }
    /**
    *
    *    draw UI here
    **/
    function drow ($this) {
        $this.header = $('<h2></h2>').text($this.options.title);
        $this.banner = $('<div class="calendarBanner"></div>').text($this.options.banner);
        $this.refresh_items = $('<div class="refresh-items"></div>').empty();
        $this.footer = $('<div class="calendarBanner"></div>').text($this.options.footer);
        $this.feed = $('<div></div>').append(banner,refresh_items,footer);

    }

    /**
    *  refresh calendar items here
    *
    **/
    function refreshItemsHere(itemList){
        let items = this.refresh_items;
        // empty refresh items
        items.empty();
        itemList.foreach(()->{});
    }

    return new feedUtils(this,options);
}