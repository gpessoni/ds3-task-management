import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Observer {
  update(event: string, data: any) {
    console.log(`Event: ${event}`, data);
  }
}

class PriorityNotifier {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(event: string, data: any) {
    this.observers.forEach(observer => observer.update(event, data));
  }
}

class PriorityIterator {
  private priorities: any[];
  private index = 0;

  constructor(priorities: any[]) {
    this.priorities = priorities;
  }

  next() {
    if (this.index < this.priorities.length) {
      return { value: this.priorities[this.index++], done: false };
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

class PriorityService {
  private notifier = new PriorityNotifier();

  constructor() {
    this.notifier.addObserver(new Observer());
  }

  async createPriority(data: { level: string, default?: boolean }) {
    const priority = await prisma.priority.create({
      data: {
        level: data.level,
        default: data.default || false
      },
    });
    this.notifier.notify("Priority Created", priority);
    return priority;
  }

  async getPriorityById(id: string) {
    return prisma.priority.findUnique({
      where: { id: Number(id) }, 
    });
  }
  
  async getPriorities() {
    return prisma.priority.findMany();
  }

  async iteratePriorities() {
    const priorities = await this.getPriorities();
    const iterator = new PriorityIterator(priorities);
    let result = iterator.next();
    while (!result.done) {
      console.log(result.value);
      result = iterator.next();
    }
  }

  async getFilteredPriorities(strategy: FilterStrategy) {
    const priorities = await this.getPriorities();
    return strategy.filter(priorities);
  }

  async executeCommand(command: Command) {
    await command.execute();
  }

  async updatePriority(id: string, data: { level?: string, default?: boolean }) {
    const priority = await prisma.priority.update({
      where: { id: Number(id) },
      data,
    });
    this.notifier.notify("Priority Updated", priority);
    return priority;
  }

  async deletePriority(id: string) {
    const priority = await prisma.priority.delete({
      where: { id: Number(id) },
    });
    this.notifier.notify("Priority Deleted", priority);
    return priority;
  }
}

export default new PriorityService();