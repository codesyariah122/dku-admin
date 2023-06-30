<template>
  <ol class="flex items-center w-full mb-4 sm:mb-5">
    <li v-for="(step, idx) in steps" :key="idx" v-bind:class="getStepClass(idx)" class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
      <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
        <i :class="`fa-solid ${step.icon}`"></i>
      </div>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getStepClass(idx) {
      return {
        'step': true,
        'text-blue-600 dark:text-blue-500': idx === this.currentStep,
      };
    },
  },
};
</script>

<style scoped>
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step .step-number {
  width: 24px;
  height: 24px;
  border: 2px solid #000000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.step .step-title {
  margin-top: 8px;
  font-size: 14px;
}

.step.active .step-number {
  background-color: #000000;
  color: #ffffff;
}
</style>
