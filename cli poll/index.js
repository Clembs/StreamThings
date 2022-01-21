import { createWriteStream, readFileSync } from "fs";
import { Canvas } from "canvas";
import prompt from "prompt";
import { randomUUID } from "crypto";

const canvas = new Canvas(1000, 1000);
const ctx = canvas.getContext("2d");
prompt.start();

const poll = {
  title: "",
  options: [],
  votes: [],
};

prompt.get(
  {
    properties: {
      question: { type: "string", allowEmpty: false, required: true },
      options: {
        maxItems: 2,
        type: "array",
        allowEmpty: false,
        required: true,
      },
    },
  },
  (err, result) => {
    poll.title = result.question;
    poll.options = result.options.map((option) => {
      return { name: option, votes: 0 };
    });

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 1000);

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(poll.title, 10, 50);

    poll.options.forEach(({ name, votes }) => {
      ctx.fillStyle = "black";
      ctx.font = "13px Arial";
      ctx.fillText(name, 10, 100 + 50);
    });

    const out = createWriteStream("./poll.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      console.log("The poll has been created");
    });

    console.log(poll);
    console.log(poll.options.map((option) => option.name));
    prompt.get(
      {
        properties: {
          votes: {
            enum: poll.options.map((option) => option.name),
            conform: true,
            message: "Please enter a valid option",
            allowEmpty: false,
            maxItems: 10,
            type: "array",
            required: true,
          },
        },
      },
      (err, { votes }) => {
        votes.forEach((v) => {
          if (poll.options.find((o) => o.name === v)) {
            poll.options.find((o) => o.name === v).votes++;
          } else {
            console.log("Invalid vote");
          }
          poll.votes.push(randomUUID());
        });
        poll.options.forEach((opts) => {
          console.log(
            opts,
            (opts.votes / poll.votes.length) * (canvas.width - 20)
          );
          ctx.fillStyle = "grey";
          ctx.fillRect(10, 100 + poll.options.indexOf(opts) * 40, 980, 20);
          ctx.fillStyle = "red";
          ctx.fillRect(
            10,
            100 + poll.options.indexOf(opts) * 40,
            (opts.votes / poll.votes.length) * (canvas.width - 20),
            20
          );
        });

        const out = createWriteStream("./poll.png");
        const stream = canvas.createPNGStream();
        stream.pipe(out);
      }
    );
  }
);
