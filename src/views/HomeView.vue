<template>
  <div class="home">
    <div class="content">
      <button class="scan-button button" @click="useCamera">扫描二维码</button>
      <div class="scan-tip">有效期 2024-12-07 08:52:33 扫描次数剩余：3</div>
      <div class="teach">
        <div class="teach-title">首次登陆使用请先看教程</div>
        <button class="teach-button button">使用教程</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

onMounted(() => {
  // 页面返回时，拿到扫码结果并处理
  const { qr, err } = route.query.scanRes || {};
  if (qr) {
    alert(qr); // 处理扫码成功结果
  } else if (err) {
    alert(err); // 处理失败结果
  }
  document.title = "VIP扫码登陆";
});

// 选取二维码图片并识别
const useLocal = e => {
  if (e.target.files.length == 0) {
    return;
  }
  const imageFile = e.target.files[0];
  const html5QrCode = new Html5Qrcode("reader1");
  html5QrCode
    .scanFile(imageFile, false)
    .then(qr => {
      alert(qr);
    })
    .catch(err => {
      alert(err);
    });
};

const useCamera = () => {
  router.push("/scan"); // 去扫码页面
};
</script>
<style>
.title {
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  top: 0;
  left: 0;
}
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/background.png");
  background-repeat: no-repeat;
  background-size: 100%;
}

.content {
  width: 100%;
  transform: translateY(50%);
}

.button {
  width: 100%;
  border-radius: 32px;
  border: none;
  color: #fff;
  height: 50px;
}

.scan-button {
  background-color: #2a8cfb;
}

.scan-tip {
  color: #899fb6;
  line-height: 36px;
  font-size: 14px;
  display: flex;
  justify-content: center;
}

.teach {
  margin-top: 10%;
  width: 100%;
}

.teach-button {
  background-color: #595a93;
}

.teach-title {
  color: #595a93;
  display: flex;
  justify-content: center;
  line-height: 36px;
  font-size: 16px;
  font-weight: bold;
}
</style>
