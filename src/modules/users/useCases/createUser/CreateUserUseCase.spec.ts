import "reflect-metadata";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })

  it('Should be able a create a new User', async () => {
      const data = {
        name: 'User test',
        email: 'test@example.com',
        password: 'test@example.com'
      }

      const user = await createUserUseCase.execute(data);
      expect(user).toHaveProperty('id');
  });
})
