<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/state';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const role = ref('guest');

const address = ref('');
const city = ref('');
const phone_number = ref('');
const opening_hours = ref('');
const capacity = ref(0);

const register = async () => {
  await authStore.register({
    role: role.value,
    username: username.value,
    password: password.value,
    address: address.value,
    city: city.value,
    phone_number: phone_number.value,
    opening_hours: opening_hours.value,
    capacity: capacity.value
  });
};

const login = async () => {
  await authStore.login({
    username: username.value,
    password: password.value
  });
};
</script>

<template>
  <v-dialog v-model="authStore.OpenLoginModal" persistent width="50%">
    <v-window>
      <v-window-item v-if="authStore.currentLoginType === 'login'">
        <v-card class="pb-5">
          <v-card-title
            class="text-center text-h5 font-weight-bold text-Blue mb-5 bg-grey-lighten-2"
          >
            Anmelden
          </v-card-title>
          <div class="w-75 justify-center mx-auto">
            <v-card-text>
              <v-alert
                icon="mdi-lightbulb-on-10"
                title="Bist du zum Testen hier?"
                type="info"
                variant="tonal"
                class="mb-5"
              >
                <p>Es gibt z.B.:</p>
                <p>
                  Nutzername: 'restaurant1', Passwort: 'restaurant1' als
                  Restaurant.
                </p>
                <p>Nutzername: 'guest1', Passwort: 'guest1' als Gast.</p>
              </v-alert>

              <form @submit.prevent="login">
                <v-text-field v-model="username" label="Nutzername" required />
                <v-text-field
                  v-model="password"
                  label="Passwort"
                  type="password"
                  required
                />
                <p v-if="authStore.isError" class="text-red ml-4">
                  Nicht gefunden!
                </p>
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
                      v-if="!authStore.isLoading"
                      type="submit"
                      color="Blue"
                      variant="flat"
                      class="p-2"
                      prepend-icon="mdi-login"
                    >
                      Einloggen
                    </v-btn>
                    <v-btn
                      v-else-if="authStore.isLoading"
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
                          @click="authStore.currentLoginType = 'register'"
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
      <v-window-item v-else-if="authStore.currentLoginType === 'register'">
        <v-card height="550" class="pb-15">
          <v-card-title
            class="text-center text-h5 font-weight-bold text-Blue mb-5 bg-grey-lighten-2"
          >
            Registrieren
          </v-card-title>
          <form
            @submit.prevent="register"
            width="700"
            class="w-75 h-100 justify-center mb-5 py-5 mx-auto overflow-y-auto"
          >
            <div class="pa-4">
              <v-radio-group v-model="role" inline justify="center">
                <v-radio
                  label="Kunde"
                  color="info"
                  value="guest"
                  size="x-small"
                  class="mr-4"
                />
                <v-radio
                  label="Mitarbeiter"
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
              <v-text-field
                v-if="role === 'restaurant'"
                v-model="address"
                label="Adresse"
                required
              />
              <v-text-field
                v-if="role === 'restaurant'"
                v-model="city"
                label="Stadt"
                required
              />
              <v-text-field
                v-if="role === 'restaurant'"
                v-model="phone_number"
                label="Telefon Nummer"
                placeholder="z.B. 0123/3456"
                required
              />
              <v-text-field
                v-if="role === 'restaurant'"
                v-model="opening_hours"
                label="Öffnungszeit"
                placeholder="z.B. 08:00-18:00"
                required
              />
              <v-text-field
                v-if="role === 'restaurant'"
                v-model="capacity"
                label="Kapazität"
                placeholder="z.B. 50"
                required
              />
              <p v-if="authStore.isError" class="text-red ml-4">Error!</p>
              <v-card-actions>
                <v-row class="mt-3 text-center">
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
                      v-if="!authStore.isLoading"
                      type="submit"
                      color="Blue"
                      variant="flat"
                      class="p-2"
                      prepend-icon="mdi-account-plus"
                    >
                      Registrieren
                    </v-btn>
                    <v-btn
                      v-else-if="authStore.isLoading"
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
            </div>
          </form>
        </v-card>
      </v-window-item>
    </v-window>
  </v-dialog>
</template>
