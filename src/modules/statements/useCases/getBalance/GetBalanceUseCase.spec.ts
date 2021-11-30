import "reflect-metadata"
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe('GetBalanceUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository);
  })

  it('Should be able to return a list with balance', async () => {
    const user = await createUserUseCase.execute({
      name: 'User test',
      email: 'test@example.com',
      password: 'test@example.com'
    })

    const balance = await getBalanceUseCase.execute({ user_id: user.id as string })

    expect(balance).toHaveProperty('statement');
    expect(balance).toHaveProperty('balance');
  })
})
