<template>
  <div>
    <div class="container">
      <list-data></list-data>
    </div>
    <div class="container">
      <div class="block" :class="{ animate: animatedBlock }"></div>
      <button @click="animateBlock">Animate</button>
    </div>
    <base-modal @close="hideDialog" :open="dialogIsVisible">
      <p>This is a test dialog!</p>
      <button @click="hideDialog">Close it!</button>
    </base-modal>
    <div class="container">
      <!-- transition contain only one direct child element -->
      <!-- <transition enter-active-class="..." enter-to-class="...."> -->
      <!-- :css=fale does not use css -->
      <transition
        :css="false"
        name="para"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeleave"
      >
        <p v-if="paraisVisible">this is sometimes vi</p>
      </transition>
      <button @click="changeParaVisible">toogle button</button>
    </div>
    <div class="container">
      <button @click="showDialog">Show Dialog</button>
    </div>

    <!-- transion multiple element -->
    <div class="container">
      <!-- exception: at most one added to real DOM at the same time -->
      <!-- mode: in-out | out-in control the leaving element should bi animated or the  new element -->
      <!-- cannot use 2 v-if beacause the code is node clear and Vue will understand 2 element is exit -->
      <transition name="fade-button" mode="out-in">
        <button @click="showUser" v-if="userVisible">Show user</button>
        <button @click="hideUser" v-else>Hide user</button>
      </transition>
    </div>
  </div>
</template>  

<script>
import ListData from "./components/ListData.vue";

export default {
  components: {
    ListData,
  },
  data() {
    return {
      animatedBlock: false,
      dialogIsVisible: false,
      paraisVisible: false,
      userVisible: false,
    };
  },
  methods: {
    beforeEnter(el) {
      console.log("beforeenter");
      console.log(el);
      el.style.opacity = 0;
    },
    enter(el, done) {
      //done function: let vue know when done
      console.log("beforeenter");
      console.log(el);
      let round = 1;
      const interval = setInterval(function () {
        el.style.opacity = round * 0.01;
        round++;
      }, 20); //execute every 20s
      if (round > 10) {
        clearInterval(interval);
        done();
      }
    },
    beforeleave(el) {
      console.log("aftereenter");
      console.log(el);
    },
    hideUser() {
      this.userVisible = true;
    },
    showUser() {
      this.userVisible = false;
    },
    changeParaVisible() {
      this.paraisVisible = !this.paraisVisible;
    },
    animateBlock() {
      this.animatedBlock = !this.animatedBlock;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 0.3s ease-out; */
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
.animate {
  /* transform: translateX(150px); */
  animation: slide-fade 0.3s ease-out forwards;
}

.v-enter-from {
  /* opacity: 0;
  transform: translateY(-30px); */
}
/* custom class */
/* .para-enter-active { */
/* .v-enter-active{ */
/* transition: all 0.3s ease-out; */
/* animation: slide-scale 0.3s ease-out;
} */

.v-enter-to {
  /* opacity: 1;
  transform: translateY(0); */
}

.v-leave-from {
  /* opacity: 1;
  transform: translateY(0); */
}
/* .para-leave-active { */
/* .v-leave-active{ */
/* transition: all 0.3s ease-in; */
/* animation: slide-scale 0.3s ease-out;
} */
.v-leave-to {
  /* opacity: 0;
  transform: translateY(-30px); */
}

.fade-button-leave-from .fade-button-enter-from {
  opacity: 0;
}

.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-button-leave-to .fade-button-enter-to {
  opacity: 1;
}

@keyframes slide-fade {
  0% {
    transform: translate(0) scale(1);
  }

  70% {
    transform: translateX(-120px) scale(1, 1);
  }

  100% {
    transform: translateX(-150%) scale(1);
  }
}

@keyframes slide-scale {
  0% {
    transform: translate(0) scale(1);
  }

  70% {
    transform: translateX(-120px) scale(1, 1);
  }

  100% {
    transform: translateX(-150%) scale(1);
  }
}
</style>