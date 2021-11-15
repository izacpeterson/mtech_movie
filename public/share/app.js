document.querySelector("#shareBtn").addEventListener("click", () => {
  if (navigator.share) {
    navigator
      .share({
        title: "DevFlix",
        url: "https://devflix.io",
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    // fallback
  }
});
