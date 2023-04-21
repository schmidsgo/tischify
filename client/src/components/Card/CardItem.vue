<script setup></script>

<template>
  <div class="bg-white hover:bg-gray-100 rounded-lg shadow-md overflow-hidden">
    <img class="w-full h-48 object-cover" src="/cafe1.jpeg" />
    <div class="p-4">
      <h2 class="text-xl font-medium">Cafe DEMO</h2>
      <p class="text-gray-600 text-sm my-2">
        a small chill cafe in the central of Augsburg
      </p>
      <div class="flex">
        <button
          class="bg-pink-500 hover:bg-pink-600 text-white my-2 mr-2 px-4 py-2 rounded-lg focus:outline-none"
        >
          ◎ 18:00
        </button>
        <button
          class="bg-pink-500 hover:bg-pink-600 text-white my-2 px-4 py-2 rounded-lg focus:outline-none"
        >
          △ 18:30
        </button>
      </div>
    </div>
  </div>
</template>
