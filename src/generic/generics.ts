export default interface IFooBar {
  bar: string;
  foo: string;
}

const fooBars: Array<IFooBar> = [
  {
    foo: "foo 1",
    bar: "bar 1",
  },
  {
    foo: "i am foo two",
    bar: "i am bar tow",
  },
  {
    foo: "foo two",
    bar: "bar two",
  },
];

function sortByFoo(fooBars: Array<IFooBar>) {
  fooBars.sort((a, b) => {
    if (a.foo > b.foo) {
      return 1;
    }
    if (a.foo < b.foo) {
      return -1;
    }

    return 0;
  });
}

function sortByBar(fooBars: Array<IFooBar>) {
  fooBars.sort((a, b) => {
    if (a.bar > b.bar) {
      return 1;
    }
    if (a.bar < b.bar) {
      return -1;
    }
    return 0;
  });
}

console.log(sortByFoo(fooBars)); // always get undefined
console.log(sortByBar(fooBars)); // always get undefined

function sortByKey<T>(data: Array<T>, key: keyof T) {
  data.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
}

sortByKey<IFooBar>(fooBars, "foo");
console.log(sortByKey<IFooBar>(fooBars, "foo"));

class Animal {
  public legCount: number;

  constructor(legCount: number) {
    this.legCount = legCount;
  }
}

class Cat extends Animal {
  constructor() {
    super(4);
  }
}

class Chiken extends Animal {
  constructor() {
    super(2);
  }
}

class Bacteria extends Animal {
  constructor() {
    super(0);
  }
}

function printLegCount<T extends Animal>(animal: T): number {
  console.log(`My leg count is: ${animal.legCount}`);
  return animal.legCount;
}

const myCat = new Cat();
printLegCount(myCat);

const myChiken = new Chiken();
printLegCount(myChiken);

const myBacteria = new Bacteria();
printLegCount(myBacteria);
