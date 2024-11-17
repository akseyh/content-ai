<template>
  <div
    class="max-w-full mx-auto mt-10 p-4 bg-white border border-gray-200 rounded-lg shadow"
  >
    <!-- Kullanıcı Bilgileri -->
    <div class="flex items-start space-x-4">
      <img
        src="https://via.placeholder.com/50"
        alt="Profile Picture"
        class="w-12 h-12 rounded-full"
      />
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-semibold text-gray-800">John Doe</span>
            <span class="text-sm text-gray-500 ml-1">@johndoe</span>
            <span class="text-sm text-gray-500 ml-1">· 2h</span>
          </div>
          <button class="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 12a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75z"
              />
            </svg>
          </button>
        </div>
        <p class="mt-2 text-gray-800">
          <slot></slot>
        </p>
        <!-- Tweet Görselleri -->
        <div class="mt-3 grid grid-cols-2 gap-2">
          <img
            src="https://via.placeholder.com/150"
            alt="Image 1"
            class="w-full rounded-lg"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Image 2"
            class="w-full rounded-lg"
          />
        </div>
        <!-- Tweet İstatistikleri -->
        <div class="flex items-center justify-between mt-4 text-gray-500">
          <button class="flex items-center space-x-2 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.75 9.75h-5.5a.75.75 0 010-1.5h5.5a.75.75 0 010 1.5zM9 13.5h6a.75.75 0 010 1.5H9a.75.75 0 010-1.5z"
              />
            </svg>
            <span>10</span>
          </button>
          <button class="flex items-center space-x-2 hover:text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.75 9.75h-5.5a.75.75 0 010-1.5h5.5a.75.75 0 010 1.5zM9 13.5h6a.75.75 0 010 1.5H9a.75.75 0 010-1.5z"
              />
            </svg>
            <span>5</span>
          </button>
          <button class="flex items-center space-x-2 hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.75 9.75h-5.5a.75.75 0 010-1.5h5.5a.75.75 0 010 1.5zM9 13.5h6a.75.75 0 010 1.5H9a.75.75 0 010-1.5z"
              />
            </svg>
            <span>8</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
