<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="account">
            <Input type="text" v-model="formInline.account" placeholder="account">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
        
        <FormItem>
            <Button type="primary" @click="handleSubmit2('formInline')">Signup</Button>
        </FormItem>
        
    </Form>
</template>
<script>
export default {
data() {
	return {
		formInline: {
			account: '',
			password: ''
		},
		ruleInline: {
			user: [{
				required: true,
				message: 'Please fill in the user name',
				trigger: 'blur'
			}],
			password: [{
					required: true,
					message: 'Please fill in the password.',
					trigger: 'blur'
				},
				{
					type: 'string',
					min: 1,
					message: 'The password length cannot be less than 1 bits',
					trigger: 'blur'
				}
			]
		},
		
		path:"ws://192.168.9.76:9999/store-service/websocket"+"/",
        socket:"",
		chatpath:"ws://192.168.9.76:9999/store-service/chat"+"/"
	}
},
methods: {
	
	showIm(){
	
	layui.use('layim', function(layim) {
				// console.log("当前登录账户用户名6666666666666666666666666666666");
				// console.log(this.formInline.account);
				var aa=this.formInline.account;
				var socket = new WebSocket(this.chatpath+aa);

				var $ = layui.jquery;
				var autoReplay = [
					'您好，我现在有事不在，一会再和您联系。',
					'你没发错吧？face[微笑] ',
					'洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！face[哈哈] ',
					'你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。face[心] face[心] face[心] ',
					'face[威武] face[威武] face[威武] face[威武] ',
					'<（@￣︶￣@）>',
					'你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
					'face[黑线]  你慢慢说，别急……',
					'(*^__^*) face[嘻嘻] ，是贤心吗？'
				];

				layim.config({

					isgroup: false,
					//初始化接口
					init: {
						url: '/user/chatInit?account='+''+this.formInline.account,
					}

					//						url: xxxurl + '/ws/getusers?username=' + this.userInfo.username //'/static/layim/json/getList.json',//得到当前登录用户的信息/static/layim/json/getList.json
					//简约模式（不显示主面板）
					//,brief: true

					//查看群员接口
					,
					members: {
						url: '/static/layui/json/getMembers.json',
						data: {}
					},
					//					uploadImage: {
					//						url: '' //（返回的数据格式见下文）
					//							,
					//						type: '' //默认post
					//					}
					//					,
					//					uploadFile: {
					//						url: '' //（返回的数据格式见下文）
					//							,
					//						type: '' //默认post
					//					}
					//					,
					skin: ['/static/layim/src/css/modules/layim/skin/5.jpg',
							'/static/layim/src/css/modules/layim/skin/6.jpg',
							'/static/layim/src/css/modules/layim/skin/9.jpg',
						] //新增皮肤
						//,isfriend: false //是否开启好友
						//,isgroup: false //是否开启群组
						,
					min: true //是否始终最小化主面板（默认false）

						,
					//					chatLog: './demo/chatlog.html' //聊天记录地址
					//						,
					//					find: './demo/find.html',
					copyright: true //是否授权
				});

				/*
				layim.chat({
				  name: '在线客服-小苍'
				  ,type: 'kefu'
				  ,avatar: 'http://tva3.sinaimg.cn/crop.0.0.180.180.180/7f5f6861jw1e8qgp5bmzyj2050050aa8.jpg'
				  ,id: -1
				});
				layim.chat({
				  name: '在线客服-心心'
				  ,type: 'kefu'
				  ,avatar: 'http://tva1.sinaimg.cn/crop.219.144.555.555.180/0068iARejw8esk724mra6j30rs0rstap.jpg'
				  ,id: -2
				});
				*/
				//layim.setChatMin();

				//监听发送消息
				layim.on('sendMessage', function(res) {
					//					var To = data.to;
					//					// console.log(data);
					// console.log("发送者信息");
					var mine = res.mine;
					// console.log(mine);
					// console.log("接收者信息");
					var to = res.to;
					// console.log(to);
					socket.send(JSON.stringify({
						type: 'chatMessage' //随便定义，用于在服务端区分消息类型
							,
						data: res
					}));
					//监听签名修改
					//				    layim.on('sign', function(value){
					//				    layer.msg(value);
					//				    });

					//演示自动回复
					//					setTimeout(function() {
					//						var obj = {};
					//						if(To.type === 'group') {
					//							obj = {
					//								username: '模拟群员' + (Math.random() * 100 | 0),
					//								avatar: layui.cache.dir + 'images/face/' + (Math.random() * 72 | 0) + '.gif',
					//								id: To.id,
					//								type: To.type,
					//								content: autoReplay[Math.random() * 9 | 0]
					//							}
					//						} else {
					//							obj = {
					//								username: To.name,
					//								avatar: To.avatar,
					//								id: To.id,
					//								type: To.type,
					//								content: autoReplay[Math.random() * 9 | 0],
					//								timestamp: new Date().getTime()
					//							}
					//						}
					//						layim.getMessage(obj);
					//					}, 1000);
				});

				//监听在线状态的切换事件
				layim.on('online', function(data) {
					// console.log(data);
				});

				//la   
				layim.on('ready', function(res) {

					//监听收到的聊天消息
					socket.onmessage = function(res) {
						//		
						res = JSON.parse(res.data);
						// console.log('receive')
						// console.log(res);
						//  res = eval('(' + res + ')');
						// console.log("返回的消息res");
						// console.log(res);
						// console.log("返回的data");
						// console.log(res.data);
						//						// console.log("用户名");
						//						// console.log(res.data.mine.username);
						//						// console.log("消息ID");
						//						// console.log(res.data.mine.id);
						//						// console.log("接收方");
						//						// console.log(res.data.to);
						//						// console.log("--------");

						// console.log("res.type:");
						// console.log(res.type);
						if(res.type === 'chatMessage') {
							var obj = {};
							obj = {
								/*
								 *   username: "纸飞机" //消息来源用户名
									  ,avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1" //消息来源用户头像
									  ,id: "100000" //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
									  ,type: "friend" //聊天窗口来源类型，从发送消息传递的to里面获取
									  ,content: "嗨，你好！本消息系离线消息。" //消息内容
									  ,cid: 0 //消息id，可不传。除非你要对消息进行一些操作（如撤回）
									  ,mine: false //是否我发送的消息，如果为true，则会显示在右方
									  ,fromid: "100000" //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
									  ,timestamp: 1467475443306 //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
								 */

								username: res.data.mine.username,
								avatar: res.data.mine.avatar,
								id: res.data.mine.id,
								type: res.data.to.type,
								content: res.data.mine.content,
								cid: 0,
								mine: false, //这个值要根据当前ID和 fromid匹配判断是否是自己的消息
								fromid: res.data.mine.id,
								timestamp: new Date().getTime()

							}
							// console.log("执行判断操作了");
							//// console.log(res.data.mine);
//							// console.log("+++++");
							// console.log(res.isSelf);
							if(!res.isSelf) {
								layim.getMessage(obj);
							}
						} else if(res.type == "online") {
//							// console.log("+++++online");
							// console.log(res);

							let user = {
								type: 'friend',
								avatar: res.data.mine.avatar,
								username: res.data.mine.username,
								groupid: res.data.mine.groupid,
								id: res.data.mine.id,
								sign: res.data.mine.sign
							}

							layim.addList(user);
						}else if(res.type == "offline") {
//							// console.log("+++++offline");
							// console.log(res);

							layim.removeList({
									  type: 'friend' //或者group
									  ,id: res.data.mine.id //好友或者群组ID
									});
						}

					};

					socket.send(JSON.stringify({
						type: 'online',
						data: res
					}));


			 //连接关闭
	          socket.onclose = function(event) {
	          	// console.log('666666666666666666666666666666666666666666666');
//				   socket.send(JSON.stringify({
//						type: 'closeMessage'
//							,
//						data: '${requestScope.cdgk_login_user_request.user.username}',
//						sender : '${requestScope.cdgk_login_user_request.user.realname}'
//					}));

// 	        	  layer.msg('您已下线，重新上线?'); 
// 	        	  layim.setFriendStatus(currentsession, 'offline');
// 	        	  layer.confirm('您已下线，重新上线?', function(index){
// 	        		  reconnect(websocketurl,initEventHandle); 
// 	        		  layer.close(index);
// 	        	  }); 
		      };

					//接受消息（如果检测到该socket）
					//					setTimeout(function() {
					//						//不在好友列表，则为临时会话
					//						layim.getMessage({
					//							username: "Hi",
					//							avatar: "http://tva1.sinaimg.cn/crop.7.0.736.736.50/bd986d61jw8f5x8bqtp00j20ku0kgabx.jpg",
					//							id: "198909151014",
					//							type: "friend",
					//							content: "临时：" + new Date().getTime()
					//						});
					//
					//						//在好友列表
					//						layim.getMessage({
					//							username: "贤心",
					//							avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1",
					//							id: "100001",
					//							type: "friend",
					//							content: "嗨，你好！欢迎体验LayIM。演示标记：" + new Date().getTime(),
					//							timestamp: new Date().getTime()
					//						});
					//					}, 1000);
				});

				//监听查看群员
				layim.on('members', function(data) {
					// console.log(data);
				});

				//监听聊天窗口的切换
				layim.on('chatChange', function(data) {
					// console.log(data);
				});



				$('#imOnline').on('click', function() {
					// console.log(layim.layimMain);
				})

			}.bind(this));
	
	
},
	
	
	getSessionId(){
            var c_name = 'JSESSIONID';
            if(document.cookie.length>0){
              var c_start=document.cookie.indexOf(c_name + "=")
               if(c_start!=-1){ 
                 c_start=c_start + c_name.length+1 
                var c_end=document.cookie.indexOf(";",c_start)
                 if(c_end==-1) c_end=document.cookie.length
                 return unescape(document.cookie.substring(c_start,c_end));
               }
            }
},
	
	initws(){
		
		var aa=Date.now();
		
		// console.log(aa);
		// console.log(aa);
		
	  if(typeof(WebSocket) == "undefined") {
        // console.log("您的浏览器不支持WebSocket");  
        
    	}else{
        // console.log("您的浏览器支持WebSocket");  
        
//      return;
        
        
        this.socket = new WebSocket(this.path+aa);
        
       		//打开事件  
            this.socket.onopen = function() {
                // console.log("Socket 已打开");  
                //socket.send("这是来自客户端的消息" + location.href + new Date());  
            };  
            //获得消息事件  
            this.socket.onmessage = function(msg) {
                // console.log(msg.data);  
                //发现消息进入    开始处理前端触发逻辑
            };  
            //关闭事件  
            this.socket.onclose = function() {
                // console.log("Socket已关闭");  
            };  
            //发生了错误事件  
            this.socket.onerror = function() {
                // console.log("Socket发生了错误");  
                //此时可以尝试刷新页面
            } 
        
		}
		
	},
	
	defaultAP(){
		this.formInline.account = '666';
		this.formInline.password = "789789";
		
	},
	
	handleSubmit(name) {
		this.$refs[name].validate((valid) => {
			if(valid) {
				
	        this.$axios({
                url: '/user/login',//请求的地址
                method: 'post',//请求的方式
                data: this.formInline//请求的表单数据
            }).then(res => {
            	
            	
            	// console.info('后台返回的数据', res.data);
            	// console.log(res);
            	if(!res.data){
            		
            	this.$Message.error('账号密码错误');
            		
            	}else{
            		
               this.$Message.success('Success!');
               this.$router.replace('/index');
//             this.showIm(); // 打开聊天
              }
            	
                // console.info("完毕");
            }).catch(err => {
            	this.$Message.error('网络异常!');
            	
                // console.info('报错的信息', err);
                // console.info('报错的信息', err.response.message);
            });
				
				
			} else {
				this.$Message.error('失败!');
			}
		})
	},
	
	
	handleSubmit2(name) {
		this.$refs[name].validate((valid) => {
			if(valid) {
				
	        this.$axios({
                url: '/user/register',//请求的地址
                method: 'post',//请求的方式
                data: this.formInline//请求的表单数据
            }).then(res => {
            	
            	
            	// console.info('后台返回的数据', res.data);
            	// console.log(res);
            	if(!res.data){
            		
            	this.$Message.error('无法注册该账号');
            		
            	}else{
            		
               this.$Message.success('Success!');
               this.$router.replace('/index');
               this.showIm();
              }
            	
                // console.info("完毕");
            }).catch(err => {
            	this.$Message.error('网络异常!');
            	
                // console.info('报错的信息', err);
                // console.info('报错的信息', err.response.message);
            });
				
				
			} else {
				this.$Message.error('失败!');
			}
		})
	}
},
mounted() {
	
	this.initws();
	
	// 默认子账号名密码
	this.defaultAP();
	
	
}


}
</script>