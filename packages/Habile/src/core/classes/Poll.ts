import fetch from 'node-fetch';

export class Poll {
  public title: string = '';
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
    this.post();
    return this;
  }

  public vote(user: string, optionIndex: string) {
    if (optionIndex.toUpperCase().charCodeAt(0) - 65 < this.options.length) {
      this.options[optionIndex.toUpperCase().charCodeAt(0) - 65].votes++;
      this.voters.push(user);
      this.post();
      return this;
    } else {
      throw new Error('Option does not exist!');
    }
  }

  public end() {
    this.created = false;
    this.title = '';
    this.options = [];
    this.voters = [];
    this.post();
  }

  public toJSON() {
    return {
      title: this.title,
      options: this.options,
      voters: this.voters,
      created: this.created,
    };
  }

  public async post() {
    await fetch('http://localhost:3000/plugins/poll', {
      method: 'POST',
      body: JSON.stringify(this.toJSON()),
    });
  }
}
