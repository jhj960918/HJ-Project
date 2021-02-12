<template>
  <v-container fluid>
    <v-form>
      <v-card>
        <v-toolbar color="accent" dense flat dark>
          <v-toolbar-title>게시판 글 상세화면</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="editItem(detail.id)">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn icon @click="remove(detail.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list-item v-if="detail">
            <v-list-item-avatar>
              <v-img :src="detail.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{detail.id}}</v-list-item-title>
              <v-list-item-title>{{detail.first_name}} {{detail.last_name}}</v-list-item-title>
              <v-list-item-subtitle>{{detail.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-form>
    
       <v-progress-linear v-if="loading" :active="loading" :indeterminate="loading" absolute top color="deep-purple accent-4">
    </v-progress-linear>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  /*   props: {
      id: Number
    }, */
  data() {
    return {
      loading:true
    }
  },
  computed: {
    ...mapState({
      detail: state => state.iusers.detail,
    }),
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.id = this.$route.params.id;
      this.resetState(this.id)
      this.getUser(this.id).then(()=>{
        this.loading=false
      })
    },
    ...mapActions({
      getUser: "iusers/getUser",
      removeUser: "iusers/removeUser",
      resetState:"iusers/resetState"

    }),
    editItem(id) {
      this.$router.push({ name: 'edit', params: { id: id } })
    },
    remove() {
      this.removeUser(this.id).then(() => {
        this.$router.push({ path: `/isabelle/1` })
      })

    }

  }
} 
</script>