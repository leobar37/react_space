let initial = 0;

export type Data = {
  name: string;
  id: number;
};


let data: Data[] = [
  {
    id: initial++,
    name: "Dogs",
  },
  {
    id: initial++,
    name: "Cats",
  },
  {
    id: initial++,
    name: "None",
  },

  {
    id: initial++,
    name: "squirrels" + initial,
  },
  {
    id: initial++,
    name: "worms" + initial,
  },
  {
    id: initial++,
    name: "Dogs" + initial,
  },
  {
    id: initial++,
    name: "Cats" + initial,
  },
  {
    id: initial++,
    name: "None" + initial,
  },

  {
    id: initial++,
    name: "squirrels" + initial,
  },
  {
    id: initial++,
    name: "worms" + initial,
  },
];

data = Array(200)
  .fill(null)
  .map((d) => data)
  .flat();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const delayFn =
  (fn: (...args: any[]) => any, ms: number) =>
  async (...args: any[]) => {
    await delay(ms);
    return fn(...args);
  };

export const search = delayFn((name: string) => {
  if (name === "") {
    return data;
  }
  return data.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase())
  );
}, 300);
