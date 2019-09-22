import { apiGet } from "./api";

document.getElementById("ping")!.addEventListener("click", async () => {
  const { data } = await apiGet("/ping");
  const counter = document.getElementById("count")!;
  counter.innerHTML = `${data.count}`;
});
