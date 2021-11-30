import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
  })

  it('Should be able to create a new session', async () => {
    await createUserUseCase.execute({
      name: 'User test',
      email: 'test@example.com',
      password: 'test@example.com'
    })

    const auth = await authenticateUserUseCase.execute({
      email: 'test@example.com',
      password: 'test@example.com'
    })

    expect(auth).toHaveProperty('token');
  })
})
