window.onload=function(){

	var oNav=document.querySelector('.nav')	
	var oNavSmall=document.querySelector('.nvaScroll');
	var oNameList=document.querySelector('.name_list');	
	var oNameSpan=document.querySelector('.name span');	
	
	
	
	
	window.onscroll=function(ev){
		var scrTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(bl){
				clearInterval(timer);		
			}
			bl=true;
		if(scrTop>30){
			oNav.style.height='50px';
			oNavSmall.style.height='50px'
			//move(oNav,{height:50},{time:90,type:'ease-in'});
			//move(oNavSmall,{height:50},{time:90,type:'ease-in'});
		}else{
			oNav.style.height='365px';
			oNavSmall.style.height='365px'
			//move(oNav,{height:365},{time:90,type:'ease-in'});
			//move(oNavSmall,{height:365},{time:90,type:'ease-in'});
		}
	}
	oNameSpan.onclick=function(){
		clearInterval(timer);
		oNameList.style.opacity=1;
		oNameList.style.width='100%';
		oNameSpan.style.display='none';	
	}
	var n=true;
	var timer=setInterval(function(){
		if(n){
			oNameSpan.style.MsTransform='scale(1.2,1.2)';
			oNameSpan.style.WebkitTransform='scale(1.2,1.2)';
		}else{
			oNameSpan.style.MsTransform='scale(1,1)';
			oNameSpan.style.WebkitTransform='scale(1,1)';
		}
		n=!n;
	},400)
	
	var aContentUl=document.querySelectorAll('.content ul li')
	var aContentOl=document.querySelectorAll(".content ol li")
	for(var i=0;i<aContentOl.length;i++){
		(function(index){
			aContentOl[i].onclick=function(){
				for(var i=0;i<aContentOl.length;i++){
					aContentUl[i].className='';	
				}
				aContentUl[index].className='active'
			}
		})(i)	
	}
	
	var oTeamMax=document.querySelector('.team .max');
	var oTeamB=document.querySelector('.team b');
	var oTeamMin=document.querySelector('.team .min');
	var i=1;
	oTeamB.onclick=function(){
		oTeamMin.style.background='url(images/team'+i%3+'.jpg) no-repeat';
		oTeamMin.style.backgroundSize='100% 100%';
		oTeamMax.style.background='url(images/team'+i%3+'.jpg) no-repeat';
		oTeamMax.style.backgroundSize='100% 100%';
		i++;
	}
	
	function move(obj,json,optional){

	optional = optional || {};
	optional.time = optional.time || 300;
	optional.fn = optional.fn || null;
	optional.type = optional.type||'ease-out';
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseFloat(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	
	var count=Math.round(optional.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in json){
			
			switch(optional.type){
				case 'linear':
					var cur=start[key]+n*dis[key]/count;
					break;	
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*(a*a*a);
					break;	
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a);
					break;	
			}
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
			}
		}
		
			if(n==count){
				clearInterval(obj.timer);
				optional.fn  && optional.fn();
			}
		},30);
	}

	function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
	}
	
	var oFixFoot=document.getElementById('fix_foot');
	var timer=null;
	var bl=false;
	
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
			bl=false;
			if(n==count){
				clearInterval(timer);
			}
		},30);
	}	
	

	console.log('我叫吴春锋，欢迎来到我的个人网站')
}	