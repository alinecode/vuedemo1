let ymcgUtil = {}


// 计算总价。 计算表格的总价，以及最后一行的总计
ymcgUtil.jisuanzongjia = function (storeEditListCol2, xjjgEditList2, cloLength) { // 参数依次为列、数据、已经有的列数量

  if (storeEditListCol2.length == cloLength || xjjgEditList2.length == 0) { // 避免无效循环，解决异步问题
    //					console.log("没有值");
    return;
  }

  var tongji = {
    'address': '合计',
    'ym11': '0.000'
  };

  for (var b = 0; b < storeEditListCol2.length; b++) { // 大类

    if (storeEditListCol2[b].children != undefined) { // 有子类

      for (var c = 0; c < storeEditListCol2[b].children.length; c++) { // 小类

        var zongshuliang = 0;

        var children1 = storeEditListCol2[b].children[c];
        var danjia = Number(children1.jg).toFixed(3); // 单价

        //							console.log(danjia);

        for (var a = 0; a < xjjgEditList2.length; a++) { // 每行数据

          xjjgEditList2[a].ym11 = xjjgEditList2[a].ym11 == undefined ? 0.000 : xjjgEditList2[a].ym11;

          var hangshuju = xjjgEditList2[a]; // 每行数据

          //								var shuliang2 = Number(hangshuju[children1.key]); // 数量

          var shuliang2 = parseFloat(Number(hangshuju[children1.key] == undefined ? 0 : hangshuju[children1.key]).toFixed(4));

          //								var shuliang2 = parseFloat(hangshuju[children1.key]); // 数量

          zongshuliang += shuliang2; // 用于统计

          //								tongji[children1.key] = Number(zongshuliang).toFixed(4); // 用于统计
          tongji[children1.key] = Number(zongshuliang).toFixed(3); // 用于统计

          //								var cellprice = (parseFloat(Number(danjia * shuliang2).toFixed(3))/10000).toFixed(4);  // 该cell的总价金额
          var cellprice = (parseFloat(Number(danjia * shuliang2).toFixed(3))).toFixed(4); // 该cell的总价金额

          //		console.log(cellprice);

          xjjgEditList2[a].ym11 = parseFloat(parseFloat(parseFloat(xjjgEditList2[a].ym11) + parseFloat(cellprice))).toFixed(4); // 把之前的总价加上，等于现在的总价

          tongji.ym11 = parseFloat(parseFloat(cellprice) + parseFloat(tongji.ym11)).toFixed(4); // 统计的数量

        }

      }

    }

  }

  xjjgEditList2.push(tongji);

}

export default ymcgUtil
