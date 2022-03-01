<template>
  <div>
    <button
      @click="selectCategory()"
      :class="{ selected: isSelected }"
      v-html="category.name"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    category: Object
  },
  data() {
    return {
      isSelected: false
    };
  },

  methods: {
    selectCategory() {
      this.isSelected = !this.isSelected;
      this.$emit('selected', this.isSelected);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  font-family: 'Montserrat', sans-serif;
  color: var(--clr-white-100);
  font-size: var(--fs-200);
  width: auto;
  height: auto;
  padding: 0.5rem 0.6rem;
  font-weight: var(--fw-medium);

  &.selected {
    background-color: white;
    color: var(--clr-orange-100);
  }

  @media (max-width: 38em) {
    font-weight: bold;
  }
}
</style>
