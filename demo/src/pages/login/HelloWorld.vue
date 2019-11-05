<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
       <Button @click="daoru">导入测试</Button>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <div>
    	
    	<tableTest></tableTest>
    	
    </div>
    
   <!-- 导入数据 -->
        <Modal v-model="importModal" title="导入" >
            <Row class="import-btn">
                <Col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <!--<i-button icon="md-cloud-download" type="success" @click="downloadTemplate" >下载模板</i-button>-->
                </Col>
                <Col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <input hidden="hidden" type="file" ref="importExcelForm" class="file-form" @change="importExcel" >
                    <i-button icon="md-cloud-upload" type="primary" @click="triggerUpload">上传文件</i-button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Progress  :stroke-width="18" :percent="importExcelPercentage"></Progress>
                </Col>
            </Row>

            <template slot="footer">
                <Button type="default"   @click="importModal = false">取消</Button>
                <Button type="primary"   @click="startImportData">开始</Button>
            </template>
        </Modal>
        
        
  </div>
  
  
  
</template>

<script>
	
import tableTest from '@/pages/login/TableTest'
import {jsonExport,jsonImport} from '@/api/jsonUtils.js'
//import DST from '@/api/DST.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      
      importModal: false, //是否显示导入对话框
			importExcelPercentage:0, //导入进度百分比
      importCurrentPage:0, //导入当前进度页
       columns5: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
      
      
    }
  },
  methods: {
  	
  	daoru(){
  		this.importModal = true;
  	},
  	downloadTemplate(){
  		
  	},
  	//上传导入EXCEL
        importExcel(fileForm){
            if(fileForm.target.files[0].type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && fileForm.target.files[0].type != 'application/vnd.ms-excel'){
                this.$Message.error('上传文件类型错误！只能上传文件xlsx,xls类型文件');
                return false
            }
            jsonImport(fileForm.target,this.callbackUploadExcelData)
        },
        //获取上传的EXCEL数据的回调函数
        callbackUploadExcelData(file_data){
            let that = this
            if(file_data.length == 0) return false

            let newData = []
            
						console.log(file_data);
						
            file_data.forEach(function (v,k) {
                let item_data = {}
                that.columns5.forEach(function (val, key) {
                    if(val['title'] != undefined && val['slot'] != 'action'){
                        let new_val = v[val['title']]
                        if((val['data_type'] == 'datetime' || val['data_type'] == 'date') && new_val > 40000 && new_val < 90000){
                            new_val = that.dateFormat(new Date(1900, 0, new_val),'Y/m/d H:i:s')  //如果日期变成类似42747 则用这种方式转换
                        }
                        if(val['options'] != undefined && val['options'] != ''){
                            val['options'].forEach(function(sv,sk){
                                if(sv == new_val){
                                    new_val = sk
                                }
                            })
                        }
                        item_data[val['slot']] = new_val
                    }
                })
                newData[k] = item_data
            })

//          this.importExcelData = newData
            this.importExcelData = file_data
        },
  	triggerUpload(){
			this.importExcelPercentage = 0
      this.importCurrentPage = 0
	    this.$refs.importExcelForm.click()
  	},
  	startImportData(){
  		let that = this

        //每次处理20条
        let pageNum = 20
        let pages = Math.ceil(that.importExcelData.length / pageNum)

        if(that.importCurrentPage >= pages) return false

        let post_data = that.importExcelData.slice(that.importCurrentPage * pageNum,(that.importCurrentPage + 1) * pageNum)

        if(post_data != '' && post_data != null && post_data.length != 0){
        	
        	// 开始提交数据
        	
        	this.$axios({
                url: '/excel/importExcel',//请求的地址
                method: 'post',//请求的方式
                data:post_data//请求的表单数据
            }).then(res => {
            	
            	// console.info('后台返回的数据', res.data);
            	// console.log(res);
            	if(!res.data){
            		
            	}else{
            		  that.importExcelPercentage = Math.ceil((that.importCurrentPage + 1) / pages * 100)
              }
            	
            	 that.importCurrentPage ++
               that.startImportData()
                // console.info("完毕");
            }).catch(err => {
            	this.$Message.error('网络异常!');
            	
                // console.info('报错的信息', err);
                // console.info('报错的信息', err.response.message);
            });
        	
        	
        	
//          that.post(that.importServer,{data:post_data}).then(function(data){
//              if(data.status == 200){
//                  that.importExcelPercentage = Math.ceil((that.importCurrentPage + 1) / pages * 100)
//              }
//              that.importCurrentPage ++
//              that.startImportData()
//          })


        }
  		
  	},
  	
  	
  },
 components : {
 	tableTest
 }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
