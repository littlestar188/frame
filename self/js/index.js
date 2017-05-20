$(function(){
	var index = {
		init:function(){
			this.showStockChart();
			
		},
		showStockChart:function(){
			$.ajax({
				url:"http://192.168.0.15:80/frame/self/json/echratData.json",
				//url:'/manage/chart/stock/',
				//type:'post',
				cache: false,
				dataType: 'json',
				//data:type
				success:function(data){
					console.log(data)
					// 基于准备好的dom，初始化echarts实例
					
					var stockChart = echarts.init(document.getElementById('barChart'));
					option = {
						color: ['#1f77b4','#009fa8'],
					    tooltip : {
					    	trigger: 'axis',
					        axisPointer: {
					            type:'line'
					        }
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

					// 使用刚指定的配置项和数据显示图表。
					stockChart.setOption(option);
				},
				error:function(){
					console.log('echart数据获取后台出错')
				}
			});
		
		}
	}
	index.init();
});