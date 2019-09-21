import { axiosInstance } from "./api";
import { Health } from "../types/api";

document.getElementById("ping")!.addEventListener("click", async () => {
  const { data } = await axiosInstance.get<Health>("/ping");
  const counter = document.getElementById("count")!;
  counter.innerHTML = `${data.count}`;
});
