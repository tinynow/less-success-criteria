<template>
  <mk-question></mk-question>
</template>

<script>
import Question from './question';

export default {
  name: 'HelloWorld',
  components: {
    'mk-question': Question,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>
