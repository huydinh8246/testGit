<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user" @click="removeUser(user)">{{ user }}</li>
    </ul>
    <div>
      <input type="text" name="" id="" />
      <button @click="addUser">Add user</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: ["huy", "trung", "nhi", "cuong"],
    };
  },
  methods:{
      addUser(event){
          console.log(event.value);
          this.users.push()
      },
      removeUser(user){
          this.users = this.users.filter(usr => usr !== user)
          console.log(this.users);
      }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  border: 1px solid black;
  padding: 1rem;
}
</style>