// $(function(){
	var index = Object.create(publicFun)
	var index = $.extend(index,{
	//var index = {
		init:function(){
			//$('#main-footer').load('./pages/layout/footer.html',function(){});
			this.showStockChart();
			this.showStockChart2();
			this.baiduMap();
			this.gaugeChart();
			
		},
		/*
		* echart表随随窗口大小自适应
		* @param charts 某表数组集合
		*/
		watchEchart:function(charts){	
			var resizeChart;
			$(window).resize(function(){ 
				for(var key in charts){
					(function(i){						
						window.onresize = charts[i].resize();					
					})(key)
				}
			})	
						 
		},
		showStockChart:function(){
			var that = this;
			$.ajax({
				url:"resources/json/echartData/echratData.json",
				//url:'/manage/chart/stock/',
				//type:'post',
				cache: false,
				dataType: 'json',
				//data:type
				success:function(data){
					console.log(data)
					// 基于准备好的dom，初始化echarts实例
					var stockChart2 = echarts.init(document.getElementById('stockChart2'));
					var stockChart = echarts.init(document.getElementById('stockChart'));
                    var revenueChart = echarts.init(document.getElementById('revenue-chart'));
                    var blankChart = echarts.init(document.getElementById('blank-chart'));

					option = {
						color: ['#1f77b4','#009fa8'],
					    tooltip : {
					    	trigger: 'axis',
					        axisPointer: {
					            type:'line'
					        }
					    },
                        toolbox: {
                            //itemSize:11,
                            feature: {
                                saveAsImage: {show:true},
								myTool:{
									show:true,
									title:'转换为饼状图',
									icon:'image://http://'+window.location.hostname+'/frame/resources/images/pie2.svg',//后缀只能是svg否则失真
									//点击重绘成饼状图
									onclick:function(){
										
                                        revenueChart.clear()
                                        index.redrawPie(revenueChart,option,data);
                                        
									}
								},
                                magicType : {show: true, type: ['line', 'bar'/*,'stack','tiled'*/]}
                            },
							right:'4%'
                        },
					    grid: {
			 		        left: '3%',
			 		        right: '4%',
			 		       	bottom: '3%',
			 		        containLabel: true
			 		    },
			 		   	legend: {
			 		        data:['入库','出库']
			 		    },
					    xAxis : [
					        {
					            type : 'category',
					            data :data.xAxis
					        }
					    ],
					    yAxis: [
					        {
					            type: 'value'

					        }
					    ],
					    series: [
					        {
					            name:'入库',
					            type:'bar',
					            label: {
					                normal: {
					                    show: true,
					                    position: 'top'
					                }
					            },
					            data:data.inStockAxis
					        },
					        {
					        	 name:'出库',
					             type:'bar',
					             label: {
						                normal: {
						                    show: true,
						                    position: 'top'
						                }
						            },
					             data:data.outStockAxis
					        }
					    ]
					};
					console.log(option)
					// 使用刚指定的配置项和数据显示图表。
					stockChart.setOption(option);
					stockChart2.setOption(option);
                    revenueChart.setOption(option);
                    //resize
					that.watchEchart([stockChart,stockChart2,revenueChart])

				},
				error:function(){
					console.log('echart数据获取后台出错')
				}
			});
		
		},
        //转换成饼状图
		redrawPie:function(chart,chartOption,data){
			//var newOption = chart.getOption();
			var option ={

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    //itemSize:11,
                    feature: {
                        saveAsImage: {show: true},
                        myTool: {
                            show: true,
                            title: '转换为饼状图',
                            icon: 'image://http://'+window.location.hostname+'/frame/resources/images/pie2.svg',//后缀只能是svg否则失真
                            //点击重绘成饼状图
                            onclick: function () {
                                index.redrawPie(chart,chartOption,data1,data2);
                                //console.log(option)
                            }
                        },
						mytool2:{
                            show: true,
                            title: '转换为柱状图',
                            icon: 'image://http://'+window.location.hostname+'/frame/resources/images/bar.svg',//后缀只能是svg否则失真
                            //点击重绘成饼状图
                            onclick: function () {
                                chart.clear();
                                index.showStockChart();

                            }
						}
                    },
                    right: '4%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['入库', '出库']
                },
                series: [
                    {
                    	name:"入库",
                        type: 'pie',
                        radius: '55%',
                        data:data.inStockAxis
                    },
					{
                        name:"出库",
                        type: 'pie',
                        radius: '55%',
                        data:data.outStockAxis
					}
                ]


			}
            chart.setOption(option/*,{
			 notMerge:false
			 }*/)
			console.log(option)

		},
		showStockChart2:function(){
			var that = this;
			var leftChart = echarts.init(document.getElementById('leftChart'));
		    var leftOption = {
		        title: {
		            //text: '本月出库'
		        },
		        tooltip: {
		            trigger: 'axis'
		        },

		        legend: {
		            data:[]
		        },
		        grid: {
		            left: '3%',
		            right: '4%',
		            bottom: '3%',
		            containLabel: true
		        },
		        toolbox: {
		        	show:true,
		        	itemSize:11,		        	
		            feature: {
		                saveAsImage: {}
		            }
		        },
		        xAxis: {
		            type: 'category',
		            boundaryGap: false,
		            data: []
		        },
		        yAxis: {
		            type: 'value'
		        },
		        series: [
		//            {
		//                name:'sss',
		//                type:'line',
		//                stack: '总量',
		//                data:[120, 132, 101, 134, 90, 230, 210]
		//            }

		        ]
		    };
		    leftOption.xAxis.data=getBeforeMonths(6);

		    $.get("resources/json/echartData/echratData2-month-data.json",function (data) {
		    	console.log(data)
		       	for(var i in data){
		           leftOption.legend.data.push(i);
		           var serie={"name":i,"type":"line","data":data[i]};
		           leftOption.series.push(serie);
		       	}		       	
		       	//console.log(leftOption.legend.data);
		       	//console.log(leftOption.series)
		       	leftChart.setOption(leftOption);
		   	});

		    function getBeforeMonths(num) {
	            var date = new Date();
	            date.setMonth(date.getMonth()-num);
	            var BeforeYear=date.getFullYear();
	            var beforeMonth=date.getMonth()+1;
	            var months =[];
	            for(var i= 0;i<num;i++){
	                beforeMonth++;
	                beforeMonth=(beforeMonth<=12? beforeMonth:1);
	                months.push(beforeMonth+"月")
	            }
	            return months;
	        }

	        var midChart = echarts.init(document.getElementById('midChart'));
	       // console.log(midChart)
            var midOption = {
                title: {
                    text: '设备型号',
                    x:'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:[]
                },
                series: [
                    {
                        name:'所有数量',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
        //                  {value:335, name:'直接访问'},
        //                    {value:310, name:'邮件营销'},
        //                    {value:234, name:'联盟广告'},
        //                    {value:135, name:'视频广告'},
        //                    {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            };
            $.get("resources/json/echartData/echratData2-device-num.json",function (data) {
               for(var i in data){
                   var serie={"value":data[i],"name":i};
                   midOption.series[0].data.push(serie);
               }
               midChart.setOption(midOption);
                // setTimeout(function(){
                //     window.onresize = midChart.resize;
                // },100)
				
				

							 

           });


            var rightChart = echarts.init(document.getElementById('rightChart'));
                var rightOption = {
                    title: {
                        text: '设备状态',
                        x:'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:[]
                    },
                    series: [
                        {
                            name:'状态',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '40',
                                        fontWeight: 'bold'
                                    },
                                    formatter: "{d}%{b}:{c}台"
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
            //                    {value:335, name:'在线'},
            //                    {value:310, name:'不在线'},

                            ]
                        }
                    ]
                };
                $.get("resources/json/echartData/echratData2-status-data.json",function (data) {
                    console.log(data);
                    for(var i in data){
                        if(i=='online'){
                            var serie={"value":data[i],"name":"在线"};
                        }else{
                            var serie={"value":data[i],"name":"离线"};
                        }
                        rightOption.series[0].data.push(serie);
                    }
                    rightChart.setOption(rightOption);
                });
             that.watchEchart([leftChart,midChart,rightChart])
		},
		baiduMap:function(){
        var mp = new BMap.Map('map-chart');
          //var myBMapExt = new BMapExtension($('#map-chart')[0], BMap, echarts);
         // var mp = myBMapExt.getMap();
            var startPoint = {
                x:121.491,
				y:31.233
			}

            mp.centerAndZoom(new BMap.Point(startPoint.x, startPoint.y), 11);
            mp.enableScrollWheelZoom();//支持鼠标放大缩小
            //var mapChart = echarts.init(document.getElementById('map-chart'));

			//配置option
			var option = {
				title:"设备状态地理分布"
			}
            // var container = BMapExt.getEchartsContainer();
            // var myChart = BMapExt.initECharts(container);
            // BMapExt.setOption(option);
		},
		gaugeChart:function(){
            var gaugeChart = echarts.init(document.getElementById('gauge-chart'));
            gaugeOption = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '业务指标',
                        type: 'gauge',
                        detail: {formatter:'{value}%'},
                        data: [{value: 50, name: '完成率'}]
                    }
                ]
            };
            //gaugeChart.setOption(option, true);
            setInterval(function () {
                gaugeOption.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                gaugeChart.setOption(gaugeOption, true);
            },2000);

		}
	})
	
//});

$(function(){
    //console.log(role)
    index.init();
})