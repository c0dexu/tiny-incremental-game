export interface Dialog {
  text: string;
  waitTime: number;
}

export const beginningDialog: Dialog[] = [
  {
    text: "Oh well, hello! It's nice to see you here.",
    waitTime: 2,
  },
  {
    text: "I've been wondering if anyone would come here anytime...",
    waitTime: 2,
  },
  {
    text: "Did you think you could find anything exciting here? Well, you're wrong.",
    waitTime: 2,
  },
  {
    text: "See that slot? C'mon, just a little click and it's all yours. only for 50 coins.",
    waitTime: 4,
  },
];
