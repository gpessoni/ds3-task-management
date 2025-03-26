import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Observer {
  update(event: string, data: any) {
    console.log(`Event: ${event}`, data);
  }
}

class TagNotifier {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(event: string, data: any) {
    this.observers.forEach(observer => observer.update(event, data));
  }
}

class TagIterator {
  private tags: any[];
  private index = 0;

  constructor(tags: any[]) {
    this.tags = tags;
  }

  next() {
    if (this.index < this.tags.length) {
      return { value: this.tags[this.index++], done: false };
    }
    return { value: null, done: true };
  }

  reset() {
    this.index = 0;
  }
}

interface FilterStrategy {
  filter(data: any[]): any[];
}

interface Command {
  execute(): Promise<void>;
}

class TagService {
  private notifier = new TagNotifier();

  constructor() {
    this.notifier.addObserver(new Observer());
  }

  async create(data: { name: string }) {
    const existingTag = await prisma.tag.findFirst({
      where: { name: data.name }
    });

    if (existingTag) {
      throw { code: "TAG_EXISTS", message: "Já existe uma tag com este nome" };
    }

    const tag = await prisma.tag.create({
      data: {
        name: data.name
      },
    });
    this.notifier.notify("Tag Created", tag);
    return tag;
  }

  async getById(id: number) {
    return prisma.tag.findUnique({
      where: { id }, 
    });
  }
  
  async getAll() {
    return prisma.tag.findMany();
  }

  async iterateTags() {
    const tags = await this.getAll();
    const iterator = new TagIterator(tags);
    let result = iterator.next();
    while (!result.done) {
      console.log(result.value);
      result = iterator.next();
    }
  }

  async getFilteredTags(strategy: FilterStrategy) {
    const tags = await this.getAll();
    return strategy.filter(tags);
  }

  async executeCommand(command: Command) {
    await command.execute();
  }

  async update(id: number, name: string) {
    const existingTag = await prisma.tag.findFirst({
      where: { 
        name,
        id: { not: id }
      }
    });

    if (existingTag) {
      throw { code: "TAG_EXISTS", message: "Já existe uma tag com este nome" };
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: { name },
    });
    this.notifier.notify("Tag Updated", tag);
    return tag;
  }

  async delete(id: number) {
    const tag = await prisma.tag.delete({
      where: { id },
    });
    this.notifier.notify("Tag Deleted", tag);
    return tag;
  }
}

export default new TagService();
