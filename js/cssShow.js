// JavaScript Document

window.onload=function(){
	var oFixFoot=document.getElementById('fix_foot');
	var timer=null;
	var blbl=false;
	
	oFixFoot.onclick=function(){
		move1(0,1000);
	};	
	function move1(iTarget,time){
		var scrTop=document.documentElement.scrollTop||document.body.scrollTop;
		var dis=iTarget-scrTop;
		var count=Math.round(time/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var cur=scrTop+dis*(1-a*a*a);
			
			document.documentElement.scrollTop=cur;
			document.body.scrollTop=cur;
			blbl=false;
			if(n==count){
				clearInterval(timer);
			}
		},30);
	}
	window.onscroll=function(){
		if(blbl){
			clearInterval(timer);		
		}
		blbl=true;
	};	
}