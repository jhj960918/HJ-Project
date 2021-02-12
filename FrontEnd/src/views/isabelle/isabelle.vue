<template >
  <div>
    <v-card>
      <v-data-table class="elevation-1" v-if="listData" v-model="selected"  show-select :headers="headers" :items="listData.data" :single-select="singleSelect" @click:row="rowClick" hide-default-footer>
        <template slot="items" slot-scope="props">
          <tr>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.first_name }}</td>
            <td :class="headers[2].class">{{props.item.last_name }}</td>
            <td :class="headers[3].class">{{props.item.email}}</td>
          </tr>
        </template>
        <template v-slot:top>
          <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
        </template>
      </v-data-table>
      <template>
        <v-icon @click="deleteItem">
          mdi-delete
        </v-icon>
          </template>
      <v-icon @click="editItem1">
        mdi-plus-circle
      </v-icon>
    </v-card>
    <div>
      <v-btn v-for="(page, idx) in totalPage" :key="idx" @click="getList(page)">{{page}}</v-btn>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";


export default {
  data() {
    return {
      selected: [],
      singleSelect: false,
      headers: [
        { text: 'no', value: 'id', sortable: true },
        { text: '이름', value: 'first_name', sortable: true },
        { text: '성', value: 'last_name', sortable: false },
        { text: '이메일', value: 'email', sortable: true },
      ],
      page:1
    }
  },
  computed: {
    ...mapState({
      listData: state => state.iusers.listData,
      totalPage: state => state.iusers.totalPage,
    }),
    
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.page = this.$route.params.page;
      console.log("home init...")
      this.getList(this.page);

    },
    getList(page) {
      this._getList(page).then(() => {
        if (this.$route.params.page !== page) {
          this.$router.push({ name: 'isabelle', params: { page } })
        }
      })
    },
    ...mapActions({
      _getList: "iusers/getList",
      removeSelect: "iusers/removeUser",
    }),
    editItem1(id) {
      this.$router.push({ name: 'write', params: { id: id } });
    },

    rowClick(id) {
      id = id.id
      this.$router.push({ name: 'detail', params: { id: id } })
    },
    deleteItem(){
      for(var i=0;i<this.selected.length;i++){
        var selectId=this.selected[i].id
        this.removeSelect(selectId).then(() => {
        this.movePage(this.page)
      })
      }
    },
    movePage(page){
    if (this.$route.params.page !== page) {
        this.$router.push({ path: `/isabelle/1` })
           }
    }
  },

}
</script>