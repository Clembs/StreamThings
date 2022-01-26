import { reloadPollDisplay } from "../functions/reloadPollDisplay";

export class Poll {
  public title: string = "";
  public options: {
    name: string;
    votes: number;
  }[] = [];
  public optionNames: string[] = [];
  public voters: string[] = [];

  public init = (title: string, options: string[]) => {
    this.title = title;
    this.optionNames = this.options.map((opt) => opt.name);
    options.forEach((option) => {
      this.options.push({ name: option, votes: 0 });
    });
    console.log(this);
    reloadPollDisplay(this);
    return this;
  };

  public vote(user: string, option: string) {
    this.options.forEach((opt) => {
      if (opt.name === option) {
        opt.votes++;
      }
    });
    this.voters.push(user);
    reloadPollDisplay(this);
    return this;
  }
}
