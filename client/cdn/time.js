/** jQuery TimeAgo : http://timeago.yarp.com */
(function(t){if(typeof define==="function"&&define.amd){define(["jquery"],t)}else{t(jQuery)}}(function(t){t.timeago=function(e){if(e instanceof Date){return i(e)}else if(typeof e==="string"){return i(t.timeago.parse(e))}else if(typeof e==="number"){return i(new Date(e))}else{return i(t.timeago.datetime(e))}};var e=t.timeago;t.extend(t.timeago,{settings:{refreshMillis:60000,allowPast:!0,allowFuture:!1,localeTitle:!1,cutoff:0,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",inPast:"any moment now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(i){if(!this.settings.allowPast&&!this.settings.allowFuture){throw"timeago allowPast and allowFuture settings can not both be set to false.";};var e=this.settings.strings,u=e.prefixAgo,m=e.suffixAgo;if(this.settings.allowFuture){if(i<0){u=e.prefixFromNow;m=e.suffixFromNow}};if(!this.settings.allowPast&&i>=0){return this.settings.strings.inPast};var o=Math.abs(i)/1000,s=o/60,r=s/60,n=r/24,l=n/365;function a(a,n){var s=t.isFunction(a)?a(n,i):a,r=(e.numbers&&e.numbers[n])||n;return s.replace(/%d/i,r)};var d=o<45&&a(e.seconds,Math.round(o))||o<90&&a(e.minute,1)||s<45&&a(e.minutes,Math.round(s))||s<90&&a(e.hour,1)||r<24&&a(e.hours,Math.round(r))||r<42&&a(e.day,1)||n<30&&a(e.days,Math.round(n))||n<45&&a(e.month,1)||n<365&&a(e.months,Math.round(n/30))||l<1.5&&a(e.year,1)||a(e.years,Math.round(l)),f=e.wordSeparator||"";if(e.wordSeparator===undefined){f=" "};return t.trim([u,d,m].join(f))},parse:function(e){var i=t.trim(e);i=i.replace(/\.\d+/,"");i=i.replace(/-/,"/").replace(/-/,"/");i=i.replace(/T/," ").replace(/Z/," UTC");i=i.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");i=i.replace(/([\+\-]\d\d)$/," $100");return new Date(i)},datetime:function(i){var a=e.isTime(i)?t(i).attr("datetime"):t(i).attr("title");return e.parse(a)},isTime:function(e){return t(e).get(0).tagName.toLowerCase()==="time"}});var r={init:function(){var i=t.proxy(a,this);i();var n=e.settings;if(n.refreshMillis>0){this.t$=setInterval(i,n.refreshMillis)}},update:function(i){var n=e.parse(i);t(this).data("timeago",{datetime:n});if(e.settings.localeTitle)t(this).attr("title",n.toLocaleString());a.apply(this)},updateFromDOM:function(){t(this).data("timeago",{datetime:e.parse(e.isTime(this)?t(this).attr("datetime"):t(this).attr("title"))});a.apply(this)},dispose:function(){if(this.t$){window.clearInterval(this.t$);this.t$=null}}};t.fn.timeago=function(t,i){var e=t?r[t]:r.init;if(!e){throw new Error("Unknown function name '"+t+"' for timeago");};this.each(function(){e.call(this,i)});return this};function a(){if(!t.contains(document.documentElement,this)){t(this).timeago("dispose");return this};var a=s(this),r=e.settings;if(!isNaN(a.datetime)){if(r.cutoff==0||Math.abs(n(a.datetime))<r.cutoff){t(this).text(i(a.datetime))}};return this};function s(i){i=t(i);if(!i.data("timeago")){i.data("timeago",{datetime:e.datetime(i)});var a=t.trim(i.text());if(e.settings.localeTitle){i.attr("title",i.data("timeago").datetime.toLocaleString())}else if(a.length>0&&!(e.isTime(i)&&i.attr("title"))){i.attr("title",a)}};return i.data("timeago")};function i(t){return e.inWords(n(t))};function n(t){return(new Date().getTime()-t.getTime())};document.createElement("abbr");document.createElement("time")}));

window.Fr = {};
Fr.localize = function(t){
	t = t.replace(/\-/g, "/");
	if(t.match('GMT')){
		return t.replace('GMT', "");
	}else{
		var d = new Date(t + " GMT");
		return d.toJSON();
	}
}
Fr.timeago = function(){
	$(".timeago").each(function(){
		/* Timeago on each .time elems */
		if($(this).data('Fr.timeago.ran') != "yes"){
			loc	= Fr.localize($(this).text());
			date	= new Date(loc);
			/**
       * Only do timeago if the date is valid
       */
			if(date != "Invalid Date"){
				$(this).attr("title", loc);
				$(this).text(date.toString());
				$(this).timeago();
				$(this).data('Fr.timeago.ran', "yes");
			}
		}
	});
};
Fr.timeago();
