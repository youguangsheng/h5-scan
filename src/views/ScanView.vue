<template>
  <div>
    <!-- <div @click="close" class="title">扫码 X</div> -->
    <!-- 扫描仪占位符 -->
    <div id="reader"></div>
  </div>
</template>

<script setup>
import { Html5Qrcode } from "html5-qrcode";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { onBeforeRouteLeave } from "vue-router";
import wx from 'weixin-js-sdk';
const router = useRouter();
let html5QrCode = null;
let scanRes = {}; // 存放扫码结果

// 路由导航，将扫码结果放回给上一页
onBeforeRouteLeave(to => {
  // to.query.scanRes = scanRes
  to.params.scanRes = scanRes;
});

// 关闭扫码页面
const close = () => {
  html5QrCode.stop().finally(() => {
    html5QrCode.clear();
    router.back();
  });
};

// // 扫码成功的回调
const onScanSuccess = qr => {
  scanRes.qr = qr;
  close();
};

// 使用相机扫码
const useCamera = () => {
  // 实例化，接收元素id作为参数
  html5QrCode = new Html5Qrcode("reader");
  // 获取相机设备
  Html5Qrcode.getCameras()
    .then(devices => {
      // 扫码配置
      const config = {
        fps: 30, //  二维码扫描每秒帧数
        qrbox: { width: 210, height: 210 }, // UI框的大小
        aspectRatio: 1.777778,
        showTorchButtonIfSupported: true
      };
      if (devices && devices.length) {
        let cameraId = devices[devices.length - 1].id; //后置摄像头，一般最后一个是后置摄像头
        //let cameraId = devices[0].id //前置摄像头
        html5QrCode
          .start({ deviceId: { exact: cameraId } }, config, onScanSuccess)
          .catch(err => {
            scanRes.err = err;
            router.back();
          });
      } else {
        // 如果没有找到设备，直接启用摄像头
        //environment：后置摄像头  user：前置摄像头
        html5QrCode
          .start({ facingMode: "environment" }, config, onScanSuccess)
          .catch(err => {
            scanRes.err = err;
            router.back();
          });
      }
    })
    .catch(err => {
      scanRes.err = err;
      router.back();
    });
};
onMounted(() => {
  const isWeixinBrowser = /micromessenger/i.test(navigator.userAgent)
  if (isWeixinBrowser) { 
    fetch("/api/v1/wechat_jssdk_config", {
      method: "POST", // 设置请求方法为POST
      headers: {
        "Content-Type": "application/json", // 设置请求头为JSON格式
      },
      body: JSON.stringify({}),
    }).then((response) => {
      return response.json(); // 将响应解析为 JSON 格式
    }).then((res) => {
      if (res.errcode === 0) {
        useWeChatScanQRCode(res.data);
      }else{
        showToast({ type: "fail", message: res.errmsg });
      }
    }).catch((error) => {
        console.error(error);
    });
  }else{
      useCamera();
  }
  document.title = "扫码";
});

//使用微信扫码功能
const useWeChatScanQRCode = (wechatConfig) => {
  console.log(wechatConfig);
  try {
        // 初始化微信JSSDK
        wx.config(wechatConfig);
        // 检查JSSDK是否成功加载
        wx.ready(() => {
          console.log('微信JSSDK已就绪');
          // 在这里调用微信JSSDK的API
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: (res) => {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              console.log("result:");
              console.log(result);
              showToast(result); // 处理失败结果
            }
          }, function (err) {
            console.error(err);
          });
        });

        // 处理错误
        wx.error((err) => {
          console.error('微信JSSDK加载失败', err);
        });
      } catch (error) {
        console.error('获取微信JSSDK配置失败', error);
      }
}
</script>

<style scoped>
.title {
  color: #fff;
  z-index: 9;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
}
</style>
