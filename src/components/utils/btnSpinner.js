export const btnSpinner = (btnClass) => {
  const spinner = document.querySelector(btnClass);
  console.log(spinner);
  spinner.classList.add("active");
  setTimeout(() => {
    spinner.classList.remove("active");
  }, 1000);
};
