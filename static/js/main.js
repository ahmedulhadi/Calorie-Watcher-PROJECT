console.log("Main JS working");
function confirmReset() {
  console.log("confirming reset.");
  if (confirm("All Weight logs and details will be lost!")) {
    console.log("reset done.");
    window.location.href = "/home/reset";
  }
}
