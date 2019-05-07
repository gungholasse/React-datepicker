"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var react=require("react"),MILLISECONDS_IN_MINUTE=6e4,getTimezoneOffsetInMilliseconds=function(e){var t=new Date(e.getTime()),r=t.getTimezoneOffset();t.setSeconds(0,0);var n=t.getTime()%MILLISECONDS_IN_MINUTE;return r*MILLISECONDS_IN_MINUTE+n};function isDate(e){return e instanceof Date}var is_date=isDate,MILLISECONDS_IN_HOUR=36e5,MILLISECONDS_IN_MINUTE$1=6e4,DEFAULT_ADDITIONAL_DIGITS=2,parseTokenDateTimeDelimeter=/[T ]/,parseTokenPlainTime=/:/,parseTokenYY=/^(\d{2})$/,parseTokensYYY=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],parseTokenYYYY=/^(\d{4})/,parseTokensYYYYY=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],parseTokenMM=/^-(\d{2})$/,parseTokenDDD=/^-?(\d{3})$/,parseTokenMMDD=/^-?(\d{2})-?(\d{2})$/,parseTokenWww=/^-?W(\d{2})$/,parseTokenWwwD=/^-?W(\d{2})-?(\d{1})$/,parseTokenHH=/^(\d{2}([.,]\d*)?)$/,parseTokenHHMM=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,parseTokenHHMMSS=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,parseTokenTimezone=/([Z+-].*)$/,parseTokenTimezoneZ=/^(Z)$/,parseTokenTimezoneHH=/^([+-])(\d{2})$/,parseTokenTimezoneHHMM=/^([+-])(\d{2}):?(\d{2})$/;function parse(e,t){if(is_date(e))return new Date(e.getTime());if("string"!=typeof e)return new Date(e);var r=(t||{}).additionalDigits;r=null==r?DEFAULT_ADDITIONAL_DIGITS:Number(r);var n=splitDateString(e),a=parseYear(n.date,r),o=a.year,s=parseDate(a.restDateString,o);if(s){var i,u=s.getTime(),f=0;if(n.time&&(f=parseTime(n.time)),n.timezone)i=parseTimezone(n.timezone)*MILLISECONDS_IN_MINUTE$1;else{var d=u+f,c=new Date(d);i=getTimezoneOffsetInMilliseconds(c);var _=new Date(d);_.setDate(c.getDate()+1);var D=getTimezoneOffsetInMilliseconds(_)-getTimezoneOffsetInMilliseconds(c);D>0&&(i+=D)}return new Date(u+f+i)}return new Date(e)}function splitDateString(e){var t,r={},n=e.split(parseTokenDateTimeDelimeter);if(parseTokenPlainTime.test(n[0])?(r.date=null,t=n[0]):(r.date=n[0],t=n[1]),t){var a=parseTokenTimezone.exec(t);a?(r.time=t.replace(a[1],""),r.timezone=a[1]):r.time=t}return r}function parseYear(e,t){var r,n=parseTokensYYY[t],a=parseTokensYYYYY[t];if(r=parseTokenYYYY.exec(e)||a.exec(e)){var o=r[1];return{year:parseInt(o,10),restDateString:e.slice(o.length)}}if(r=parseTokenYY.exec(e)||n.exec(e)){var s=r[1];return{year:100*parseInt(s,10),restDateString:e.slice(s.length)}}return{year:null}}function parseDate(e,t){if(null===t)return null;var r,n,a;if(0===e.length)return(n=new Date(0)).setUTCFullYear(t),n;if(r=parseTokenMM.exec(e))return n=new Date(0),a=parseInt(r[1],10)-1,n.setUTCFullYear(t,a),n;if(r=parseTokenDDD.exec(e)){n=new Date(0);var o=parseInt(r[1],10);return n.setUTCFullYear(t,0,o),n}if(r=parseTokenMMDD.exec(e)){n=new Date(0),a=parseInt(r[1],10)-1;var s=parseInt(r[2],10);return n.setUTCFullYear(t,a,s),n}return(r=parseTokenWww.exec(e))?dayOfISOYear(t,parseInt(r[1],10)-1):(r=parseTokenWwwD.exec(e))?dayOfISOYear(t,parseInt(r[1],10)-1,parseInt(r[2],10)-1):null}function parseTime(e){var t,r,n;if(t=parseTokenHH.exec(e))return(r=parseFloat(t[1].replace(",",".")))%24*MILLISECONDS_IN_HOUR;if(t=parseTokenHHMM.exec(e))return r=parseInt(t[1],10),n=parseFloat(t[2].replace(",",".")),r%24*MILLISECONDS_IN_HOUR+n*MILLISECONDS_IN_MINUTE$1;if(t=parseTokenHHMMSS.exec(e)){r=parseInt(t[1],10),n=parseInt(t[2],10);var a=parseFloat(t[3].replace(",","."));return r%24*MILLISECONDS_IN_HOUR+n*MILLISECONDS_IN_MINUTE$1+1e3*a}return null}function parseTimezone(e){var t,r;return(t=parseTokenTimezoneZ.exec(e))?0:(t=parseTokenTimezoneHH.exec(e))?(r=60*parseInt(t[2],10),"+"===t[1]?-r:r):(t=parseTokenTimezoneHHMM.exec(e))?(r=60*parseInt(t[2],10)+parseInt(t[3],10),"+"===t[1]?-r:r):0}function dayOfISOYear(e,t,r){t=t||0,r=r||0;var n=new Date(0);n.setUTCFullYear(e,0,4);var a=7*t+r+1-(n.getUTCDay()||7);return n.setUTCDate(n.getUTCDate()+a),n}var parse_1=parse;function startOfYear(e){var t=parse_1(e),r=new Date(0);return r.setFullYear(t.getFullYear(),0,1),r.setHours(0,0,0,0),r}var start_of_year=startOfYear;function startOfDay(e){var t=parse_1(e);return t.setHours(0,0,0,0),t}var start_of_day=startOfDay,MILLISECONDS_IN_MINUTE$2=6e4,MILLISECONDS_IN_DAY=864e5;function differenceInCalendarDays(e,t){var r=start_of_day(e),n=start_of_day(t),a=r.getTime()-r.getTimezoneOffset()*MILLISECONDS_IN_MINUTE$2,o=n.getTime()-n.getTimezoneOffset()*MILLISECONDS_IN_MINUTE$2;return Math.round((a-o)/MILLISECONDS_IN_DAY)}var difference_in_calendar_days=differenceInCalendarDays;function getDayOfYear(e){var t=parse_1(e);return difference_in_calendar_days(t,start_of_year(t))+1}var get_day_of_year=getDayOfYear;function startOfWeek(e,t){var r=t&&Number(t.weekStartsOn)||0,n=parse_1(e),a=n.getDay(),o=(a<r?7:0)+a-r;return n.setDate(n.getDate()-o),n.setHours(0,0,0,0),n}var start_of_week=startOfWeek;function startOfISOWeek(e){return start_of_week(e,{weekStartsOn:1})}var start_of_iso_week=startOfISOWeek;function getISOYear(e){var t=parse_1(e),r=t.getFullYear(),n=new Date(0);n.setFullYear(r+1,0,4),n.setHours(0,0,0,0);var a=start_of_iso_week(n),o=new Date(0);o.setFullYear(r,0,4),o.setHours(0,0,0,0);var s=start_of_iso_week(o);return t.getTime()>=a.getTime()?r+1:t.getTime()>=s.getTime()?r:r-1}var get_iso_year=getISOYear;function startOfISOYear(e){var t=get_iso_year(e),r=new Date(0);return r.setFullYear(t,0,4),r.setHours(0,0,0,0),start_of_iso_week(r)}var start_of_iso_year=startOfISOYear,MILLISECONDS_IN_WEEK=6048e5;function getISOWeek(e){var t=parse_1(e),r=start_of_iso_week(t).getTime()-start_of_iso_year(t).getTime();return Math.round(r/MILLISECONDS_IN_WEEK)+1}var get_iso_week=getISOWeek;function isValid(e){if(is_date(e))return!isNaN(e);throw new TypeError(toString.call(e)+" is not an instance of Date")}var is_valid=isValid;function buildDistanceInWordsLocale(){var e={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:function(t,r,n){var a;return n=n||{},a="string"==typeof e[t]?e[t]:1===r?e[t].one:e[t].other.replace("{{count}}",r),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a}}}var build_distance_in_words_locale=buildDistanceInWordsLocale,commonFormatterKeys=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];function buildFormattingTokensRegExp(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(r);var n=commonFormatterKeys.concat(t).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+n.join("|")+"|.)","g")}var build_formatting_tokens_reg_exp=buildFormattingTokensRegExp;function buildFormatLocale(){var e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],t=["January","February","March","April","May","June","July","August","September","October","November","December"],r=["Su","Mo","Tu","We","Th","Fr","Sa"],n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o=["AM","PM"],s=["am","pm"],i=["a.m.","p.m."],u={MMM:function(t){return e[t.getMonth()]},MMMM:function(e){return t[e.getMonth()]},dd:function(e){return r[e.getDay()]},ddd:function(e){return n[e.getDay()]},dddd:function(e){return a[e.getDay()]},A:function(e){return e.getHours()/12>=1?o[1]:o[0]},a:function(e){return e.getHours()/12>=1?s[1]:s[0]},aa:function(e){return e.getHours()/12>=1?i[1]:i[0]}};return["M","D","DDD","d","Q","W"].forEach(function(e){u[e+"o"]=function(t,r){return ordinal(r[e](t))}}),{formatters:u,formattingTokensRegExp:build_formatting_tokens_reg_exp(u)}}function ordinal(e){var t=e%100;if(t>20||t<10)switch(t%10){case 1:return e+"st";case 2:return e+"nd";case 3:return e+"rd"}return e+"th"}var build_format_locale=buildFormatLocale,en={distanceInWords:build_distance_in_words_locale(),format:build_format_locale()};function format(e,t,r){var n=t?String(t):"YYYY-MM-DDTHH:mm:ss.SSSZ",a=(r||{}).locale,o=en.format.formatters,s=en.format.formattingTokensRegExp;a&&a.format&&a.format.formatters&&(o=a.format.formatters,a.format.formattingTokensRegExp&&(s=a.format.formattingTokensRegExp));var i=parse_1(e);return is_valid(i)?buildFormatFn(n,o,s)(i):"Invalid Date"}var formatters={M:function(e){return e.getMonth()+1},MM:function(e){return addLeadingZeros(e.getMonth()+1,2)},Q:function(e){return Math.ceil((e.getMonth()+1)/3)},D:function(e){return e.getDate()},DD:function(e){return addLeadingZeros(e.getDate(),2)},DDD:function(e){return get_day_of_year(e)},DDDD:function(e){return addLeadingZeros(get_day_of_year(e),3)},d:function(e){return e.getDay()},E:function(e){return e.getDay()||7},W:function(e){return get_iso_week(e)},WW:function(e){return addLeadingZeros(get_iso_week(e),2)},YY:function(e){return addLeadingZeros(e.getFullYear(),4).substr(2)},YYYY:function(e){return addLeadingZeros(e.getFullYear(),4)},GG:function(e){return String(get_iso_year(e)).substr(2)},GGGG:function(e){return get_iso_year(e)},H:function(e){return e.getHours()},HH:function(e){return addLeadingZeros(e.getHours(),2)},h:function(e){var t=e.getHours();return 0===t?12:t>12?t%12:t},hh:function(e){return addLeadingZeros(formatters.h(e),2)},m:function(e){return e.getMinutes()},mm:function(e){return addLeadingZeros(e.getMinutes(),2)},s:function(e){return e.getSeconds()},ss:function(e){return addLeadingZeros(e.getSeconds(),2)},S:function(e){return Math.floor(e.getMilliseconds()/100)},SS:function(e){return addLeadingZeros(Math.floor(e.getMilliseconds()/10),2)},SSS:function(e){return addLeadingZeros(e.getMilliseconds(),3)},Z:function(e){return formatTimezone(e.getTimezoneOffset(),":")},ZZ:function(e){return formatTimezone(e.getTimezoneOffset())},X:function(e){return Math.floor(e.getTime()/1e3)},x:function(e){return e.getTime()}};function buildFormatFn(e,t,r){var n,a,o=e.match(r),s=o.length;for(n=0;n<s;n++)a=t[o[n]]||formatters[o[n]],o[n]=a||removeFormattingTokens(o[n]);return function(e){for(var t="",r=0;r<s;r++)o[r]instanceof Function?t+=o[r](e,formatters):t+=o[r];return t}}function removeFormattingTokens(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|]$/g,""):e.replace(/\\/g,"")}function formatTimezone(e,t){t=t||"";var r=e>0?"-":"+",n=Math.abs(e),a=n%60;return r+addLeadingZeros(Math.floor(n/60),2)+t+addLeadingZeros(a,2)}function addLeadingZeros(e,t){for(var r=Math.abs(e).toString();r.length<t;)r="0"+r;return r}var format_1=format;function addDays(e,t){var r=parse_1(e),n=Number(t);return r.setDate(r.getDate()+n),r}var add_days=addDays;function eachDay(e,t,r){var n=parse_1(e),a=void 0!==r?r:1,o=parse_1(t).getTime();if(n.getTime()>o)throw new Error("The first date cannot be after the second date");var s=[],i=n;for(i.setHours(0,0,0,0);i.getTime()<=o;)s.push(parse_1(i)),i.setDate(i.getDate()+a);return s}var each_day=eachDay;function endOfMonth(e){var t=parse_1(e),r=t.getMonth();return t.setFullYear(t.getFullYear(),r+1,0),t.setHours(23,59,59,999),t}var end_of_month=endOfMonth;function endOfWeek(e,t){var r=t&&Number(t.weekStartsOn)||0,n=parse_1(e),a=n.getDay(),o=6+(a<r?-7:0)-(a-r);return n.setDate(n.getDate()+o),n.setHours(23,59,59,999),n}var end_of_week=endOfWeek;function getDay(e){return parse_1(e).getDay()}var get_day=getDay;function startOfMonth(e){var t=parse_1(e);return t.setDate(1),t.setHours(0,0,0,0),t}var start_of_month=startOfMonth;function getWeekDays(e){var t=void 0===e?{}:e,r=t.weekStartsOn,n=void 0===r?1:r,a=t.weekDayFormat,o=void 0===a?function(e){return format_1(e,"dd")}:a,s=new Date;return each_day(add_days(start_of_week(s),n),add_days(end_of_week(s),n)).reduce(function(e,t){return e.push(o(t)),e},[])}function getDays(e){var t=e.year,r=e.month,n=e.weekStartsOn,a=void 0===n?1:n,o=e.dayFormat,s=void 0===o?function(e){return format_1(e,"DD")}:o,i=new Date(t,r),u=start_of_month(i),f=get_day(u),d=end_of_month(i),c=Array.from(Array(f>=a?f-a:a).keys()).fill(0),_=each_day(u,d).map(function(e){return{date:e,day:s(e)}});return c.concat(_)}function useMonth(e){var t=e.year,r=e.month,n=e.weekStartsOn,a=void 0===n?1:n,o=e.dayFormat,s=void 0===o?function(e){return format_1(e,"DD")}:o,i=e.weekDayFormat,u=void 0===i?function(e){return format_1(e,"dd")}:i,f=e.monthLabelFormat,d=void 0===f?function(e){return format_1(e,"MMMM YYYY")}:f;return{days:react.useMemo(function(){return getDays({year:t,month:r,weekStartsOn:a,dayFormat:s})},[t,r,a,s]),weekDays:react.useMemo(function(){return getWeekDays({weekStartsOn:a,weekDayFormat:u})},[a,u]),monthLabel:d(new Date(t,r))}}function isBefore(e,t){var r=parse_1(e),n=parse_1(t);return r.getTime()<n.getTime()}var is_before=isBefore;function isAfter(e,t){var r=parse_1(e),n=parse_1(t);return r.getTime()>n.getTime()}var is_after=isAfter;function isWithinRange(e,t,r){var n=parse_1(e).getTime(),a=parse_1(t).getTime(),o=parse_1(r).getTime();if(a>o)throw new Error("The start of the range cannot be after the end of the range");return n>=a&&n<=o}var is_within_range=isWithinRange;function isSameDay(e,t){var r=start_of_day(e),n=start_of_day(t);return r.getTime()===n.getTime()}var is_same_day=isSameDay;function getYear(e){return parse_1(e).getFullYear()}var get_year=getYear;function getMonth(e){return parse_1(e).getMonth()}var get_month=getMonth;function startOfToday(){return start_of_day(new Date)}var start_of_today=startOfToday;function getDaysInMonth(e){var t=parse_1(e),r=t.getFullYear(),n=t.getMonth(),a=new Date(0);return a.setFullYear(r,n+1,0),a.setHours(0,0,0,0),a.getDate()}var get_days_in_month=getDaysInMonth;function addMonths(e,t){var r=parse_1(e),n=Number(t),a=r.getMonth()+n,o=new Date(0);o.setFullYear(r.getFullYear(),a,1),o.setHours(0,0,0,0);var s=get_days_in_month(o);return r.setMonth(a,Math.min(s,r.getDate())),r}var add_months=addMonths;function isDateSelected(e,t,r){return!(!t||!r)&&is_within_range(e,t,r)}function isFirstOrLastSelectedDate(e,t,r){return!!(t&&is_same_day(e,t)||r&&is_same_day(e,r))}function isDateBlocked(e,t,r,n){var a=t?new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0):t,o=r?new Date(r.getFullYear(),r.getMonth(),r.getDate(),0,0,0):r;return!!(a&&is_before(e,a)||o&&is_after(e,o)||n&&n(e))}function getDateMonthAndYear(e){var t=start_of_month(e);return{year:get_year(t),month:get_month(t),date:t}}function getCurrentYearMonthAndDate(){return getDateMonthAndYear(start_of_today())}function getInitialMonths(e,t){var r=t?getDateMonthAndYear(t):getCurrentYearMonthAndDate(),n=r.date,a=[r];return e>1&&(a=Array.from(Array(e-1).keys()).reduce(function(e){return n=add_months(e[e.length-1].date,1),e.concat([getDateMonthAndYear(n)])},a)),a}function getNextActiveMonth(e,t,r){var n=e[r>0?e.length-1:0].date;return Array.from(Array(t).keys()).reduce(function(e){return n=add_months(n,r),r>0?e.concat([getDateMonthAndYear(n)]):[getDateMonthAndYear(n)].concat(e)},[])}function getInputValue(e,t,r){return e&&"string"==typeof t?format_1(e,t):e&&"function"==typeof t?t(e):r}var START_DATE="startDate",END_DATE="endDate";function useDatepicker(e){var t=e.startDate,r=e.endDate,n=e.focusedInput,a=e.minBookingDate,o=e.maxBookingDate,s=e.onDateChange,i=e.numberOfMonths,u=void 0===i?2:i,f=e.firstDayOfWeek,d=void 0===f?1:f,c=react.useState(function(){return getInitialMonths(u,t)}),_=c[0],D=c[1],g=react.useCallback(function(e){return isDateSelected(e,t,r)},[t,r]),l=react.useCallback(function(e){return isFirstOrLastSelectedDate(e,t,r)},[t,r]),m=react.useCallback(function(e){return isDateBlocked(e,a,o)},[a,o]);return{firstDayOfWeek:d,activeMonths:_,isDateSelected:g,isFirstOrLastSelectedDate:l,isDateBlocked:m,numberOfMonths:u,onResetDates:function(){s({startDate:null,endDate:null,focusedInput:START_DATE})},onDaySelect:function(e){n===END_DATE&&t&&is_before(e,t)||n===START_DATE&&r&&is_after(e,r)?s({endDate:null,startDate:e,focusedInput:END_DATE}):n===START_DATE?s({endDate:r,startDate:e,focusedInput:END_DATE}):n===END_DATE&&t&&!is_before(e,t)&&s({startDate:t,endDate:e,focusedInput:null})},goToPreviousMonths:function(){D(getNextActiveMonth(_,u,-1))},goToNextMonths:function(){D(getNextActiveMonth(_,u,1))}}}exports.END_DATE=END_DATE,exports.START_DATE=START_DATE,exports.getCurrentYearMonthAndDate=getCurrentYearMonthAndDate,exports.getDateMonthAndYear=getDateMonthAndYear,exports.getDays=getDays,exports.getInitialMonths=getInitialMonths,exports.getInputValue=getInputValue,exports.getWeekDays=getWeekDays,exports.isDateBlocked=isDateBlocked,exports.isDateSelected=isDateSelected,exports.isFirstOrLastSelectedDate=isFirstOrLastSelectedDate,exports.useDatepicker=useDatepicker,exports.useMonth=useMonth;
