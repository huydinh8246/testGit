<template>
  <div>
    <the-header></the-header>
    <!-- <badge-list></badge-list> -->
    <!-- <user-info
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"
    ></user-info> -->
    <button @click="setSelctedComponent('ActiveGoals')">Active Goals</button>
    <button @click="setSelctedComponent('ManageGoals')">Manage Goals</button>

    <!-- keep alive: keep content in input field when change  -->
    <keep-alive>
      <component :is="selctedComponent"></component>
    </keep-alive>

    <!-- <active-goals v-if="this.selctedComponent === 'Active Goals'"></active-goals>
    <manage-goals v-if="this.selctedComponent === 'Manage Goals'"></manage-goals> -->

    <!-- <course-goals> -->
    <!-- <template #default='slotProps'> -->
    <!-- <h2>{{ slotProps.item }}</h2> -->
    <!-- <p> {{ slotProps['another-props'] }}</p> -->
    <!-- </template> -->
    <!-- </course-goals> -->
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
// import UserInfo from "./components/UserInfo.vue";
// import BadgeList from "./components/BadgeList.vue";
// import CourseGoals from "./components/CourseGoals.vue";
import ActiveGoals from "./components/ActiveGoals.vue";
import ManageGoals from "./components/ManageGoals.vue";

export default {
  components: {
    "the-header": TheHeader,
    // "user-info": UserInfo,
    // "badge-list": BadgeList,
    // "course-goals": CourseGoals,
    ManageGoals,
    ActiveGoals,
  },
  data() {
    return {
      selctedComponent: "ActiveGoals",
      activeUser: {
        name: "Maximilian Schwarzmüller",
        description: "Site owner and admin",
        role: "admin",
      },
    };
  },
  methods: {
    setSelctedComponent(smp) {
      this.selctedComponent = smp;
    },
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>