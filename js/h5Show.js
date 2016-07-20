// JavaScript Document

window.onload=function(){
	var oBox1Div=document.getElementById('box1_div1');
	var i=1;
	setInterval(function(){
		oBox1Div.style.left=-i+'px';
		i+=5;
		if(i>226) i=0;
	},30)	
	var oC1=document.querySelectorAll('input')[0];
	var oC2=document.querySelectorAll('input')[1];
	oC1.onchange=oC2.onchange=function(){
		oBox1Div.style.background='-webkit-repeating-linear-gradient(-45deg,'+oC1.value+' 0,'+oC1.value+' 20px,#fff 20px,#fff 40px,'+oC2.value+' 40px,'+oC2.value+' 60px,#fff 60px,#fff 80px)'	
	}
	
	var oBox3Div = document.getElementById('box3_div');
	var x = 0;
	var y = 0;
	var iSpeedX = 0;
	var iSpeedY = 0;
	var lastX = 0;
	var lastY = 0;
	var timer = null;
	oBox3Div.onmousedown=function(ev){
		clearInterval(timer);
		var disX = ev.pageX-y;
		var disY = ev.pageY-x;
		document.onmousemove=function(ev){
			x = ev.pageY-disY;
			y = ev.pageX-disX;
			oBox3Div.style.WebkitTransform = 'perspective(800px) rotateX('+-x/3+'deg) rotateY('+y/3+'deg)';
			iSpeedX = ev.pageX-lastX;
			iSpeedY = ev.pageY-lastY;
			lastX = ev.pageX;
			lastY = ev.pageY;
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			clearInterval(timer);
			timer = setInterval(function(){
				iSpeedX*=0.95;
				iSpeedY*=0.95;
				x+=iSpeedY;
				y+=iSpeedX;
				oBox3Div.style.WebkitTransform = 'perspective(800px) rotateX('+-x/3+'deg) rotateY('+y/3+'deg)';
				if(Math.abs(iSpeedX)<1)iSpeedX=0;
				if(Math.abs(iSpeedY)<1)iSpeedY=0;
				if(iSpeedX==0&&iSpeedY==0){
					clearInterval(timer);
				}
			},30);
		};
		return false;
	};
	
	
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var aBox6Li=document.querySelectorAll('.box6 li');
	var arr=[]
	var bl=false;
	for(var i=0;i<aBox6Li.length;i++){
		arr[i]=aBox6Li[i].className	;
	}
	oPrev.onclick=function(){
		if(bl) return;
		bl=true;
		var oCur=document.querySelector('.cur');
		function fn(){
			oCur.removeEventListener('transitionend',fn,false)	;
			bl=false;
		}
		oCur.addEventListener('transitionend',fn,false)
		arr.unshift(arr.pop());
		for(var i=0;i<arr.length;i++){
			aBox6Li[i].className=arr[i];	
		}
			
	}
	oNext.onclick=function(){
		if(bl) return;
		bl=true;
		var oCur=document.querySelector('.cur');
		function fn(){
			oCur.removeEventListener('transitionend',fn,false)	;
			bl=false;
		}
		oCur.addEventListener('transitionend',fn,false);
		arr.push(arr.shift());
		for(var i=0;i<arr.length;i++){
			aBox6Li[i].className=arr[i];	
		}		
	}
	
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