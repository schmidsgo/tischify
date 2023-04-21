<script setup></script>

<template>
  <div class="flex flex-col h-[20vh] items-center justify-center">
    <h1 class="text-4xl font-semibold text-blue-500 mb-4">
      Jetzt einen Tisch buchen
    </h1>
    <div class="flex items-center">
      <input
        type="text"
        placeholder="e.g) Augsburg"
        class="bg-gray-200 py-2 px-3 text-gray-600 rounded-md focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="e.g) Restaurant, Cafe, Bar"
        class="bg-gray-200 py-2 px-3 text-gray-600 rounded-md focus:border-blue-500 mx-2"
      />
      <button
        class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none"
      >
        suchen
      </button>
    </div>
  </div>
</template>
