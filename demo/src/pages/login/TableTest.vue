<template>
  <div>
    <Table
      border
      ref="selection"
      @on-selection-change="selectionChange"
      :columns="columns4"
      :data="data1"
    ></Table>
    <Button @click="handleSelectAll(true)">全选</Button>
    <!--<Button @click="handleSelectAll(false)">Cancel all selected</Button>-->
    <Button @click="exportExcle">导出Excel</Button>

    <Button @click="exportword">导出Word</Button>

    <Button @click="zcfTestCcom">向父组件传数据</Button>

    <Button @click="showFdata">显示父组件传递数据</Button>

    <Button @click="testwatch">watch测试</Button>

    <Button @click="testdownload">下载测试</Button>
  </div>
</template>

<script>
import { jsonExport, jsonImport } from "@/api/jsonUtils.js";
import docxtemplater from "docxtemplater";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
//	import {xxx} from '../static/layui/layui.js'
export default {
  computed: {
    getName: function () {
      return this.testobj2.name;
    },
  },

  props: {
    fudata: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Age",
          key: "age",
        },
        {
          title: "Address",
          key: "address",
        },

        {
          title: "Action",
          key: "action",
          width: 350,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.bgshow(params.row);
                    },
                  },
                },
                "查看表格"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.bgedit(params.row);
                    },
                  },
                },
                "可编辑表格"
              ),
            ]);
          },
        },
      ],
      data1: [
        {
          id: "111",
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          id: "222",
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          id: "333",
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          id: "444",
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],

      exportLists: [],
      exportFileType: "xlsx", //导出的文件类型

      slstatus: true,

      testobj1: { cc: 3 },
      //              testobj2:{aa:'00',bb:'66'},
      testobj2: {},

      zcounter: 0,
    };
  },
  methods: {
    bgshow() {
      let routeUrl = this.$router.resolve({
        path: "/bgshow",
        query: { flag: 1 },
      });
      window.open(routeUrl.href, "_blank");
    },

    bgedit() {
      let routeUrl = this.$router.resolve({
        path: "/bgshow",
        query: { flag: 2 },
      });
      window.open(routeUrl.href, "_blank");
    },

    /**
     * @description: 下载文件 测试
     * @param {type}
     * @return {type}
     */
    testdownload() {
      this.$AL
        .getdownload(
          "/download/test" // 请求的地址
          // method: 'post', // 请求的方式
          // { aa: 'ii' }, // 请求的表单数据
          // { responseType: 'blob' },
        )
        .then((res) => {
          console.info("后台返回的数据", res.data);
          console.log(res);
          if (!res.data) {
            this.$Message.error("错误");
          } else {
            saveAs(
              new Blob([res.data]), // 里面传blob对象才可以
              "专项计划项目"
            );

            // saveAs(
            //   new Blob([res], {
            //     type:
            //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            //   }),
            //   '专项计划项目'
            // );

            console.log(res.data);
          }

          // console.info("完毕");
        })
        .catch((err) => {
          this.$Message.error("网络异常!");

          console.info("报错的信息", err);
          // console.info('报错的信息', err.response.message);
        });
    },

    /**
     *
     * 父调用子组件方法测试
     *
     */
    childMethodTest(e) {
      console.log("我是TableTest的childMethodTest，我被调用了-----" + e);
    },

    /**
     *
     * 子传父组件测试
     *
     */
    zcfTestCcom() {
      this.$emit("zcfTest", "我是子数据" + (this.zcounter += 1));
    },
    /**
     *
     * 父传子组件测试
     *
     */
    showFdata() {
      console.log(this.fudata);
    },

    testwatch() {
      this.testobj1.cc = this.testobj1.cc + 1;

      //      		this.testobj2.aa = 'kkk';   // 修改对象'原来有的'属性，watch可以监听到 否则 ↓↓
      this.$set(this.testobj2, "aa", "kkk"); // 新增属性需要使用this.$set，watch才能监听到。或者Object.assign({}, this.testobj2, {aa: 'kkk'})

      this.testobj2.name = "testobj2name"; // 或者 新增属性时，使用computed,然后再在watch
    },

    handleSelectAll(status) {
      this.$refs.selection.selectAll(this.slstatus);
      this.slstatus = !this.slstatus;
    },
    selectionChange(value) {
      //          	console.log(value);

      this.exportLists = value;
    },

    exportword() {
      // npm需引入组件
      // cnpm install docxtemplater@3.17.9 --save
      // cnpm install jszip@2.6.1 --save
      // cnpm install jszip-utils@0.1.0 --save

      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "/static/words/导出模板.docx",
        function (error, content) {
          // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个JSZip实例，内容为模板的内容
          let zip = new JSZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);

          // 设置模板变量的值
          doc.setData({
            bl1: "bl1",
            bl2: [{ xx: "11", yy: "22" }],
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(out, "导出名称-" + ".docx");
        }.bind(this)
      );
    },

    exportExcle() {
      if (this.exportLists.length == 0) {
        this.$Message.error("没有选择数据");

        return false;
      }

      var idList = "";

      this.exportLists.forEach((item) => {
        idList += "," + item.id;
      });

      idList = idList.substr(1);

      //				JSON.parse()

      //				console.log(JSON.stringify(this.exportLists));

      jsonExport(this.exportLists, this.exportFileType, "测试");

      //          	console.log(idList);

      //          	this.$axios.post('/excel/writeExcel',idList)
      //				.then(res=>{
      //				    console.log('res=>',res);
      //				})

      //使用axios进行请求后台，重点是{responseType: 'blob'} 的设置。
      //		    this.$axios.get("/excel/writeExcel",{responseType: 'blob'}).then(response=>{
      //
      //			    if(!response){
      //				    return
      //			    }
      //			    //将response 新建成文件流
      //			    var blob = new Blob([response], {type: 'application/vnd.ms-excel;charset=utf-8'})
      //			    //创建下载地址以及a标签,并且模拟a标签的点击事件进行下载文件。
      //			    var url = window.URL.createObjectURL(blob);
      //			    var aLink = document.createElement("a");
      //			    aLink.style.display = "none";
      //			    aLink.download = '短讯接收人列表模板.xls';
      //			    aLink.href = url;
      //			    document.body.appendChild(aLink)
      //			    aLink.click()
      //
      //		    }).catch(error=>{
      //			    console.log(error);
      //		    })

      //          	this.$axios({
      //              url: '/excel/writeExcel',//请求的地址
      //              method: 'get',//请求的方式
      //              headers: {
      //      				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //  				},
      ////              data: {
      ////              	ids:idList
      ////              } //请求的表单数据
      //          }).then(res => {
      //
      ////          	console.log('res=>',res);
      //
      //          })
    },
  },

  watch: {
    // watch数组
    exportLists: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
    },

    // watch对象的所有(属性)
    testobj1: {
      handler() {
        console.log(this.testobj1.cc);
      },
      deep: true,
    },

    // watch对象单个属性(前提是对象要有该属性，如果是新增属性时，见方法)
    "testobj2.aa": {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      //			deep:true
    },

    // watch对象 通过computed
    getName: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      //			deep:true
    },
  },
};
</script>

<style>
</style>