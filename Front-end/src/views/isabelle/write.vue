<template>
  <v-container fluid>
    <v-form>
      <v-card>
        <v-toolbar color="accent" dense flat dark>
          <v-toolbar-title>게시판 글 작성</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="$router.push({name:'isabelle'})">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon @click="signUp"  :disabled="$v.form.$invalid">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
           <p class="typo__p" v-if="submitStatus === 'ERROR'">형식에 맞게 입력해주세요</p>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="form.first_name" outlined label="first_name" :counter="10" :error-messages="first_nameErrors" @input="$v.form.first_name.$touch()" @blur="$v.form.first_name.$touch()" required></v-text-field>
          <v-text-field v-model="form.last_name" outlined label="last_name" :counter="10" :error-messages="last_nameErrors" @input="$v.form.last_name.$touch()" @blur="$v.form.last_name.$touch()" required></v-text-field>
          <v-textarea v-model="form.email" outlined label="email" :error-messages="emailErrors" @input="$v.form.email.$touch()" @blur="$v.form.email.$touch()" required></v-textarea>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  props: ['document', 'action'],
  data() {
    return {
      form:{
      id:'',
      first_name: '',
      last_name: '',
      email: '',
      },submitStatus: null
    }
  },
  validations: {
    form:{first_name: {
      required,
      maxLength: maxLength(10)
    },
    last_name: {
      required,
      maxLength: maxLength(10)
    },
    email: {
      required,
      email
    }
    }
  },
  computed: {
    first_nameErrors() {
      const errors = []
      if (!this.$v.form.first_name.$dirty) return errors
      !this.$v.form.first_name.required && errors.push('성을 입력하세요')
      !this.$v.form.first_name.maxLength && errors.push('최대 10글자 입니다.')
      return errors
    },
    last_nameErrors() {
      const errors = []
      if (!this.$v.form.last_name.$dirty) return errors
      !this.$v.form.last_name.required && errors.push('이름을 입력하세요')
      !this.$v.form.last_name.maxLength && errors.push('최대 10글자 입니다')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('이메일 형식에 맞지 않습니다.')
      !this.$v.form.email.required && errors.push('이메일을 입력하세요')
      return errors
    }

  },

  methods: {
    ...mapActions({
      _addList: "iusers/addList"
    }
    ),
    signUp() {
      this.page = this.$route.params.page;
      this.$v.form.$touch();
       if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      }
      else{
      this._addList(this.form).then(() => {
        this.$router.push({ name: 'isabelle' })
      })
      }
      
    },

  }
}
</script>