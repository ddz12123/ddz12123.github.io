# Uniapp 套壳h5打包app

>
> httpUrl 是你要套壳的的h5网址。onReady中需要修改一下你首页的标题，目的是去除打包后APP首页导航栏的返回按钮。

- [/pages/index/index.vue]

```vue [/pages/index/index.vue]

<template>
	<view class="content">
		<web-view v-if="httpUrl" :src='httpUrl'></web-view>
		<view v-else>
			系统异常,请联系管理员处理
		</view>
	</view>
</template>

<script>
	var wv;
	export default {
		data() {
			return {
				httpUrl: null,
				canBack: false,
			}
		},
		onNavigationBarButtonTap(e) {
			if (wv) {
				wv.back();
			}
		},
		onLoad() {
			this.httpUrl = `http://xxxxxxxxxxxxxx/`;
		},
		methods: {

		},
		onBackPress(from) {
			if (wv && this.canBack) {
				wv.back();
				return true;
			}
			return false;
		},
		onReady() {
			// #ifdef APP-PLUS
			var self = this;
			var currentWebview = this.$scope.$getAppWebview();
			setTimeout(function() {
				wv = currentWebview.children()[0];
				wv.addEventListener(
					"progressChanged",
					function(e) {
						wv.canBack(function(e) {
							self.canBack = e.canBack;
						});
					},
					false
				);
				wv.addEventListener(
					"titleUpdate",
					function(e) {
						if (e.title?.includes('首页标题')) {
							let pages = getCurrentPages();
							let page = pages[pages.length - 1];
							let currentWebview = page.$getAppWebview();
							currentWebview.setTitleNViewButtonStyle(0, {
								text: "",
								width: 0
							});
						} else {
							let pages = getCurrentPages();
							let page = pages[pages.length - 1];
							let currentWebview = page.$getAppWebview();
							currentWebview.setTitleNViewButtonStyle(0, {
								type: "back",
								width: "auto"
							});
						}
					},
					false
				);
			}, 500); //如果是页面初始化调用时，需要延时一下

			// #endif
		}
	}
</script>

<style>
	.content {}
</style>

```
