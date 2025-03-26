import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

class Observer {
  update(event: string, data: any) {
    console.log(`Event: ${event}`, data);
  }
}

class TaskNotifier {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(event: string, data: any) {
    this.observers.forEach(observer => observer.update(event, data));
  }
}

class TaskService {
  private notifier = new TaskNotifier();

  constructor() {
    this.notifier.addObserver(new Observer());
  }

  async create(data: { 
    title: string, 
    description?: string,
    priorityId: number,
    creatorId: number,
    responsibleId?: number,
    status?: Status
  }) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priorityId: data.priorityId,
        creatorId: data.creatorId,
        responsibleId: data.responsibleId,
        status: data.status
      },
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    this.notifier.notify("Task Created", task);
    return task;
  }

  async getById(id: number) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        Tag: true,
        Comment: {
          include: {
            author: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });
  }

  async getAll() {
    return prisma.task.findMany({
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        Tag: true
      }
    });
  }

  async getByPriority(priorityId: number) {
    return prisma.task.findMany({
      where: { priorityId },
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        Tag: true
      }
    });
  }

  async getByResponsible(responsibleId: number) {
    return prisma.task.findMany({
      where: { responsibleId },
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        Tag: true
      }
    });
  }

  async getByCreator(creatorId: number) {
    return prisma.task.findMany({
      where: { creatorId },
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        Tag: true
      }
    });
  }

  async getByTag(tagId: number) {
    return prisma.task.findMany({
      where: {
        Tag: {
          some: {
            id: tagId
          }
        }
      },
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        Tag: true
      }
    });
  }

  async update(id: number, data: {
    title?: string,
    description?: string,
    priorityId?: number,
    status?: Status
  }) {
    const task = await prisma.task.update({
      where: { id },
      data,
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    this.notifier.notify("Task Updated", task);
    return task;
  }

  async assignResponsible(taskId: number, responsibleId: number) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { 
        responsibleId,
        status: Status.EM_PROGRESSO
      },
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    this.notifier.notify("Task Assigned", task);
    return task;
  }

  async delete(id: number) {
    const task = await prisma.task.delete({
      where: { id },
      include: {
        priority: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    this.notifier.notify("Task Deleted", task);
    return task;
  }
}

export default new TaskService();
