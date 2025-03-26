import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Observer {
  update(event: string, data: any) {
    console.log(`Event: ${event}`, data);
  }
}

class HistoryNotifier {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(event: string, data: any) {
    this.observers.forEach(observer => observer.update(event, data));
  }
}

class HistoryService {
  private notifier = new HistoryNotifier();

  constructor() {
    this.notifier.addObserver(new Observer());
  }

  async create(data: { taskId: number, action: string }) {
    const task = await prisma.task.findUnique({
      where: { id: data.taskId }
    });

    if (!task) {
      throw { code: "TASK_NOT_FOUND", message: "Tarefa não encontrada" };
    }

    const history = await prisma.history.create({
      data: {
        taskId: data.taskId,
        action: data.action
      },
    });

    this.notifier.notify("History Created", history);
    return history;
  }

  async findByTaskId(taskId: number) {
    const history = await prisma.history.findMany({
      where: { taskId },
      orderBy: { createdAt: 'desc' }
    });

    return history;
  }
}

export default new HistoryService();
