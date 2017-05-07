$(function(){
	function addEvent(obj,sEv,fn){
		if(obj.addEventListener){
			obj.addEventListener(sEv,fn,false);
		}else{
			obj.attachEvent('on'+sEv,fn);
		}
	}
	function removeEvent(obj,sEv,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(sEv,fn,false);
		}else{
			obj.detachEvent('on'+sEv,fn);
		}
	}
	/**
	 **导航拖拽开始
	 **/
	function drag(oBox,oDiv){
		var x = 0;
		var y = 0;
		oBox.addEventListener('touchstart',function(ev){
			var oTouch = ev.targetTouches[0];
			var id = oTouch.identifier;
			var disX = oTouch.pageX-x;
			var disY = oTouch.pageY-y;
			function fnMove(ev){
				var oTouch = ev.targetTouches[0];
				if(oTouch.identifier==id){
					x = oTouch.pageX-disX;
					y = oTouch.pageY-disY;
					if(oBox.offsetHeight<oDiv.offsetHeight){
						if(y<oBox.offsetHeight-oDiv.offsetHeight){
							y=oBox.offsetHeight-oDiv.offsetHeight;
						}else if(y>0){
							y=0;
						}
					}else{
						y=0;
					}
					oDiv.style.WebkitTransform='translate3d(0px,'+y+'px,0px)';
					oDiv.style.transform='translate3d(0px,'+y+'px,0px)';
				}
				ev.preventDefault();
			}
			function fnEnd(ev){
				//ev.stopPropagation(); 
				if(ev.changedTouches[0].identifier==id){
					document.removeEventListener('touchmove',fnMove,false);
					document.removeEventListener('touchend',fnEnd,false);
				}
				// ev.preventDefault();
			}
			document.addEventListener('touchmove',fnMove,false);
			document.addEventListener('touchend',fnEnd,false);
			// ev.preventDefault();
		},false);
	}
	drag($('.navList_Box')[0],$('.one_level')[0]);
	$('body').on('touchmove','.navList_Box',function(ev){
		ev.preventDefault();
	});
	/**
	 **导航拖拽结束
	 **/

	/**
	 **导航点击开始
	 **/
	function navTapFn(aLi,aA){
		for(var i=0;i<aLi.length;i++){
			aLi[i].bok=true;
			aLi[i].onclick=function(ev){
				var _this = this;
				for(var j=0;j<aA.length;j++){
					aA[j].style.color='#666';
				}
	            var oA = _this.getElementsByTagName('a')[0];
	            oA.style.color='#000';
				var oUl = _this.getElementsByTagName('ul')[0];
				if(oUl&&_this.bok){
					$(this).children('ul').slideDown();
					// oUl.style.display='block';
					_this.bok=!_this.bok;
				}else if(oUl&&!_this.bok){
					// oUl.style.display='none';
					$(this).children('ul').slideUp();
					_this.bok=!_this.bok;
				}else if(!oUl){
					$('.navList_Box').css({
						'transform':'translate3d(-12rem,0rem,0rem)',
						'-webkit-transform':'translate3d(-12rem,0rem,0rem)'
					});
					setTimeout(function(){
						$('#navBox').css({
							'height':'3.25rem'
						});
					},600)
				}
				ev.stopPropagation(); 
			};
		}
	};
	var nav_BtnLi=document.querySelectorAll('#one_level li');
	var nav_BtnA=document.querySelectorAll('#one_level a');
	navTapFn(nav_BtnLi,nav_BtnA);

	$('body').on('touchstart','.navLeft',function(ev){
		// setTimeout(function(){
			$('#navBox').css({
				'height':'100%'
			});
			$('.navList_Box').css({
				'transform':'translate3d(0,0,0)',
				'-webkit-transform':'translate3d(0,0,0)'
			})
		// },200)
		ev.stopPropagation(); 
	})
	// var nav_Box=$('#navBox')[0];
	// nav_Box.addEventListener('click',function(ev){
	// 	ev.stopPropagation(); 
	// 	$('.navList_Box').css({
	// 		'transform':'translate3d(-12rem,0rem,0rem)',
	// 		'-webkit-transform':'translate3d(-12rem,0rem,0rem)'
	// 	})
	// },false)
	
	/**
	 **导航点击结束
	 **/

	
})



