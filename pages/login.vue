<template>
  <div class="p-5 flex justify-center bg-gray-300">
    <form
      @submit.prevent="login"
      class="login__container mx-2 my-4 xl:mx-0 p-5 border-3 border-black bg-white"
    >
      <div class="mb-5">
        <img src="~/assets/images/login.png" alt="Login" class="login__image" />
      </div>

      <div class="flex flex-col">
        <label for="email" class="font-bold text-primary-500">Email *</label>
        <input
          ref="email"
          v-model="email"
          type="text"
          name="email"
          placeholder="Email"
          class="py-1 border-b border-black text-2xl placeholder-gray-500 focus:border-primary-500"
          required
          autocomplete="email"
          autofocus
        />
      </div>

      <div class="mt-4 flex flex-col">
        <label for="password" class="font-bold text-primary-500"
          >Password *</label
        >
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          class="py-1 border-b border-black text-2xl placeholder-gray-500 focus:border-primary-500"
          required
          autocomplete="current-password"
        />
      </div>

      <div class="mt-5 flex justify-between">
        <div v-if="error" class="text-error-500">
          <ErrorIcon class="inline mr-2" /> {{ error }}
        </div>
        <div v-else />
        <button
          :disabled="sending"
          type="submit"
          class="px-4 py-2 border-3 border-black hover:bg-black hover:text-white uppercase"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorIcon from '@/components/icons/error.vue'

export default {
  auth: 'guest',
  components: {
    ErrorIcon
  },
  data() {
    return {
      email: '',
      password: '',
      sending: false,
      error: null
    }
  },
  methods: {
    async login(event) {
      try {
        this.sending = true
        this.error = null

        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        this.sending = false
      } catch (e) {
        this.error = 'Authentication failed'
        this.sending = false
        this.$refs.email.focus()
      }
    }
  }
}
</script>

<style>
.login__container {
  width: 100%;

  @screen md {
    width: 700px;
  }
}

.login__image {
  width: auto;
  height: 70px;
}
</style>
