<script setup>

</script>

<template>
  <header>
  <div class="wrap-logo">
    <a href="" class="logo">Биржа</a>
  </div>
  <nav>
    <a href="">Брокер</a>
    <a href="/#/admin">Администратор</a>
  </nav>
  </header>
</template>

<style scoped>
* {box-sizing: border-box;}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #FFEB3B;
  padding: 20px 10px;
  position: absolute;
  top:0%;
  left:0%;
  width: 100%;
}

.wrap-logo {
  display: flex;
  align-items: center;

}

header a {
  color: #212121;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 4px;
}

header a.logo {
  font-size: 25px;
  font-weight: bold;
}

header a:hover {
  background-color: #FBC02D;
  color: #212121;
}

header a.active {
  background-color: #FBC02D;
}

nav {
  display: flex;
  align-items: center;
}
</style>