<template>
  <div class="container">
    <h2>Router</h2>
    <div class="row">
      <div class="col-4">
        <ul class="text-left">
          <li>
            <router-link to="/router/profile">Profile</router-link>
          </li>
          <li>
            <router-link to="/router/movie">Movie</router-link>
          </li>
          <li>
            <router-link to="/router/from">From</router-link>
          </li>
          <li>
            <router-link to="/router/exercise4">Exercise4</router-link>
          </li>
          <li>
            <router-link to="/router/api">API</router-link>
          </li>
        </ul>
      </div>
      <div class="col-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
