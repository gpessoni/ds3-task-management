import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class Observer {
  update(event: string, data: any) {
    console.log(`Event: ${event}`, data);
  }
}

class UserNotifier {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(event: string, data: any) {
    this.observers.forEach(observer => observer.update(event, data));
  }
}

class UserService {
  private notifier = new UserNotifier();

  constructor() {
    this.notifier.addObserver(new Observer());
  }

  async create(data: { name: string, email: string, password: string }) {
    const existingUser = await prisma.user.findFirst({
      where: { email: data.email }
    });

    if (existingUser) {
      throw { code: "USER_EXISTS", message: "Já existe um usuário com este email" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword
      },
    });

    this.notifier.notify("User Created", { ...user, password: undefined });
    return { ...user, password: undefined };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw { code: "INVALID_CREDENTIALS", message: "Credenciais inválidas" };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw { code: "INVALID_CREDENTIALS", message: "Credenciais inválidas" };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' }
    );

    return {
      user: { ...user, password: undefined },
      token
    };
  }

  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            createdAt: true,
            updatedAt: true
          }
        },
        responsibleFor: {
          select: {
            id: true,
            title: true, 
            description: true,
            status: true,
            priority: true,
            createdAt: true,
            updatedAt: true
          }
        },
        Comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            task: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    });
    return user;
  }
  async getAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true, 
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async update(id: number, data: { name?: string, email?: string, password?: string, avatar?: string }) {
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: { 
          email: data.email,
          id: { not: id }
        }
      });

      if (existingUser) {
        throw { code: "USER_EXISTS", message: "Já existe um usuário com este email" };
      }
    }

    let updateData: any = { ...data };
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData
    });

    this.notifier.notify("User Updated", { ...user, password: undefined });
    return { ...user, password: undefined };
  }

  async delete(id: number) {
    const user = await prisma.user.delete({
      where: { id },
    });
    this.notifier.notify("User Deleted", { ...user, password: undefined });
    return { ...user, password: undefined };
  }
}

export default new UserService();
