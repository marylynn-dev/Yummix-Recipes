<template>
  <v-container>
    <v-form @submit.prevent>
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448">
        <p class="text-center text-primary text-h4 fw-bold mb-10">Log In</p>
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          v-model="email"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a class="text-caption text-decoration-none text-primary" href="#">
            Forgot login password?</a
          >
        </div>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          autocomplete="new-password"
          name="password"
        ></v-text-field>

        <v-btn
          block
          class="mb-8"
          color="primary"
          size="large"
          @click="login"
          :loading="isLoading"
        >
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <a class="text-primary text-decoration-none" href="/signup">
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { loginFunction } from "../services/user";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const login = async () => {
  isLoading.value = true;
  if (email.value && password.value) {
    loginFunction(email.value, password.value);
  } else {
    console.error("Email or password is empty.");
  }
  isLoading.value = false;
};

const visible = ref(false);
</script>
