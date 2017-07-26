var routerController = (function(){
	var prevModule;
	var curModule;
	var HashModuleMap = {
		'list':listObj,
		'detail':detailObj
	}
	function initMethod(hashName){
		//默认都是 首页模块
		var module = HashModuleMap[hashName] || HashModuleMap['list'];

		//判断是否能找到form 地址搜索
		if(hashName.indexOf('list') != -1){
			module = HashModuleMap['list'];
			module.changeCity(hashName);
		}

		//
		if(hashName.indexOf('detail') != -1){
			module = HashModuleMap['detail'];
			module.loadRlist(hashName);
		}

		prevModule = curModule; //null homeObj
		curModule = module; //当前模块 = 首页对象 homeObj rankObj

		if(prevModule) {
			prevModule.leave();//homeObj.leave();
		}
		curModule.enter(); //首页得以展示, 排名页展示
		//HashModuleMap.home ---> 首页对象
		//HashModuleMap['home'].enter() --> 首页对象

		if(!initMap[hashName]) { //如果当前模块没有被标记成功（没有被初始化过）
			curModule.init(); //为当前模块执行init方法，进行初始化操作

			initMap[hashName] = true; // 将当前模块标记成已经初始化过了
		}
	}
	return {
		init: initMethod
	}
}
})();
