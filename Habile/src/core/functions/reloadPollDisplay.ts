import { createWriteStream, readFileSync } from "fs";
import { Poll } from "core/classes/Poll";
import { Canvas } from "canvas";

export const reloadPollDisplay = (poll: Poll) => {
  console.log(poll);
  const canvas = new Canvas(500, 500);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 1000);

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText(poll.title, 10, 50);

  poll.options.forEach((opt, index) => {
    console.log(opt);
    ctx.fillStyle = "black";
    ctx.font = "13px Arial";
    ctx.fillText(opt.name, 10, 100 + 50);
    console.log((opt.votes / poll.voters.length) * (canvas.width - 20));
    ctx.fillStyle = "grey";
    ctx.fillRect(10, 100 + poll.options.length * 40, 980, 20);
    ctx.fillStyle = "red";
    ctx.fillRect(
      10,
      100 + index * 40,
      (opt.votes / poll.voters.length) * (canvas.width - 20),
      20
    );
  });

  const out = createWriteStream("./img/poll.png");
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => {
    console.log("The poll has been created");
  });
};
