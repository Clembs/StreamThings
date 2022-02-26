import { refreshPollImg } from "../functions/refreshPollImg";

export class Poll {
  public title: string = "";
  public options: {
    name: string;
    votes: number;
  }[] = [];
  public voters: string[] = [];
  public created = false;

  public async init(title: string, options: string[]) {
    this.title = title;
    options.forEach((option) => {
      this.options.push({ name: option, votes: 0 });
    });
    this.created = true;
    refreshPollImg(this);
    return this;
  }

  public vote(user: string, option: string) {
    if (this.options.map(({ name }) => name).includes(option)) {
      this.options.find(({ name }) => name === option).votes++;
      this.voters.push(user);
      refreshPollImg(this);
      return this;
    } else {
      throw new Error("Option does not exist!");
    }
  }

  public end() {
    this.created = false;
    refreshPollImg(this);
    return this;
  }
}
