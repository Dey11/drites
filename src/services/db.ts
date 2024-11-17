import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { NewUser } from "./db.types";

type Success<T> = {
  success: true;
  message: string;
  payload: T;
};

type Failure = {
  success: false;
  message: string;
};

type Response<T> = Success<T> | Failure;

type GetUserByID = Pick<
  Prisma.UserGetPayload<Prisma.UserDefaultArgs>,
  "email" | "username" | "name"
>;

type PostsList = {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
  author: {
    username: string | null;
  };
};

class DbService {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient().$extends(withAccelerate());
  }

  async createUser({
    id,
    name,
    username,
    email,
    createdAt,
  }: NewUser): Promise<Response<null>> {
    try {
      const user = await this.prisma.user.create({
        data: {
          id,
          name,
          username,
          email,
          createdAt,
        },
      });

      return {
        success: true,
        message: "User created successfully",
        payload: null,
      };
    } catch (err) {
      return this.error(err);
    }
  }

  async getUser(id: string): Promise<Response<GetUserByID>> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: { email: true, username: true, name: true },
      });
      if (user == null) throw new Error("Invalid id");
      return {
        success: true,
        message: "Success",
        payload: user,
      };
    } catch (err) {
      console.log(err);
      return this.error(err);
    }
  }

  async getPosts(page = 1): Promise<Response<PostsList[]>> {
    try {
      const posts = await this.prisma.post.findMany({
        take: 10,
        skip: (page - 1) * 10,
        select: {
          id: true,
          title: true,
          content: true,
          updatedAt: true,
          author: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        success: true,
        message: "Success",
        payload: posts,
      };
    } catch (err) {
      console.log(err);
      return this.error(err);
    }
  }

  error(error: unknown): Failure {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

const db = new DbService();

export default db;
