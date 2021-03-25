<template>
  <div>
    <Table border ref="selection" :columns="columns4" :data="data1"></Table>
  </div>
</template>

<script>
import { jsonExport, jsonImport } from "@/api/jsonUtils.js";
import hjUtil from '@/utils/hjUtil'
//	import {xxx} from '../static/layui/layui.js'
export default {
  computed: {},

  props: {},

  data() {
    return {
      columns4: [
      {
						title: '机构',
						align: 'center',
						key: 'address'
					},
	

        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        // },
        // {
        //   title: "Name",
        //   key: "name",
        // },
        // {
        //   title: "Age",
        //   key: "age",
        // },
        // {
        //   title: "Address",
        //   key: "address",
        // },
      ],
      data1: [
        {
          id: "111",
          417911: "69",
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          417911: "58",
          id: "222",
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          417923:'2.2',
          id: "333",
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          417923:'9.2',
          id: "444",
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],
    };
  },
  methods: {
    selectTable() {

// console.log(this.$route.query.flag);

      // 测试动态添加列
      // 不能编辑时，就计算金额
      if (this.$route.query.flag == 1) {
        var ymje = {};
        ymje.title = "金额";
        ymje.align = "center";
        ymje.key = "ym11";
        this.columns4.push(ymje);
      }
      // 测试动态添加列结束



      // 列的原始数据-包含列名，模拟
      var yssj = [
        {
           address: "New York No. 1 Lake Park",
          cs001: "417911",
          cs002: "子类1.1",
          cs003: "万毫升",
          cs0051: "父类1",
          csb003: "0.8000",
        },
        {
          address: "Sydney No. 1 Lake Park",
          cs001: "417923",
          cs002: "子类2.1",
          cs003: "万羽份",
          cs0051: "父类2",
          csb003: "0.3000",
        },
      ];

      // axios.post('/xxx/xxx', {'xx':'xx'}).then(function(reJson) {
      for (var i = 0; i < yssj.length; i++) {
        var temdata = yssj[i];

        // 先找大类，如果有，直接push到子类中，没有，就执行else
        let tmp = this.columns4.find((dalei) => dalei.title == temdata.cs0051);

        if (tmp != undefined) {
          var ym = {}; // 新的子类，也就是子列
          ym.align = "center";
          ym.title = temdata.cs002;
          ym.jg = temdata.csb003; // 在列上新建单价属性。新增属性。
          ym.key = temdata.cs001; // 小类的key设置为小类的id字段值，因为表格数据的格式是(小类的id值:数量)
          ym.render = (h, params) => {  // 重新渲染表格样式
            if (this.$route.query.flag != 1) { // 生成可编辑表格
              return h("input", {
                style: {
                  border: "1",
                },
                domProps: {  // 表格内显示值
                  value: params.row[params.column.key],
                },
                on: {
                  input: (val) => {  // 限制输入值，以及赋值给整个表格
                    //       	val.target.value=val.target.value.replace(/[^\d]/g,'');
                    val.target.value = val.target.value.replace(
                      /^\D*(\d*(?:\.\d{0,3})?).*$/g,
                      "$1"
                    ); // 只能输入几位小数
                    this.data1[params.index][params.column.key] =
                      val.target.value;
                  },
                },
              });
            } else {
              return h("div", params.row[params.column.key]);  // 不生成可编辑表格
            }
          };

          tmp.children.push(ym); // 给大类push进去小类，生成多层表格
        } else {
          var dalei = {};
          dalei.align = "center";
          dalei.title = temdata.cs0051;
          dalei.children = [];

          var ym = {};
          ym.align = "center";
          ym.title =
            temdata.cs002 +
            "(单价：" +
            temdata.csb003 +
            "万元/" +
            temdata.cs003 +
            ")";
          ym.jg = temdata.csb003;

          ym.render = (h, params) => {
            if (this.$route.query.flag != 1) {
              return h("input", {
                style: {
                  border: "1",
                },
                domProps: {
                  value: params.row[params.column.key],
                },
                on: {
                  input: (val) => {
                    val.target.value = val.target.value.replace(
                      /^\D*(\d*(?:\.\d{0,3})?).*$/g,
                      "$1"
                    ); // 只能输入几位小数
                    this.data1[params.index][params.column.key] =
                      val.target.value;
                  },
                },
              });
            } else {
              return h("div", params.row[params.column.key]);
            }
          };

          ym.key = temdata.cs001; // 小类的key设置为小类的id

          dalei.children.push(ym); // 小类push进大类，形成多层表格（iview样式）

          this.columns4.splice(1, 0, dalei); // 指定新增到第二列
        }
      }

      if (this.$route.query.flag == 1) {  // 如果是查看，最下面的一行就统计一个合计
        hjUtil.jisuanzongjia(this.columns4, this.data1, 2);
      }

      // 获取表头结束

      // 给this.data1赋值
      


    },
  },
  mounted() {
    // console.log(123);
    this.selectTable();
  },
  watch: {},
};
</script>

<style>
</style>