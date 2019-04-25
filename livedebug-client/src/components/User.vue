<template>
  <div class="max-w-sm rounded overflow-hidden shadow mb-6 p-3 bg-white w-30">
    <div class="flex items-center">
      <img
        class="w-10 h-10 rounded-full mr-4 self-start"
        :src="picture['138']"
        alt="Avatar of Jonathan Reinink"
      >
      <div>
        <p class="text-dark text-lg font-bold mb-2">{{ name }}</p>
        <p class="text-grey-dark text-sm mb-2">{{ occupation }}</p>
        <button
          class="bg-transparent hover:bg-indigo text-indigo-dark font-semibold hover:text-white py-1 px-4 border border-indigo hover:border-transparent rounded self-start"
          @click="showDetail"
        >See Project</button>
      </div>
    </div>

    <div class="border-b border-grey-light mb-2 py-2"></div>

    <div class="flex justify-around">
      <div>
        <p class="text-sm text-grey-dark mb-1">Followers</p>
        <p class="text-lg text-dark font-semibold">{{ stats.followers}}</p>
      </div>

      <div>
        <p class="text-sm text-grey-dark mb-1">Following</p>
        <p class="text-lg text-dark font-semibold">{{ stats.following}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'occupation', 'stats', 'picture', 'id'],

  methods: {
    showDetail () {
      // console.log(this.id)
      this.$emit('detail', this.id)
    }
  }
}
</script>

<style>
</style>
