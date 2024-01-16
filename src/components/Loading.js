import React from "react";

const Loading = () => {
  return (
    <div class="flex space-x-2 justify-center items-center bg-white">
      <span class="sr-only">Loading...</span>
      <div class="h-4 w-4 md:h-6 md:w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-4 w-4 md:h-6 md:w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-4 w-4 md:h-6 md:w-6 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loading;
