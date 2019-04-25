<template>
  <div>
    <loading v-if="isLoading"/>
    <h3 class="text-dark text-xl mb-4" v-if="!isLoading">{{ user.display_name}} Project</h3>
    <div class="flex flex-wrap justify-between item-center content-center" v-if="!isLoading">
      <gallery
        v-for="(project, index) in projects"
        :key="index"
        :name="project.name"
        :covers="project.covers"
        :description="project.description"
      >
        <div slot="action">
          <div
            class="bg-indigo-dark hover:bg-indigo rounded px-3 py-2 text-sm font-semibold text-white text-center w-full flex-no-grow cursor-pointer"
            @click="addTomyFavorite(index)"
            v-if="!addedIndex.includes(index)"
          >Add to My Favorite</div>

          <div
            class="bg-indigo-light rounded px-3 py-2 text-sm font-semibold text-white text-center w-full flex-no-grow pointer-events-none"
            v-else
          >Added to My Favorite</div>
        </div>
      </gallery>
    </div>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery.vue'
import Loading from '@/components/Loading.vue'

export default {
  components: {
    Gallery,
    Loading
  },

  data () {
    return {
      addedIndex: [],
      isLoading: true
    }
  },

  methods: {
    fetchProject (id) {
      // console.log("-----", id)
      console.log('------- sampai methods fetch component')
      return this.$store.dispatch('fetchProject', id)
    },

    addTomyFavorite (index) {
      this.addedIndex.push(index)
      this.$emit('myFavorite', this.projects[index])
    }
  },

  computed: {
    user () {
      return this.$store.state.projects.user
    },

    projects () {
      return this.$store.state.projects.projects
    }
  },

  watch: {
    $route (newVal) {
      this.isLoading = true
      this.fetchProject(newVal.params.behanceId).then(
        _ => (this.isLoading = false)
        
      )
      // this.isLoading = false
    }
  },

  mounted () {
    // this.fetchProject(this.$route.params.behanceId).then(
    //   _ => {(this.isLoading = false)}
    // )
    this.fetchProject(this.$route.params.behanceId).then(
      _ => {(this.isLoading = false)}
    )
  }
}
</script>

<style>
</style>
