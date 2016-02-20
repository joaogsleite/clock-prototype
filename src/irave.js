
var actived = "home";
var selected = "sel-events";
var notification = false;

var backHelp = true;
var backHelpCounter=0;

var notifHelp = true;
var notifAllHelp = true;
var notifHelpCounter=0;
var notifAllHelpCounter=0;
var cardsCounter=0;

var init=true;

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


function crown(opt){
	if(actived=="home"){
		var li = document.getElementById("menu").getElementsByTagName("li");
		for(var i=0; i<li.length; i++){ 
			if(li[i].className.indexOf("selected")!=-1){ 
				if(opt=="down"){
					if(li[i+1]==null){ return; }
					li[i].className=" ";
					selected=li[i+1].getAttribute('id');
					li[i+1].className="selected";
					return;
				}
				if(opt=="up"){
					if(li[i-1]==null){ return; }
					li[i].className=" ";
					selected=li[i-1].getAttribute('id');
					li[i-1].className="selected";
					return;
				}
			}
		}
		return;
	}
	if((actived=="events") || (actived=="health")){
		var cards = document.getElementById(actived).getElementsByClassName("card");
		for(var i = 0; i < cards.length; i++){
			
			if(actived!="health"){ checkEvent(document.getElementById(actived).getElementsByClassName("show0")[0]); }
			backHelpCounter=0;
			
			checkNotifications();
			
			if(opt=="up"){
				if(hasClass(cards[i], "show0") && cards[i-1]==null){
					cards[i].className="card show0";
					setTimeout(function() { cards[i].className+=" endUpCard"; }, 100);
					return;
				}
				
				if(hasClass(cards[i], "show0") && cards[i-1]!=null){
					cards[i].className="card";
					cards[i-1].className="card show0";
					
					cards[i-1].className="card show0 upCard1";	
					return;
				}
			}
			
			if(opt=="down"){
				
				if(hasClass(cards[i], "show0") && cards[i+1]==null){
					cards[i].className="card show0";
					setTimeout(function() { cards[i].className+=" endDownCard"; }, 100);
					return;
				}

				if(hasClass(cards[i], "show0") && cards[i+1]!=null){
					cards[i].className="card";
					cards[i+1].className="card show0";
					cards[i].className="card downCard";
					
					return;
				}
			}
		}
		return;
	}
}

function showIcon(){
	var icons = document.getElementsByClassName("cards")[0].getElementsByClassName("homeicon");
	for(var i = 0; i < icons.length; i++){
		icons[i].style.display="block";
	}
}
function hideIcon(){
	var icons = document.getElementsByClassName("cards")[0].getElementsByClassName("homeicon");
	for(var i = 0; i < icons.length; i++){
		icons[i].style.display="none";
	}
}


function leftbutton(){
	if(notification){
		card=document.getElementById("notification").getElementsByClassName("card")[0];
		card.className+=" hometoEvents";
		setTimeout(function() { document.getElementById("notification").innerHTML=""; }, 1000);
		notification=false;
	}
	
	if((actived=="events") || (actived=="health")){
		var home = document.getElementById("home");
		home.className="eventsToHome";
		
		checkNotifications();
		
		actived="home";
		backHelp=false;
	
		
		var calendar = document.getElementById("icon-calendar");
		var saude = document.getElementById("icon-heart");
		calendar.className="homeicon icon-calendar";
		
		saude.className="homeicon icon-heart";
		setTimeout(function() { calendar.style.display="block"; saude.style.display="block"; hideIcon(); }, 500);
		setTimeout(function() { document.getElementById("events").style.opacity=0;  document.getElementById("health").style.opacity=0; },1000);
		
		checkEvent(document.getElementById("events").getElementsByClassName("show0")[0]);
		backHelpCounter=0;
		
		return;
	}
}


function rightbutton(){
	if(actived=="home"){
		if(selected=="sel-events"){
			var home = document.getElementById("home");
			var events = document.getElementById("events");
			events.style.opacity=1;
			home.className="homeToEvents";
			notifHelpAllCleaner();
			
			var calendar = document.getElementById("icon-calendar");
			var saude = document.getElementById("icon-heart");
			calendar.className="homeicon icon-calendar eventsIconFromHome";
			saude.className="homeicon icon-heart homeToEvents";
			
			
			actived="events";
			selected="sel-events";
			setTimeout(function() { calendar.style.display="none"; saude.style.display="none"; showIcon(); }, 1000);
			return;
		}
		if(selected=="sel-health"){
			var home = document.getElementById("home");
			var health = document.getElementById("health");
			health.style.opacity=1;
			home.className="homeToEvents";
			notifHelpAllCleaner();
			
			var calendar = document.getElementById("icon-calendar");
			var saude = document.getElementById("icon-heart");
			calendar.className="homeicon icon-calendar homeToEvents";
			saude.className="homeicon icon-heart eventsIconFromHome";
			

			actived="health";
			selected="sel-health";
			setTimeout(function() { calendar.style.display="none"; saude.style.display="none"; showIcon(); }, 1000);
			return;
		}
	}
	if((actived=="events") || (actived=="health")){
		notifHelp=false;
		
		var textooo="do evento";
		if(actived=="health"){ textooo="de saúde"; }
		
		var card=document.getElementById(actived).getElementsByClassName("show0")[0];
		if(card.getAttribute("data-notf")=="off"){
			card.getElementsByTagName("span")[0].innerHTML='<i class="icon-bell-alt"></i> notificação '+textooo+' activada';
			card.setAttribute("data-notf","alt");
		}else{
			card.getElementsByTagName("span")[0].innerHTML='<i class="icon-bell-off"></i> notificação '+textooo+' desactivada';
			card.setAttribute("data-notf","off");
		}
	}
}

function checkNotifications(){
	notifHelpCounter=0;
	var cards = document.getElementById("events").getElementsByClassName("card");
	for(var i = 0; i < cards.length; i++){
		var card=cards[i];
		if(card.getAttribute("data-notf")=="off"){
			card.getElementsByTagName("span")[0].innerHTML='<i class="icon-bell-off"></i> notificação do evento desactivada';
		}else{
			card.getElementsByTagName("span")[0].innerHTML='<i class="icon-bell-alt"></i> notificação do evento activada';
		}
	}
}


function clock() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
	
	//checkEvents(h,m);
	
	if (h<10) {h = "0" + h};
	if (m<10) {m = "0" + m};
    document.getElementById('clock').innerHTML = h+":"+m;
	
	
	checkEvents();
	backHelpChecker();
	notifHelpChecker();
	notifHelpAllChecker();
	
	
    var t = setTimeout(function(){clock()},5000);
}

function backHelpChecker(){
	if(actived!="home" && backHelp){ backHelpCounter++; }
	if(actived=="home"){ backHelpCounter=0; }
	
	if(backHelp && backHelpCounter==2 && actived!="health"){ //5 segundos
		document.getElementById(actived).getElementsByClassName("show0")[0].getElementsByClassName("bar")[0].innerHTML="<i class='icon-left-big backHelpAnimation'></i>prima para voltar atrás";
	}
}

function notifHelpChecker(){	
	if(actived!="home" && notifHelp && !backHelp){ notifHelpCounter++; }
	if(actived=="home"){ notifHelpCounter=0; }
	
	if(notifHelp && notifHelpCounter==2){ //5 segundos
		document.getElementById(actived).getElementsByClassName("show0")[0].getElementsByTagName("span")[0].innerHTML='<i class="icon-bell-alt"></i><span class="notificationAnimation">prima botão direito para desactivar</span>';
	}
}

function notifHelpAllChecker(){
	if(actived=="home" && notifAllHelp){ notifAllHelpCounter++; }
	if(actived!="home"){ notifAllHelpCounter=0; notifHelpAllCleaner(); }
	
	if(notifAllHelp && notifAllHelpCounter==2){
		document.getElementById("notif").innerHTML='<i class="icon-bell-off"></i><span> mantenha premido botão direito</span>';
		document.getElementById("notif").className="notif notificationAllAnimation";
	}
}

function checkEvent(card){
	var text;
	var time;
	var now = new Date();
	var event;
	var location=card.getAttribute("data-location");
		
	event = new Date(Number(card.getAttribute("data-time").split(" ")[0].split("/")[2]), Number(card.getAttribute("data-time").split(" ")[0].split("/")[1]), Number(card.getAttribute("data-time").split(" ")[0].split("/")[0]), Number(card.getAttribute("data-time").split(" ")[1].split(":")[0]), Number(card.getAttribute("data-time").split(" ")[1].split(":")[1]), 0, 0);
	
	var nowMilliseconds=now.getTime()/*+2592000000*/+2628000000+50400000;
	var eventMilliseconds=event.getTime();
	
	if((eventMilliseconds - nowMilliseconds) > 31536000000){ time=Math.ceil(Number((eventMilliseconds-nowMilliseconds)/31536000000))+" anos"; }
	else if((eventMilliseconds - nowMilliseconds) > 2628000000){ time=Math.ceil(Number((eventMilliseconds-nowMilliseconds)/2628000000))+" meses"; }
	else if((eventMilliseconds - nowMilliseconds) > 86400000){ time=Math.ceil(Number((eventMilliseconds-nowMilliseconds)/86400000))+" dia(s)"; }
	else if((eventMilliseconds - nowMilliseconds) > 3600000){ time=Math.ceil(Number((eventMilliseconds-nowMilliseconds)/3600000))+" hora(s)"; }
	else if((eventMilliseconds - nowMilliseconds) > 5000){ time=Math.ceil(Number((eventMilliseconds-nowMilliseconds)/60000))+" min"; }
	else if((eventMilliseconds - nowMilliseconds) < 0){ pastEvent(card); return; }
	else if((eventMilliseconds - nowMilliseconds) < 5000){ notifyEvent(card); pastEvent(card); return; }

	text="Em <b>"+location+"</b> daqui a <b>"+time+"</b>";

	card.getElementsByClassName("bar")[0].innerHTML=text;
}

function checkEvents(){
	var cards = document.getElementById("events").getElementsByClassName("card");
	for(var k=0; k<cards.length; k++){
		checkEvent(cards[k]);
	}
}

function notifyEvent(card){
	if(card.getAttribute("data-notf")=="off" || document.getElementById("notif").getAttribute("data-notf")=="off"){ return; }
	notification = true;
	document.getElementById("audio").innerHTML='<audio controls autoplay><source src="alert.mp3" type="audio/mpeg"></audio>';
	card.getElementsByClassName("bar")[0].innerHTML="Neste momento em "+card.getAttribute("data-location");
	card.getElementsByTagName("span")[0].innerHTML='<i class="icon-level-up"></i> prima botão esquerdo para fechar';
	document.getElementById("notification").innerHTML="<div class='card'>"+card.innerHTML+"</div>";
}

function pastEvent(card){
	card.getElementsByClassName("bar")[0].innerHTML="Decorreu a "+card.getAttribute("data-time");
}



el.onmousedown = function () {
  var time = new Date(); //time in milliseconds
  el.onclick=function(){
    var diff=new Date()-time;
    alert("Click difference: "+diff);
    el.onmouseup=null;
  }
}
el.onmousedown = disableclick;
status="Right Click Disabled";
function disableclick(event)
{{
     //alert(status);
     var time = new Date(); //time in milliseconds
     el.onclick = function() {
       var diff=new Date() - time;
      if(diff>1600){ button3s(); }
	  else{ rightbutton(); }
       el.onmouseup=null;
     };
     return true;    
}}


function button3s(){
	var notif=document.getElementById("notif");
	notif.className="notif";
	notifAllHelp=false;
	
	if(notif.getAttribute("data-notf")=="alt"){
		notif.innerHTML='<i class="icon-bell-off"></i> todas as notificações desactivadas';
		notif.setAttribute("data-notf","off");
	}else{
		notif.innerHTML='<i class="icon-bell-alt"></i> todas as notificações activadas';
		notif.setAttribute("data-notf","alt");
	}
}

function notifHelpAllCleaner(){
	var notif=document.getElementById("notif");
	notif.className="notif";
	
	if(notif.getAttribute("data-notf")=="off"){
		notif.innerHTML='<i class="icon-bell-off"></i> todas as notificações desactivadas';
	}else{
		notif.innerHTML='<i class="icon-bell-alt"></i> todas as notificações activadas';
	}
}



function notifyHealth(card){
	if(card.getAttribute("data-notf")=="off" || document.getElementById("notif").getAttribute("data-notf")=="off"){ return; }
	notification = true;
	document.getElementById("audio").innerHTML='<audio controls autoplay><source src="alert.mp3" type="audio/mpeg"></audio>';
	document.getElementById("notification").innerHTML="<div class='card'>"+card.innerHTML+"</div>";
	document.getElementById("notification").getElementsByTagName("span")[0].innerHTML='<i class="icon-level-up"></i> prima botão esquerdo para fechar';

}



function addCard(){
	cardsCounter++;
	var titulo=document.getElementById("addTitulo");
	var data=document.getElementById("addData");
	var hora=document.getElementById("addHora");
	var local=document.getElementById("addLocal");
	var img=document.getElementById("addIMG");
	
	var card = document.createElement('div');
	card.className = 'card';
	card.setAttribute("data-notf","alt");
	card.setAttribute("data-location",local.value);
	card.setAttribute("data-time",data.value+" "+hora.value);
	card.innerHTML='<img src="'+img.value+'"><i class="homeicon icon-calendar"></i><div class="bar"></div><div class="status"><p>'+titulo.value+'</p><span><i class="icon-bell-alt"></i> notificação do evento activada</span></div>';
	
	titulo.value="";
	data.value="";
	hora.value="";
	local.value="";
	img.value="";
	
	document.getElementById("events").appendChild(card);	
	
	checkEvents();
	
}

function editHealt(){
	var valor;
	var max;
	var min;
	var perc;
	
	
	for(var i=1; i<5; i++){
		valor=document.getElementById("c"+i).value;
		max=document.getElementById("c"+i).getAttribute("data-max");
		min=document.getElementById("c"+i).getAttribute("data-min");
		
		perc=(100*(valor-min))/(max-min);
		if(perc>100){ perc=100; }
		if(perc<20){ perc=20; }
		
		document.getElementById("cb"+i).style.width=perc+"%";
		document.getElementById("cb"+i).style.backgroundColor="#0f0";
		
		if(perc>70){ document.getElementById("cb"+i).style.backgroundColor="#ff0"; }
		if(perc>80){ document.getElementById("cb"+i).style.backgroundColor="#F93"; }
		if(perc>90){ document.getElementById("cb"+i).style.backgroundColor="#f00"; notifyHealth(document.getElementById("healthcard"+i)); }
	}
	
}





window.onload = clock;



