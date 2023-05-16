<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/state';
import axios from 'axios';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const userType = ref('customer');
const isError = ref(false);
const isLoading = ref(false);

const login = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post('http://localhost:3000/login', {
      userType: userType.value,
      username: username.value,
      password: password.value
    });
    authStore.login(response.data);
    authStore.OpenLoginModal = false;
  } catch (error) {
    isError.value = true;
  } finally {
    username.value = '';
    password.value = '';
    isLoading.value = false;
  }
};

const signUp = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post('http://localhost:3000/createUser', {
      userType: userType.value,
      username: username.value,
      password: password.value
    });
    authStore.signUp(response.data);
    authStore.OpenLoginModal = false;
  } catch (error) {
    isError.value = true;
  } finally {
    username.value = '';
    password.value = '';
    isLoading.value = false;
  }
};
</script>

<template>
  <v-dialog v-model="authStore.OpenLoginModal" activator="parent" width="50%">
    <v-window>
      <v-window-item v-if="authStore.currentLoginType === 'login'">
        <v-card class="pb-5">
          <v-card-title
            class="text-center text-h5 font-weight-bold text-Blue mb-5 bg-grey-lighten-2"
          >
            Anmelden
          </v-card-title>
          <div class="w-50 justify-center mx-auto">
            <v-card-text>
              <form @submit.prevent="login">
                <v-radio-group v-model="userType" inline>
                  <v-radio
                    label="Kunde"
                    color="info"
                    value="customer"
                    size="x-small"
                    class="mr-4"
                  />
                  <v-radio
                    label="Gewerbe"
                    color="info"
                    value="restaurant"
                    size="x-small"
                  />
                </v-radio-group>
                <v-text-field v-model="username" label="Nutzername" required />
                <v-text-field
                  v-model="password"
                  label="Passwort"
                  type="password"
                  required
                />
                <p v-if="isError" class="text-red ml-4">Nicht gefunden!</p>
                <v-card-actions>
                  <v-row justify="center" class="mt-3">
                    <v-btn
                      type="text"
                      color="Blue"
                      variant="outlined"
                      @click="authStore.OpenLoginModal = false"
                      class="p-2"
                      prepend-icon="mdi-close"
                    >
                      Abbrechen
                    </v-btn>
                    <v-btn
                      v-if="!isLoading"
                      type="submit"
                      color="Blue"
                      variant="flat"
                      class="p-2"
                      prepend-icon="mdi-login"
                    >
                      Einloggen
                    </v-btn>
                    <v-btn
                      v-else-if="isLoading"
                      color="Blue"
                      variant="flat"
                      class="p-2"
                      disabled
                    >
                      <v-progress-circular
                        color="Blue"
                        size="25"
                        indeterminate
                      />
                    </v-btn>
                    <v-divider thickness="2" class="mt-3" />
                    <v-col cols="12">
                      <div class="d-flex align-center justify-center">
                        <p class="text-lightGrey mr-1 p-0">Bist du neu?</p>
                        <v-btn
                          type="text"
                          color="Blue"
                          variant="text"
                          class="py-2 px-4"
                          prepend-icon="mdi-account-plus"
                          @click="authStore.currentLoginType = 'signUp'"
                        >
                          Registrieren
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </form>
            </v-card-text>
          </div>
        </v-card>
      </v-window-item>
      <v-window-item v-else-if="authStore.currentLoginType === 'signUp'">
        <v-card class="pb-5">
          <v-card-title
            class="text-center text-h5 font-weight-bold text-Blue mb-5 bg-grey-lighten-2"
          >
            Registrieren
          </v-card-title>
          <div class="w-50 justify-center mx-auto">
            <v-card-text>
              <form @submit.prevent="signUp">
                <v-radio-group v-model="userType" inline>
                  <v-radio
                    label="Kunde"
                    color="info"
                    value="customer"
                    size="x-small"
                    class="mr-4"
                  />
                  <v-radio
                    label="Gewerbe"
                    color="info"
                    value="restaurant"
                    size="x-small"
                  />
                </v-radio-group>
                <v-text-field v-model="username" label="Nutzername" required />
                <v-text-field
                  v-model="password"
                  label="Passwort"
                  type="password"
                  required
                />
                <p v-if="isError" class="text-red ml-4">Error!</p>
                <v-card-actions>
                  <v-row class="mt-3">
                    <v-col cols="12">
                      <v-btn
                        type="text"
                        color="Blue"
                        variant="outlined"
                        @click="authStore.OpenLoginModal = false"
                        class="p-2"
                        prepend-icon="mdi-close"
                      >
                        Abbrechen
                      </v-btn>
                      <v-btn
                        v-if="!isLoading"
                        type="submit"
                        color="Blue"
                        variant="flat"
                        class="p-2"
                        prepend-icon="mdi-account-plus"
                      >
                        Registrieren
                      </v-btn>
                      <v-btn
                        v-else-if="isLoading"
                        color="Blue"
                        variant="flat"
                        class="p-2"
                        disabled
                      >
                        <v-progress-circular
                          color="Blue"
                          size="25"
                          indeterminate
                        />
                      </v-btn>
                    </v-col>
                    <v-divider thickness="2" class="mt-3" />
                    <v-col cols="12">
                      <div class="d-flex align-center justify-center">
                        <p class="text-lightGrey mr-1 p-0">
                          Hast du bereits Konto?
                        </p>
                        <v-btn
                          type="text"
                          color="Blue"
                          variant="text"
                          class="py-2 px-4"
                          prepend-icon="mdi-account"
                          @click="authStore.currentLoginType = 'login'"
                        >
                          Einloggen
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </form>
            </v-card-text>
          </div>
        </v-card>
      </v-window-item>
    </v-window>
  </v-dialog>
</template>
