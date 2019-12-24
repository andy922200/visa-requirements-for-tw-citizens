// ./src/components/Navbar.vue
<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">中華民國公民簽證要求</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <div class="icon">
          <a target="_blank" href="#">
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
        </div>
        <a target="_blank" href="https://github.com/andy922200">
          <h5>My Github</h5>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
.icon a {
  font-size: 30px;
  color: white;
  margin: 20px;
}

.icon a:hover {
  color: rgb(0, 0, 0);
}

#navbarSupportedContent h5 {
  margin: 5px auto;
  color: white;
  text-decoration: none;
}

#navbarSupportedContent a {
  text-decoration: none;
}
</style>