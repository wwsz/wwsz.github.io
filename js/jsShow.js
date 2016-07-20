// JavaScript Document

window.onload=function(){
	var oUl1=document.getElementById('num');
	var aLi1=oUl1.getElementsByTagName('li');
	var oUl2=document.getElementById('img');
	var oLeft=document.getElementById('left');
	var oRight=document.getElementById('right');
	var n=0;
	var m=0;
	for(var i=0;i<aLi1.length;i++){
		(function(index){
			aLi1[i].onmouseover=function(){
				for(var i=0;i<aLi1.length;i++){
					aLi1[i].className='';
				}
				this.className='active';
				move(oUl2,{left:-670*(index+1)},{time:300});
				n=index;
				m=index;
			}		
		})(i)
	}	
	oRight.onclick=function(){
		n++;
		m++
		if(n==6) n=0;
		
		for(var i=0;i<aLi1.length;i++){
			aLi1[i].className='';
		}
		aLi1[n].className='active';
		move(oUl2,{left:-670*(m+1)},{time:300})
		if(m==6){
			setTimeout(function(){oUl2.style.left="-670px";},301)
			m=0;
		};
		
	}
	oLeft.onclick=function(){
		n--;
		m--
		if(n<0) n=5;
		
		for(var i=0;i<aLi1.length;i++){
			aLi1[i].className='';
		}
		aLi1[n].className='active';
		move(oUl2,{left:-670*(m+1)},{time:300})
		if(m==-1){
			setTimeout(function(){oUl2.style.left="-4020px";},301)
			m=5;
		};
		
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
		
		var oBox2=document.querySelector('.box2')
		var oBox2Div=document.querySelector('.box2 #div1');
		var oUl=oBox2Div.children[0];
		var aLi=oUl.children;
		var aImg=oUl.getElementsByTagName('img');
		var aSpan=oUl.getElementsByTagName('span');
		//1.拖拽
		oUl.onmousedown=function(ev){
			var e=ev||event;
			var disX=e.clientX-oUl.offsetLeft;
			document.onmousemove=function(ev){
				var e=ev||event;
				var l=e.clientX-disX;
				//4.限定ul坐标
				if(l>oBox2Div.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth)
					l=oBox2Div.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth;
				if(l<oBox2Div.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth)
					l=oBox2Div.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth;	
				oUl.style.left=l+'px';
				
				setSize();
				
			};	
			document.onmouseup=function(){
				document.onmouseup=document.onmousemove=null	
			};
			return false;
		};	
		
		function setSize(){
			//求每个dis距离，设置图片大小
			for(var i=0;i<aLi.length;i++){
				var dis=oBox2Div.offsetWidth/2-(oUl.offsetLeft+aLi[i].offsetLeft+aLi[i].offsetWidth/2);
				//aLi[i]	--	>	aSpan[i]
				dis = Math.abs(dis);//比值不需要负数
				var scale=1-dis/800;
				if(scale<0.5) scale=0.5;	
				
				
				aImg[i].style.width=400*scale+'px';//控制图片
				aImg[i].style.height=500*scale+'px';
				aImg[i].style.marginLeft=-(aImg[i].offsetWidth-aLi[i].offsetWidth)/2+'px';
				aImg[i].style.marginTop=-(aImg[i].offsetHeight-aLi[i].offsetHeight)/2+'px';
				aLi[i].style.zIndex=parseInt(scale*10000);
				aLi[i].style.opacity=scale;
			}	
		}
		
		//2.设置中心点，修改了ul.left
		//ul.left = div1.w/2-(n+0.5)*li.w
		setCenter(2);
		function setCenter(n){
			oUl.style.left=oBox2Div.offsetWidth/2-(n+0.5)*aLi[0].offsetWidth+'px';	
		}
		
		//3.设置一下大小
		setSize();
		
		//5.窗口大小改变时，修改图片尺寸
		window.onresize=setSize;
		
		
		var oBox3Ul=document.getElementById('box3_ul');
		var aBox3Li=oBox3Ul.children;
		var arr=[]
		var zIndex=1;
		
		for(var i=0;i<aBox3Li.length;i++){
			arr.push({left:aBox3Li[i].offsetLeft,top:aBox3Li[i].offsetTop});
			aBox3Li[i].style.left=arr[i].left+'px';
			aBox3Li[i].style.top=arr[i].top+'px';	
		}
		for(var i=0;i<aBox3Li.length;i++){
			aBox3Li[i].style.position='absolute';
			aBox3Li[i].style.margin=0;
			aBox3Li[i].index=i;	
		}
		for(var i=0;i<aBox3Li.length;i++){
			show(aBox3Li[i]);	
		}
		function show(obj){
			obj.onmousedown=function(ev){
				obj.style.zIndex=zIndex++;
				var oEvt=ev||event;
				var disX=oEvt.clientX-obj.offsetLeft;
				var disY=oEvt.clientY-obj.offsetTop;
				document.onmousemove=function(ev){
					var oEvt=ev||event;
					obj.style.left=oEvt.clientX-disX+'px';
					obj.style.top=oEvt.clientY-disY+'px';
					
					for(var i=0;i<aBox3Li.length;i++){
						aBox3Li[i].style.borderColor='black';
					}
					var nearObj=findNear(obj);
					if(nearObj && nearObj!=obj){
						move(nearObj,{left:arr[obj.index].left,top:arr[obj.index].top})
	
						var tmp=obj.index;
						obj.index=nearObj.index;
						nearObj.index=tmp;
					}	
				}
				document.onmouseup=function(){
					document.onmousemove=document.onmouseup=null;
					move(obj,{left:arr[obj.index].left,top:arr[obj.index].top})
				}
				return false;	
			}	
		}
		function collText(obj1,obj2){
			var l1=obj1.offsetLeft;
			var t1=obj1.offsetTop;
			var r1=obj1.offsetLeft+obj1.offsetWidth;
			var b1=obj1.offsetTop+obj1.offsetHeight;
			var l2=arr[obj2.index].left;
			var t2=arr[obj2.index].top;
			var r2=arr[obj2.index].left+obj2.offsetWidth;
			var b2=arr[obj2.index].top+obj2.offsetHeight;
			if(l1>r2||r1<l2||t1>b2||b1<t2){
				return false;	
			}else{
				return true;	
			}	
		}
		
		function findNear(obj){
			var minDis=99999999;
			var minDisIndex=-1;
			for(var i=0;i<aBox3Li.length;i++){
				if(obj==aBox3Li[i]) continue;
				if(collText(obj,aBox3Li[i])){
					var dis=getDis(obj,aBox3Li[i]);
					if(dis<minDis){
						minDis=dis;
						minDisIndex=i;	
					}	
				}	
			}
			if(minDisIndex==-1){
				return null;	
			}else{
				return aBox3Li[minDisIndex];	
			}
		}
		function getDis(obj1,obj2){
			var a=arr[obj2.index].left-obj1.offsetLeft;
			var b=arr[obj2.index].top-obj1.offsetTop;
			return Math.sqrt(a*a+b*b);
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