"use strict";function getPathResolver(a){return function(b,c,d,e){void 0===d&&(d=!0);var f=[];for(var g in a){var h=a[g].controller;if(h===b){var i=g,j=0;for(var k in c){var l=c[k]+"";if(void 0!==l&&""!==l){var m=i.replace(":"+k,l);m!==i&&j++,i=m}}!e&&d&&(i="/#"+i),"*"===i[i.length-1]&&(i=i.substring(0,i.length-1)),f.push({route:i,score:j})}}var n,o;for(var p in f){var q=f[p].route,r=f[p].score;void 0===n||r>n?(n=r,o=q):n===r&&o.length>q.length&&(n=r,o=q)}return o}}function get_not_duped_filtered_packages(a){var b={};for(var c in a){var d=a[c].prop,e=a[c].id,f={};f.options=d.options,f.settings=d.settings,f.full_requires=[],f.id=e,f.downloads=a[c].downloads;for(var g in d.full_requires){var h=d.full_requires[g];-1==f.full_requires.indexOf(h)&&f.full_requires.push(h)}b[e]=f}return b}function init_scripts_one_page(){$(function(){$("a.autoscroll").bind("click",function(a){var b=$(this);$("html, body").stop().animate({scrollTop:$(b.attr("href")).offset().top},1500,"easeInOutExpo"),a.preventDefault()})}),$(".navbar-collapse ul li a").click(function(){$(".navbar-toggle:visible").click()})}angular.module("httpBasicAuthModule",[]),angular.module("conan",["config","httpBasicAuthModule","ngAnimate","ngAria","ngCookies","ngKookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","angular-flash.service","angular-flash.flash-alert-directive","hljs","angulartics","angulartics.google.analytics","ngclipboard"]),angular.module("conan").factory("authInjector",["$rootScope","ENV",function(a,b){var c={request:function(c){if(0==c.url.indexOf("http")&&(c.headers=c.headers||{},c.url!=b.apiEndpoint+"/users/authenticate")){var d=a.get_logged_username_token();d?c.headers.Authorization="Bearer "+d:delete c.headers.Authorization}return c}};return c}]),angular.module("conan").factory("loaderInjector",["$rootScope","$q",function(a,b){var c={request:function(b){return 0==b.url.indexOf("http")&&(console.log("Calling: "+b.url),b.disable_loader||a.$broadcast("loadingEvent")),b},response:function(b){return 0==b.config.url.indexOf("http")&&(console.log("Response: "+b.config.url),b.config.disable_loader||a.$broadcast("loadingFinishedEvent",!0)),b},responseError:function(c){return-1!=c.config.url.indexOf("authenticate")?b.reject(c):(console.log("Error in response! "+c.config),console.log(c),401==c.status?(console.log("Unauthorized 401!, emiting 401Event"),a.$broadcast("401Event")):403==c.status?(console.log("Forbidden 403! redirected to home"),a.$broadcast("403Event")):404==c.status?(console.log("404! emiting event:"),console.log(c),a.$broadcast("404Event")):c.status>410&&c.status<500?a.$broadcast("loadingFinishedEvent",!0):0==c.status?a.$broadcast("loadingFinishedEvent",!0):a.$broadcast("loadingFinishedEvent",!1),b.reject(c))}};return c}]),angular.module("conan").run(["ENV","$location","$route","$rootScope","$window",function(a,b,c,d,e){d.path=getPathResolver(c.routes),d.search=function(a){b.path("/search").search("q",a)},d.$on("$routeChangeSuccess",function(a,b,c,d,e){!b.$$route}),d.$on("$viewContentLoaded",function(){init_scripts_one_page()}),d.len=function(a){return a?Object.keys(a).length:0}}]).config(["flashProvider",function(a){a.errorClassnames.push("alert-danger"),a.successClassnames.push("alert-success"),a.warnClassnames.push("alert-warning")}]).filter("split",function(){return function(a,b,c){var d="";if(!a)return"";var e=a.split(b),f=e[c];return f?(0==c&&e.length>1&&(d=b),f+d):""}}).config(["$httpProvider","ENV",function(a,b){console.log("Loading analytics..."+b.ga_id+" =>"+b.ga_domain),function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create",b.ga_id,b.ga_domain),ga("require","displayfeatures"),a.interceptors.push("authInjector"),a.interceptors.push("loaderInjector")}]);var httpBasicAuthModule=angular.module("httpBasicAuthModule");httpBasicAuthModule.service("HttpBasicAuth",["Base64","$rootScope","$http",function(a,b,c){this.getAuthorizationHeaderValue=function(b,c){var d="Basic "+a.encode(b+":"+c);return d}}]),angular.module("httpBasicAuthModule").service("Base64",function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.encode=function(b){var c,d,e,f,g,h="",i="",j="",k=0;do c=b.charCodeAt(k++),d=b.charCodeAt(k++),i=b.charCodeAt(k++),e=c>>2,f=(3&c)<<4|d>>4,g=(15&d)<<2|i>>6,j=63&i,isNaN(d)?g=j=64:isNaN(i)&&(j=64),h=h+a.charAt(e)+a.charAt(f)+a.charAt(g)+a.charAt(j),c=d=i="",e=f=g=j="";while(k<b.length);return h},this.decode=function(b){var c,d,e,f,g,h="",i="",j="",k=0,l=/[^A-Za-z0-9\+\/\=]/g;l.exec(b)&&alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),b=b.replace(/[^A-Za-z0-9\+\/\=]/g,"");do e=a.indexOf(b.charAt(k++)),f=a.indexOf(b.charAt(k++)),g=a.indexOf(b.charAt(k++)),j=a.indexOf(b.charAt(k++)),c=e<<2|f>>4,d=(15&f)<<4|g>>2,i=(3&g)<<6|j,h+=String.fromCharCode(c),64!=g&&(h+=String.fromCharCode(d)),64!=j&&(h+=String.fromCharCode(i)),c=d=i="",e=f=g=j="";while(k<b.length);return h}}),angular.module("conan").factory("User",["$resource","ENV",function(a,b){var c=b.apiEndpoint+"/users/:username/:path",d=a(c,{username:"@username",path:"@path"},{get:{method:"GET",isArray:!1},post:{method:"POST",isArray:!1},put:{method:"PUT",isArray:!1}});return d.read=function(a,b,c){var e={username:a};return d.get(e).$promise.then(b,c)},d.register=function(a,b,c){return d.post(a).$promise.then(b,c)},d.send_confirmation_email=function(a,b,c){var e={login:a};return e.path="send_confirmation_email",e.username=void 0,d.post(e).$promise.then(b,c)},d.send_welcome_email=function(a,b,c){var e={login:a};return e.path="send_welcome_email",e.username=void 0,d.post(e).$promise.then(b,c)},d.send_password_reset_email=function(a,b,c,e){var f={login:a,password:b};return f.path="send_password_reset_email",f.username=void 0,d.post(f).$promise.then(c,e)},d.confirm_account=function(a,b,c){return a.path="confirm_account",a.username=void 0,d.put(a).$promise.then(b,c)},d.confirm_password_reset=function(a,b,c){var e={token:a};return e.path="pass_reset_confirm",e.username=void 0,d.put(e).$promise.then(b,c)},d.update=function(a,b,c){return a.path="update",a.username=void 0,d.put(a).$promise.then(b,c)},d.change_password=function(a,b,c){return a.path="change_password",a.username=void 0,d.put(a).$promise.then(b,c)},d}]),angular.module("conan").factory("Search",["$resource","ENV",function(a,b){var c=b.apiEndpoint+"/:conan_ref/search",d=a(c,{conan_ref:"@conan_ref"},{get:{method:"GET",isArray:!1}});return d.search=function(a,b,c){var e={q:a};console.log(e);var f=d.get(e).$promise.then(b,c);return f},d.parseResults=function(a){var b=[];console.log(a);for(var c in a){var d=[];d.id=c,d.ref=c.replace("@","/");var e=d.ref.split("/");d.params={name:e[0],version:e[1],user:e[2],channel:e[3]},d.downloads=a[c],d.curPage=0,b.push(d)}return b},d}]),angular.module("conan").factory("SearchPackages",["$resource","ENV",function(a,b){var c=b.apiEndpoint+"/:name/:version/:user/:channel/search?q=:q",d=a(c,{name:"@name",version:"@version",user:"@user",channel:"@channel",q:"@q"},{get:{method:"GET",isArray:!1}});return d.search_packages=function(a,b,c,e,f,g,h){var i={q:f,name:a,version:b,channel:e,user:c};console.log(i);var j=d.get(i).$promise.then(g,h);return j},d.parseResults=function(a){var b=[];for(var c in a){var d=a[c].downloads,e=a[c].props;if(e){var f={id:c,prop:e,downloads:d};b.push(f)}}return b},d}]),angular.module("conan").factory("Package",["$resource","ENV",function(a,b){var c=b.apiEndpoint+"/packages/:conan_ref/:path",d=a(c,{conan_ref:"@conan_ref",path:"@path"},{get:{method:"GET",isArray:!1},post:{method:"POST",isArray:!1},put:{method:"PUT",isArray:!1}});return d.get_conanfile=function(a,b,c){var e={conan_ref:a};return e.path="conanfile",d.get(e).$promise.then(b,c)},d}]),angular.module("conan").directive("oauthLoginButton",["ENV",function(a){return{restrict:"E",scope:{provider:"=",action:"="},controller:["$scope","$element",function(b,c){b.baseurl=a.apiEndpoint}],templateUrl:"views/_oauth_button.html"}}]),angular.module("conan").config(["ENV","$routeProvider","$locationProvider",function(a,b,c){b.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/carousel",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/accounts/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/accounts/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl"}).when("/accounts/confirm",{templateUrl:"views/empty.html",controller:"ConfirmAccountCtrl"}).when("/accounts/password_reset",{templateUrl:"views/password_reset.html",controller:"PasswordResetCtrl"}).when("/accounts/pass_reset_confirm",{templateUrl:"views/empty.html",controller:"ConfirmPasswordResetCtrl"}).when("/search",{templateUrl:"views/search/search_results.html",controller:"SearchCtrl"}).when("/downloads",{templateUrl:"views/downloads.html",controller:"DownloadsCtrl"}).when("/source/:name/:version/:user/:channel",{templateUrl:"views/detail/conan_detail.html",controller:"ConanFileCtrl"}).when("/404",{templateUrl:"views/404.html",controller:"HomeCtrl"}).when("/contact-ok",{templateUrl:"views/contact_ok.html",controller:"HomeCtrl"}).when("/privacy",{templateUrl:"views/privacy.html",controller:"PrivacyCtrl"}).when("/terms_conditions",{templateUrl:"views/terms.html",controller:"TermsCtrl"}).when("/:username",{templateUrl:"views/users/show_profile.html",controller:"ShowProfileCtrl"}).otherwise({redirectTo:"/"}),c.html5Mode({enabled:a.html5Mode,requireBase:!1})}]),angular.module("config",[]).constant("ENV",{name:"localdev",apiEndpoint:"http://localhost:9301/v1",html5Mode:!1,ga_id:"UA-68594724-1",ga_domain:"localhost",download_base_url:"https://github.com/conan-io/conan/releases/download/0.26.1/",version:"0.26.1"}),angular.module("conan").controller("ConanCtrl",["User","$rootScope","$kookies","$scope","$window","$location","$timeout","ENV","flash",function(a,b,c,d,e,f,g,h,i){function j(){d.loading=!1,d.error500=!1,d.error404=!1,d.showhomebanner=!1}d.loading=!1,d.error500=!1,d.error404=!1,d.showhomebanner=!1,d.$on("loadingEvent",function(a){window.prerenderReady=!1,$("html, body").css("cursor","wait"),$("button").css("cursor","wait"),$("a").css("cursor","wait"),$("input").css("cursor","wait")}),d.$on("loadingFinishedEvent",function(a,b){window.prerenderReady=!0,$("html, body").css("cursor","auto"),$("button").css("cursor","pointer"),$("a").css("cursor","pointer"),$("input").css("cursor","text"),b||d.$emit("500Event")}),d.$on("$routeChangeStart",function(a,b){j()}),d.$on("SignUpEvent",function(a,b){if(void 0!=b[0]&&void 0!=b[1]){var c=b[0],e=b[1],g=b[2],h=b[3],i=b[4],j=b[5];d.mp_alias(c),d.mp_register_event("AccountConfirmed",{}),d.sign_in(c,e,g,h,i,j),f.path("/"+c)}else console.log("Error: login is undefined")}),d.$on("SignInEvent",function(a,b){if(void 0!=b[0]&&void 0!=b[1]){var c=b[0],e=b[1],g=b[2],h=b[3],i=b[4],j=b[5];d.sign_in(c,e,g,h,i,j),f.path("/"+c)}else console.log("Error, login is undefined")}),d.$on("401Event",function(){console.log("401 event!"),d.sign_out("/accounts/login")}),d.$on("403Event",function(){console.log("403 event!"),f.path("/")}),d.$on("404Event",function(){console.log("404 event!"),j(),d.error404=!0,swal("404","Not found","warning");(navigator.language||"").slice(0,2),location.host}),d.$on("500Event",function(){console.log("500 event!"),j(),d.error500=!0,swal("Error","Internal server error: Check internet connection and try again.","error");(navigator.language||"").slice(0,2),location.host}),b.clear_user_session=function(){c.remove("conan_token",{path:"/"}),c.remove("conan_username",{path:"/"}),c.remove("conan_client_id",{path:"/"}),c.remove("conan_email",{path:"/"}),c.remove("conan_created_at",{path:"/"}),c.remove("conan_full_name",{path:"/"})},b.put_user_session=function(a,b,d,e,f,g){c.set("conan_token",b,{path:"/"}),c.set("conan_username",a,{path:"/"}),c.set("conan_client_id",d,{path:"/"}),c.set("conan_email",e,{path:"/"}),c.set("conan_created_at",f,{path:"/"}),c.set("conan_full_name",g,{path:"/"})},b.get_logged_username=function(){return c.get("conan_username",{path:"/"})},b.get_logged_username_token=function(){return c.get("conan_token",{path:"/"})},b.get_logged_client_id=function(){return c.get("conan_client_id",{path:"/"})},b.ga_identify=function(){void 0!=b.get_logged_client_id()&&window.ga("set","&uid",b.get_logged_client_id())},b.trackAdwordsConversion=function(a,b){var c=new Image(1,1);c.src="//www.googleadservices.com/pagead/conversion/"+a+"/?label="+b},b.ga_displayfeatures=function(){window.ga("require","displayfeatures")},d.sign_in=function(a,b,c,e,f,g){d.put_user_session(a,b,c,e,f,g),d.mp_identify(a),d.ga_identify()},d.sign_out=function(a){a=a||"/",d.clear_user_session(),j(),a&&f.path(a)},d.require_user=function(){angular.module("httpBasicAuthModule"),d.is_logged()||(console.log("Required loggin!"),d.$emit("401Event"))},d.is_logged=function(){return void 0!=c.get("conan_token",{path:"/"})},d.shake_element=function(){d.shake="shake",g(function(){d.shake=""},1e3)},d.mp_get_distinct_id=function(){},d.mp_register_event=function(a,b){},d.mp_alias=function(a){},d.mp_identify=function(a){},d.path_to_block=function(a,b,c,e){return d.path("ShowBlockCtrl",{owner:a,creator:b,block_name:c,branch:e})},d.get_brl_url=function(a,b,c,e,f){var g="",h="";return f?linked_creator='<a href="/#/'+b+'">'+b+"</a>":linked_creator=b,b!=a?(h=d.path("ShowBlockCtrl",{owner:a,creator:b,block_name:c,branch:e}),block_link='<a href="'+h+'">'+c+"</a>",g=linked_creator+"/"+block_link+" ("+a+"/"+e+") "):"master"==e?(h=d.path("ShowBlockCtrl",{owner:a,block_name:c}),block_link='<a href="'+h+'">'+c+"</a>",g=linked_creator+"/"+block_link):(h=d.path("ShowBlockCtrl",{owner:a,creator:b,block_name:c,branch:e}),block_link='<a href="'+h+'">'+c+" ("+e+") </a>",g=linked_creator+"/"+block_link),[g,h]},d.country_codes={AF:"Afghanistan",AX:"Åland Islands",AL:"Albania",DZ:"Algeria",AS:"American Samoa",AD:"Andorra",AO:"Angola",AI:"Anguilla",AQ:"Antarctica",AG:"Antigua and Barbuda",AR:"Argentina",AM:"Armenia",AW:"Aruba",AU:"Australia",AT:"Austria",AZ:"Azerbaijan",BS:"Bahamas",BH:"Bahrain",BD:"Bangladesh",BB:"Barbados",BY:"Belarus",BE:"Belgium",BZ:"Belize",BJ:"Benin",BM:"Bermuda",BT:"Bhutan",BO:"Bolivia, Plurinational State of",BQ:"Bonaire, Sint Eustatius and Saba",BA:"Bosnia and Herzegovina",BW:"Botswana",BV:"Bouvet Island",BR:"Brazil",IO:"British Indian Ocean Territory",BN:"Brunei Darussalam",BG:"Bulgaria",BF:"Burkina Faso",BI:"Burundi",KH:"Cambodia",CM:"Cameroon",CA:"Canada",CV:"Cape Verde",KY:"Cayman Islands",CF:"Central African Republic",TD:"Chad",CL:"Chile",CN:"China",CX:"Christmas Island",CC:"Cocos (Keeling) Islands",CO:"Colombia",KM:"Comoros",CG:"Congo",CD:"Congo, the Democratic Republic of the",CK:"Cook Islands",CR:"Costa Rica",CI:"Côte d'Ivoire",HR:"Croatia",CU:"Cuba",CW:"Curaçao",CY:"Cyprus",CZ:"Czech Republic",DK:"Denmark",DJ:"Djibouti",DM:"Dominica",DO:"Dominican Republic",EC:"Ecuador",EG:"Egypt",SV:"El Salvador",GQ:"Equatorial Guinea",ER:"Eritrea",EE:"Estonia",ET:"Ethiopia",FK:"Falkland Islands (Malvinas)",FO:"Faroe Islands",FJ:"Fiji",FI:"Finland",FR:"France",GF:"French Guiana",PF:"French Polynesia",TF:"French Southern Territories",GA:"Gabon",GM:"Gambia",GE:"Georgia",DE:"Germany",GH:"Ghana",GI:"Gibraltar",GR:"Greece",GL:"Greenland",GD:"Grenada",GP:"Guadeloupe",GU:"Guam",GT:"Guatemala",GG:"Guernsey",GN:"Guinea",GW:"Guinea-Bissau",GY:"Guyana",HT:"Haiti",HM:"Heard Island and McDonald Islands",VA:"Holy See (Vatican City State)",HN:"Honduras",HK:"Hong Kong",HU:"Hungary",IS:"Iceland",IN:"India",ID:"Indonesia",IR:"Iran, Islamic Republic of",IQ:"Iraq",IE:"Ireland",IM:"Isle of Man",IL:"Israel",IT:"Italy",JM:"Jamaica",JP:"Japan",JE:"Jersey",JO:"Jordan",KZ:"Kazakhstan",KE:"Kenya",KI:"Kiribati",KP:"Korea, Democratic People's Republic of",KR:"Korea, Republic of",KW:"Kuwait",KG:"Kyrgyzstan",LA:"Lao People's Democratic Republic",LV:"Latvia",LB:"Lebanon",LS:"Lesotho",LR:"Liberia",LY:"Libya",LI:"Liechtenstein",LT:"Lithuania",LU:"Luxembourg",MO:"Macao",MK:"Macedonia, the former Yugoslav Republic of",MG:"Madagascar",MW:"Malawi",MY:"Malaysia",MV:"Maldives",ML:"Mali",MT:"Malta",MH:"Marshall Islands",MQ:"Martinique",MR:"Mauritania",MU:"Mauritius",YT:"Mayotte",MX:"Mexico",FM:"Micronesia, Federated States of",MD:"Moldova, Republic of",MC:"Monaco",MN:"Mongolia",ME:"Montenegro",MS:"Montserrat",MA:"Morocco",MZ:"Mozambique",MM:"Myanmar",NA:"Namibia",NR:"Nauru",NP:"Nepal",NL:"Netherlands",NC:"New Caledonia",NZ:"New Zealand",NI:"Nicaragua",NE:"Niger",NG:"Nigeria",NU:"Niue",NF:"Norfolk Island",MP:"Northern Mariana Islands",NO:"Norway",OM:"Oman",PK:"Pakistan",PW:"Palau",PS:"Palestinian Territory, Occupied",PA:"Panama",PG:"Papua New Guinea",PY:"Paraguay",PE:"Peru",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PT:"Portugal",PR:"Puerto Rico",QA:"Qatar",RE:"Réunion",RO:"Romania",RU:"Russian Federation",RW:"Rwanda",BL:"Saint Barthélemy",SH:"Saint Helena, Ascension and Tristan da Cunha",KN:"Saint Kitts and Nevis",LC:"Saint Lucia",MF:"Saint Martin (French part)",PM:"Saint Pierre and Miquelon",VC:"Saint Vincent and the Grenadines",WS:"Samoa",SM:"San Marino",ST:"Sao Tome and Principe",SA:"Saudi Arabia",SN:"Senegal",RS:"Serbia",SC:"Seychelles",SL:"Sierra Leone",SG:"Singapore",SX:"Sint Maarten (Dutch part)",SK:"Slovakia",SI:"Slovenia",SB:"Solomon Islands",SO:"Somalia",ZA:"South Africa",GS:"South Georgia and the South Sandwich Islands",SS:"South Sudan",ES:"Spain",LK:"Sri Lanka",SD:"Sudan",SR:"Suriname",SJ:"Svalbard and Jan Mayen",SZ:"Swaziland",SE:"Sweden",CH:"Switzerland",SY:"Syrian Arab Republic",TW:"Taiwan, Province of China",TJ:"Tajikistan",TZ:"Tanzania, United Republic of",TH:"Thailand",TL:"Timor-Leste",TG:"Togo",TK:"Tokelau",TO:"Tonga",TT:"Trinidad and Tobago",TN:"Tunisia",TR:"Turkey",TM:"Turkmenistan",TC:"Turks and Caicos Islands",TV:"Tuvalu",UG:"Uganda",UA:"Ukraine",AE:"United Arab Emirates",GB:"United Kingdom",US:"United States",UM:"United States Minor Outlying Islands",UY:"Uruguay",UZ:"Uzbekistan",VU:"Vanuatu",VE:"Venezuela, Bolivarian Republic of",VN:"Viet Nam",VG:"Virgin Islands, British",VI:"Virgin Islands, U.S.",WF:"Wallis and Futuna",EH:"Western Sahara",YE:"Yemen",ZM:"Zambia",ZW:"Zimbabwe"};var k=function(){var a=[];for(var b in d.country_codes){var c=d.country_codes[b],e=Object();e.value=b,e.name=c,a.push(e)}return a};d.countries=k()}]),angular.module("conan").controller("PrivacyCtrl",["$scope","$window",function(a,b){}]),angular.module("conan").controller("TermsCtrl",["$scope","$window",function(a,b){}]),angular.module("conan").controller("ConanFileCtrl",["Search","SearchPackages","$scope","$window","$routeParams","Package",function(a,b,c,d,e,f){function g(a){var b=a.replace(/'/g,"").replace(/"/g,"").replace("http://","").replace("https://","").replace("git://","").split("/"),d=b[1],e=b[2];e=e.replace(".git",""),c.repo_github="https://github.com/"+d+"/"+e+"/issues"}function h(){c.source_visible=!1,c.packages_visible=!1,c.issues_visible=!1,c.home_visible=!1,c.active_source_class="",c.active_packages_class="",c.active_issues_class="",c.active_home_class=""}var i=e.name,j=e.version,k=e.user,l=e.channel,m=e.name+"/"+e.version+"/"+e.user+"/"+e.channel;c.conan_loaded=!1,c.packages_loaded=!1,c.form_query={},c.form_query.query="",c._different_oss=void 0,document.title="Conan package recipe: "+m,c.loaded=function(){return c.conan_loaded&&c.packages_loaded},c.filter_query=function(){b.search_packages(i,j,k,l,c.form_query.query,function(a){if(c.result={},c.result.packages=b.parseResults(a),c.result){c.result.openedDetails=!0,c.result.packages=get_not_duped_filtered_packages(c.result.packages),c.packages_loaded=!0,c._different_oss=null;var d=c.different_oss();d&&c.add_so_filter(d[0])}},function(a){swal("Error",a.data,"error"),c.packages_loaded=!0})},c.init=function(){c.loading=0,c.get_conanfile(m),c.name=e.name,c.version=e.version,c.user=e.user,c.channel=e.channel,c.get_conanfile_info(c.name,c.version,c.user,c.channel),c.show("home"),c.badge_code=c.markdown_badge_code(),c.html_badge_code=c.html_badge_code()},c.badge_image=function(){var a=c.name.replace("-","--").replace("_","__");return"https://img.shields.io/badge/conan.io-"+a+"%2F"+c.version+"-green.svg?logo=data:image/png;base64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAA1VBMVEUAAABhlctjlstkl8tlmMtlmMxlmcxmmcxnmsxpnMxpnM1qnc1sn85voM91oM11oc1xotB2oc56pNF6pNJ2ptJ8ptJ8ptN9ptN8p9N5qNJ9p9N9p9R8qtOBqdSAqtOAqtR%2BrNSCrNJ/rdWDrNWCsNWCsNaJs9eLs9iRvNuVvdyVv9yXwd2Zwt6axN6dxt%2Bfx%2BChyeGiyuGjyuCjyuGly%2BGlzOKmzOGozuKoz%2BKqz%2BOq0OOv1OWw1OWw1eWx1eWy1uay1%2Baz1%2Baz1%2Bez2Oe02Oe12ee22ujUGwH3AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfgBQkREyOxFIh/AAAAiklEQVQI12NgAAMbOwY4sLZ2NtQ1coVKWNvoc/Eq8XDr2wB5Ig62ekza9vaOqpK2TpoMzOxaFtwqZua2Bm4makIM7OzMAjoaCqYuxooSUqJALjs7o4yVpbowvzSUy87KqSwmxQfnsrPISyFzWeWAXCkpMaBVIC4bmCsOdgiUKwh3JojLgAQ4ZCE0AMm2D29tZwe6AAAAAElFTkSuQmCC"},c.markdown_badge_code=function(){return"[![badge]("+c.badge_image()+")](http://www.conan.io/source/"+m+")"},c.html_badge_code=function(){return"<a href='http://www.conan.io/source/"+m+"'><img src='"+c.badge_image()+"'/></a>"},c.show_package_options=function(){c.result&&c.result.packages?c.show("packages"):c.source_code&&c.show("source")},c.change_page=function(a,b){a.curPage=b},c.different_oss=function(){if(!c.result)return void 0;if(c._different_oss)return c._different_oss;var a=[];if(c.result){for(var b in c.result.packages){var d=c.result.packages[b];if(d){var e=d.settings.os;e&&-1==a.indexOf(e)&&a.push(e)}}return c._different_oss=a,c._different_oss}},c.get_conanfile=function(a){f.get_conanfile(a,function(a){console.log(a),c.source_code=a.conanfile,c.language="python",c.repo_url=a.url,a.url&&a.url.indexOf("github.com/")>=0&&g(a.url),c.license=a.license,c.description=a.description,c.conan_loaded=!0},function(b){404==b.status&&(c.conan_loaded=!0,swal("Not found",'Package "'+a+'" do not exists!',"error"))})},c.get_conanfile_info=function(a,d,e,f){b.search_packages(a,d,e,f,"",function(a){if(c.result={},c.result.packages=b.parseResults(a),c.result){c.result.openedDetails=!0,c.result.packages=get_not_duped_filtered_packages(c.result.packages),c.packages_loaded=!0;var d=c.different_oss();d&&c.add_so_filter(d[0])}},function(a){swal("Error",a.data,"error"),c.packages_loaded=!0})},c.panels_showed=[],c.panel_showed=function(a){return-1!=c.panels_showed.indexOf(a)},c.toggle_panel=function(a){var b=c.panels_showed.indexOf(a);-1!=b?c.panels_showed.splice(b,1):c.panels_showed.push(a)},c.show=function(a){h(),"source"==a?(c.source_visible=!0,c.active_source_class="active"):"packages"==a?(c.packages_visible=!0,c.active_packages_class="active"):"issues"==a?(c.issues_visible=!0,c.active_issues_class="active"):"home"==a&&(c.home_visible=!0,c.active_home_class="active")},c.so_filter=void 0,c.compiler_filter=void 0,c.filter=function(){c.result.filtered_packages=[];for(var a in c.result.packages){var b=c.result.packages[a],d=!0,e=!0;if(c.so_filter&&b&&b.settings.os!=c.so_filter&&(d=!1),c.compiler_filter&&d&&b.settings.compiler!=c.compiler_filter&&(e=!1),e&&d){var f=[];for(var g in b.settings)f.push(g);if(f.sort(function(a,b){return a>b}),b.install_command="conan install "+c.name+"/"+c.version+"@"+c.user+"/"+c.channel+" ",b){for(var g in f){var g=f[g];b.install_command+="-s "+g+'="'+b.settings[g]+'" '}for(var h in b.options)b.install_command+="-o "+h+'="'+b.options[h]+'" '}c.result.filtered_packages.push(b)}}},c.add_so_filter=function(a){c.so_filter=a,c.filter()},c.init()}]),angular.module("conan").controller("ShowProfileCtrl",["User","$scope","$routeParams","Search","Package",function(a,b,c,d,e){c.username&&(b.username=c.username,a.read(b.username,function(a){b.user=a,b.results=d.parseResults(a.packages)},function(a){}),b.user=Object(),b.user.gravatar_hash="asdasdsa",document.title="Conan user profile"),b.change_page=function(a,b){a.curPage=b},b.toggle_details=function(a){a.openedDetails=a.openedDetails===!1?!0:!1}}]),angular.module("conan").controller("HomeCtrl",["$scope","$window",function(a,b){document.title="Conan C/C++ Package Manager"}]),angular.module("conan").controller("DownloadsCtrl",["ENV","$scope","$window",function(a,b,c){var d=a.version.replace(/\./g,"_");b.macos=a.download_base_url+"conan-macos-64_"+d+".pkg",b.ubuntu=a.download_base_url+"conan-ubuntu-64_"+d+".deb",b.windows=a.download_base_url+"conan-win_"+d+".exe",b.arch="https://aur.archlinux.org/packages/conan/",b.version=a.version,document.title="Download conan installer"}]),angular.module("conan").controller("SearchCtrl",["Search","$scope","$routeParams",function(a,b,c){b.keyword="*",b.max_results=!1,document.title="Search conan packages",c.q&&(b.keyword=c.q),b.searchText=b.keyword,b.results={},b.search=function(){b.searching=!0,a.search(b.searchText,function(c){b.results=a.parseResults(c.data),b.results=b.results.sort(function(a,b){return parseInt(b.downloads)-parseInt(a.downloads)}),b.max_results=200==b.results.length,b.keyword=b.searchText,b.searching=!1},function(a){swal("Error",a.data,"error"),b.searching=!1})},b.numResults=b.results.length,b.change_page=function(a,b){a.curPage=b}}]),angular.module("conan").controller("LoginCtrl",["$routeParams","flash","$scope","$http","$window","HttpBasicAuth","ENV","$location",function(a,b,c,d,e,f,g,h){if(1==a.oauthlogin){c.hide_form=!0;var i=a.login,j=a.token,k=a.client_id,l=a.email,m=a.created_at,n="";c.$emit("SignInEvent",[i,j,k,l,m,n]),h.url("/")}else c.is_logged()&&h.path("/"),c.init=function(){c.mp_register_event("PageLogin",{})},c.authenticate=function(){c.$emit("loadingEvent");var a={method:"GET",url:g.apiEndpoint+"/users/authenticate",headers:{Authorization:f.getAuthorizationHeaderValue(c.username,c.password)}};console.log(a),d(a).success(function(a,b,d,e){a=angular.fromJson(a);var f=a.login,g=a.token,h=a.email,i=a.created_at,j=a.client_id,k=a.full_name;c.mp_register_event("ClickLogin",{Sucess:!0}),c.$emit("SignInEvent",[f,g,j,h,i,k])}).error(function(a,b,d,e){c.mp_register_event("ClickLogin",{Sucess:!1}),401==b?(c.shake_element(),swal("Error","Invalid user or password!","error"),c.$emit("loadingFinishedEvent",!0)):421==b?(User.send_confirmation_email(c.username,function(){},function(){}),c.shake_element(),swal("Error",a,"error"),c.$emit("loadingFinishedEvent",!0)):c.$emit("loadingFinishedEvent",!1)})}}]),angular.module("conan").controller("SignupCtrl",["$window","ENV","$routeParams","flash","$scope","$http","$location","User","$timeout",function(a,b,c,d,e,f,g,h,i){e.init_signup=function(){e.user=Object(),e.email_sended=!1,e.user.allow_mailing=!0,e.message="",document.title="Conan signup",e.is_logged()&&g.path("/"),e.mp_register_event("PageSignUp",{}),c.access_token&&(e.user.login=c.login,e.user.email=c.email,e.user.access_token=c.access_token,e.user.provider=c.provider,swal("Choose a password","Please choose a password for client tool to complete the register","info"))},e.validate=function(){e.message="";var a=!0;return/^[\x00-\x7F]*$/.test(e.user.password)?e.user.password?(e.user.password!=e.user.password_confirmation&&(swal("Error","Password doesn't match","error"),a=!1),e.user.password.length<8&&(swal("Error","Password length must be at least 8","error"),a=!1),a?e.terms?!0:(swal("Terms & Agreement","You must accept Terms & Agreement","warning"),!1):(e.shake_element(),!1)):(swal("Choose a password","Please, choose a password","error"),!1):(swal("Choose a password","Password contains invalid characters, sorry we only support ASCII encoding by now","error"),!1)},e.signup=function(){var c=function(a){swal("Check your email","Please go to your inbox to confirm your account.","success"),g.path("/")},d=function(a){swal("Error",a,"error"),e.shake_element()};e.validate()?(e.mp_register_event("ClickSignUp",{Sucess:!0}),h.register(e.user,function(f){e.user.provider&&e.user.access_token?(swal("Info","Register complete, logging with "+e.user.provider+". Please wait...","success"),a.location.href=b.apiEndpoint+"/oauth/"+e.user.provider):(console.log("OK register, lets request an email"),h.send_confirmation_email(e.user.login,c,d))},function(a){e.mp_register_event("ClickSignUp",{Sucess:!1,Cause:"Backendreject",Detail:a.data}),swal("Error",a.data,"error"),e.shake_element()})):e.mp_register_event("ClickSignUp",{Sucess:!1,Cause:"Validate"})}}]),angular.module("conan").controller("ConfirmAccountCtrl",["$scope","$location","User","$routeParams",function(a,b,c,d){console.log("ConfirmAccountCtrl"),swal("Please wait","Checking confirmation...","info"),swal({title:"Please wait",text:"Checking token...",type:"info",showCancelButton:!1,showConfirmButton:!1}),a.check_token=function(){c.confirm_account(d,function(b){console.log("OK confirmed, lets signin"),console.log(b),a.confirmed_ok=!0;var d=function(b){console.log("OK, sended email"),a.email_sended=!0},e=function(b){a.message=b,console.log("Error sending email!")};c.send_welcome_email(b.login,d,e),swal.close(),a.$emit("SignUpEvent",[b.login,b.token,b.client_id])},function(a){swal("Error",a.data,"error")})},a.check_token()}]),angular.module("conan").controller("PasswordResetCtrl",["$scope","$window","User","flash",function(a,b,c,d){$("#User").attr("autocomplete","off"),a.send_reset_email=function(){var b=function(b){a.user.login="",a.user.password="",a.user.password_confirmation="",swal("Check your email","Please go to your inbox to confirm your password reset","success")},d=function(b){a.shake_element(),swal("Error",b.data,"error")};a.validate()&&c.send_password_reset_email(a.user.login,a.user.password,b,d)},a.validate=function(){a.message="";var b=!0,c="";return/^[\x00-\x7F]*$/.test(a.user.password)?(a.user.password!=a.user.password_confirmation&&(c="Password doesn't match",b=!1),a.user.password.length<6&&(c="Password length must be at least 6",b=!1),b?!0:(d.error=c,a.shake_element(),!1)):(swal("Choose a password","Password contains invalid characters, sorry we only support ASCII encoding by now","error"),!1)}}]),angular.module("conan").controller("ConfirmPasswordResetCtrl",["$scope","$location","User","$routeParams",function(a,b,c,d){a.check_token=function(){swal({title:"Please wait",text:"Reseting password...",type:"info",showCancelButton:!1,showConfirmButton:!1}),c.confirm_password_reset(d.token,function(b){console.log("OK confirmed reset, lets signin"),console.log(b),swal.close(),a.$emit("SignInEvent",[b.login,b.token])},function(a){swal("Error",a.data,"error")})},a.check_token()}]),angular.module("conan").filter("pagination_artifacts",function(){return function(a,b){return a?(b=+b,a.slice(b)):[]}}),angular.module("conan").filter("range",function(){return function(a,b){b=parseInt(b);for(var c=0;b>c;c++)a.push(c);return a}}),window.cookieconsent_options={message:"This website uses cookies. If you continue without changing your settings, we'll assume that you are happy to receive all cookies from this website. However, if you would like to, you can change your cookie settings at any time.",dismiss:"Got it!",learnMore:"More info",link:"/#/privacy",theme:"light-bottom"};