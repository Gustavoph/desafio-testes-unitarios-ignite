import "reflect-metadata"
import { User } from "../../entities/User";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";

let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('ShowUserProfileUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  })

  it('Should be able to return an authenticated user', async () => {
    const data = {
      name: 'User test',
      email: 'test@example.com',
      password: 'test@example.com'
    }

    await createUserUseCase.execute(data);

    const userCreated = await inMemoryUsersRepository.findByEmail(data.email) as User;

    const user = await showUserProfileUseCase.execute(userCreated.id as string);

    expect(user.name).toBe(data.name);
    expect(user.email).toBe(data.email);
  })
})
